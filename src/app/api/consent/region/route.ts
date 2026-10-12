import { NextResponse } from 'next/server'
import { CONSENT_REQUIRED_COOKIE, isConsentRequiredCountry, isLocalHost, serializeCookie } from '@/lib/meta-consent'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Same contract as https://mastermindshq.business/api/consent/region:
// returns { required } from the Vercel geo header and sets mhq_cr.
// A missing country header fails safe to required.
export async function GET(request: Request) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || new URL(request.url).host
  const country = request.headers.get('x-vercel-ip-country')
  const required = isLocalHost(host) ? false : isConsentRequiredCountry(country)
  const response = NextResponse.json({ required }, { headers: { 'Cache-Control': 'no-store' } })
  response.headers.append('Set-Cookie', serializeCookie(CONSENT_REQUIRED_COOKIE, required ? '1' : '0', { host, maxAge: 86400 }))
  return response
}
