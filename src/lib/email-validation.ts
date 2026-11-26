export const EMAIL_RE = /^[^\s@]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,63}$/

export function normaliseEmail(email: string) {
  return email.trim().toLowerCase()
}

// Big free mail providers, by the name before the dot. A name one or two letters
// away from one of these (gamil.com, gmial.com, hotmial.com) is a typo, and the
// person never gets their confirmation or Zoom link.
const PROVIDERS = ['gmail', 'googlemail', 'yahoo', 'hotmail', 'outlook', 'icloud', 'protonmail']
// Real providers that sit close to the ones above; never "fix" these.
const REAL_NAMES = new Set(['gmail', 'googlemail', 'yahoo', 'ymail', 'email', 'mail', 'hotmail', 'outlook', 'icloud', 'cloud', 'protonmail', 'proton', 'bigpond', 'comcast', 'verizon', 'gmx', 'web', 'live', 'msn', 'aol', 'me', 'mac', 'att', 'orange', 'libero', 'zoho', 'yandex', 'fastmail', 'hey', 'pm', 'tutanota', 'mailbox', 'posteo'])

// Endings that are never real (.con, .cmo ...) and always meant .com.
const BAD_TLDS: Record<string, string> = {
  con: 'com', cmo: 'com', ocm: 'com', comm: 'com', vom: 'com', xom: 'com', cpm: 'com',
  coom: 'com', clm: 'com', cim: 'com', cok: 'com', ccom: 'com', comn: 'com', nett: 'net', nte: 'net',
}

function distance(a: string, b: string) {
  // Optimal string alignment distance, so "gmial" -> "gmail" counts as 1.
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
    }
  }
  return d[a.length][b.length]
}

/** The corrected address when the domain looks like a typo, else null. */
export function suggestEmailFix(email: string): string | null {
  const value = normaliseEmail(email)
  const at = value.lastIndexOf('@')
  if (at < 1) return null
  const local = value.slice(0, at)
  const parts = value.slice(at + 1).replace(/\.+$/, '').split('.')
  if (parts.length < 2) return null

  const last = parts.length - 1
  if (BAD_TLDS[parts[last]]) parts[last] = BAD_TLDS[parts[last]]

  const name = parts[0]
  const restIsCom = parts.length === 2 && parts[1] === 'com'
  // Gmail only exists as gmail.com: gmail.co, gmail.cm, gmail.om are typos.
  if ((name === 'gmail' || name === 'googlemail') && parts.length === 2) parts[1] = 'com'
  // Only correct the name on plain .com addresses, where these typos happen,
  // so country domains (hotmail.es, yahoo.ca) and business names stay untouched.
  else if (restIsCom && !REAL_NAMES.has(name)) {
    let best: string | null = null
    let bestScore = Infinity
    for (const provider of PROVIDERS) {
      const limit = provider.length >= 10 ? 2 : 1
      const score = distance(name, provider)
      if (score <= limit && score < bestScore) {
        best = provider
        bestScore = score
      }
    }
    if (best) parts[0] = best
  }

  const fixed = `${local}@${parts.join('.')}`
  return fixed === value ? null : fixed
}

/** True only for a well-formed address with no obvious domain typo (used by every form). */
export function isValidEmail(email: string) {
  return emailProblem(email) === null
}

/**
 * One check for every form: null when the address is fine, otherwise the
 * message to show. Typos are refused (not just warned), with the fix spelled out.
 */
export function emailProblem(email: string): string | null {
  const value = normaliseEmail(email)
  if (!EMAIL_RE.test(value)) return 'Please enter a valid email address, like name@example.com.'
  const fix = suggestEmailFix(value)
  if (fix) return `Please check your email. Did you mean ${fix}?`
  return null
}
