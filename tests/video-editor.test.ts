import assert from 'node:assert/strict'
import test from 'node:test'
import { execFileSync } from 'node:child_process'
import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { offerForLevel } from '../src/lib/giveaway-offers'
import { validatePackContent } from '../src/lib/pack-page'
import { websiteGiveawayEmail } from '../src/lib/generic-giveaway-email'
import { VIDEO_EDITOR_CONTENT, ZIP_PATH, EXAMPLE_PATH, TERMINAL_LINE } from '../src/app/giveaways/video-editor/pack'

// Video Editor giveaway (IG keyword EDIT, 2 Nov 2026). The zip must be the drag-in kit with the sync fixes.

const ROOT = join(__dirname, '..')

test('Video Editor is a valid builder pack page with the builder offer', () => {
  assert.deepEqual(validatePackContent(VIDEO_EDITOR_CONTENT), [])
  assert.equal(VIDEO_EDITOR_CONTENT.level, 'builder')
  assert.equal(offerForLevel('builder', 'video-editor')?.id, 'get-found-kit')
  const page = readFileSync(join(ROOT, 'src', 'app', 'giveaways', 'video-editor', 'page.tsx'), 'utf8')
  assert.match(page, /<PackPage\b[\s\S]{0,200}?slug="video-editor"/)
})

test('the zip and the example video ship in public/', () => {
  for (const p of [ZIP_PATH, EXAMPLE_PATH]) assert.ok(statSync(join(ROOT, 'public', p)).size > 100000, `${p} must ship in public/`)
})

test('the zip is the drag-in kit with the sync fixes, and no keys', () => {
  const zip = join(ROOT, 'public', ZIP_PATH)
  const list = execFileSync('unzip', ['-Z1', zip], { encoding: 'utf8' })
  for (const f of ['VideoEditor/CLAUDE.md', 'VideoEditor/START-HERE.md', 'VideoEditor/SKILL.md', 'VideoEditor/LICENSE',
    'VideoEditor/helpers/render.py', 'VideoEditor/tests/test_render_av_sync.py', 'VideoEditor/tests/test_render_frame_snap.py'])
    assert.ok(list.includes(f), `${f} missing from the zip`)
  assert.ok(!/(^|\/)\.env$/m.test(list), 'zip must not ship a .env')
  assert.ok(!list.includes('.venv/'), 'zip must not ship a venv')
  const render = execFileSync('unzip', ['-p', zip, 'VideoEditor/helpers/render.py'], { encoding: 'utf8' })
  assert.match(render, /pcm_s16le/, 'PR #226 sync fix must be in render.py')
  assert.match(render, /MHQ patch \(2026-11-02\): snap every range to whole output frames/)
  const claudeMd = execFileSync('unzip', ['-p', zip, 'VideoEditor/CLAUDE.md'], { encoding: 'utf8' })
  assert.match(claudeMd, /START-HERE\.md/)
  assert.match(claudeMd, /ffmpeg-full/)
  assert.match(TERMINAL_LINE, /VideoEditor && claude "set it up"/)
})

test('no em dashes in the page words, and the website email knows the page', () => {
  assert.ok(!JSON.stringify(VIDEO_EDITOR_CONTENT).includes('—'))
  assert.equal(websiteGiveawayEmail('video-editor')?.link, 'https://workshop.mastermindshq.business/giveaways/video-editor')
})
