'use client'

import { useEffect, useRef, useState } from 'react'
import { CONSENT_REQUIRED_COOKIE, META_CONSENT_COOKIE, cookieDomainFor, isLocalHost, parseCookieHeader, pickConsentValue, serializeCookie } from '@/lib/meta-consent'
import { ensureFbqStub, initPixelsOnce, loadFbeventsOnce, trackMeta } from '@/lib/meta-pixel'

function requiresConsent(): boolean {
  return !isLocalHost(window.location.host) && parseCookieHeader(document.cookie).get(CONSENT_REQUIRED_COOKIE)?.[0] !== '0'
}

function expireHostConsent(): void {
  document.cookie = `${META_CONSENT_COOKIE}=; Max-Age=0; Path=/`
}

function writeConsent(value: 'granted' | 'denied'): void {
  if (cookieDomainFor(window.location.host)) expireHostConsent()
  document.cookie = serializeCookie(META_CONSENT_COOKIE, value, { host: window.location.host, maxAge: 15552000 })
}

export default function MetaPixelConsent() {
  const initialPageViewSent = useRef(false)
  const [showBanner, setShowBanner] = useState<boolean | null>(null)

  useEffect(() => {
    ensureFbqStub()
    initPixelsOnce()
    let active = true
    let cookies = parseCookieHeader(document.cookie)
    if ((cookies.get(META_CONSENT_COOKIE)?.length ?? 0) > 1) {
      expireHostConsent()
      cookies = parseCookieHeader(document.cookie)
    }
    const applyRegion = () => {
      const required = requiresConsent()
      const consent = pickConsentValue(parseCookieHeader(document.cookie).get(META_CONSENT_COOKIE))
      if (!required || consent === 'granted') loadFbeventsOnce()
      setShowBanner(required && consent !== 'granted' && consent !== 'denied')
    }
    applyRegion()
    if (!isLocalHost(window.location.host) && !cookies.has(CONSENT_REQUIRED_COOKIE)) {
      // Same-origin region route first (Vercel geo header), then the shared one.
      const fetchRegion = (url: string, init?: RequestInit) => fetch(url, { cache: 'no-store', ...init })
        .then(response => response.ok ? response.json() : null)
        .catch(() => null)
      void fetchRegion('/api/consent/region')
        .then(data => typeof data?.required === 'boolean' ? data : fetchRegion('https://mastermindshq.business/api/consent/region', { credentials: 'include' }))
        .then(data => {
          if (!active || typeof data?.required !== 'boolean') return
          document.cookie = serializeCookie(CONSENT_REQUIRED_COOKIE, data.required ? '1' : '0', { host: window.location.host, maxAge: 86400 })
          applyRegion()
          window.dispatchEvent(new Event('mhq:region-resolved'))
        }).catch(() => {})
    }
    const reopen = () => {
      expireHostConsent()
      document.cookie = serializeCookie(META_CONSENT_COOKIE, '', { host: window.location.host, maxAge: 0 })
      window.fbq?.('consent', 'revoke')
      setShowBanner(true)
    }
    window.addEventListener('mhq:open-consent', reopen)
    return () => {
      active = false
      window.removeEventListener('mhq:open-consent', reopen)
    }
  }, [])

  // PageView: fire once for the initial page load only. fbevents fires a
  // single manual PageView per pixel per document and ignores repeats, so
  // client-side route changes are tracked by fbevents' own pushState handler
  // (automatic SPA PageView, once per URL change). Do not set
  // fbq.disablePushState or SPA navigations stop being tracked.
  useEffect(() => {
    if (initialPageViewSent.current) return
    initialPageViewSent.current = true
    trackMeta('PageView')
  }, [])

  const choose = (value: 'granted' | 'denied') => {
    writeConsent(value)
    setShowBanner(false)
    window.fbq?.('consent', value === 'granted' ? 'grant' : 'revoke')
    if (value === 'granted') loadFbeventsOnce()
  }

  if (!showBanner) return null
  const buttonClass = 'min-h-[2.75rem] flex-1 rounded-xl border border-white/[0.16] bg-white/[0.06] px-5 text-sm font-semibold text-[#FCF4EB] hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-[#8B79D4]/50'
  return (
    <div role="dialog" aria-label="Cookie consent" aria-modal="false" className="fixed left-4 right-4 bottom-4 z-[45] mx-auto max-w-[640px] rounded-2xl border border-white/[0.12] bg-[#151515]/95 p-4 text-[#FCF4EB] shadow-xl backdrop-blur sm:p-5">
      <p className="text-sm leading-6">
        We use cookies to measure our ads and improve the site. Accept to allow analytics and ad tracking, or decline and nothing is tracked.{' '}
        <a href="https://mastermindshq.business/privacy" target="_blank" rel="noopener noreferrer" className="text-[#8B79D4] underline">Privacy</a>
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" className={buttonClass} onClick={() => choose('granted')}>Accept</button>
        <button type="button" className={buttonClass} onClick={() => choose('denied')}>Decline</button>
      </div>
    </div>
  )
}

export function CookieSettingsLink() {
  const [required, setRequired] = useState(false)
  useEffect(() => {
    const update = () => setRequired(requiresConsent())
    update()
    window.addEventListener('mhq:region-resolved', update)
    return () => window.removeEventListener('mhq:region-resolved', update)
  }, [])
  if (!required) return null
  return <button type="button" className="ml-3 text-xs text-[#FCF4EB]/30 underline transition hover:text-[#FCF4EB]" onClick={() => window.dispatchEvent(new Event('mhq:open-consent'))}>Cookie settings</button>
}
