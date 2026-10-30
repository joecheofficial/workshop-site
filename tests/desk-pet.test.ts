import assert from 'node:assert/strict'
import test from 'node:test'
import { execFileSync } from 'node:child_process'
import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { offerForLevel } from '../src/lib/giveaway-offers'
import { validatePackContent } from '../src/lib/pack-page'
import { websiteGiveawayEmail } from '../src/lib/generic-giveaway-email'
import { DESK_PET_CONTENT, ZIP_PATH, PROMPT_PATH, EXAMPLE_PATH, ONE_LINE_COMMAND } from '../src/app/giveaways/desk-pet/pack'
import { DESK_PET_PROMPT } from '../src/app/giveaways/desk-pet/prompt'

// Desk Pet giveaway (IG keyword PET, Illy 2026-10-30).
// The prompt on the page, the one-line command's text file and the prompt inside the zip are one prompt.

const ROOT = join(__dirname, '..')

test('Desk Pet is a valid builder pack page with the builder offer', () => {
  assert.deepEqual(validatePackContent(DESK_PET_CONTENT), [])
  assert.equal(DESK_PET_CONTENT.level, 'builder')
  assert.equal(offerForLevel('builder', 'desk-pet')?.id, 'get-found-kit')
  const page = readFileSync(join(ROOT, 'src', 'app', 'giveaways', 'desk-pet', 'page.tsx'), 'utf8')
  assert.match(page, /<PackPage\b[\s\S]{0,200}?slug="desk-pet"/)
})

test('every Desk Pet file the page links ships in public/', () => {
  for (const p of [ZIP_PATH, PROMPT_PATH, EXAMPLE_PATH]) assert.ok(statSync(join(ROOT, 'public', p)).size > 1000, `${p} must ship in public/`)
})

test('the copy card, the one-line command file and the zip carry the same prompt', () => {
  const txt = readFileSync(join(ROOT, 'public', PROMPT_PATH), 'utf8')
  assert.equal(txt, DESK_PET_PROMPT + '\n', 'public/desk-pet-prompt.txt drifted from prompt.ts')
  const md = execFileSync('unzip', ['-p', join(ROOT, 'public', ZIP_PATH), 'DeskPet/START-HERE-PROMPT.md'], { encoding: 'utf8' })
  const blocks = [...md.matchAll(/```(\w*)\n([\s\S]*?)\n```/g)]
  const block = blocks.find((m) => m[2].startsWith('Build me my own Desk Pet'))
  assert.ok(block, 'START-HERE-PROMPT.md has no prompt block')
  assert.equal(block[2], DESK_PET_PROMPT, 'prompt.ts drifted from START-HERE-PROMPT.md in the zip')
  assert.match(md, /Type \*\*set it up\*\*/, 'Way 1 in the zip is drag the folder + "set it up"')
  const claudeMd = execFileSync('unzip', ['-p', join(ROOT, 'public', ZIP_PATH), 'DeskPet/CLAUDE.md'], { encoding: 'utf8' })
  assert.match(claudeMd, /START-HERE-PROMPT\.md/, 'CLAUDE.md in the zip points Claude at the setup prompt')
  const prompts = DESK_PET_CONTENT.use?.cards.map((c) => c.prompt) || []
  assert.deepEqual(prompts, [DESK_PET_PROMPT], 'only the Terminal prompt is a copy card; Way 1 is drag + "set it up"')
  assert.match(DESK_PET_PROMPT, /https:\/\/workshop\.mastermindshq\.business\/desk-pet\.zip/)
  assert.ok(ONE_LINE_COMMAND.includes(`https://workshop.mastermindshq.business${PROMPT_PATH}`))
})

test('the giveaway zip has no Joe preset and no Joe cartoon', () => {
  const list = execFileSync('unzip', ['-Z1', join(ROOT, 'public', ZIP_PATH)], { encoding: 'utf8' })
  assert.doesNotMatch(list, /presets|joe/i)
  const avatar = execFileSync('unzip', ['-p', join(ROOT, 'public', ZIP_PATH), 'DeskPet/shared/avatar.js'], { encoding: 'utf8' })
  assert.doesNotMatch(avatar, /Joe/)
})

test('a website email ask on the page gets the generic Desk Pet letter', () => {
  assert.deepEqual(websiteGiveawayEmail('desk-pet'), { name: 'Desk Pet', link: 'https://workshop.mastermindshq.business/giveaways/desk-pet' })
})

test('the page says it only works in Claude Code and offers both ways', () => {
  const words = JSON.stringify(DESK_PET_CONTENT)
  assert.match(words, /only works in Claude Code/i)
  assert.match(words, /Way 1/)
  assert.match(words, /Way 2/)
  assert.match(words, /claude\.ai\/install\.sh/)
  assert.match(words, /set it up/)
  assert.doesNotMatch(words, /Copy the Way 1 message/)
})

test('Desk Pet words contain no em dashes', () => {
  assert.doesNotMatch(JSON.stringify(DESK_PET_CONTENT), /—/)
})
