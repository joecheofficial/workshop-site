// Generic "here's your link" delivery email for ManyChat Instagram giveaways
// whose source has no dedicated template in /api/lead-magnet.
//
// The ManyChat v2 flow (asks name, then email, then DMs the link) tells the
// person "copy's on its way to {{email}} too". For keywords without a bespoke
// email this builder keeps that promise. It is only used when the request is
// authenticated with MANYCHAT_LEAD_SECRET and carries an allowlisted link, so
// website callers keep the fail-closed 422 behaviour.
//
// Pretty-light letter format on purpose (deliverability rule, same as
// free-ai-tool-email.ts): Georgia serif, styled text links, no buttons, no
// shaded boxes, no tables, no attachments, and an explicit plain-text part.

import { timingSafeEqual } from 'node:crypto'
import { withUtm } from './utm'

const MAX_NAME_LENGTH = 120

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isMastermindsHost(host: string): boolean {
  return host === 'mastermindshq.business' || host.endsWith('.mastermindshq.business')
}

/**
 * Returns the normalised link when it is safe to email, otherwise null.
 * https only, and the host must be one we own or explicitly trust.
 */
export function validateGiveawayLink(raw: unknown): string | null {
  if (typeof raw !== 'string') return null
  const trimmed = raw.trim()
  if (!trimmed || trimmed.length > 2048) return null
  let url: URL
  try {
    url = new URL(trimmed)
  } catch {
    return null
  }
  if (url.protocol !== 'https:') return null
  if (url.username || url.password) return null
  if (url.port) return null
  const host = url.hostname.toLowerCase()
  const allowed =
    isMastermindsHost(host) ||
    host === 'workshop-site-sigma.vercel.app' ||
    host === 'betterplayaguideai.musecafe.vip' ||
    (host === 'github.com' && url.pathname.startsWith('/josephtandle/'))
  return allowed ? url.toString() : null
}

