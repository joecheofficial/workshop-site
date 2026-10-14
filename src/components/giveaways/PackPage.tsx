'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import Image from 'next/image'
import GiveawayEmailModal from '@/components/giveaways/GiveawayEmailModal'
import { isFromDmVisit } from '@/lib/giveaway-dm'
import { offerForLevel } from '@/lib/giveaway-offers'
import { fillPrompt, packHasAction, packSections } from '@/lib/pack-page'
import type { PackGuideSection, PackPageContent, PackPromptCard, PackSectionId, PackTagTone } from '@/lib/pack-page'
import styles from './PackPage.module.css'

// Same font links as the other giveaway pages (deduped by data-font), so the
// browser shares one cached copy. next/font is avoided here on purpose: in a
// client component it breaks the local Turbopack build.
const FONT_LINKS = [
  { key: 'cormorant', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,600;1,700&display=swap' },
  { key: 'jetbrains-mono', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap' },
]

const TAG_TONE: Record<PackTagTone, string> = {
  easy: `${styles.tag} ${styles.tagEasy}`,
  warn: `${styles.tag} ${styles.tagWarn}`,
  plain: styles.tag,
}

type AskKind = 'copy' | 'download' | 'finish'

const PackAskContext = createContext<(kind: AskKind) => void>(() => {})

/** For an interactive body inside PackPage (a quiz): call it at the moment the visitor has used the thing. Same rules: never for DM visitors, once per tab. */
export function usePackAsk() {
  return useContext(PackAskContext)
}

// ---------------------------------------------------------------------------
// PackPage: the pack-style giveaway template (Illy, 2026-10-13).
//
// Email rule: people who came from the DM (?via=dm) already gave their email,
// so they are never asked again. Everyone else gets ONE ask, once per tab,
// right after they first copy or download something. A page with nothing to
// copy or download asks once when the reader reaches "Stuck?". Never a form
// in front of the free thing, never a timed popup. The ask is the shared
// GiveawayEmailModal -> /api/lead-magnet.
//
// Offer rule: the one paid offer at the end comes from offerForLevel(), so it
// always matches the page's AI level. Rules: docs/giveaways/PROCESS.md.
// ---------------------------------------------------------------------------
export default function PackPage({
  slug,
  content,
  children,
}: {
  slug: string
  content: PackPageContent
  /** An interactive body (a quiz, a prompt builder) shown inside the guide block, after its sections. */
  children?: ReactNode
}) {
  const c = content
  const offer = offerForLevel(c.level, slug)
  const sections = packSections(c)
  // An interactive body is something to use, so the ask waits for a copy or download, not the end of the page.
  const hasAction = packHasAction(c) || Boolean(children)
  const fromDm = useRef(false)
  const askTimer = useRef<number | null>(null)
  const stuckRef = useRef<HTMLElement>(null)
  const [emailOpen, setEmailOpen] = useState(false)
  const [askedAfterCopy, setAskedAfterCopy] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [openPrompts, setOpenPrompts] = useState<Record<string, boolean>>({})

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
    (kind: AskKind) => {
      if (fromDm.current || c.noEmailAsk) return
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
    [slug, c.noEmailAsk],
  )

  // Nothing to copy or download: ask once when the reader reaches "Stuck?".
  useEffect(() => {
    if (hasAction) return
    const el = stuckRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          askForEmailOnce('finish')
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [askForEmailOnce, hasAction])

  const copyText = useCallback(
    async (key: string, text: string, pre: HTMLElement | null) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(key)
      } catch {
        if (pre) {
          const range = document.createRange()
          range.selectNodeContents(pre)
          const selection = window.getSelection()
          selection?.removeAllRanges()
          selection?.addRange(range)
        }
        setCopied(`${key}:selected`)
      }
      window.setTimeout(() => setCopied((v) => (v && v.startsWith(key) ? null : v)), 2600)
      askForEmailOnce('copy')
    },
    [askForEmailOnce],
  )

  const sectionId = (name: PackSectionId) => `${slug}-${name}`
  const jumpTo = useCallback((event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }, [])
  const jumpLink = (target: PackSectionId) => ({
    href: `#${sectionId(target)}`,
    onClick: (e: MouseEvent<HTMLAnchorElement>) => jumpTo(e, sectionId(target)),
  })

  const copyLabel = (key: string, idle: string, done = 'Copied. Now paste it into a new chat.') =>
    copied === key ? done : copied === `${key}:selected` ? 'Selected. Press copy on your keyboard.' : idle
  const copyClass = (key: string) =>
    `${styles.chipBtn} ${styles.copyBtn} ${copied === key || copied === `${key}:selected` ? styles.copyDone : ''}`

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
          <a className={`${styles.btn} ${styles.btnMain}`} {...jumpLink(c.hero.button.target)}>
            {c.hero.button.label}
            <small>{c.hero.button.meta}</small>
          </a>
          <div className={styles.ticks}>
            {c.hero.ticks.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <nav className={styles.jumps} aria-label="On this page">
            {c.jumps.map((j, i) => (
              <a key={j.target + j.label} className={styles.jump} {...jumpLink(j.target)}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <b>{j.label}</b>
                  <span>{j.text}</span>
                </div>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {sections.includes('get') ? (
        <section id={sectionId('get')} className={styles.section}>
          <div className={styles.wrap}>
            {c.get ? (
              <>
                <p className={styles.eyebrow}>&#10022; Get it</p>
                <h2>{c.get.heading}</h2>
                <p className={styles.muted}>{c.get.intro}</p>
                {c.get.note ? (
                  <p className={styles.need}>
                    {c.get.note.lead}{' '}
                    {c.get.note.link ? <a {...jumpLink(c.get.note.link.target)}>{c.get.note.link.label}</a> : null}{' '}
                    {c.get.note.rest}
                  </p>
                ) : null}
                <div className={styles.btnRow}>
                  {c.get.primary ? (
                    <a
                      className={`${styles.btn} ${styles.btnMain}`}
                      href={c.get.primary.href}
                      target={c.get.primary.download ? undefined : '_blank'}
                      rel="noopener"
                      download={c.get.primary.download}
                      onClick={() => askForEmailOnce('download')}
                    >
                      {c.get.primary.label}
                      {c.get.primary.meta ? <small>{c.get.primary.meta}</small> : null}
                    </a>
                  ) : null}
                  {(c.get.secondary || []).map((s) => (
                    <a
                      key={s.href}
                      className={`${styles.btn} ${styles.btnGhost}`}
                      href={s.href}
                      target={s.download ? undefined : '_blank'}
                      rel="noopener"
                      download={s.download}
                      onClick={() => askForEmailOnce('download')}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
                {c.get.command ? (
                  <CommandBlock
                    label={c.get.command.label}
                    text={c.get.command.text}
                    copyKey="get-command"
                    buttonLabel={copyLabel('get-command', 'Copy', 'Copied.')}
                    buttonClass={copyClass('get-command')}
                    onCopy={copyText}
                  />
                ) : null}
              </>
            ) : null}

            {c.promise ? (
              <>
                <h3 className={c.get ? styles.subhead : undefined}>{c.promise.heading}</h3>
                <div className={styles.doesnt}>
                  <div className={`${styles.col} ${styles.colNo}`}>
                    <h4>It does not</h4>
                    <ul>
                      {c.promise.doesNot.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={`${styles.col} ${styles.colYes}`}>
                    <h4>It does</h4>
                    <ul>
                      {c.promise.does.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </section>
      ) : null}

      {c.guide ? (
        <section id={sectionId('guide')} className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>&#10022; {c.guide.eyebrow}</p>
            <h2>{c.guide.heading}</h2>
            {c.guide.intro ? <p className={styles.muted}>{c.guide.intro}</p> : null}
            <div className={styles.guide}>
              {c.guide.sections.map((s, i) => (
                <GuideBlock
                  key={s.title}
                  section={s}
                  copyKey={`guide-${i}`}
                  buttonLabel={copyLabel(`guide-${i}`, 'Copy', 'Copied.')}
                  buttonClass={copyClass(`guide-${i}`)}
                  onCopy={copyText}
                />
              ))}
            </div>
            {children ? (
              <div className={styles.custom}>
                <PackAskContext.Provider value={askForEmailOnce}>{children}</PackAskContext.Provider>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {c.inside ? (
        <section id={sectionId('inside')} className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>&#10022; What it looks like</p>
            <h2>{c.inside.heading}</h2>
            {c.inside.example ? (
              <div className={styles.chat} role="img" aria-label={c.inside.example.label}>
                <div className={styles.chatHead}>
                  <i />
                  <i />
                  <i />
                  &nbsp;{c.inside.example.title}
                </div>
                {c.inside.example.kind === 'chat' ? (
                  <div className={styles.chatBody}>
                    {(c.inside.example.messages || []).map((m, i) =>
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
                ) : (
                  <div className={styles.term}>
                    {(c.inside.example.lines || []).map((l, i) => (
                      <div key={i} className={styles[`term_${l.kind}`]}>
                        {l.kind === 'cmd' ? '> ' : l.kind === 'ok' ? 'done ' : l.kind === 'note' ? 'note ' : ''}
                        {l.text}
                      </div>
                    ))}
                  </div>
                )}
                <div className={styles.chatNote}>{c.inside.example.note}</div>
              </div>
            ) : null}

            {c.inside.words ? (
              <>
                <h3 className={styles.subhead}>{c.inside.words.heading}</h3>
                <div className={styles.words}>
                  {c.inside.words.items.map((w) => (
                    <div key={w.word} className={styles.word}>
                      <code>{w.word}</code>
                      <span>{w.text}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {c.inside.files ? (
              <details className={`${styles.details} ${styles.spaced}`}>
                <summary>{c.inside.files.heading}</summary>
                <div className={styles.dBody}>
                  <ul className={styles.insideList}>
                    {c.inside.files.items.map((f) => (
                      <li key={f.name}>
                        <code>{f.name}</code>
                        <span>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ) : null}
          </div>
        </section>
      ) : null}

      {c.use && c.use.cards.length ? (
        <section id={sectionId('use')} className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>&#10022; Use it now</p>
            <h2>{c.use.heading}</h2>
            <p className={styles.muted}>{c.use.intro}</p>
            {c.use.cards.map((card, i) => {
              const key = `card-${i}`
              const total = c.use!.cards.length
              return (
                <div key={card.title} className={`${styles.card} ${i === 0 ? styles.cardFirst : ''}`}>
                  <div className={styles.cardLabel}>
                    {total > 1 ? (
                      <>
                        Card {i + 1} of {total}
                        {i === 0 ? <b> &middot; start here</b> : null}
                      </>
                    ) : (
                      <b>Start here</b>
                    )}{' '}
                    &middot; {card.label}
                  </div>
                  <h3>{card.title}</h3>
                  <p className={styles.small} style={{ margin: 0 }}>
                    {card.text}
                  </p>
                  <PromptBox
                    copyKey={key}
                    card={card}
                    open={Boolean(openPrompts[key])}
                    onToggle={() => setOpenPrompts((v) => ({ ...v, [key]: !v[key] }))}
                    buttonLabel={copyLabel(key, total > 1 ? `Copy card ${i + 1}` : 'Copy the prompt')}
                    buttonClass={copyClass(key)}
                    onCopy={copyText}
                    onOpen={() => askForEmailOnce('download')}
                    openLinks={c.use!.openLinks}
                    boxId={sectionId('use') + `-prompt-${i}`}
                  />
                </div>
              )
            })}
          </div>
        </section>
      ) : null}

      {c.ways && c.ways.items.length ? (
        <section id={sectionId('ways')} className={styles.section}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>&#10022; Pick your way</p>
            <h2>{c.ways.heading}</h2>
            <p className={styles.muted}>{c.ways.intro}</p>
            {c.ways.items.map((w, i) => (
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
      ) : null}

      <section id={sectionId('stuck')} ref={stuckRef} className={styles.section}>
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
              <p>{offer.bridge ?? c.bridge}</p>
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

      {c.noEmailAsk ? null : (
        <GiveawayEmailModal
          slug={slug}
          isOpen={emailOpen}
          onClose={() => setEmailOpen(false)}
          showCopiedBadge={askedAfterCopy}
          headingOverride={c.emailHeading}
        />
      )}
    </div>
  )
}

type CopyFn = (key: string, text: string, pre: HTMLElement | null) => void

function CommandBlock({
  label,
  text,
  copyKey,
  buttonLabel,
  buttonClass,
  onCopy,
}: {
  label: string
  text: string
  copyKey: string
  buttonLabel: string
  buttonClass: string
  onCopy: CopyFn
}) {
  const pre = useRef<HTMLPreElement>(null)
  return (
    <div className={styles.command}>
      <div className={styles.commandHead}>
        <span>{label}</span>
        <button type="button" className={buttonClass} onClick={() => onCopy(copyKey, text, pre.current)} aria-live="polite">
          {buttonLabel}
        </button>
      </div>
      <pre ref={pre}>{text}</pre>
    </div>
  )
}

function PromptBox({
  copyKey,
  card,
  open,
  onToggle,
  buttonLabel,
  buttonClass,
  onCopy,
  onOpen,
  openLinks,
  boxId,
}: {
  copyKey: string
  card: PackPromptCard
  open: boolean
  onToggle: () => void
  buttonLabel: string
  buttonClass: string
  onCopy: CopyFn
  onOpen: () => void
  openLinks: { label: string; href: string }[]
  boxId: string
}) {
  const pre = useRef<HTMLPreElement>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const filled = fillPrompt(card, values)
  const long = filled.length > 600
  const fieldId = (key: string) => `${boxId}-${key}`
  return (
    <>
      {card.fields && card.fields.length ? (
        <div className={styles.fields}>
          {card.fields.map((f) => (
            <label key={f.key} className={styles.field} htmlFor={fieldId(f.key)}>
              <span>{f.label}</span>
              {f.options ? (
                <select
                  id={fieldId(f.key)}
                  value={values[f.key] || ''}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                >
                  <option value="">{f.token}</option>
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : f.multiline ? (
                <textarea
                  id={fieldId(f.key)}
                  rows={3}
                  placeholder={f.token}
                  value={values[f.key] || ''}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                />
              ) : (
                <input
                  id={fieldId(f.key)}
                  type="text"
                  placeholder={f.token}
                  value={values[f.key] || ''}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                />
              )}
            </label>
          ))}
        </div>
      ) : null}
      <div className={styles.cardActions}>
        <button type="button" className={buttonClass} onClick={() => onCopy(copyKey, filled, pre.current)} aria-live="polite">
          {buttonLabel}
        </button>
        {openLinks.map((l) => (
          <a
            key={l.href}
            className={styles.chipBtn}
            href={l.href.includes('{prompt}') ? l.href.replace('{prompt}', encodeURIComponent(filled)) : l.href}
            target="_blank"
            rel="noopener"
            onClick={l.href.includes('{prompt}') ? onOpen : undefined}
          >
            {l.label} &#8599;
          </a>
        ))}
      </div>
      {card.fields && card.fields.length ? <div className={styles.promptLabel}>Your finished prompt</div> : null}
      <div id={boxId} className={`${styles.promptBox} ${open || !long ? styles.promptOpen : ''}`}>
        <pre ref={pre}>{filled}</pre>
      </div>
      {long ? (
        <button type="button" className={styles.expand} aria-controls={boxId} aria-expanded={open} onClick={onToggle}>
          {open ? 'Show less' : 'Show the whole prompt'}
        </button>
      ) : null}
      {card.example ? (
        <details className={`${styles.details} ${styles.exampleDetails}`}>
          <summary>See it work</summary>
          <div className={styles.dBody}>
            <div className={styles.beforeAfter}>
              <div>
                <h4>What you paste</h4>
                <pre>{card.example.before}</pre>
              </div>
              <div>
                <h4>What you get back</h4>
                <pre>{card.example.after}</pre>
              </div>
            </div>
          </div>
        </details>
      ) : null}
    </>
  )
}

function GuideBlock({
  section,
  copyKey,
  buttonLabel,
  buttonClass,
  onCopy,
}: {
  section: PackGuideSection
  copyKey: string
  buttonLabel: string
  buttonClass: string
  onCopy: CopyFn
}) {
  const s = section
  return (
    <div className={styles.guideBlock}>
      <h3>{s.title}</h3>
      {s.text ? <p className={styles.muted}>{s.text}</p> : null}
      {s.bullets ? (
        <ul className={styles.bullets}>
          {s.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}
      {s.steps ? (
        <ol className={styles.steps}>
          {s.steps.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ol>
      ) : null}
      {s.table ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {s.table.head.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.table.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {s.video ? (
        <figure className={styles.video}>
          <video src={s.video.src} controls playsInline preload="metadata" />
          {s.video.caption ? <figcaption>{s.video.caption}</figcaption> : null}
        </figure>
      ) : null}
      {s.prompt ? (
        <CommandBlock
          label={s.prompt.label}
          text={s.prompt.text}
          copyKey={copyKey}
          buttonLabel={buttonLabel}
          buttonClass={buttonClass}
          onCopy={onCopy}
        />
      ) : null}
      {s.links ? (
        <ul className={styles.links}>
          {s.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener">
                {l.label} &#8599;
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
