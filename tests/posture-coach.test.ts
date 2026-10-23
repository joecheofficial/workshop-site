import assert from 'node:assert/strict'
import test from 'node:test'
import { execFileSync } from 'node:child_process'
import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { offerForLevel } from '../src/lib/giveaway-offers'
import { validatePackContent } from '../src/lib/pack-page'
import { websiteGiveawayEmail } from '../src/lib/generic-giveaway-email'
import { POSTURE_COACH_CONTENT, ZIP_PATH, PROMPT_PATH, EXAMPLE_PATH, ONE_LINE_COMMAND } from '../src/app/giveaways/posture-coach/pack'
import { POSTURE_COACH_PROMPT, POSTURE_COACH_EASY_PROMPT } from '../src/app/giveaways/posture-coach/prompt'

// Posture Coach giveaway (IG keyword POSTURE, Illy 2026-10-23).
// The prompt on the page, the one-line command's text file and the prompt inside the zip are one prompt.

const ROOT = join(__dirname, '..')

test('Posture Coach is a valid builder pack page with the builder offer', () => {
  assert.deepEqual(validatePackContent(POSTURE_COACH_CONTENT), [])
  assert.equal(POSTURE_COACH_CONTENT.level, 'builder')
  assert.equal(offerForLevel('builder', 'posture-coach')?.id, 'get-found-kit')
  const page = readFileSync(join(ROOT, 'src', 'app', 'giveaways', 'posture-coach', 'page.tsx'), 'utf8')
  assert.match(page, /<PackPage\b[\s\S]{0,200}?slug="posture-coach"/)
})

test('every Posture Coach file the page links ships in public/', () => {
  for (const p of [ZIP_PATH, PROMPT_PATH, EXAMPLE_PATH]) assert.ok(statSync(join(ROOT, 'public', p)).size > 1000, `${p} must ship in public/`)
})

test('the copy card, the one-line command file and the zip carry the same prompt', () => {
  const txt = readFileSync(join(ROOT, 'public', PROMPT_PATH), 'utf8')
  assert.equal(txt, POSTURE_COACH_PROMPT + '\n', 'public/posture-coach-prompt.txt drifted from prompt.ts')
  const md = execFileSync('unzip', ['-p', join(ROOT, 'public', ZIP_PATH), 'PostureCoach/START-HERE-PROMPT.md'], { encoding: 'utf8' })
  const blocks = [...md.matchAll(/```(\w*)\n([\s\S]*?)\n```/g)]
  const block = blocks.find((m) => m[2].startsWith('Build me my own Posture Coach'))
  assert.ok(block, 'START-HERE-PROMPT.md has no prompt block')
  assert.equal(block[2], POSTURE_COACH_PROMPT, 'prompt.ts drifted from START-HERE-PROMPT.md in the zip')
  const easy = blocks.find((m) => m[1] === 'text')
  assert.ok(easy, 'START-HERE-PROMPT.md has no Way 1 message block')
  assert.equal(easy[2], POSTURE_COACH_EASY_PROMPT, 'Way 1 message drifted from START-HERE-PROMPT.md in the zip')
  assert.match(POSTURE_COACH_EASY_PROMPT, /START-HERE-PROMPT\.md/)
  const prompts = POSTURE_COACH_CONTENT.use?.cards.map((c) => c.prompt) || []
  assert.deepEqual(prompts, [POSTURE_COACH_EASY_PROMPT, POSTURE_COACH_PROMPT], 'the page shows Way 1 then Way 2')
  assert.match(POSTURE_COACH_PROMPT, /https:\/\/workshop\.mastermindshq\.business\/posture-coach\.zip/)
  assert.ok(ONE_LINE_COMMAND.includes(`https://workshop.mastermindshq.business${PROMPT_PATH}`))
})

test('the giveaway zip has no Joe preset and no Joe cartoon', () => {
  const list = execFileSync('unzip', ['-Z1', join(ROOT, 'public', ZIP_PATH)], { encoding: 'utf8' })
  assert.doesNotMatch(list, /presets|joe/i)
  const avatar = execFileSync('unzip', ['-p', join(ROOT, 'public', ZIP_PATH), 'PostureCoach/shared/avatar.js'], { encoding: 'utf8' })
  assert.doesNotMatch(avatar, /Joe/)
})

test('a website email ask on the page gets the generic Posture Coach letter', () => {
  assert.deepEqual(websiteGiveawayEmail('posture-coach'), { name: 'Posture Coach', link: 'https://workshop.mastermindshq.business/giveaways/posture-coach' })
})

test('the page says it only works in Claude Code and offers both ways', () => {
  const words = JSON.stringify(POSTURE_COACH_CONTENT)
  assert.match(words, /only in Claude Code/i)
  assert.match(words, /Way 1/)
  assert.match(words, /Way 2/)
  assert.match(words, /claude\.ai\/install\.sh/)
})

test('Posture Coach words contain no em dashes', () => {
  assert.doesNotMatch(JSON.stringify(POSTURE_COACH_CONTENT), /—/)
})
