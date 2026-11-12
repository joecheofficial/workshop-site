'use client'

// Opt-in "Voice Studio" event layout (Make AI Sound Exactly Like You, Illy 2026-11-12).
// Same look as Joe's Voice Studio (projects/mastermind/evergreen-test-2026-11/voice-studio.html):
// near-black, purple to pink, Fraunces serif, living sound waves and the voice print.
// Registration, Zoom, calendar and emails are the shared EventRegistrationSection, unchanged.
// The class time is shown in each visitor's own time zone (Illy: "the workshop is global").

import { useEffect, useRef, useState } from 'react'
import { Fraunces, Inter } from 'next/font/google'
import type { EventDefinition } from '@/lib/events'
import EventRegistrationSection from '@/components/events/EventRegistrationSection'
import type { EventRegistrationData } from '@/components/events/EventRegistrationSection'

const fraunces = Fraunces({ subsets: ['latin'], weight: ['400', '600', '800'], style: ['normal', 'italic'], variable: '--vs-serif' })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--vs-sans' })

// Fixed list beside the form so anyone can check any city. Singapore, not Bali,
// in public copy (playbook section 0).
const ZONES: Array<[string, string]> = [
  ['Los Angeles', 'America/Los_Angeles'],
  ['New York', 'America/New_York'],
  ['London', 'Europe/London'],
  ['Berlin', 'Europe/Berlin'],
  ['Dubai', 'Asia/Dubai'],
  ['Mumbai', 'Asia/Kolkata'],
  ['Singapore', 'Asia/Singapore'],
  ['Sydney', 'Australia/Sydney'],
]

type Voice = { warmth: number; direct: number; length: number; humour: number }

function drawPrint(ctx: CanvasRenderingContext2D, S: number, cx: number, cy: number, v: Voice, time: number) {
  const rings = 9 + Math.round(v.length / 6)
  const lobes = 3 + Math.round(v.direct / 13)
  const wob = 3 + v.humour / 5
  const hue = 245 + (v.warmth - 50) * 1.1
  const R = S * 0.42
  const inner = S * 0.08
  ctx.save()
  ctx.lineCap = 'round'
  for (let r = 0; r < rings; r++) {
    const base = inner + (R - inner) * (r / (rings - 1))
    const k = r / rings
    ctx.beginPath()
    for (let a = 0; a <= Math.PI * 2 + 0.02; a += 0.02) {
      const rr =
        base +
        Math.sin(a * lobes + time + r * 0.38) * wob * (0.6 + k * 1.6) * (S / 500) +
        Math.sin(a * (lobes * 2 + 1) - time * 0.8 + r) * wob * 0.35 * (S / 500) +
        Math.sin(a * 3 + time * 0.3) * (v.humour / 100) * 6 * (S / 500)
      const x = cx + Math.cos(a) * rr
      const y = cy + Math.sin(a) * rr
      if (a === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.strokeStyle = `hsla(${hue + k * 70},78%,${62 + k * 14}%,${0.25 + 0.7 * k})`
    ctx.shadowColor = `hsla(${hue + k * 70},90%,70%,.8)`
    ctx.shadowBlur = (10 * S) / 900
    ctx.lineWidth = ((1 + k * 1.6) * S) / 900
    ctx.stroke()
  }
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, inner * 1.4)
  g.addColorStop(0, `hsla(${hue + 60},90%,85%,.9)`)
  g.addColorStop(1, 'hsla(0,0%,100%,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(cx, cy, inner * 1.4, 0, 7)
  ctx.fill()
  ctx.restore()
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(mq.matches)
  }, [])
  return reduce
}

function VoicePrint({ size, voice, className }: { size: number; voice: Voice; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = usePrefersReducedMotion()
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    let t = 0
    let frame = 0
    let visible = true
    const io = new IntersectionObserver((es) => (visible = es[0].isIntersecting))
    io.observe(c)
    const loop = () => {
      if (visible) {
        ctx.clearRect(0, 0, size, size)
        drawPrint(ctx, size, size / 2, size / 2, voice, t)
        if (!reduce) t += 0.012
      }
      frame = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
    }
  }, [size, voice, reduce])
  return <canvas ref={ref} width={size} height={size} className={className} aria-hidden="true" />
}

