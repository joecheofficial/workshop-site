// Animated Masterminds HQ logo at the top of our emails (Illy, 2026-10-17).
//
// Gmail's sender circle shows a "J": our emails go out through Resend, and Gmail only shows a Google
// account photo on mail sent through that account (a logo there needs a paid BIMI certificate). Until
// then the logo goes inside the email instead. It's the homepage logo (masterminds-logo-current-white),
// animated: the three circuit lines light up, then the infinity arrow glows. 180px GIF, ~126 KB, shown at 64px.
//
// Kept inside the pretty-light rules (reference_email_deliverability_pretty_light): one hosted image,
// no button, no table, no background-colour block. The plain-text part is untouched.

export const EMAIL_LOGO_URL = 'https://workshop.mastermindshq.business/brand/mhq-logo-animated.gif'

export const EMAIL_LOGO_HTML =
  `<p style="margin:0 0 24px 0;"><img src="${EMAIL_LOGO_URL}" width="64" height="64" alt="Masterminds HQ" ` +
  `style="display:block;width:64px;height:64px;border:0;border-radius:14px;"></p>`

/** Put the logo at the top of an email body. Idempotent: an email that already has it is returned unchanged. */
export function withEmailLogo(html: string): string {
  if (!html || html.includes(EMAIL_LOGO_URL)) return html
  // Inside the outer letter <div> when there is one, so it lines up with the text.
  const m = /^(\s*<div\b[^>]*>)/i.exec(html)
  return m ? m[1] + '\n' + EMAIL_LOGO_HTML + html.slice(m[1].length) : EMAIL_LOGO_HTML + html
}
