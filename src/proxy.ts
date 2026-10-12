import { NextResponse, type NextRequest } from 'next/server'
import { CONSENT_REQUIRED_COOKIE, isLocalHost, isConsentRequiredCountry, serializeCookie } from '@/lib/meta-consent'

export function proxy(request: NextRequest) {
  try {
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || request.nextUrl.host
    const country = request.headers.get('x-vercel-ip-country')
    const desired = isLocalHost(host) ? '0' : country !== null ? (isConsentRequiredCountry(country) ? '1' : '0') : null
    const response = NextResponse.next()
    // Only set when missing: mhq_cr is shared across every mastermindshq.business
    // subdomain for one day, so the first site that saw the visitor owns it.
    if (desired !== null && !request.cookies.has(CONSENT_REQUIRED_COOKIE)) {
      response.headers.append('Set-Cookie', serializeCookie(CONSENT_REQUIRED_COOKIE, desired, { host, maxAge: 86400 }))
    }
    return response
  } catch {
    return NextResponse.next()
  }
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'] }
