export const META_PIXEL_IDS = ['1412328130577658', '143350696292417'] as const
export const FBEVENTS_SRC = 'https://connect.facebook.net/en_US/fbevents.js'
export const CONSENT_REQUIRED_COUNTRIES = new Set('AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO GB CH'.split(' '))
export const CONSENT_REQUIRED_COOKIE = 'mhq_cr'
export const META_CONSENT_COOKIE = 'mhq_consent'

function normalizedHost(host: string | null | undefined): string {
  const value = (host ?? '').trim().toLowerCase()
  return value.startsWith('[') ? value.slice(0, value.indexOf(']') + 1) : value.split(':')[0]
}

export function isLocalHost(host: string | null | undefined): boolean {
  const value = normalizedHost(host)
  return value === 'localhost' || value === '127.0.0.1' || value === '[::1]' || value.endsWith('.localhost')
}

const KNOWN_COUNTRIES = new Set('AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' '))

export function isConsentRequiredCountry(country: string | null | undefined): boolean {
  const value = (country ?? '').trim().toUpperCase()
  return !KNOWN_COUNTRIES.has(value) || CONSENT_REQUIRED_COUNTRIES.has(value)
}

export function cookieDomainFor(host: string | null | undefined): string | null {
  const value = normalizedHost(host)
  return value === 'mastermindshq.business' || value.endsWith('.mastermindshq.business')
    ? '.mastermindshq.business' : null
}

export function serializeCookie(name: string, value: string, { host, maxAge }: { host: string | null | undefined; maxAge: number }): string {
  const domain = cookieDomainFor(host)
  return `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}${domain ? `; Domain=${domain}` : ''}; Path=/; SameSite=Lax${isLocalHost(host) ? '' : '; Secure'}`
}

export function parseCookieHeader(header: string | null | undefined): Map<string, string[]> {
  const cookies = new Map<string, string[]>()
  for (const part of (header ?? '').split(';')) {
    const separator = part.indexOf('=')
    if (separator < 0) continue
    const name = part.slice(0, separator).trim()
    if (!name) continue
    let value = part.slice(separator + 1).trim()
    try { value = decodeURIComponent(value) } catch { /* Keep malformed values as received. */ }
    cookies.set(name, [...(cookies.get(name) ?? []), value])
  }
  return cookies
}

export type MetaConsentState = 'granted' | 'denied' | 'not_required' | 'unknown'

export function pickConsentValue(values: string[] | undefined): string | undefined {
  return values?.includes('denied') ? 'denied' : values?.[0]
}

export function resolveServerConsentState({ host, country, crCookie, consentCookie }: {
  host: string | null | undefined
  country: string | null | undefined
  crCookie?: string
  consentCookie?: string
}): MetaConsentState {
  if (isLocalHost(host)) return 'not_required'
  // An explicit choice always wins, so a visitor who declined is never sent
  // server-side even when their current IP is outside the consent region.
  if (consentCookie === 'granted' || consentCookie === 'denied') return consentCookie
  // mhq_cr=1 means the browser treated this visitor as consent-required and
  // loaded nothing, so the server must not override that with today's IP.
  const required = crCookie === '1' || (country !== null && country !== undefined
    ? isConsentRequiredCountry(country) : crCookie !== '0')
  return required ? 'unknown' : 'not_required'
}

export function extractFbclid(urls: Array<string | null | undefined>): string | null {
  for (const url of urls) {
    if (!url) continue
    try {
      const value = new URL(url, 'https://x.invalid').searchParams.get('fbclid')
      if (value) return value.slice(0, 500)
    } catch { /* Try the next URL. */ }
  }
  return null
}

export function buildMetaCheckoutMetadata(request: Request, opts?: { extraUrls?: Array<string | null | undefined> }): Record<string, string> {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || new URL(request.url).host
  const cookies = parseCookieHeader(request.headers.get('cookie'))
  const state = resolveServerConsentState({ host, country: request.headers.get('x-vercel-ip-country'), crCookie: cookies.get(CONSENT_REQUIRED_COOKIE)?.[0], consentCookie: pickConsentValue(cookies.get(META_CONSENT_COOKIE)) })
  const metadata: Record<string, string> = { meta_consent: state }
  if (state !== 'granted' && state !== 'not_required') return metadata
  const fbclid = extractFbclid([...(opts?.extraUrls ?? []), request.headers.get('referer')])
  const values = {
    meta_fbp: cookies.get('_fbp')?.[0],
    meta_fbc: cookies.get('_fbc')?.[0] || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined),
    meta_ua: request.headers.get('user-agent'),
    meta_ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
  }
  for (const [key, value] of Object.entries(values)) {
    if (value) metadata[key] = value.slice(0, 500)
  }
  return metadata
}

const ZERO_DECIMAL_CURRENCIES = new Set('BIF CLP DJF GNF JPY KMF KRW MGA PYG RWF UGX VND VUV XAF XOF XPF'.split(' '))

export function stripeAmountToMajor(amount: number, currency: string): number {
  return ZERO_DECIMAL_CURRENCIES.has(currency.toUpperCase()) ? amount : amount / 100
}
