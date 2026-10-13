'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import Image from 'next/image'
import GiveawayEmailModal from '@/components/giveaways/GiveawayEmailModal'
import { isFromDmVisit } from '@/lib/giveaway-dm'
import { offerForLevel } from '@/lib/giveaway-offers'
import type { PackPageContent, PackTagTone } from '@/lib/pack-page'
import styles from './PackPage.module.css'

// Same font links as the other giveaway pages (deduped by data-font), so the
// browser shares one cached copy. next/font is avoided here on purpose: in a
// client component it breaks the local Turbopack build.
const FONT_LINKS = [
  { key: 'cormorant', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,600;1,700&display=swap' },
  { key: 'jetbrains-mono', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap' },
]

const COPY_LABEL = 'Copy the prompt'
const TAG_TONE: Record<PackTagTone, string> = {
  easy: `${styles.tag} ${styles.tagEasy}`,
  warn: `${styles.tag} ${styles.tagWarn}`,
  plain: styles.tag,
}

// ---------------------------------------------------------------------------
// PackPage: the pack-style giveaway template (Illy, 2026-10-13).
//
// Email rule: people who came from the DM (?via=dm) already gave their email,
// so they are never asked again. Everyone else gets ONE ask, after their first
// copy or download, once per tab. No timed popup, no form in front of the
// free thing. The ask is the shared GiveawayEmailModal -> /api/lead-magnet.
//
// Offer rule: the one paid offer at the end comes from offerForLevel(), so it
// always matches the page's AI level. Rules: docs/giveaways/PROCESS.md.
// ---------------------------------------------------------------------------
export default function PackPage({ slug, content }: { slug: string; content: PackPageContent }) {
  const offer = offerForLevel(content.level, slug)
  const fromDm = useRef(false)
  const askTimer = useRef<number | null>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const [emailOpen, setEmailOpen] = useState(false)
  const [askedAfterCopy, setAskedAfterCopy] = useState(false)
  const [copyLabel, setCopyLabel] = useState(COPY_LABEL)
  const [promptOpen, setPromptOpen] = useState(false)

  useEffect(() => {
    for (const f of FONT_LINKS) {
      if (document.querySelector(`link[data-font="${f.key}"]`)) continue
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = f.href
      link.setAttribute('data-font', f.key)
      document.head.appendChild(link)
    }
  }, [])

  useEffect(() => {
    fromDm.current = isFromDmVisit()
    return () => {
      if (askTimer.current) window.clearTimeout(askTimer.current)
    }
  }, [])

  const askForEmailOnce = useCallback(
    (kind: 'copy' | 'download') => {
      if (fromDm.current) return
      const key = `pack-email-asked-${slug}`
      try {
        if (window.sessionStorage.getItem(key)) return
        window.sessionStorage.setItem(key, '1')
      } catch {
        /* storage blocked: still ask, once for this page view */
        if (askTimer.current) return
      }
      setAskedAfterCopy(kind === 'copy')
      askTimer.current = window.setTimeout(() => setEmailOpen(true), kind === 'copy' ? 700 : 1200)
    },
    [slug],
  )

  const showCopied = useCallback((label: string) => {
    setCopyLabel(label)
    window.setTimeout(() => setCopyLabel(COPY_LABEL), 2600)
  }, [])

  const selectPrompt = useCallback(() => {
    const pre = preRef.current
    if (!pre) return
    const range = document.createRange()
    range.selectNodeContents(pre)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
  }, [])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content.use.prompt)
      showCopied('Copied. Now paste it into a new chat.')
    } catch {
      selectPrompt()
      showCopied('Selected. Press copy on your keyboard.')
    }
    askForEmailOnce('copy')
  }, [askForEmailOnce, content.use.prompt, selectPrompt, showCopied])

  const jumpTo = useCallback((event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }, [])

  const c = content
  const sectionId = (name: string) => `${slug}-${name}`

  return (
    <div className={styles.page}>
      <section className={`${styles.hero} ${styles.glow}`}>
        <div className={styles.wrap}>
          <div className={styles.topline}>
            <p className={styles.eyebrow}>&#10022; You asked for this</p>
            <span className={styles.priceTag}>
              Free pack &middot; <b>$0</b>
            </span>
          </div>
          <h1>
            {c.hero.title} <span className={styles.free}>{c.hero.free}</span>
          </h1>
          <p className={styles.lede}>{c.hero.lede}</p>
          <a className={`${styles.btn} ${styles.btnMain}`} href={`#${sectionId('get')}`} onClick={(e) => jumpTo(e, sectionId('get'))}>
            {c.hero.button.label}
            <small>{c.hero.button.meta}</small>
          </a>
          <div className={styles.ticks}>
            {c.hero.ticks.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <nav className={styles.jumps} aria-label="On this page">
            {[
              { id: 'get', n: '01', label: 'Get it', text: c.jumps.get },
              { id: 'use', n: '02', label: 'Use it now', text: c.jumps.use },
              { id: 'stuck', n: '03', label: 'Get unstuck', text: c.jumps.stuck },
            ].map((j) => (
              <a key={j.id} className={styles.jump} href={`#${sectionId(j.id)}`} onClick={(e) => jumpTo(e, sectionId(j.id))}>
                <span className={styles.num}>{j.n}</span>
                <div>
                  <b>{j.label}</b>
                  <span>{j.text}</span>
                </div>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section id={sectionId('get')} className={styles.section}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>&#10022; Get it</p>
          <h2>{c.get.heading}</h2>
          <p className={styles.muted}>{c.get.intro}</p>
          <p className={styles.need}>
            {c.get.phone.lead}{' '}
            <a href={`#${sectionId('use')}`} onClick={(e) => jumpTo(e, sectionId('use'))}>
              {c.get.phone.link}
            </a>{' '}
            {c.get.phone.rest}
          </p>
          <div className={styles.btnRow}>
            <a
              className={`${styles.btn} ${styles.btnMain}`}
              href={c.get.primary.href}
              target="_blank"
              rel="noopener"
              onClick={() => askForEmailOnce('download')}
            >
              {c.get.primary.label}
              <small>{c.get.primary.meta}</small>
            </a>
            {c.get.secondary ? (
              <a
                className={`${styles.btn} ${styles.btnGhost}`}
                href={c.get.secondary.href}
                target="_blank"
                rel="noopener"
                onClick={() => askForEmailOnce('download')}
              >
                {c.get.secondary.label}
              </a>
            ) : null}
          </div>

          <h3 className={styles.subhead}>{c.doesHeading}</h3>
          <div className={styles.doesnt}>
            <div className={`${styles.col} ${styles.colNo}`}>
              <h4>It does not</h4>
              <ul>
                {c.doesNot.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className={`${styles.col} ${styles.colYes}`}>
              <h4>It does</h4>
              <ul>
                {c.does.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id={sectionId('inside')} className={styles.section}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>&#10022; What it looks like</p>
          <h2>{c.example.heading}</h2>
          <div className={styles.chat} role="img" aria-label={c.example.label}>
            <div className={styles.chatHead}>
              <i />
              <i />
              <i />
              &nbsp;{c.example.chatTitle}
            </div>
            <div className={styles.chatBody}>
              {c.example.messages.map((m, i) =>
                m.from === 'me' ? (
                  <div key={i} className={`${styles.msg} ${styles.msgMe}`}>
                    {m.file ? <span className={styles.fileChip}>{m.file}</span> : m.text}
                  </div>
                ) : (
                  <div key={i} className={`${styles.msg} ${styles.msgAi}`}>
                    {m.text}
                    {m.list ? (
                      <ol>
                        {m.list.map((l) => (
                          <li key={l.line}>
                            {l.line}
                            <br />
                            <span className={styles.contact}>{l.contact}</span>
                          </li>
                        ))}
                      </ol>
                    ) : null}
                    {m.after}
                  </div>
                ),
              )}
            </div>
            <div className={styles.chatNote}>
              {c.example.note} <b>Nothing is sent.</b> You reach out yourself.
            </div>
          </div>

          <h3 className={styles.subhead}>Words it understands</h3>
          <div className={styles.words}>
            {c.words.map((w) => (
              <div key={w.word} className={styles.word}>
                <code>{w.word}</code>
                <span>{w.text}</span>
              </div>
            ))}
          </div>

          <details className={`${styles.details} ${styles.spaced}`}>
            <summary>What is in the folder</summary>
            <div className={styles.dBody}>
              <ul className={styles.insideList}>
                {c.files.map((f) => (
                  <li key={f.name}>
                    <code>{f.name}</code>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </section>

      <section id={sectionId('use')} className={styles.section}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>&#10022; Use it now</p>
          <h2>{c.use.heading}</h2>
          <p className={styles.muted}>{c.use.intro}</p>
          <div className={styles.card}>
            <div className={styles.cardLabel}>
              <b>Start here</b> &middot; {c.use.cardLabel}
            </div>
            <h3>{c.use.cardTitle}</h3>
            <p className={styles.small} style={{ margin: 0 }}>
              {c.use.cardText}
            </p>
            <div className={styles.cardActions}>
              <button
                type="button"
                className={`${styles.chipBtn} ${styles.copyBtn} ${copyLabel !== COPY_LABEL ? styles.copyDone : ''}`}
                onClick={handleCopy}
                aria-live="polite"
              >
                {copyLabel}
              </button>
              {c.use.openLinks.map((l) => (
                <a key={l.href} className={styles.chipBtn} href={l.href} target="_blank" rel="noopener">
                  {l.label} &#8599;
                </a>
              ))}
            </div>
            <div id={sectionId('prompt')} className={`${styles.promptBox} ${promptOpen ? styles.promptOpen : ''}`}>
              <pre ref={preRef}>{c.use.prompt}</pre>
            </div>
            <button
              type="button"
              className={styles.expand}
              aria-controls={sectionId('prompt')}
              aria-expanded={promptOpen}
              onClick={() => setPromptOpen((v) => !v)}
            >
              {promptOpen ? 'Show less' : 'Show the whole prompt'}
            </button>
          </div>
        </div>
      </section>

      <section id={sectionId('ways')} className={styles.section}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>&#10022; Pick your way</p>
          <h2>Three ways to run it</h2>
          <p className={styles.muted}>Pick the one that matches what you have. Tap a way to see its steps.</p>
          {c.ways.map((w, i) => (
            <details key={w.title} className={`${styles.details} ${styles.way}`} open={i === 0}>
              <summary>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.wayText}>
                  {w.title}
                  <small>{w.sub}</small>
                  <span className={styles.wayTags}>
                    {w.tags.map((t) => (
                      <span key={t.label} className={TAG_TONE[t.tone]}>
                        {t.label}
                      </span>
                    ))}
                  </span>
                </span>
              </summary>
              <div className={styles.dBody}>
                <ol className={styles.steps}>
                  {w.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                {w.note ? <p className={styles.stepNote}>{w.note}</p> : null}
                {w.after ? <p className={styles.after}>{w.after}</p> : null}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id={sectionId('stuck')} className={styles.section}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>&#10022; Get unstuck</p>
          <h2>Stuck? Find your line.</h2>
          {c.stuck.map((s) => (
            <details key={s.q} className={styles.details}>
              <summary>{s.q}</summary>
              <div className={styles.dBody}>
                <p>
                  {s.email ? (
                    <>
                      Email{' '}
                      <a className={styles.addr} href={`mailto:${s.email}`}>
                        {s.email}
                      </a>
                      .{' '}
                    </>
                  ) : null}
                  {s.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {offer ? (
        <section id={sectionId('next')} className={`${styles.section} ${styles.offer} ${styles.glow}`}>
          <div className={styles.wrap}>
            <p className={`${styles.eyebrow} ${styles.offerEyebrow}`}>&#10022; What next &middot; paid &middot; optional</p>
            <h2>
              Want the next step? <span className={styles.hl}>{offer.name}</span>
            </h2>
            <div className={styles.stats}>
              {offer.stats.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.bridge}>
              <Image src={offer.photo.src} alt={offer.photo.alt} width={124} height={124} />
              <p>{c.bridge}</p>
            </div>
            <p className={styles.muted}>{offer.body}</p>
            <ul className={styles.checks}>
              {offer.checks.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className={styles.promise}>
              <b>{offer.promise.value}</b>
              <span>{offer.promise.text}</span>
            </div>
            <a className={`${styles.btn} ${styles.btnOffer}`} href={offer.cta.href}>
              {offer.cta.label}
              <small>{offer.cta.meta}</small>
            </a>
            <p className={styles.closeNote}>Not for you? Close this page. Everything above stays free.</p>
          </div>
        </section>
      ) : null}

      <div className={styles.credit}>
        <div className={styles.wrap}>
          <p>Created by Joe Che.</p>
          <p>ChatGPT is a trademark of OpenAI. Claude is a trademark of Anthropic. This page is not affiliated with either.</p>
        </div>
      </div>

      <GiveawayEmailModal
        slug={slug}
        isOpen={emailOpen}
        onClose={() => setEmailOpen(false)}
        showCopiedBadge={askedAfterCopy}
        headingOverride={c.emailHeading}
      />
    </div>
  )
}