function Waves() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = usePrefersReducedMotion()
  useEffect(() => {
    const wc = ref.current
    if (!wc) return
    const wx = wc.getContext('2d')
    if (!wx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let WW = 0
    let WH = 0
    let wt = 0
    let mx = 0.5
    let my = 0.5
    let on = true
    let frame = 0
    const size = () => {
      WW = wc.width = wc.offsetWidth * dpr
      WH = wc.height = wc.offsetHeight * dpr
    }
    size()
    const hero = wc.parentElement
    const move = (e: PointerEvent) => {
      const r = wc.getBoundingClientRect()
      mx = (e.clientX - r.left) / r.width
      my = (e.clientY - r.top) / r.height
    }
    window.addEventListener('resize', size)
    hero?.addEventListener('pointermove', move)
    const io = new IntersectionObserver((es) => (on = es[0].isIntersecting))
    if (hero) io.observe(hero)
    const loop = () => {
      if (on) {
        wx.clearRect(0, 0, WW, WH)
        const n = 16
        const step = 6 * dpr
        for (let i = 0; i < n; i++) {
          wx.beginPath()
          const base = WH * (0.66 + i * 0.012)
          const amp = (20 + i * 6) * dpr
          const f = 0.0016 / dpr + (i * 0.00008) / dpr
          const ph = wt * (0.5 + i * 0.03) + i * 0.5
          for (let x = 0; x <= WW; x += step) {
            const dx = x / WW - mx
            const bump = Math.exp(-dx * dx * 28) * (60 + my * 90) * dpr
            const y =
              base +
              Math.sin(x * f + ph) * amp * (0.6 + 0.4 * Math.sin(wt * 0.4 + i)) +
              Math.sin(x * f * 2.7 - ph * 1.3) * amp * 0.28 -
              bump * Math.sin(ph * 0.5 + i * 0.3)
            if (x === 0) wx.moveTo(x, y)
            else wx.lineTo(x, y)
          }
          const g = wx.createLinearGradient(0, 0, WW, 0)
          const a = 0.12 + 0.5 * (i / n)
          g.addColorStop(0, `hsla(${252 + i * 2},65%,70%,0)`)
          g.addColorStop(0.3, `hsla(${255 + i * 3},70%,72%,${a})`)
          g.addColorStop(0.7, `hsla(${315 + i},70%,78%,${a})`)
          g.addColorStop(1, 'hsla(330,70%,80%,0)')
          wx.strokeStyle = g
          wx.lineWidth = (i === n - 1 ? 2.2 : 1.1) * dpr
          wx.stroke()
        }
        if (!reduce) wt += 0.012
      }
      frame = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', size)
      hero?.removeEventListener('pointermove', move)
      io.disconnect()
    }
  }, [reduce])
  return <canvas ref={ref} className="vs-waves" aria-hidden="true" />
}

function TypedHeadline({ text }: { text: string }) {
  const [n, setN] = useState(0)
  const reduce = usePrefersReducedMotion()
  useEffect(() => {
    if (reduce) {
      setN(text.length)
      return
    }
    if (n >= text.length) return
    const t = window.setTimeout(() => setN((v) => v + 1), 45 + Math.random() * 50)
    return () => window.clearTimeout(t)
  }, [n, text, reduce])
  return (
    <h1 className="vs-h1">
      {/* Full title for screen readers and crawlers; the typed copy is decorative. */}
      <span className="sr-only">{text}</span>
      <span className="vs-grad" aria-hidden="true">
        {text.slice(0, n)}
      </span>
      <span className="vs-caret" aria-hidden="true" />
    </h1>
  )
}

function Compare({ generic, voice }: { generic: string[]; voice: string[] }) {
  const box = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const drag = useRef(false)
  const set = (clientX: number) => {
    const r = box.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.min(95, Math.max(5, ((clientX - r.left) / r.width) * 100)))
  }
  return (
    <div
      ref={box}
      className="vs-ba vs-reveal"
      onPointerDown={(e) => {
        drag.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        set(e.clientX)
      }}
      onPointerMove={(e) => drag.current && set(e.clientX)}
      onPointerUp={() => (drag.current = false)}
    >
      <div className="vs-pane vs-gen">
        <div className="vs-lab">Generic AI</div>
        {generic.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="vs-pane vs-you" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <div className="vs-lab">Your AI, in your voice</div>
        {voice.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div
        className="vs-handle"
        style={{ left: `${pos}%` }}
        role="slider"
        tabIndex={0}
        aria-label="Compare generic AI with your voice"
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPos((p) => Math.max(5, p - 5))
          if (e.key === 'ArrowRight') setPos((p) => Math.min(95, p + 5))
        }}
      >
        <i>&harr;</i>
      </div>
    </div>
  )
}

