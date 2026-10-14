import type { PackPageContent } from '@/lib/pack-page'
import { GUARDOG_SETUP_PROMPT } from './prompts'

// Words for the GuardDog pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx. Prompt copied verbatim from the old page.

export const GITHUB_URL = 'https://github.com/josephtandle/guardog'

export const GUARDOG_PACK: PackPageContent = {
  slug: 'guardog',
  level: 'builder',
  hero: {
    title: 'Here is GuardDog.',
    free: 'It is free.',
    lede: 'Think of it as free antivirus for your code packages. It scans an npm or PyPI package for hidden malware and known security holes before you install it.',
    button: {
      label: 'Take me to it',
      meta: 'free · on this page',
      target: 'get',
    },
    ticks: ['No sign-up', 'No card', 'Works in Claude Code or Codex'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get it',
      text: 'The GitHub page and the install commands.',
    },
    {
      target: 'use',
      label: 'Use it now',
      text: 'One prompt installs it and checks it works.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  get: {
    heading: 'The GuardDog scanner',
    intro:
      "Free, from Joe Che's AI class. A package security scanner for Claude Code. Install it once, then run it before you install anything you do not know. It needs Node.js and npm.",
    note: {
      lead: 'On your phone?',
      link: { label: 'Read what it checks first.', target: 'guide' },
      rest: 'GuardDog installs with terminal commands, so you need a computer to set it up.',
    },
    primary: {
      label: 'Open GuardDog on GitHub',
      meta: 'github.com/josephtandle/guardog',
      href: GITHUB_URL,
    },
    command: {
      label: 'Or install it by hand in the terminal',
      text: 'npm install -g github:josephtandle/guardog\nguardog setup',
    },
  },
  promise: {
    heading: 'It scans. You decide what to install.',
    doesNot: [
      'Need a credit card',
      'Need a VirusTotal key to work (CVE lookups, reputation checks and pattern analysis run without one)',
    ],
    does: [
      'Scan an npm or PyPI package before you install it',
      'Give one of three verdicts: SILENT, WHINE or BARK',
      'Install the guardog command globally with npm',
      'Add your free VirusTotal key to ~/.zshrc (macOS) or ~/.bashrc (Linux), if you do that optional step',
    ],
  },
  guide: {
    eyebrow: 'How it works',
    heading: 'Free antivirus for your packages.',
    intro:
      'Supply chain attacks through npm and PyPI have hit companies you have heard of. The packages look real. The names are close. The installs are silent. GuardDog costs nothing.',
    sections: [
      {
        title: 'Install once. Scan anything.',
        steps: [
          'Copy the setup prompt from the Use it now box below.',
          'Paste it into Claude Code or Codex. It installs GuardDog, walks you through getting a free VirusTotal key (500 scans per day, no credit card), and confirms everything is working.',
          'Scan before you install. In Claude Code: /guardog express npm. In the terminal: guardog analyze express npm.',
        ],
      },
      {
        title: 'It reads the real files',
        text: 'When you run GuardDog, it reads the actual package code sitting on your disk. It checks for credential harvesters, obfuscated scripts, crypto miners, reverse shells and more. In all it looks for 30+ malicious code patterns. No sample or summary. The real files.',
      },
      {
        title: 'It checks live threat lists every time',
        text: 'A package that was clean last month may have a critical CVE found today. GuardDog queries live vulnerability databases every time you run it, so you check against the latest known threats. Not a snapshot. Live data.',
      },
      {
        title: 'Three verdicts. No ambiguity.',
        table: {
          head: ['Verdict', 'Score', 'What it means'],
          rows: [
            ['SILENT', 'Under 50', 'The package passed all checks. Safe to install.'],
            ['WHINE', '50-99', 'Suspicious signals found. Review before installing.'],
            ['BARK', '100+', 'Dangerous. Do not install.'],
          ],
        },
      },
      {
        title: 'Check: CVE database (no key needed)',
        bullets: [
          'Google OSV: queries the Open Source Vulnerabilities database maintained by Google. Covers npm, PyPI and hundreds of other ecosystems. Returns known CVEs with severity ratings.',
          'Severity scoring: each CVE is scored as critical (+25), high (+15), medium (+5) or low (+2). The scores stack into a total threat score that drives the final verdict.',
          'No API key required: OSV is a free, open API. CVE lookups work out of the box on every scan, no account needed.',
        ],
      },
      {
        title: 'Check: package reputation',
        bullets: [
          'npm registry: checks download counts, package age, maintainer count and metadata signals. A package with 12 downloads published 3 days ago scores very differently than lodash.',
          'PyPI registry: the same reputation signals for Python packages. Age, downloads, maintainer history, and whether the project links to a real repository.',
          'GitHub signals: checks whether the package links to a real GitHub repo. A missing repo, zero stars and brand-new accounts all add to the threat score.',
        ],
      },
      {
        title: 'Check: code patterns (30+)',
        bullets: [
          'Credential harvesting: patterns that read environment variables, AWS keys, SSH files or browser credential stores and write them to network calls.',
          'Obfuscation: flags eval(), Function(), fromCharCode() and base64-encoded execution chains. Legitimate packages have no reason to hide what they do.',
          'Crypto miners: mining library imports, CPU-pegging loops and wallet address patterns embedded in install scripts.',
          'Reverse shells: patterns that open outbound sockets, spawn shell processes and set up persistence on the host system.',
          'Supply chain hooks: scans postinstall, preinstall and prepare scripts for suspicious network calls and file system writes outside the package directory.',
          'Typosquat signals: compares the package name against a list of popular packages. A name one character away from "express" or "react" is an immediate flag.',
        ],
      },
      {
        title: 'Check: VirusTotal (optional, free)',
        text: 'GuardDog already scans package code, checks live vulnerability databases and runs 30+ pattern checks on its own. VirusTotal adds a second layer: it submits the package URL or file hash to 70+ antivirus engines at once. That takes about 5 seconds. It is recommended but not required. The setup prompt opens virustotal.com, walks you through a free account, puts your API key in your shell profile and confirms it works. You can skip that step. GuardDog works without it.',
        bullets: [
          '500 requests per day on the free tier',
          '4 requests per minute',
          'No credit card required',
        ],
        links: [{ label: 'Open virustotal.com', href: 'https://www.virustotal.com' }],
      },
      {
        title: 'Other ways to run it',
        bullets: [
          'In Claude Code: type /guardog followed by any package name. GuardDog runs the scan and Claude explains the result in plain English.',
          'In the terminal: guardog analyze <package-name> <npm or pypi>',
          'Straight from the folder, without Claude Code: node ~/guardog/src/index.js analyze lodash npm',
        ],
        links: [{ label: 'Manual install on GitHub', href: GITHUB_URL }],
      },
    ],
  },
  use: {
    heading: 'Set it up with one prompt',
    intro:
      'Tap Copy, open Claude Code or Codex, paste it and send. It installs GuardDog, gets your free VirusTotal key and shows you a first scan. It needs Node.js and npm.',
    cards: [
      {
        label: 'install GuardDog in one prompt',
        title: 'Set up GuardDog',
        text: 'It installs the guardog command, helps you get a free VirusTotal key, then scans lodash so you see what a verdict looks like.',
        prompt: GUARDOG_SETUP_PROMPT,
      },
    ],
    openLinks: [],
  },
  stuck: [
    {
      q: 'I am on my phone',
      a: 'GuardDog installs with commands in the terminal, so set it up on a computer. You can read what it checks on this page from your phone.',
    },
    {
      q: 'It says npm: command not found',
      a: 'GuardDog needs Node.js and npm. Install them first, then paste the setup prompt again.',
    },
    {
      q: 'I do not use Claude Code',
      a: 'The setup prompt works in Claude Code or Codex. You can also install by hand with the two commands in the Get it box, or follow the manual install on GitHub. After that, scan from the terminal with guardog analyze followed by the package name and npm or pypi.',
    },
    {
      q: 'I do not want a VirusTotal account',
      a: 'You can skip that step. CVE lookups, reputation checks and pattern analysis all run without a key. VirusTotal adds a deeper malware layer on top.',
    },
    {
      q: 'The result says WHINE or BARK',
      a: 'WHINE means suspicious signals were found: review the package before you install it. BARK means dangerous: do not install it. SILENT means it passed all checks and is safe to install.',
    },
    {
      q: 'My VirusTotal key does not seem to load',
      a: 'Setup puts the key in ~/.zshrc on a Mac or ~/.bashrc on Linux and reloads it. Check it with: echo $VIRUSTOTAL_API_KEY. If it prints nothing, tell your AI the key did not load and ask it to redo step 2 of the setup prompt. The free key allows 4 requests a minute and 500 a day.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    'You came for GuardDog. It checks what goes into your project. The next step is learning to build whole projects with Claude Code, with safe habits like this from day one.',
  emailHeading: 'Want more free tools like this in your inbox?',
}
