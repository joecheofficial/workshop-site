import { NextResponse } from 'next/server'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { createStripeClient } from '@/lib/stripe'
import { createAiAgentIncomeStripeClient } from '@/app/api/ai-agent-income/stripe'
import { stripeAmountToMajor } from '@/lib/meta-consent'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const headers = { 'Cache-Control': 'no-store' }
  const query = new URL(request.url).searchParams
  const id = query.get('session_id') ?? ''
  if (!/^cs_[A-Za-z0-9_]{1,200}$/.test(id)) {
    return NextResponse.json({ error: 'Invalid session ID.' }, { status: 400, headers })
  }
  const { ok } = await checkRateLimit(`meta-purchase:${getClientIp(request)}`, 30, 60)
  if (!ok) return NextResponse.json({ error: 'Too many requests.' }, { status: 429, headers })
  try {
    const stripe = query.get('source') === 'ai-agent-income' ? createAiAgentIncomeStripeClient() : createStripeClient()
    const session = await stripe.checkout.sessions.retrieve(id)
    const amount = session.amount_total ?? 0
    const currency = (session.currency ?? '').toUpperCase()
    return NextResponse.json({ paid: session.payment_status === 'paid' && amount > 0, value: stripeAmountToMajor(amount, currency), currency, eventId: 'mhq_' + id }, { headers })
  } catch {
    console.error('Meta purchase session lookup failed.')
    return NextResponse.json({ paid: false }, { headers })
  }
}
