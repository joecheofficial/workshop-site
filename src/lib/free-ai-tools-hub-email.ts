// Delivery email for the Free AI Tools hub (/giveaways/free-ai-tools, keyword SWAP).
//
// Pretty-light letter format, same as free-ai-tool-email.ts: Georgia serif,
// styled text links, no buttons, no shaded boxes, no tables, no attachments,
// and a plain-text part. One line per swap, each linking to that tool's setup
// page, so the email says exactly what the hub page says.

import { FREE_AI_TOOLS_HUB_SLUG, freeAiSwapRows } from './free-ai-tools-hub'
import { withUtm } from './utm'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://workshop.mastermindshq.business'

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function buildFreeAiToolsHubEmail({
  unsubscribeFooter,
  unsubscribeUrl,
}: {
  unsubscribeFooter: string
  unsubscribeUrl: string | null
}) {
  const rows = freeAiSwapRows().map((r) => ({
    ...r,
    url: withUtm(`${SITE_URL}${r.path}`, { campaign: 'lead-magnet', content: `${FREE_AI_TOOLS_HUB_SLUG}-${r.slug}` }),
  }))
  const hubUrl = withUtm(`${SITE_URL}/giveaways/${FREE_AI_TOOLS_HUB_SLUG}`, { campaign: 'lead-magnet', content: `${FREE_AI_TOOLS_HUB_SLUG}-page` })
  const linkStyle = 'color:#6f5cc4;font-weight:bold;'
  const itemStyle = 'margin:0 0 12px;padding-left:14px;border-left:2px solid #d9d2ee;color:#3a3550;'

  const subject = 'Your 10 free swaps'

  const html = `
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.7;color:#2a2536;max-width:560px;">
        <p>Hi,</p>
        <p>Here are the 10 swaps you asked for: the paid app, the free tool I would use instead, and my setup notes for each one.</p>
        ${rows
          .map(
            (r, i) =>
              `<p style="${itemStyle}">${i + 1}. ${esc(r.paid)} to <a href="${r.url}" style="${linkStyle}">${esc(r.tool.name)}</a>. ${esc(r.line)}</p>`,
          )
          .join('\n        ')}
        <p style="margin-top:18px;">Start with the paid app you open least. Try the free one for a week next to it, and cancel only when you have stopped opening the old one. Some free plans have limits, and each setup page says exactly what the free plan covers.</p>
        <p>The full list stays open here too: <a href="${hubUrl}" style="${linkStyle}">the 10 free swaps</a>.</p>
        <p>Reply and tell me which bill you cancelled first.</p>
        <p style="margin-top:20px;">Joe</p>
        ${unsubscribeFooter}
      </div>
    `

  const text = [
    'Hi,',
    '',
    'Here are the 10 swaps you asked for: the paid app, the free tool I would use instead, and my setup notes for each one.',
    '',
    ...rows.map((r, i) => `${i + 1}. ${r.paid} to ${r.tool.name}. ${r.line}\n   ${r.url}`),
    '',
    'Start with the paid app you open least. Try the free one for a week next to it, and cancel only when you have stopped opening the old one. Some free plans have limits, and each setup page says exactly what the free plan covers.',
    '',
    `The full list stays open here too: ${hubUrl}`,
    '',
    'Reply and tell me which bill you cancelled first.',
    '',
    'Joe',
    '',
    unsubscribeUrl ? `Sent by Masterminds HQ. Unsubscribe any time: ${unsubscribeUrl}` : 'Sent by Masterminds HQ.',
  ].join('\n')

  return { subject, html, text }
}