type Testimonial = { name: string; location: string; quote: string; videoUrl: string; poster: string }

function TestimonialCard({ t }: { t: Testimonial }) {
  const [play, setPlay] = useState(false)
  return (
    <figure className="vs-tcard vs-glass vs-reveal">
      <div className="vs-tvid">
        {play ? (
          <video src={t.videoUrl} poster={t.poster} controls autoPlay playsInline />
        ) : (
          <button type="button" onClick={() => setPlay(true)} aria-label={`Play ${t.name}'s video`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.poster} alt="" loading="lazy" />
            <span className="vs-play" aria-hidden="true">&#9654;</span>
          </button>
        )}
      </div>
      <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption>
        <b>{t.name}</b> {t.location}
      </figcaption>
    </figure>
  )
}

function useLocalTime(startIso: string, endIso: string) {
  const [local, setLocal] = useState<{ date: string; time: string; zone: string } | null>(null)
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
      const start = new Date(startIso)
      const end = new Date(endIso)
      const t = (d: Date) => d.toLocaleTimeString('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit' })
      void end
      // Start time only (Illy 12 Nov: do not show how long the class runs).
      setLocal({
        date: start.toLocaleDateString('en-US', { timeZone: tz, weekday: 'long', month: 'long', day: 'numeric' }),
        time: t(start),
        zone: `your time (${(tz.split('/').pop() || tz).replace(/_/g, ' ')})`,
      })
    } catch {
      setLocal(null)
    }
  }, [startIso, endIso])
  return local
}

function zoneLine(startIso: string, tz: string) {
  const d = new Date(startIso)
  return `${d.toLocaleDateString('en-US', { timeZone: tz, weekday: 'short' })} ${d.toLocaleTimeString('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit' })}`
}

