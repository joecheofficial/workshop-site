import type { PackPageContent } from '@/lib/pack-page'
import { GUARDOG_REPO, GUARDOG_SETUP_PROMPT, GUARDOG_VERSION } from './prompts'

// Words for the GuardDog pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx.
// 9 Nov 2026: rewritten for MyOS Guard Dog 5.2.1 (new repo + myos-guard-dog
// command). Every claim checked against the tool's README/QUICKSTART and a
// clean test install. The tool does NOT do name-similarity (typosquat)
// detection, is NOT antivirus, and SILENT never means "safe".

export const GITHUB_URL = GUARDOG_REPO

export const GUARDOG_PACK: PackPageContent = {
  slug: 'guardog',
  level: 'builder',
  hero: {
    title: 'Here is GuardDog.',
    free: 'It is free.',
    lede: 'A free scanner that checks an npm or PyPI code package for warning signs and known security holes before you install it.',
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
      "Free, from Joe Che's AI class. A package security scanner you run from the terminal or from Claude Code. Install it once, then check anything you do not know before you install it. It needs Node.js 22 or 24.",
    note: {
      lead: 'On your phone?',
      link: { label: 'Read what it checks first.', target: 'guide' },
      rest: 'GuardDog installs with terminal commands, so you need a computer to set it up.',
    },
    primary: {
      label: 'Open GuardDog on GitHub',
      meta: 'github.com/joecheofficial/myos-guard-dog',
      href: GITHUB_URL,
    },
    command: {
      label: 'Or install it by hand in the terminal',
      text: `npm install -g --ignore-scripts github:joecheofficial/myos-guard-dog#v${GUARDOG_VERSION}\nmyos-guard-dog setup --quick`,
    },
  },
  promise: {
    heading: 'It checks. You decide what to install.',
    doesNot: [
      'Need a credit card',
      'Run the package code while it checks it',
      'Promise a package is safe (no scanner can)',
    ],
    does: [
      'Check an npm or PyPI package before you install it',
      'Give one verdict: SILENT, WHINE or BARK',
      'Tell you when a check could not run, instead of calling it clean',
      'Keep your free VirusTotal key on your own computer, if you add one',
    ],
  },
  guide: {
    eyebrow: 'How it works',
    heading: 'Check it before you install it.',
    intro:
      'Every time Claude or Codex builds something for you, it installs code packages written by strangers. Sonatype has logged 1,960,846 malicious packages since 2017. Most look completely normal. GuardDog checks a package before it lands on your computer, and it costs nothing.',
    sections: [
      {
        title: 'Install once. Check anything.',
        steps: [
          'Copy the setup prompt from the Use it now box below.',
          'Paste it into Claude Code or Codex. It installs GuardDog, helps you add a free VirusTotal key (no card), and runs a first check so you see what a result looks like.',
          'Check before you install: myos-guard-dog analyze express npm. Or let it check and install in one go: myos-guard-dog install express.',
        ],
      },
      {
        title: 'It checks the latest known security holes every time',
        text: 'A package that was clean last month may have a serious hole found today. GuardDog asks Google\'s open vulnerability database (OSV) every time you run it, so you check against today\'s list, not an old copy. No account needed.',
      },
      {
        title: 'It can read the real code',
        text: 'For npm packages, the artifact and install checks open the exact package files without running them. They look for code that grabs your passwords or keys and sends them out, and for hidden code that unscrambles itself and runs. Anything it cannot read is marked incomplete, never clean.',
      },
      {
        title: 'One verdict. Read it with the coverage.',
        table: {
          head: ['Verdict', 'What it means'],
          rows: [
            ['SILENT', 'The checks that ran found no warning signs.'],
            ['WHINE', 'Something looks off. Look closer before you install.'],
            ['BARK', 'Serious warning signs. Do not install it.'],
            ['INCOMPLETE', 'Some checks could not run. This is not a clean result.'],
          ],
        },
      },
      {
        title: 'Check: known security holes (no key needed)',
        bullets: [
          'Google OSV: the free, open vulnerability database. Covers npm, PyPI and many more. Returns known holes with how serious they are.',
          'Serious holes push the score up. Enough of them turns the verdict to WHINE or BARK.',
          'No API key needed: this check works out of the box on every scan.',
        ],
      },
      {
        title: 'Check: package reputation',
        bullets: [
          'npm and PyPI registry: how old the package is, how many people download it and who maintains it. A package with 12 downloads published 3 days ago scores very differently than lodash.',
          'GitHub: whether the package links to a real code page, and what that page looks like.',
        ],
      },
      {
        title: 'Check: inside the package (npm)',
        bullets: [
          'Password and key grabbing: code that reads SSH keys, cloud logins or saved npm tokens in the same file that sends data out.',
          'Secret grabbing: code that reads tokens or passwords from your settings and sends data out.',
          'Hidden code: scrambled code that unscrambles itself and runs.',
          'Blind spots: files it cannot read as text (apps, scripts in other languages) are listed as incomplete.',
        ],
      },
      {
        title: 'Check: VirusTotal (optional, free)',
        text: 'VirusTotal adds a malware check from many antivirus engines. GuardDog looks up the fingerprint of the exact package file, so none of your private files are uploaded. You add the key on your own computer during setup, never in a chat. Without a key the other checks still run, but GuardDog marks the malware check as incomplete, and the check-and-install command stays blocked until you add one.',
        bullets: ['Free account at virustotal.com', 'No credit card'],
        links: [{ label: 'Open virustotal.com', href: 'https://www.virustotal.com' }],
      },
      {
        title: 'Ways to run it',
        bullets: [
          'Ask Claude Code or Codex: "check the package express with GuardDog before you install it". It runs the check and explains the result in plain English.',
          'Check one package: myos-guard-dog analyze <package> npm (or pypi)',
          'Check and install an npm package in one step: myos-guard-dog install <package>',
          'Check a whole project you already have: myos-guard-dog scan "<your project folder>"',
        ],
        links: [{ label: 'Full instructions on GitHub', href: GITHUB_URL }],
      },
    ],
  },
  use: {
    heading: 'Set it up with one prompt',
    intro:
      'Tap Copy, open Claude Code or Codex, paste it and send. It installs GuardDog, helps you add your free VirusTotal key and shows you a first check. It needs Node.js 22 or 24.',
    cards: [
      {
        label: 'install GuardDog in one prompt',
        title: 'Set up GuardDog',
        text: 'It installs the myos-guard-dog command, helps you add a free VirusTotal key, then checks lodash so you see what a result looks like.',
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
      a: 'GuardDog needs Node.js (version 22 or 24), which comes with npm. Install Node.js from nodejs.org first, then paste the setup prompt again.',
    },
    {
      q: 'It says my Node version is not supported',
      a: 'GuardDog only runs on Node 22 or Node 24. Ask your AI: "switch me to Node 24 and keep my other settings", then paste the setup prompt again.',
    },
    {
      q: 'I do not use Claude Code',
      a: 'The setup prompt works in Claude Code or Codex. You can also install by hand with the two commands in the Get it box. After that, check from the terminal with myos-guard-dog analyze followed by the package name and npm or pypi.',
    },
    {
      q: 'I do not want a VirusTotal account',
      a: 'You can skip it. The security hole check and the reputation check still run. GuardDog will say the malware check is incomplete, and the check-and-install command stays blocked until you add a key.',
    },
    {
      q: 'The result says WHINE, BARK or INCOMPLETE',
      a: 'WHINE means something looks off: look closer before you install. BARK means serious warning signs: do not install it. INCOMPLETE means a check could not run, often a missing VirusTotal key: run myos-guard-dog doctor --repair and myos-guard-dog test to see what is missing.',
    },
    {
      q: 'My AI installed a different "guarddog"',
      a: 'There are other tools with similar names. Ours is MyOS Guard Dog from github.com/joecheofficial/myos-guard-dog and its command is myos-guard-dog. Ask your AI to remove the other one and paste the setup prompt again.',
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
