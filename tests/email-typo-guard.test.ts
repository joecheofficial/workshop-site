import test from 'node:test'
import assert from 'node:assert/strict'
import { emailProblem, suggestEmailFix } from '../src/lib/email-validation'

test('real sign-up typos are caught with the fix', () => {
  assert.equal(suggestEmailFix('deangod93.dg@gamil.com'), 'deangod93.dg@gmail.com')
  assert.equal(suggestEmailFix('manifestinggenie@gmail.con'), 'manifestinggenie@gmail.com')
  assert.equal(suggestEmailFix('a@gmial.com'), 'a@gmail.com')
  assert.equal(suggestEmailFix('a@gmai.com'), 'a@gmail.com')
  assert.equal(suggestEmailFix('a@gmail.co'), 'a@gmail.com')
  assert.equal(suggestEmailFix('a@gmail.cm'), 'a@gmail.com')
  assert.equal(suggestEmailFix('a@hotmial.com'), 'a@hotmail.com')
  assert.equal(suggestEmailFix('a@yaho.com'), 'a@yahoo.com')
  assert.equal(suggestEmailFix('a@outlok.com'), 'a@outlook.com')
  assert.equal(suggestEmailFix('a@iclod.com'), 'a@icloud.com')
  assert.equal(suggestEmailFix('a@company.con'), 'a@company.com')
  assert.equal(suggestEmailFix('a@yahoo.cmo'), 'a@yahoo.com')
})

test('real addresses are never blocked', () => {
  for (const ok of [
    'a@gmail.com', 'a@ymail.com', 'a@email.com', 'a@mail.com', 'a@me.com', 'a@mac.com', 'a@aol.com',
    'a@hotmail.es', 'a@hotmail.co.uk', 'a@yahoo.ca', 'a@yahoo.com.au', 'a@outlook.de', 'a@web.de',
    'a@gmx.net', 'a@live.com', 'a@msn.com', 'a@proton.me', 'a@cloud.com', 'a@mastermindshq.business',
    'schnitzke.stefanie@web.de', 'tsuying.cheng@gmail.com', 'a@company.co', 'a@studio.io', 'a@att.net',
    'a@horizon.com', 'a@mymail.com', 'a@hotmail.it', 'a@googlemail.com',
  ]) assert.equal(emailProblem(ok), null, ok)
})

test('emailProblem gives a clear message', () => {
  assert.equal(emailProblem('nope'), 'Please enter a valid email address, like name@example.com.')
  assert.equal(emailProblem('dean@gamil.com'), 'Please check your email. Did you mean dean@gmail.com?')
})
