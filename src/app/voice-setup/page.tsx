import type { Metadata } from 'next'

// Linked from the voice class "5-minute setup" letter (Illy 17 Nov 2026):
// one page with both apps, so the email keeps one link.
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
        maxWidth: 560,
        margin: '0 auto',
        padding: '48px 20px 80px',
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: 17,
        lineHeight: 1.6,
        color: '#2a2536',
      }}
    >
      <h1 style={{ fontSize: 30, lineHeight: 1.2, margin: '0 0 12px' }}>Get your app for Tuesday</h1>
      <p style={{ margin: '0 0 28px' }}>Pick one. Mac or Windows. Install it, open it once and sign in.</p>

      {apps.map((app) => (
        <div
          key={app.name}
          style={{ borderTop: '1px solid #e6e1f0', padding: '20px 0' }}
        >
          <p style={{ margin: '0 0 4px', fontWeight: 'bold' }}>{app.name}</p>
          <p style={{ margin: '0 0 10px' }}>{app.note}</p>
          <a href={app.href} style={{ color: '#6f5cc4', fontWeight: 'bold' }}>
            {app.cta}
          </a>
        </div>
      ))}

      <p style={{ margin: '28px 0 0', borderTop: '1px solid #e6e1f0', paddingTop: 20 }}>
        When the app opens, reply DONE to my email. If it doesn&apos;t, reply with what you see and
        we&apos;ll get it working before Tuesday.
      </p>
      <p style={{ margin: '12px 0 0' }}>Joe</p>
    </main>
  )
}
