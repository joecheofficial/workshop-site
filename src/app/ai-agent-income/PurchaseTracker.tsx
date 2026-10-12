'use client'

import { useEffect } from 'react'
import { fetchAndTrackPurchase } from '@/lib/meta-pixel'

export default function PurchaseTracker() {
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id')
    if (sessionId) void fetchAndTrackPurchase(sessionId, 'ai-agent-income')
  }, [])
  return null
}
