import { getConfirmedCancelToken, saveRegistration } from '@/lib/event-registration-db'
import { withTimeout } from '@/lib/with-timeout'

type SaveInput = Parameters<typeof saveRegistration>[0]

const RETRY_DELAYS_MS = [1000, 4000, 10000]

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function isSaved(input: SaveInput): Promise<boolean> {
  const token = await withTimeout(
    getConfirmedCancelToken(input.eventSlug, input.attendeeEmail),
    5000,
    'recovery recheck',
  ).catch(() => null)
  return Boolean(token)
}

/**
 * Runs after the response (inside next/server after()). A sign-up that was
 * already confirmed to the attendee must end up in event_registrations.
 * 1. Give the first insert time to land (it usually does, just slowly).
 * 2. Otherwise re-check, then retry the insert, a few times with backoff.
 * Re-checking before every insert means a late first insert is never doubled.
 * Returns true once the person is saved.
 */
export async function recoverRegistration(args: {
  firstSave: Promise<unknown> | null
  input: SaveInput
}): Promise<boolean> {
  if (args.firstSave) {
    const ok = await withTimeout(args.firstSave, 10000, 'first save (background)')
      .then(() => true)
      .catch(() => false)
    if (ok) return true
  }

  for (const delay of RETRY_DELAYS_MS) {
    if (await isSaved(args.input)) return true
    try {
      await withTimeout(saveRegistration(args.input), 8000, 'save registration (retry)')
      return true
    } catch (err) {
      console.error('registration recovery attempt failed', err)
      // A timed-out retry may still have landed; the next loop re-checks.
    }
    await sleep(delay)
  }
  return isSaved(args.input)
}
