import type { PackPageContent } from '@/lib/pack-page'

// Words for the MacCleaner pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx.

export const INSTALLER_URL = '/downloads/maccleaner-installer.sh'

export const MACCLEANER_PACK: PackPageContent = {
  slug: 'maccleaner',
  level: 'builder',
  hero: {
    title: 'Here is MacCleaner.',
    free: 'It is free.',
    lede: 'A safer way to clean up disk space on a Mac. It shows you what it would remove, and waits for your yes before it does anything.',
    button: {
      label: 'Take me to it',
      meta: 'free · on this page',
      target: 'get',
    },
    ticks: ['No sign-up', 'No card', 'Works on a Mac'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get it',
      text: 'Download the installer script.',
    },
    {
      target: 'guide',
      label: 'Use it',
      text: 'Preview first, then clean. Three steps.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  get: {
    heading: 'Get the installer',
    intro:
      'MacCleaner is free. The installer puts it in a normal local folder and adds a launcher at ~/bin/maccleaner.',
    note: {
      lead: 'Mac only.',
      rest: 'It needs macOS and Node.js. On anything else the installer stops.',
    },
    primary: {
      label: 'Download the installer',
      meta: 'maccleaner-installer.sh · 1 KB',
      href: INSTALLER_URL,
    },
    command: { label: 'Safe preview, after you install', text: 'maccleaner' },
  },
  promise: {
    heading: 'Preview first. You say when.',
    doesNot: [
      'Change anything on the first run. It is preview-only',
      'Clean anything until you explicitly confirm',
      'Delete old iPhone backups when there is no writable external drive. It skips them',
      'Install an app, run in the background, or ask for a subscription',
    ],
    does: [
      'Show what it would clean and what it will leave alone',
      'Clean up only after you tell it to',
      'Move old iPhone backups to an external drive, only if a writable one is connected',
    ],
  },
  guide: {
    eyebrow: 'How it works',
    heading: 'Three clean steps',
    sections: [
      {
        title: 'The steps',
        steps: [
          'Download the installer script. It installs MacCleaner into a normal local folder and adds a launcher at ~/bin/maccleaner.',
          'Run MacCleaner in preview mode. The default run shows what it would clean and what it will leave alone.',
          'Confirm only if the preview looks right. Cleanup runs only after you explicitly tell it to.',
        ],
      },
      {
        title: 'Real cleanup, after you read the preview',
        text: 'Run this only when the preview looks right. There is no silent destructive mode.',
        prompt: { label: 'Terminal', text: 'maccleaner --confirm-clean' },
      },
      {
        title: 'What it looks at',
        bullets: [
          'Developer clutter: build artifacts, temporary package caches, stale local outputs, and the noisy leftovers that pile up after shipping.',
          'Log and cache sprawl: old logs, obvious cache bloat, and disk junk that quietly expands until your machine feels heavier than it should.',
          'Old iPhone backups: if a writable external drive is connected, MacCleaner archives old device backups there instead of blindly deleting them.',
        ],
      },
      {
        title: 'Safety rules',
        bullets: [
          'The first run is preview-only. You see what would happen before anything changes.',
          'Real cleanup requires explicit confirmation. No silent destructive mode.',
          'If no writable external drive exists, old iPhone backups are skipped instead of being deleted.',
          'The package is just a script. No Electron app, no background junk, no subscription.',
        ],
      },
    ],
  },
  stuck: [
    {
      q: 'I do not have a Mac',
      a: 'MacCleaner only runs on macOS. The installer stops with a message on anything else.',
    },
    {
      q: 'The installer says Node.js is required',
      a: 'MacCleaner needs Node.js. Install Node.js, then run the installer again.',
    },
    {
      q: 'How do I run the installer?',
      a: 'Open Terminal and run the file you downloaded with bash, giving the path to where it saved. When it finishes it tells you how to run a preview.',
    },
    {
      q: 'It says command not found: maccleaner',
      a: 'The launcher is at ~/bin/maccleaner. Try running it by that full path. If that works, the ~/bin folder is not on your PATH yet.',
    },
    {
      q: 'I am afraid it will delete something',
      a: 'The first run only previews. It cleans nothing until you run it again with --confirm-clean.',
    },
    {
      q: 'It skipped my old iPhone backups',
      a: 'That is on purpose. It only archives them to a writable external drive. With no drive connected, it leaves them alone and only shows them in the preview. Connect a drive and run the preview again.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    'You came to clear space on your Mac without risk. The next step is building small tools like this one for your own work: a script that does one job and asks before it acts.',
  emailHeading: 'Want more practical tools in your inbox?',
}