function titleCaseSlug(slug: string): string {
  return slug
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/**
 * Plain-text giveaway name: tags and control characters stripped, whitespace
 * collapsed, capped at 120 chars. Falls back to the title-cased slug.
 * The result is NOT HTML-escaped; escape at render time.
 */
export function sanitizeGiveawayName(raw: unknown, source: string): string {
  let name = typeof raw === 'string' ? raw : ''
  name = name
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ')
    .replace(/—/g, ', ')
    .replace(/\s+/g, ' ')
    .trim()
  if (name.length > MAX_NAME_LENGTH) name = name.slice(0, MAX_NAME_LENGTH).trim()
  if (!name) name = titleCaseSlug(source).slice(0, MAX_NAME_LENGTH) || 'Your Giveaway'
  return name
}

/** Constant-time check of the ManyChat shared secret. Empty env never matches. */
export function isValidManychatSecret(provided: string | null | undefined, expected: string | undefined): boolean {
  if (!expected || !provided) return false
  const a = Buffer.from(provided, 'utf8')
  const b = Buffer.from(expected, 'utf8')
  if (a.length !== b.length) {
    // Burn comparable time, then fail.
    timingSafeEqual(b, b)
    return false
  }
  return timingSafeEqual(a, b)
}

export function buildGenericGiveawayEmail({
  source,
  name,
  link,
  unsubscribeFooter,
  unsubscribeUrl,
}: {
  source: string
  name: string
  link: string
  unsubscribeFooter: string
  unsubscribeUrl: string | null
}) {
  const host = new URL(link).hostname.toLowerCase()
  const giveawayUrl = isMastermindsHost(host) ? withUtm(link, { campaign: 'lead-magnet', content: source }) : link
  const mhqUrl = withUtm('https://mastermindshq.business', { campaign: 'lead-magnet', content: source })
  const linkStyle = 'color:#6f5cc4;font-weight:bold;'

  const subject = `Your copy of ${name}`

  const html = `
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.7;color:#2a2536;max-width:560px;">
        <p>Hi,</p>
        <p>Here&rsquo;s the link you asked for on Instagram: <a href="${esc(giveawayUrl)}" style="${linkStyle}">${esc(name)}</a>.</p>
        <p>Bookmark it so it doesn&rsquo;t get lost in your DMs.</p>
        <p>If you want help putting AI to work in your business, that is what we do every week at <a href="${esc(mhqUrl)}" style="${linkStyle}">Masterminds HQ</a>.</p>
        <p>Reply and tell me what you think.</p>
        <p style="margin-top:20px;">Joe</p>
        ${unsubscribeFooter}
      </div>
    `

  const text = [
    'Hi,',
    '',
    `Here's the link you asked for on Instagram: ${name}`,
    giveawayUrl,
    '',
    "Bookmark it so it doesn't get lost in your DMs.",
    '',
    `If you want help putting AI to work in your business, that is what we do every week at Masterminds HQ (${mhqUrl}).`,
    '',
    'Reply and tell me what you think.',
    '',
    'Joe',
    '',
    unsubscribeUrl ? `Sent by Masterminds HQ. Unsubscribe any time: ${unsubscribeUrl}` : 'Sent by Masterminds HQ.',
  ].join('\n')

  return { subject, html, text }
}

// ---------------------------------------------------------------------------
// Website visitors on giveaways that have no email of their own (Illy, 2026-10-14).
// The pack page asks once for the email; until now these sources returned 422
// and the visitor saw an error even though the lead was saved. They now get the
// same generic "here is your link" email as DM sign-ups, pointing back to the
// page. Only these exact slugs, and the link is always our own page.
// ---------------------------------------------------------------------------
export const WEBSITE_GENERIC_GIVEAWAYS: Readonly<Record<string, string>> = {
  'agent-infrastructure': 'The Agent Infrastructure Guide',
  'anthropic-safety-checklist': 'The Anthropic Ban Risk Audit',
  benchmark: 'The AI Model Benchmark Comparison',
  'claude-md': 'The Ultimate CLAUDE.md file',
  compare: 'The 5 Versions of Claude',
  'cross-cli-compatibility-routing': 'Cross CLI Compatibility Routing',
  'fable-worth-it-audit': 'The Fable Worth-It Audit',
  'geometry-dash-fun-build': 'The Geometry Dash Fun Build',
  'hated-task-prompts': 'The Hated-Task Prompt Pack',
  hooklab: 'HookLab',
  'ig-settings': 'The Instagram Settings Checklist',
  'logo-maker-guide': 'The Logo Maker Guide',
  film: 'Make a Film with Claude',
  'posture-coach': 'Posture Coach',
  'ray-dalio-council': 'The Ray Dalio Council',
  'squarespace-escape': 'The Squarespace Escape Kit',
  'viral-hooks': 'The Visual Hooks guide',
}

/** For a website caller: the generic email's name and link for this source, or null. */
export function websiteGiveawayEmail(source: string): { name: string; link: string } | null {
  const name = WEBSITE_GENERIC_GIVEAWAYS[source]
  return name ? { name, link: `https://workshop.mastermindshq.business/giveaways/${source}` } : null
}

// ---------------------------------------------------------------------------
// Instagram SALES keywords (Illy, 2026-10-17: "we should be collecting their details").
// BOOK, MASTERMIND, META, ADS, TEAM and BUILD used to DM a sales link with no email
// step. Their ManyChat flows now ask name, then email, then send the same link, and
// post here with source `kw-<keyword>`. A "Your copy of ..." letter is wrong for a
// sales page, and the book link is Amazon (not on the allowlist above), so these
// sources get their own short letter. The link is fixed here, never taken from the
// request, so no caller can choose where it points.
// ---------------------------------------------------------------------------
export const SALES_KEYWORD_PAGES: Readonly<Record<string, { label: string; link: string }>> = {
  'kw-book': { label: 'my book on Amazon', link: 'https://www.amazon.com/dp/B0H4GR93WT' },
  'kw-mastermind': { label: 'the Masterminds HQ AI Mastermind', link: 'https://mastermindshq.business' },
  'kw-meta': { label: 'Meta Ads with Claude Code', link: 'https://mastermindshq.business/meta-ads-with-claude-code' },
  'kw-ads': { label: 'Meta Ads with Claude Code', link: 'https://mastermindshq.business/meta-ads-with-claude-code' },
  'kw-team': { label: 'Meta Ads with Claude Code', link: 'https://mastermindshq.business/meta-ads-with-claude-code' },
  'kw-build': { label: 'the Website Workshop', link: 'https://mastermindshq.business/masterminds-website-workshop' },
}

/** The sales page for an IG sales-keyword source, or null for any other source. */
export function salesKeywordPage(source: string): { label: string; link: string } | null {
  return Object.prototype.hasOwnProperty.call(SALES_KEYWORD_PAGES, source) ? SALES_KEYWORD_PAGES[source] : null
}

export function buildSalesKeywordEmail({
  source,
  unsubscribeFooter,
  unsubscribeUrl,
}: {
  source: string
  unsubscribeFooter: string
  unsubscribeUrl: string | null
}) {
  const page = salesKeywordPage(source)
  if (!page) throw new Error(`not a sales keyword source: ${source}`)
  const host = new URL(page.link).hostname.toLowerCase()
  const url = isMastermindsHost(host) ? withUtm(page.link, { campaign: 'ig-keyword', content: source }) : page.link
  const linkStyle = 'color:#6f5cc4;font-weight:bold;'

  const subject = 'The link you asked for on Instagram'

  const html = `
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.7;color:#2a2536;max-width:560px;">
        <p>Hi,</p>
        <p>Here&rsquo;s the link you asked for on Instagram: <a href="${esc(url)}" style="${linkStyle}">${esc(page.label)}</a>.</p>
        <p>Putting it here so it doesn&rsquo;t get lost in your DMs.</p>
        <p>Any questions, just hit reply. I read every one.</p>
        <p style="margin-top:20px;">Joe</p>
        ${unsubscribeFooter}
      </div>
    `

  const text = [
    'Hi,',
    '',
    `Here's the link you asked for on Instagram: ${page.label}`,
    url,
    '',
    "Putting it here so it doesn't get lost in your DMs.",
    '',
    'Any questions, just hit reply. I read every one.',
    '',
    'Joe',
    '',
    unsubscribeUrl ? `Sent by Masterminds HQ. Unsubscribe any time: ${unsubscribeUrl}` : 'Sent by Masterminds HQ.',
  ].join('\n')

  return { subject, html, text }
}
