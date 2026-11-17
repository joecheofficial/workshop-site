import type { Metadata } from 'next'

// Linked from the voice class "5-minute setup" letter (Illy 17 Nov 2026):
// one page with both apps, so the email keeps one link. Uses the site's own
// dark look (17 Nov fix: the first version had dark text on the dark site).
export const metadata: Metadata = {
  title: 'Get your app for Tuesday',
  description: 'Install one app before the Make AI Sound Exactly Like You class.',
  robots: { index: false, follow: false },
}

const apps = [
  {
    name: 'ChatGPT',
    note: 'The free plan works.',
    href: 'https://chatgpt.com/download/',
    cta: 'Get the ChatGPT app',
  },
  {
    name: 'Claude',
    note: 'Needs Claude Pro.',
    href: 'https://claude.com/download',
    cta: 'Get the Claude app',
  },
]

export default function VoiceSetupPage() {
  return (
    <main
      style={{
        width: '100%',
        maxWidth: 560,
        margin: '0 auto',
        padding: '56px 20px 96px',
        boxSizing: 'border-box',
        color: '#FCF4EB',
      }}
    >
      <p
        style={{
          margin: '0 0 12px',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#8B79D4',
        }}
      >
        Your 5-minute setup
      </p>
      <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(30px, 7vw, 40px)', lineHeight: 1.15, fontWeight: 800 }}>
        Get your app for Tuesday
      </h1>
      <p style={{ margin: '0 0 32px', fontSize: 17, lineHeight: 1.6, color: 'rgba(252,244,235,0.78)' }}>
        Pick one. Mac or Windows. Install it, open it once and sign in.
      </p>

      <div style={{ display: 'grid', gap: 16 }}>
        {apps.map((app) => (
          <div
            key={app.name}
            style={{
              padding: '22px 20px',
              borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <p style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700 }}>{app.name}</p>
            <p style={{ margin: '0 0 16px', fontSize: 16, color: 'rgba(252,244,235,0.72)' }}>{app.note}</p>
            <a
              href={app.href}
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '14px 18px',
                borderRadius: 12,
                background: '#8B79D4',
                color: '#151515',
                fontSize: 16,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              {app.cta}
            </a>
          </div>
        ))}
      </div>

      <p style={{ margin: '32px 0 6px', fontSize: 17, lineHeight: 1.6, color: 'rgba(252,244,235,0.85)' }}>
        When the app opens, reply DONE to my email. If it doesn&apos;t, reply with what you see and we&apos;ll
        get it working before Tuesday.
      </p>
      <p style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Joe</p>
    </main>
  )
}
