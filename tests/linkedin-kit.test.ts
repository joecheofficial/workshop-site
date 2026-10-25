import assert from 'node:assert/strict'
import test from 'node:test'
import { execFileSync } from 'node:child_process'
import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { offerForLevel } from '../src/lib/giveaway-offers'
import { validatePackContent } from '../src/lib/pack-page'
import { websiteGiveawayEmail } from '../src/lib/generic-giveaway-email'
import { getGiveaway } from '../src/lib/giveaways'
import { LINKEDIN_KIT_CONTENT, ZIP_PATH } from '../src/app/giveaways/linkedin-kit/pack'
import { LINKEDIN_KIT_PROMPT } from '../src/app/giveaways/linkedin-kit/prompt'

// Joe's LinkedIn Kit giveaway (IG keyword KIT, Thu 29 Oct 2026).
// The prompt on the page and the prompt inside the zip are one prompt.

const ROOT = join(__dirname, '..')

test("LinkedIn Kit is a valid beginner pack page with the beginner offer", () => {
  assert.deepEqual(validatePackContent(LINKEDIN_KIT_CONTENT), [])
  assert.equal(LINKEDIN_KIT_CONTENT.level, 'beginner')
  assert.ok(offerForLevel('beginner', 'linkedin-kit'))
  const page = readFileSync(join(ROOT, 'src', 'app', 'giveaways', 'linkedin-kit', 'page.tsx'), 'utf8')
  assert.match(page, /<PackPage\b[\s\S]{0,200}?slug="linkedin-kit"/)
})

test('the zip the page links ships in public/ and carries the five skills', () => {
  assert.ok(statSync(join(ROOT, 'public', ZIP_PATH)).size > 10000, `${ZIP_PATH} must ship in public/`)
  const list = execFileSync('unzip', ['-Z1', join(ROOT, 'public', ZIP_PATH)], { encoding: 'utf8' })
  for (const s of ['sound-like-me', 'linkedin-post', 'linkedin-profile', 'linkedin-replies', 'linkedin-week']) {
    assert.match(list, new RegExp(`claude-app/${s}\\.zip`), `${s} app zip missing`)
    assert.match(list, new RegExp(`skills/${s}/SKILL\\.md`), `${s} SKILL.md missing`)
  }
})

test('the copy card and the prompt in the zip are the same prompt', () => {
  const md = execFileSync('unzip', ['-p', join(ROOT, 'public', ZIP_PATH), 'joes-linkedin-kit-v1.0/START-HERE-PROMPT.md'], { encoding: 'utf8' })
  const block = md.match(/```\n([\s\S]*?)\n```/)
  assert.ok(block, 'START-HERE-PROMPT.md has no prompt block')
  assert.equal(block[1], LINKEDIN_KIT_PROMPT, 'prompt.ts drifted from START-HERE-PROMPT.md in the zip')
  assert.equal(LINKEDIN_KIT_CONTENT.use?.cards[0].prompt, LINKEDIN_KIT_PROMPT)
})

test('the page never over-promises', () => {
  // the Stuck? answers may name these things to say no; every other block must not claim them
  const { stuck: _stuck, promise, ...rest } = LINKEDIN_KIT_CONTENT
  const claims = JSON.stringify({ ...rest, does: promise?.does })
  assert.doesNotMatch(claims, /undetectable|beats? (the )?AI detect|runs your LinkedIn|posts for you(?![a-z])/i)
  assert.match(JSON.stringify(promise?.doesNot), /Log in to LinkedIn/)
  assert.doesNotMatch(JSON.stringify(LINKEDIN_KIT_CONTENT), /—/)
})

test('the giveaway is listed and the generic email knows it', () => {
  assert.ok(getGiveaway('linkedin-kit'))
  assert.equal(websiteGiveawayEmail('linkedin-kit')?.name, "Joe's LinkedIn Kit")
})
