import type { PackPageContent } from '@/lib/pack-page'
import { GAME_CODE } from './game'

// Words for the Geometry Dash fun build pack page (moved onto PackPage 15 Oct 2026).
// Layout, the email ask and the end offer live in src/components/giveaways/PackPage.tsx.
// Every fact comes from the old page and the game code itself (19 obstacles, the
// setting names and defaults at the top of GAME_CODE).

export const P5_EDITOR_URL = 'https://editor.p5js.org'

export const AI_FEATURES_PROMPT = `I built a Geometry Dash clone in p5.js. Here is the full code:

[paste your code here]

Please add these features:
1. Stars in the background that scroll at half speed
   (parallax effect)
2. The cube changes color gradually as the level
   progresses (use lerpColor)
3. A screen shake effect when the player dies
4. A coin floating at x=1800, collect it for +1 score
Keep all existing physics and level design the same.`

export const GEOMETRY_DASH_PACK: PackPageContent = {
  slug: 'geometry-dash-fun-build',
  level: 'beginner',
  hero: {
    title: 'Here is your Geometry Dash game.',
    free: 'It is free.',
    lede: 'A working Geometry Dash clone, built in p5.js. Spinning cube, spikes, platforms, particle explosions, neon glow and a progress bar. Paste the code into the free p5.js editor and you are playing in about 2 minutes. Then you change the colors, the physics and the level.',
    button: {
      label: 'Take me to the game code',
      meta: 'free · on this page',
      target: 'get',
    },
    ticks: ['No sign-up', 'Nothing to install', 'Runs in your browser'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get the game',
      text: 'Copy the code, paste it, press Play.',
    },
    {
      target: 'guide',
      label: 'Make it yours',
      text: 'Colors, physics, your own spikes, then new features with AI.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  get: {
    heading: 'The game code',
    intro:
      'One file of about 290 lines of p5.js. Physics, level design, particles and glow are all in it, and every setting you will want to change is labeled at the top. Copy it, open the free p5.js editor, select the starter code on the left and delete it, paste, then click Play (the triangle at the top).',
    note: {
      lead: 'Best on a computer.',
      link: { label: 'Make it yours below.', target: 'guide' },
      rest: 'Jump with the space bar, the up arrow, a click or a tap. No install and no account needed to play.',
    },
    primary: {
      label: 'Open the p5.js editor',
      meta: 'editor.p5js.org · free',
      href: P5_EDITOR_URL,
    },
    command: { label: 'sketch.js · paste into editor.p5js.org', text: GAME_CODE },
  },
  promise: {
    heading: 'It is a real game. It is all yours.',
    doesNot: [
      'Need an install, an account or any other tool',
      'Hide anything: every line of the game is on this page',
      'Break for good: paste the code again and you are back to the start',
    ],
    does: [
      'Run in any modern browser',
      'Come with 19 obstacles in the first level',
      'Count your attempts and show a progress bar',
      'Let you change every color, the physics and the level',
    ],
  },
  guide: {
    eyebrow: 'Vibe code guide',
    heading: 'Change one thing, press Play, see what it does',
    intro:
      'That is the best way to learn. These five steps take you from copy and paste to your own level. Hit Stop, then Play, after every change.',
    sections: [
      {
        title: 'Step 1: Open the editor and paste the code',
        steps: [
          'Go to editor.p5js.org.',
          'Select all the starter code in the left panel and delete it.',
          'Paste the game code you copied.',
          'Click the Play button, the triangle at the top. The cube starts running.',
        ],
        text: 'Controls: space bar, up arrow, a click or a tap to jump. Hold it to keep jumping when you land.',
      },
      {
        title: 'Step 2: Change your cube color',
        text: 'Near the top of the code, find the CUBE_COLOR line and replace the color code. The cube glows whatever color you pick. Change SPIKE_COLOR and BG_START the same way.',
        bullets: [
          "const CUBE_COLOR = '#00FFFF'; for a cyan cube",
          "const CUBE_COLOR = '#FF00FF'; for a magenta cube",
          "const CUBE_COLOR = '#FF4444'; for a red cube",
          "const CUBE_COLOR = '#00FF88'; for a neon green cube",
        ],
      },
      {
        title: 'Step 3: Change how the game feels',
        text: 'Try these one at a time. That is how you learn what each setting does.',
        table: {
          head: ['Try this', 'Change these lines'],
          rows: [
            ['Moon physics: floaty and slow', 'GRAVITY = 0.4 and JUMP_FORCE = -10'],
            ['Tank mode: heavy, fast fall', 'GRAVITY = 1.3 and JUMP_FORCE = -15'],
            ['Speed run: same physics, faster', 'PLAYER_SPEED = 9'],
            ['Super jump: almost off the screen', 'JUMP_FORCE = -20'],
          ],
        },
      },
      {
        title: 'Step 4: Add your own obstacles',
        text: 'Find LEVEL_DEFS near the top and add new lines in these formats. The x number is how far from the start, so a higher x comes later in the level.',
        bullets: [
          "{ type: 'spike', x: 400 }, a single spike, the easiest to jump",
          "{ type: 'double', x: 500 }, two spikes side by side, harder",
          "{ type: 'platform', x: 700, yOff: -110, w: 130 }, a floating platform you can land on. yOff is the height, w is the width",
          "{ type: 'spike', x: 600, size: 80 }, a big spike. size sets how big",
        ],
      },
      {
        title: 'Step 5: Take it further with AI',
        text: 'Once the basics work, copy this prompt into ChatGPT, Claude, Claude Code or Codex. Replace [paste your code here] with your code. You get back a new version with the features added.',
        prompt: { label: 'Add features with AI', text: AI_FEATURES_PROMPT },
      },
      {
        title: 'What is inside the code: physics and feel',
        table: {
          head: ['Setting', 'What it does'],
          rows: [
            ['GRAVITY', 'How fast the cube falls. Default 0.70. Try 0.5 for floaty moon physics, 1.2 for heavy tank mode.'],
            ['JUMP_FORCE', 'How high the cube jumps. Default -13.5. More negative jumps higher. Try -18.'],
            ['PLAYER_SPEED', 'How fast the level scrolls at the start. Default 6.5. Try 9 for a speed run, 4 to learn the level.'],
            ['MAX_FALL', 'The fastest the cube can fall. Raise it for snappier falls, lower it for a floatier feel.'],
          ],
        },
      },
      {
        title: 'What is inside the code: colors and style',
        table: {
          head: ['Setting', 'What it does'],
          rows: [
            ['CUBE_COLOR', "Your cube. Default '#FFD700', gold."],
            ['SPIKE_COLOR', "The spikes. Default '#FF3300', orange red. Try '#00FF88' for alien spikes or '#FFFFFF' for ice."],
            ['PLAT_COLOR', "The platforms. Default '#2244DD', blue. Platforms glow whatever color you set."],
            ['BG_START', "The sky at the start of the level. Default '#0d0020', deep purple."],
            ['BG_END', "The sky at the end. Default '#001830', dark blue. The sky shifts from BG_START to BG_END as you play."],
          ],
        },
      },
    ],
  },
  stuck: [
    {
      q: 'I have never written code',
      a: 'You do not need to. This build started as a demo for Parker, a 12-year-old learning to code. If a kid can paste it, change the colors and add his own spikes in 20 minutes, so can you. The hardest part is the first copy and paste.',
    },
    {
      q: 'I pressed Play and nothing happens',
      a: 'Make sure you deleted all the starter code before you pasted, so only the game is in the left panel. Then click Play again. Click once on the game area so it hears the space bar.',
    },
    {
      q: 'I changed something and now it is broken',
      a: 'Check you only changed the number or the color code, and kept the quote marks and the semicolon. If you are lost, copy the code from this page again and start over.',
    },
    {
      q: 'My new spike does not show up',
      a: 'Each line inside LEVEL_DEFS needs a comma at the end, and the x number must be less than 4400, the length of the level.',
    },
    {
      q: 'I want to save my version',
      a: 'Make a free p5.js account and use File, then Save. Without an account the game still runs, it just is not saved.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    'You just pasted code and made a game your own, without being a coder. Building your own website works the same way: you describe it, AI writes it, you change what you want.',
  emailHeading: 'Want the vibe code guide by email too?',
}
