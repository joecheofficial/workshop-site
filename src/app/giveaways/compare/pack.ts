import type { PackPageContent } from '@/lib/pack-page'

// Words for the "5 Versions of Claude" pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx.

const HEAD = ['What it does', 'Terminal', 'Code Desktop', 'Cowork', 'Claude Chat']

export const COMPARE_PACK: PackPageContent = {
  slug: 'compare',
  level: 'beginner',
  hero: {
    title: 'Here are the 5 Versions of Claude.',
    free: 'They are free.',
    lede: 'Chat, Cowork, Code Desktop, Terminal and Claude Design, side by side. What each one does, where it stops, and why the terminal is the power layer.',
    button: {
      label: 'Show me the comparison',
      meta: 'free · on this page',
      target: 'guide',
    },
    ticks: ['No sign-up', 'No card', 'Read it right on this page'],
  },
  jumps: [
    {
      target: 'guide',
      label: 'See the table',
      text: 'The four versions, line by line.',
    },
    {
      target: 'guide',
      label: 'Read the notes',
      text: 'Four notes on the table, and the fifth Claude.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'Plans, computers and which one to start with.',
    },
  ],
  guide: {
    eyebrow: 'The comparison',
    heading: 'What each version can and cannot do',
    intro:
      'Most people discover Claude through the chat interface and stop there. There are five distinct products. Four sit in the tables below, where the terminal is the power layer and everything else is built on top of it or a subset of it. The fifth is a different category, covered after the tables. Read the columns left to right, most powerful to least.',
    sections: [
      {
        title: 'The four, in one line each',
        table: {
          head: ['Version', 'Where it lives', 'Best for'],
          rows: [
            ['Terminal', 'Claude Code CLI', 'Full system control, automation, orchestration, building'],
            ['Code Desktop', 'Desktop app', 'Visual coding with full project context'],
            ['Cowork', 'Desktop app', 'Document work, research synthesis, file tasks without code'],
            ['Claude Chat', 'claude.ai', 'Questions, writing, brainstorming'],
          ],
        },
      },
      {
        title: 'Overview',
        table: {
          head: HEAD,
          rows: [
            ['Interface', 'Command line', 'Visual app: file tree, plan sidebar, diff viewer', 'Tasks tab GUI', 'Browser or app chat'],
            ['Platform', 'Mac, Windows, Linux', 'Mac, Windows', 'macOS only', 'Any browser or device'],
            ['Available on', 'All paid plans', 'All paid plans', 'All paid plans', 'Free + all paid plans'],
          ],
        },
      },
      {
        title: 'File and system access',
        table: {
          head: HEAD,
          rows: [
            ['File access', 'Full, unrestricted', 'Full, unrestricted', 'Sandboxed to approved folders', 'Upload only'],
            ['Shell commands and scripts', 'Yes, any command', 'Yes', 'No', 'No'],
            ['Project navigation (cd)', 'Any path instantly', 'Via GUI selector', 'No', 'No'],
            ['Scripting and piping', 'Full shell automation', 'No', 'No', 'No'],
            ['Git and version control', 'Yes', 'Yes', 'No', 'No'],
          ],
        },
      },
      {
        title: 'Integrations',
        table: {
          head: HEAD,
          rows: [
            ['MCP server integrations', 'Yes, full CLI config + scopes', 'Yes, GUI approval flow', 'Separate plugin system', 'No'],
            ['Pre-built plugins', 'No', 'No', '11+ (HubSpot, Jira, Slack, Notion, Figma, Box…)', 'No'],
            ['CLAUDE.md project context', 'Loads on session start', 'Loads on session start', 'No', 'No'],
          ],
        },
      },
      {
        title: 'Automation and power',
        table: {
          head: HEAD,
          rows: [
            ['Hooks (auto-triggers)', 'Full: shell-level, every event', 'Basic event hooks only', 'No', 'No'],
            ['Skills and pipelines', 'Full chaining + pipelines', 'Single invocations only', 'No', 'No'],
            ['Parallel background agents', 'Unlimited', 'Limited', 'No', 'No'],
            ['Runs unattended overnight', 'Yes: tmux, nohup, SSH', 'No', 'Yes: Anthropic cloud', 'No'],
            ['CI/CD pipeline integration', 'Yes, fully scriptable', 'No', 'No', 'No'],
            ['Complex routing and dispatch', 'Scripts, JSON dispatch, multi-provider', 'No', 'No', 'No'],
          ],
        },
      },
      {
        title: 'Hooks and Skills on Desktop have limits',
        text: 'The Desktop app fires basic event hooks and can invoke individual skills. What it cannot do is run full pipeline sequences, chaining skills in order, passing outputs between them, and running unattended. The shell-level hooks that fire below Claude do not work the same way. On Desktop they are for interactive use only.',
      },
      {
        title: 'MCP servers on Desktop, not just yes / yes',
        text: 'Both Desktop and Terminal use the same three permission layers (auto-grant, ask every time, block) and the same three scopes (local project, team-shared via version control, all your projects). The Desktop shows a GUI approval dialog the first time a project-scoped server connects. The Terminal gives you fine-grained control via flags, env vars, per-server timeouts, and push channels the GUI does not expose.',
      },
      {
        title: 'Cowork and your local files',
        text: 'Cowork reads files in approved folders. What it cannot do is interact with the scripts or dispatch systems behind those files. If a folder connects to an indexing script, an automation workflow, or a routing layer, Cowork sees the raw files only. It reads documents. It does not run systems.',
      },
      {
        title: 'CLAUDE.md is not a product',
        text: 'It is a markdown file in your project directory that Claude Code reads at session start. Both Desktop and Terminal read it. It is the instruction layer. The Terminal is the execution layer that acts on those instructions at full power.',
      },
      {
        title: 'The 5th Claude: Claude Design',
        text: 'Launched April 2026 by Anthropic Labs, Claude Design is a separate product built specifically for visual creation. You describe what you need, a slide deck, a one-pager, a prototype, a marketing asset, and Claude builds it, then refines it through conversation, inline comments, and live adjustment controls.',
        links: [{ label: 'Read the Claude Design announcement', href: 'https://www.anthropic.com/news/claude-design-anthropic-labs' }],
      },
      {
        title: 'What makes Claude Design different',
        text: 'It reads your existing codebase and design files to apply your actual brand system automatically. It accepts images, documents (DOCX, PPTX, XLSX), and web captures as input. When you are done, you export to Canva, PDF, PPTX, or standalone HTML, or hand the finished design directly to Claude Code for implementation.',
      },
      {
        title: 'What Claude Design does not do',
        text: 'It does not connect to your file system the way Code does, and it has no automation or scripting layer. It is a purpose-built creative tool, not a power tool. For founders, marketers, and product teams who need polished visual output without a designer, it fills a gap none of the four above were built for. Available on Pro, Max, Team, and Enterprise plans.',
      },
      {
        title: 'P.S.',
        text: 'The chat window is the door. The terminal is the room behind it where the real work actually happens. The gap between them is the whole point of this page.',
      },
    ],
  },
  stuck: [
    {
      q: 'I only use the chat window',
      a: 'That is Claude Chat. It is made for questions, writing and brainstorming. You can only upload files to it, and it cannot run commands. The tables above show what the other versions add.',
    },
    {
      q: 'I am on the free plan',
      a: 'Claude Chat is the only one of the four on the free plan. Terminal, Code Desktop and Cowork are on all paid plans. Claude Design is on Pro, Max, Team and Enterprise.',
    },
    {
      q: 'I am on Windows (or not on a Mac)',
      a: 'Terminal works on Mac, Windows and Linux. Code Desktop works on Mac and Windows. Cowork is macOS only. Claude Chat works in any browser or on any device.',
    },
    {
      q: 'I do not know which one to start with',
      a: 'Read the "Best for" table. Questions, writing and brainstorming: Claude Chat. Document work and file tasks without code: Cowork. Visual coding with your project in view: Code Desktop. Automation and building: Terminal.',
    },
    {
      q: 'Where is the fifth one?',
      a: 'Claude Design comes after the tables, in its own part called "The 5th Claude". It is a separate product for visual work, so it is not a column in the table.',
    },
    {
      q: 'What is CLAUDE.md?',
      a: 'A markdown file in your project folder that Claude Code reads when a session starts. Both Terminal and Code Desktop read it. It holds your instructions. See the note "CLAUDE.md is not a product".',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which version you use and which line of the table you are stuck on.',
    },
  ],
  bridge:
    'You came to see which Claude to use. Whichever one you pick, a website you own is the place your work lives and your people can find you.',
  emailHeading: 'Want this kind of breakdown in your inbox?',
}
