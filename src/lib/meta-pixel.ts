import { META_PIXEL_IDS, FBEVENTS_SRC } from '@/lib/meta-consent'

type Fbq = {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: IArguments[]
  push: Fbq
  loaded: boolean
  version: string
  disablePushState?: boolean
  consent?: unknown
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
    __mhqPixelInit?: boolean
  }
}

let pixelsInitialized = false

export function ensureFbqStub(): void {
  if (typeof window === 'undefined' || window.fbq) return
  const n = function () {
    if (n.callMethod) n.callMethod.apply(n, arguments as unknown as unknown[])
    else n.queue.push(arguments)
  } as Fbq
  if (!window._fbq) window._fbq = n
  n.push = n
  n.loaded = true
  n.version = '2.0'
  n.queue = []
  window.fbq = n
}

export function initPixelsOnce(): void {
  if (typeof window === 'undefined') return
  ensureFbqStub()
  if (pixelsInitialized || window.__mhqPixelInit) return
  pixelsInitialized = true
  window.__mhqPixelInit = true
  for (const id of META_PIXEL_IDS) window.fbq?.('init', id)
}

export function loadFbeventsOnce(): void {
  if (typeof window === 'undefined') return
  if (document.getElementById('mhq-fbevents') || document.querySelector('script[src*="fbevents.js"]')) return
  const script = document.createElement('script')
  script.async = true
  script.id = 'mhq-fbevents'
  script.src = FBEVENTS_SRC
  document.head.appendChild(script)
}

export function trackMeta(event: string, params?: Record<string, unknown>, options?: { eventID?: string }): void {
  try {
    ensureFbqStub()
    initPixelsOnce()
    if (typeof window === 'undefined') return
    if (options) window.fbq?.('track', event, params ?? {}, options)
    else window.fbq?.('track', event, params ?? {})
  } catch { /* Tracking must never interrupt a form or checkout. */ }
}

function wasSent(key: string): boolean {
  try { return typeof window !== 'undefined' && window.localStorage.getItem(key) === '1' } catch { return false }
}

function markSent(key: string): void {
  try { window.localStorage.setItem(key, '1') } catch { /* Storage may be unavailable. */ }
}

export function trackPurchaseOnce({ sessionId, value, currency }: { sessionId: string; value: number; currency: string }): boolean {
  if (typeof window === 'undefined') return false
  const eventID = 'mhq_' + sessionId
  const key = 'mhq_purchase_sent_' + eventID
  if (wasSent(key)) return false
  trackMeta('Purchase', { value, currency }, { eventID })
  markSent(key)
  return true
}

const pendingPurchases = new Set<string>()

export async function fetchAndTrackPurchase(sessionId: string, source: 'events' | 'ai-agent-income'): Promise<void> {
  try {
    if (typeof window === 'undefined' || !/^cs_[A-Za-z0-9_]{1,200}$/.test(sessionId)) return
    const key = 'mhq_purchase_sent_mhq_' + sessionId
    if (wasSent(key) || pendingPurchases.has(sessionId)) return
    pendingPurchases.add(sessionId)
    try {
      const response = await fetch(`/api/meta/purchase?session_id=${encodeURIComponent(sessionId)}&source=${source}`, { cache: 'no-store' })
      if (!response.ok) return
      const data = await response.json()
      if (data?.paid === true && typeof data.value === 'number' && Number.isFinite(data.value) && data.value > 0 && typeof data.currency === 'string') {
        trackPurchaseOnce({ sessionId, value: data.value, currency: data.currency })
        const trialKey = 'mhq_starttrial_sent_mhq_' + sessionId
        if (source === 'ai-agent-income' && !wasSent(trialKey)) {
          trackMeta('StartTrial', { value: data.value, currency: data.currency })
          markSent(trialKey)
        }
      }
    } finally { pendingPurchases.delete(sessionId) }
  } catch { /* Purchase verification is best effort. */ }
}
