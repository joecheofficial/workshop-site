// Delivery email for the WhatsApp receptionist giveaway (/giveaways/whatsapp-agent).
//
// Pretty-light letter format on purpose (deliverability rule, same as
// free-ai-tool-email.ts): Georgia serif, styled text links, no buttons, no
// shaded boxes, no tables, no attachments (the zip is a link), and an explicit
// plain-text part. Facts match the page (src/app/giveaways/whatsapp-agent/pack.ts).

import { withUtm } from './utm'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://workshop.mastermindshq.business'

export function buildWhatsAppAgentEmail({
  unsubscribeFooter,
  unsubscribeUrl,
}: {
  unsubscribeFooter: string
  unsubscribeUrl: string | null
}) {
  const pageUrl = withUtm(`${SITE_URL}/giveaways/whatsapp-agent`, { campaign: 'lead-magnet', content: 'whatsapp-agent-page' })
  const zipUrl = withUtm(`${SITE_URL}/whatsapp-receptionist.zip`, { campaign: 'lead-magnet', content: 'whatsapp-agent-zip' })
  const pdfUrl = withUtm(`${SITE_URL}/whatsapp-receptionist-guide.pdf`, { campaign: 'lead-magnet', content: 'whatsapp-agent-pdf' })
  const linkStyle = 'color:#6f5cc4;font-weight:bold;'
  const itemStyle = 'margin:0 0 10px;padding-left:14px;border-left:2px solid #d9d2ee;color:#3a3550;'
  const labelStyle = 'color:#8B79D4;font-weight:bold;'

  const steps = [
    'Download the folder and leave it in your Downloads folder.',
    'Open Claude Code and paste the prompt from START-HERE.md (it is on the page too) as one message.',
    'Follow along. It tests the code, asks about your business, and walks you through Meta and Cloudflare, one click at a time. About 45 to 60 minutes the first time.',
  ]

  const subject = 'Your WhatsApp receptionist folder'

  const html = `
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.7;color:#2a2536;max-width:560px;">
        <p>Hi,</p>
        <p>Here&rsquo;s the WhatsApp receptionist you asked for: <a href="${zipUrl}" style="${linkStyle}">download the folder</a>.</p>
        <p>It gives Claude its own WhatsApp number. It answers your clients and books appointments into times you open, and it talks straight to Meta&rsquo;s official WhatsApp API. It only replies to people who text first.</p>
        <p style="color:#6a6480;">Three steps:</p>
        ${steps.map((s, i) => `<p style="${itemStyle}"><span style="${labelStyle}">${i + 1}.</span> ${s}</p>`).join('\n        ')}
        <p style="margin-top:18px;"><span style="${labelStyle}">Good to know.</span> Meta and Cloudflare are free to build and test. The Claude API is billed apart from your Claude plan, and 5 USD of credit lasts for thousands of replies. Never connect your personal WhatsApp number.</p>
        <p>Every click is in the <a href="${pdfUrl}" style="${linkStyle}">PDF guide</a>, and the page stays open with the prompt and the fixes for the usual errors: <a href="${pageUrl}" style="${linkStyle}">the WhatsApp receptionist page</a>.</p>
        <p>Stuck? Reply and tell me which step you were on. Never send your keys or tokens.</p>
        <p style="margin-top:20px;">Joe</p>
        ${unsubscribeFooter}
      </div>
    `

  const text = [
    'Hi,',
    '',
    `Here's the WhatsApp receptionist you asked for. Download the folder: ${zipUrl}`,
    '',
    "It gives Claude its own WhatsApp number. It answers your clients and books appointments into times you open, and it talks straight to Meta's official WhatsApp API. It only replies to people who text first.",
    '',
    'Three steps:',
    ...steps.map((s, i) => `${i + 1}. ${s}`),
    '',
    'Good to know: Meta and Cloudflare are free to build and test. The Claude API is billed apart from your Claude plan, and 5 USD of credit lasts for thousands of replies. Never connect your personal WhatsApp number.',
    '',
    `Every click is in the PDF guide: ${pdfUrl}`,
    `The page with the prompt and the fixes for the usual errors: ${pageUrl}`,
    '',
    'Stuck? Reply and tell me which step you were on. Never send your keys or tokens.',
    '',
    'Joe',
    '',
    unsubscribeUrl ? `Sent by Masterminds HQ. Unsubscribe any time: ${unsubscribeUrl}` : 'Sent by Masterminds HQ.',
  ].join('\n')

  return { subject, html, text }
}