export default function VoiceStudioPage({
  event,
  registrationEvent,
  publishableKey,
}: {
  event: EventDefinition
  registrationEvent: EventRegistrationData
  publishableKey: string | null
}) {
  const v = event.voiceStudioLayout!
  const startIso = event.calendarEvent?.startIso ?? ''
  const endIso = event.calendarEvent?.endIso ?? ''
  const local = useLocalTime(startIso, endIso)
  // Before hydration (and without JS) show the Singapore time, never blank.
  const dateText = local?.date ?? 'Tuesday, December 1'
  const timeText = local?.time ?? '8:00 PM'
  const zoneText = local?.zone ?? 'Singapore time'
  const host = event.hosts[0]

  useEffect(() => {
    const els = document.querySelectorAll('.vs-reveal')
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('vs-in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.01 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const reg: EventRegistrationData = {
    ...registrationEvent,
    appearance: {
      eyebrow: 'Free registration',
      heading: event.title,
      intro: `${dateText} · ${timeText} ${zoneText} · Live on Zoom`,
      submitLabel: event.ctaLabel,
      hideAside: true,
      phoneLabel: 'WhatsApp or phone number',
      phoneHelp: "WhatsApp if you have it, any mobile number works. Include your country code so I can send you a reminder.",
    },
  }

  return (
    <main className={`vs-page ${fraunces.variable} ${inter.variable}`}>
      <style>{VS_CSS}</style>

      <section className="vs-hero">
        <Waves />
        <div className="vs-wrap vs-hero-grid">
          <div className="vs-hero-copy">
            <div className="vs-kicker">{event.eyebrow}</div>
            <TypedHeadline text={v.headline} />
            <p className="vs-lede">{v.lede}</p>
            <div className="vs-when">
              <span className="vs-chip">
                <b>{dateText}</b>
              </span>
              <span className="vs-chip">
                <b>{timeText}</b> {zoneText}
              </span>
              <span className="vs-chip">Live on Zoom</span>
            </div>
            <a className="vs-cta" href="#register">
              {event.ctaLabel} <span aria-hidden="true">&rarr;</span>
            </a>
            <span className="vs-free">{v.heroNote}</span>
          </div>
          <div className="vs-joe">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={v.cutoutSrc} alt="Joe Che" width={1100} height={987} />
            <div className="vs-tag vs-glass">
              <b>Joe Che</b>Teaching since 1998
            </div>
          </div>
        </div>
      </section>

      <section className="vs-sec">
        <div className="vs-wrap">
          <div className="vs-kicker vs-reveal">The difference</div>
          <h2 className="vs-h2 vs-reveal">
            {v.compareTitle[0]} <em>{v.compareTitle[1]}</em>
          </h2>
          <Compare generic={v.compareGeneric} voice={v.compareVoice} />
          <div className="vs-hint">{v.compareHint}</div>
        </div>
      </section>

      <section className="vs-sec">
        <div className="vs-wrap">
          <div className="vs-kicker vs-reveal">You leave with</div>
          <h2 className="vs-h2 vs-reveal">
            {v.leaveWithTitle[0]} <em>{v.leaveWithTitle[1]}</em>
          </h2>
          <div className="vs-cards">
            <div className="vs-card vs-glass vs-reveal">
              <div className="vs-vis">
                <div className="vs-tune">
                  <div className="row"><span>Formal</span><i><b style={{ left: '74%' }} /></i><span>Casual</span></div>
                  <div className="row"><span>Careful</span><i><b style={{ left: '68%' }} /></i><span>Direct</span></div>
                  <div className="row"><span>Long</span><i><b style={{ left: '62%' }} /></i><span>Short</span></div>
                  <div className="words">Sounds like you: <em>&quot;quick one&quot;</em>, <em>&quot;honestly&quot;</em></div>
                </div>
              </div>
              <h3>{v.leaveWith[0]?.title}</h3>
              <p>{v.leaveWith[0]?.body}</p>
            </div>
            <div className="vs-card vs-glass vs-reveal">
              <div className="vs-vis">
                <VoicePrint size={300} voice={{ warmth: 60, direct: 55, length: 30, humour: 60 }} className="vs-mini" />
              </div>
              <h3>{v.leaveWith[1]?.title}</h3>
              <p>{v.leaveWith[1]?.body}</p>
            </div>
            <div className="vs-card vs-glass vs-reveal">
              <div className="vs-vis">
                <div className="vs-bubble">
                  Honestly? Most of my best client wins started with one question. Here&apos;s the one I ask first.
                  <span className="t">Ready to post</span>
                </div>
              </div>
              <h3>{v.leaveWith[2]?.title}</h3>
              <p>{v.leaveWith[2]?.body}</p>
            </div>
          </div>
          <div className="vs-midcta vs-reveal">
            <a className="vs-cta" href="#register">
              {event.ctaLabel} <span aria-hidden="true">&rarr;</span>
            </a>
            <span className="vs-free">{v.urgency[0]?.body}</span>
          </div>
        </div>
      </section>

      <section className="vs-sec">
        <div className="vs-wrap vs-story">
          <div>
            <div className="vs-kicker vs-reveal">About the class</div>
            <h2 className="vs-h2 vs-reveal">
              {v.storyTitle[0]} <em>{v.storyTitle[1]}</em>
            </h2>
          </div>
          <div className="vs-body vs-reveal">
            {v.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="vs-sig">Joe Che</div>
          </div>
        </div>
      </section>


      <section className="vs-sec">
        <div className="vs-wrap">
          <div className="vs-kicker vs-reveal">{v.testimonialsKicker}</div>
          <h2 className="vs-h2 vs-reveal">
            {v.testimonialsTitle[0]} <em>{v.testimonialsTitle[1]}</em>
          </h2>
          <p className="vs-tsub vs-reveal">Members of my AI Business Mastermind, in their own words. Swipe for more.</p>
          <div className="vs-tgrid">
            {v.testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="vs-sec vs-reg-sec">
        <div className="vs-wrap vs-reg">
          <div className="vs-reveal">
            <div className="vs-kicker">Save your seat</div>
            <h2 className="vs-h2">
              {v.registerTitle[0]} <em>{v.registerTitle[1]}</em>
            </h2>
            <div className="vs-printbox">
              <VoicePrint size={840} voice={{ warmth: 72, direct: 70, length: 45, humour: 40 }} className="vs-print" />
            </div>
            <div className="vs-urgency">
              {v.urgency.map((u) => (
                <div key={u.title}>
                  <b>{u.title}</b>
                  <span>{u.body}</span>
                </div>
              ))}
            </div>
            <p className="vs-note">{v.registerIntro}</p>
            <div className="vs-zones">
              {ZONES.map(([name, tz]) => (
                <span key={tz}>
                  <b>{name}</b> {startIso ? zoneLine(startIso, tz) : ''}
                </span>
              ))}
            </div>
          </div>
          <div className="vs-form">
            <EventRegistrationSection event={reg} publishableKey={publishableKey} />
          </div>
        </div>
      </section>

      {host ? (
        <section className="vs-sec vs-sec-tight">
          <div className="vs-wrap">
            <div className="vs-bio vs-glass vs-reveal">
              <div className="vs-bio-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.bioPhoto} alt="Joe Che holding his book, How to Build Your Own AI Agent Operating System" width={640} height={930} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="seal" src={v.bioSeal} alt="Amazon #1 Best Seller" width={120} height={120} />
              </div>
              <div>
                <div className="vs-kicker">Your teacher</div>
                <h3>{host.name}</h3>
                {v.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}

const VS_CSS = `
.vs-page{--bg:#0c0a12;--ink:#f6f1ff;--muted:#a79fbd;--purple:#8B79D4;--lilac:#BDB3E8;--pink:#E7A9D8;--cream:#FCF4EB;--glass:rgba(255,255,255,.05);--line:rgba(255,255,255,.11);
  --serif:var(--vs-serif),Georgia,serif;--sans:var(--vs-sans),-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
  position:relative;background:var(--bg);color:var(--ink);font-family:var(--sans);line-height:1.6;overflow-x:clip;margin-top:-4rem}
.vs-page ::selection{background:var(--purple);color:#fff}
.vs-wrap{max-width:1120px;margin:0 auto;padding:0 24px}
.vs-glass{background:var(--glass);border:1px solid var(--line);border-radius:24px;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.vs-kicker{font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--lilac);font-weight:500}
.vs-h2{font-family:var(--serif);font-weight:600;font-size:clamp(32px,4.6vw,52px);line-height:1.05;margin:12px 0 16px;letter-spacing:-.01em;color:var(--ink)}
.vs-h2 em{font-style:italic;color:var(--pink)}
.vs-reveal{opacity:0;transform:translateY(28px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}
.vs-reveal.vs-in{opacity:1;transform:none}
.vs-sec{position:relative;padding:90px 0 40px}
.vs-sec-tight{padding:30px 0 50px}

.vs-hero{position:relative;min-height:100vh;min-height:100svh;display:flex;align-items:center;overflow:clip;background:radial-gradient(ellipse at 72% 18%,#2a1f45 0%,var(--bg) 62%)}
.vs-waves{position:absolute;inset:0;width:100%;height:100%}
.vs-hero-grid{position:relative;display:grid;grid-template-columns:1.15fr .85fr;gap:20px;align-items:center;width:100%;padding-top:110px;padding-bottom:60px}
.vs-h1{font-family:var(--serif);font-weight:800;font-size:clamp(44px,5.6vw,82px);line-height:1;margin:14px 0 22px;letter-spacing:-.02em;min-height:2em}
.vs-grad{background:linear-gradient(120deg,#fff 10%,var(--lilac) 50%,var(--pink) 90%);-webkit-background-clip:text;background-clip:text;color:transparent}
.vs-caret{display:inline-block;width:.06em;height:.82em;background:var(--pink);vertical-align:-.04em;margin-left:.04em;animation:vsblink 1s steps(1) infinite}
@keyframes vsblink{50%{opacity:0}}
.vs-lede{font-size:clamp(17px,1.7vw,20px);color:#d9d1ee;max-width:560px;margin:0 0 28px}
.vs-when{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px}
.vs-chip{padding:10px 16px;border-radius:999px;border:1px solid var(--line);background:rgba(255,255,255,.04);font-size:14px;color:#e9e2fb}
.vs-chip b{color:#fff;font-weight:600}
.vs-cta{display:inline-flex;align-items:center;gap:10px;padding:17px 30px;border-radius:999px;font:600 16px var(--sans);color:#fff;text-decoration:none;
  background:linear-gradient(120deg,#8B79D4,#b48ad6 60%,#E7A9D8);box-shadow:0 18px 50px rgba(139,121,212,.38),inset 0 1px 0 rgba(255,255,255,.25);transition:transform .25s,box-shadow .25s}
.vs-cta:hover{transform:translateY(-2px);box-shadow:0 24px 60px rgba(139,121,212,.5)}
.vs-free{display:block;margin-top:12px;font-size:13px;color:var(--muted)}
.vs-joe{position:relative;align-self:end;justify-self:center;width:100%;max-width:470px}
.vs-joe img{display:block;width:100%;height:auto;filter:grayscale(1) contrast(1.05);-webkit-mask-image:linear-gradient(#000 70%,transparent);mask-image:linear-gradient(#000 70%,transparent)}
.vs-joe::before{content:"";position:absolute;inset:8% 6% 10%;border-radius:50%;background:radial-gradient(circle,rgba(139,121,212,.45),rgba(231,169,216,.12) 50%,transparent 70%);filter:blur(30px);z-index:-1}
.vs-tag{position:absolute;left:0;bottom:16%;padding:12px 16px;font-size:13px;color:#e9e2fb;line-height:1.4}
.vs-tag b{display:block;font-family:var(--serif);font-size:18px;color:#fff;font-weight:600}

.vs-ba{position:relative;margin-top:30px;border-radius:24px;overflow:hidden;border:1px solid var(--line);user-select:none;touch-action:pan-y;cursor:ew-resize}
.vs-pane{padding:38px 40px 46px;min-height:300px}
.vs-gen{background:#17141f;color:#8e88a0}
.vs-you{position:absolute;inset:0;background:var(--cream);color:#1a1526}
.vs-lab{font-size:12px;letter-spacing:.2em;text-transform:uppercase;margin-bottom:18px;font-weight:600}
.vs-gen .vs-lab{color:#6f6984}.vs-you .vs-lab{color:#8B79D4;text-align:right}
.vs-pane p{font-size:clamp(16px,1.6vw,19px);margin:0 0 12px;max-width:720px}
.vs-you p{margin-left:auto}
.vs-handle{position:absolute;top:0;bottom:0;width:2px;background:linear-gradient(var(--lilac),var(--pink));transform:translateX(-1px);outline:none}
.vs-handle i{position:absolute;top:50%;left:50%;width:46px;height:46px;border-radius:50%;transform:translate(-50%,-50%);background:#1a1526;border:2px solid var(--lilac);box-shadow:0 0 24px rgba(139,121,212,.6);display:grid;place-items:center;color:#fff;font-style:normal;font-size:16px}
.vs-handle:focus-visible i{box-shadow:0 0 0 4px rgba(231,169,216,.6)}
.vs-hint{margin-top:14px;font-size:13px;color:var(--muted);text-align:center}

.vs-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:30px}
.vs-card{padding:26px;display:flex;flex-direction:column}
.vs-vis{height:150px;margin-bottom:18px;border-radius:16px;background:rgba(0,0,0,.25);display:grid;place-items:center;overflow:hidden}
.vs-card h3{font-family:var(--serif);font-weight:600;font-size:23px;margin:0 0 6px;line-height:1.15;color:var(--ink)}
.vs-card p{margin:0;color:var(--muted);font-size:15px}
.vs-mini{width:150px;height:150px}
.vs-tune{width:86%;font-size:12px;color:var(--muted)}
.vs-tune .row{display:grid;grid-template-columns:52px 1fr 48px;align-items:center;gap:10px;margin:7px 0}
.vs-tune .row span:last-child{text-align:right;color:#e9e2fb}
.vs-tune i{position:relative;height:4px;border-radius:4px;background:linear-gradient(90deg,var(--purple),var(--pink))}
.vs-tune b{position:absolute;top:50%;width:14px;height:14px;border-radius:50%;background:#fff;transform:translate(-50%,-50%);box-shadow:0 0 0 3px rgba(139,121,212,.45)}
.vs-tune .words{margin-top:10px;color:#d9d1ee;font-size:12.5px}
.vs-tune em{font-style:normal;color:var(--pink)}
.vs-bubble{background:var(--cream);color:#1a1526;border-radius:18px 18px 18px 4px;padding:12px 16px;font-size:14px;max-width:84%;line-height:1.45;box-shadow:0 10px 30px rgba(0,0,0,.35)}
.vs-bubble .t{display:block;margin-top:6px;font-size:11px;color:#8B79D4}

.vs-story{display:grid;grid-template-columns:.8fr 1.2fr;gap:50px;align-items:start}
.vs-body p{font-size:clamp(17px,1.5vw,19px);color:#d9d1ee;margin:0 0 18px}
.vs-body p:first-child{font-family:var(--serif);font-size:clamp(22px,2.2vw,27px);line-height:1.35;color:#fff}
.vs-sig{margin-top:8px;font-family:var(--serif);font-style:italic;font-size:22px;color:var(--pink)}

.vs-midcta{margin-top:34px;text-align:center}
.vs-tsub{color:var(--muted);margin:-6px 0 26px;font-size:15px}
.vs-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.vs-tcard{margin:0;padding:14px;display:flex;flex-direction:column}
.vs-tvid{position:relative;aspect-ratio:9/12;border-radius:16px;overflow:hidden;background:#000}
.vs-tvid button{all:unset;cursor:pointer;display:block;width:100%;height:100%}
.vs-tvid img,.vs-tvid video{width:100%;height:100%;object-fit:cover;display:block}
.vs-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:58px;height:58px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:20px;padding-left:4px;
  background:linear-gradient(120deg,#8B79D4,#E7A9D8);box-shadow:0 10px 30px rgba(0,0,0,.45)}
.vs-tcard blockquote{margin:14px 4px 10px;font-family:var(--serif);font-size:17px;line-height:1.4;color:#fff}
.vs-tcard figcaption{margin:auto 4px 4px;font-size:13px;color:var(--muted)}
.vs-tcard figcaption b{color:var(--pink);font-weight:600;margin-right:4px}
.vs-urgency{display:grid;gap:10px;margin:6px 0 18px}
.vs-urgency div{display:grid;grid-template-columns:112px 1fr;gap:12px;align-items:baseline;padding:12px 0;border-top:1px solid var(--line)}
.vs-urgency b{font-family:var(--serif);font-weight:600;font-size:19px;color:var(--pink)}
.vs-urgency span{font-size:14px;color:#d9d1ee}
/* Site footer: quiet on this page so nothing pulls people away from the form */
.vs-page ~ footer,footer.footer-glow{margin-top:0 !important;padding:18px 0 !important;opacity:.55}
footer.footer-glow p:first-of-type{font-size:12px !important;line-height:1.6 !important}
footer.footer-glow .w-10{width:30px !important;height:30px !important}
footer.footer-glow > div{gap:10px !important}

.vs-reg-sec{padding-top:70px}
.vs-reg{display:grid;grid-template-columns:.85fr 1.15fr;gap:40px;align-items:start}
.vs-printbox{aspect-ratio:1;max-width:380px;margin:10px auto 0}
.vs-print{width:100%;height:100%;display:block}
.vs-note{font-size:14px;color:var(--muted);margin:10px 0 18px}
.vs-zones{display:grid;grid-template-columns:repeat(2,1fr);gap:6px 18px;font-size:13px;color:var(--muted)}
.vs-zones b{color:#e9e2fb;font-weight:500}

/* Shared registration form, re-skinned for this page only */
.vs-form #register{max-width:none;padding:0;margin:0}
.vs-form #register > .mb-5 p:first-child{font-family:var(--sans);letter-spacing:.22em;color:var(--lilac);font-weight:500}
.vs-form #register > .mb-5 h2{font-family:var(--serif) !important;font-weight:600 !important;font-size:clamp(28px,3vw,36px) !important;line-height:1.1 !important;letter-spacing:-.01em;background:none !important;-webkit-text-fill-color:#fff !important;color:#fff !important}
.vs-form #register > .mb-5 > p:last-child{font-size:14px !important;line-height:1.6 !important;color:var(--muted) !important}
.vs-form .event-registration-shell{background:var(--glass) !important;border-color:var(--line) !important;border-radius:24px !important;backdrop-filter:blur(14px);box-shadow:0 30px 80px rgba(0,0,0,.35) !important}
.vs-form .event-registration-shell form > div > label > span,
.vs-form .event-registration-shell form label > span{font-family:var(--sans);font-size:12px !important;letter-spacing:.12em;text-transform:uppercase;color:var(--lilac) !important;font-weight:500 !important}
.vs-form .event-registration-shell textarea,
.vs-form .event-registration-shell input,
.vs-form .event-registration-shell select{background:rgba(0,0,0,.32) !important;color:#fff !important;border:1px solid var(--line) !important;border-radius:14px !important}
.vs-form .event-registration-shell textarea::placeholder,
.vs-form .event-registration-shell input::placeholder{color:rgba(246,241,255,.38) !important}
.vs-form .event-registration-shell textarea:focus,
.vs-form .event-registration-shell input:focus,
.vs-form .event-registration-shell select:focus{border-color:var(--purple) !important;box-shadow:0 0 0 4px rgba(139,121,212,.18)}
.vs-form .event-registration-shell button[type=submit]{width:100%;border-radius:999px !important;border:0 !important;color:#fff !important;font-family:var(--sans);
  background:linear-gradient(120deg,#8B79D4,#b48ad6 60%,#E7A9D8) !important;box-shadow:0 18px 50px rgba(139,121,212,.38) !important}
.vs-form .event-registration-shell form > div:last-child{align-items:stretch}

.vs-bio{display:grid;grid-template-columns:150px 1fr;gap:26px;align-items:center;padding:22px}
.vs-bio-photo{position:relative}
.vs-bio-photo img:first-child{width:150px;height:190px;object-fit:cover;object-position:50% 15%;border-radius:16px;display:block}
.vs-bio-photo .seal{position:absolute;right:-18px;bottom:-14px;width:68px;height:68px;filter:drop-shadow(0 6px 14px rgba(0,0,0,.5))}
.vs-bio h3{font-family:var(--serif);font-weight:600;font-size:26px;margin:4px 0 6px;color:var(--ink)}
.vs-bio p{margin:4px 0 0;color:#d9d1ee;font-size:15px}

@media (max-width:900px){
  .vs-hero-grid{grid-template-columns:1fr;padding-top:100px}
  .vs-joe{max-width:230px;order:-1;margin-bottom:-24px}
  .vs-tag{display:none}
  .vs-cards,.vs-tgrid{grid-template-columns:1fr 1fr}
  .vs-story,.vs-reg{grid-template-columns:1fr;gap:24px}
  .vs-printbox{max-width:240px}
}
@media (max-width:600px){
  .vs-hero{min-height:0}
  .vs-hero-grid{padding-top:72px;padding-bottom:40px;gap:0}
  .vs-joe{max-width:170px;margin-bottom:-14px}
  .vs-kicker{font-size:11px}
  .vs-h1{font-size:40px;margin:10px 0 14px;min-height:0}
  .vs-lede{font-size:16px;margin-bottom:18px}
  .vs-when{gap:8px;margin-bottom:18px}
  .vs-chip{padding:7px 12px;font-size:13px}
  .vs-cards{grid-template-columns:1fr}
  .vs-tgrid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;margin:0 -24px;padding:0 24px 8px;scrollbar-width:none}
  .vs-tgrid::-webkit-scrollbar{display:none}
  .vs-tcard{flex:0 0 78%;scroll-snap-align:center}
  .vs-tvid{aspect-ratio:4/5}
  .vs-urgency div{grid-template-columns:92px 1fr}
  .vs-pane{padding:26px 22px 34px}
  .vs-bio{grid-template-columns:96px 1fr;gap:18px;padding:16px}
  .vs-bio-photo img:first-child{width:96px;height:122px}
  .vs-bio-photo .seal{width:46px;height:46px;right:-12px;bottom:-10px}
  .vs-bio h3{font-size:21px}.vs-bio p{font-size:13.5px}
  .vs-sec{padding-top:70px}
}
@media (prefers-reduced-motion:reduce){.vs-reveal{opacity:1;transform:none;transition:none}.vs-caret{animation:none}}
`
