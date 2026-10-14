'use client'

import { useMemo, useRef, useState } from 'react'
import { usePackAsk } from '@/components/giveaways/PackPage'

// The Cost Stack calculator inside the pack page (Illy, 2026-10-14). Same tools, list prices,
// inputs, maths and audit prompt as the old page. Every number comes from what the visitor types.
// The old member-results layer (named graduates and their savings) is not here: pack pages carry
// no testimonials (docs/giveaways/PROCESS.md, FTC audit 2026-09-23).

type Tool = { id: string; name: string; what: string; defaultMonthly: number; rangeLabel: string }

const TOOLS: Tool[] = [
  { id: 'gohighlevel', name: 'GoHighLevel', what: 'Funnels, CRM, booking, email, all in one', defaultMonthly: 97, rangeLabel: '$97 to $497 a month' },
  { id: 'kajabi', name: 'Kajabi', what: 'Courses, memberships, landing pages', defaultMonthly: 149, rangeLabel: '$149 to $399 a month' },
  { id: 'mailchimp', name: 'Mailchimp', what: 'Email list and broadcasts', defaultMonthly: 13, rangeLabel: '$13 to $350 a month, depending on list size' },
  { id: 'shopify', name: 'Shopify', what: 'Storefront and checkout', defaultMonthly: 39, rangeLabel: '$39 to $105 a month' },
  { id: 'manychat', name: 'ManyChat', what: 'DM automation and comment triggers', defaultMonthly: 15, rangeLabel: '$15 to $65 a month' },
  { id: 'vsl', name: 'Video or VSL hosting', what: 'Wistia, Vimeo Pro, or similar', defaultMonthly: 20, rangeLabel: '$20 to $99 a month' },
  { id: 'sitebuilder', name: 'Squarespace or Wix', what: 'Website builder subscription', defaultMonthly: 16, rangeLabel: '$16 to $49 a month' },
  { id: 'hosting', name: 'Website hosting', what: 'Whatever keeps the site up', defaultMonthly: 10, rangeLabel: '$10 to $50 a month' },
]

function money(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US')
}

function num(v: string): number {
  const n = Number(v.replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

export default function CostStackCalculator() {
  const ask = usePackAsk()
  const pre = useRef<HTMLPreElement>(null)
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [monthly, setMonthly] = useState<Record<string, number>>(() =>
    Object.fromEntries(TOOLS.map((t) => [t.id, t.defaultMonthly])),
  )
  const [devAnnual, setDevAnnual] = useState(0)
  const [vaMonthly, setVaMonthly] = useState(0)
  const [quotedBuild, setQuotedBuild] = useState(0)
  const [copied, setCopied] = useState<'idle' | 'copied' | 'selected'>('idle')

  const picked = TOOLS.filter((t) => selected[t.id])
  const yearly = picked.reduce((sum, t) => sum + (monthly[t.id] || 0) * 12, 0) + devAnnual + vaMonthly * 12

  const auditPrompt = useMemo(() => {
    const lines: string[] = []
    picked.forEach((t) => {
      lines.push(`- ${t.name}: ${money(monthly[t.id] || 0)} a month`)
    })
    if (devAnnual > 0) lines.push(`- Web developer or designer: ${money(devAnnual)} a year`)
    if (vaMonthly > 0) lines.push(`- Assistant or VA: ${money(vaMonthly)} a month`)
    if (quotedBuild > 0) lines.push(`- A build I was quoted ${money(quotedBuild)} for and never did`)
    const stack = lines.length > 0 ? lines.join('\n') : '- (list your tools here, one per line, with what you pay)'
    return `I want to work out which parts of my software stack I could run myself instead of paying for.
Here is what I currently pay for:
${stack}
Do this in order. Do not ask me questions first.
1. For each line, tell me what job it actually does in my business. Not the feature list. The job.
2. Sort them into three groups: I could replace this myself in an afternoon, I could replace this with a week of work, and I should keep paying for this.
3. For anything in the first group, give me the specific replacement and the first step to move it. Name the tool or the approach, not a category.
4. Tell me the order to do them in, easiest and highest cost first.
5. Flag anything where replacing it would put my data, my payments, or my client relationships at risk. I would rather keep paying than break something that works.
6. Finish with the one I should start with this week and why.
Be direct about which ones are not worth replacing. I am not trying to cancel everything. I am trying to stop paying for work I can now do myself.`
  }, [picked, monthly, devAnnual, vaMonthly, quotedBuild])

  async function copy() {
    try {
      await navigator.clipboard.writeText(auditPrompt)
      setCopied('copied')
    } catch {
      const el = pre.current
      if (el) {
        const range = document.createRange()
        range.selectNodeContents(el)
        const s = window.getSelection()
        s?.removeAllRanges()
        s?.addRange(range)
      }
      setCopied('selected')
    }
    window.setTimeout(() => setCopied('idle'), 2600)
    ask('copy')
  }

  const box = 'rounded-2xl border border-white/10 bg-[#1c1a21] p-4'
  const input =
    'w-28 shrink-0 rounded-lg border border-white/20 bg-[#0e0d11] px-3 py-2 text-right text-[15px] text-[#FCF4EB] focus:border-[#9D8FE0] focus:outline-none'

  return (
    <div className="grid gap-4">
      <div className={box}>
        <h3 className="mb-1 text-[17px] font-bold">1. Tick what you pay for</h3>
        <p className="mb-3 text-[14px] text-[#c3bccd]">
          Each one starts at its cheapest public plan. Change it to what you really pay.
        </p>
        <div className="grid gap-2">
          {TOOLS.map((t) => (
            <div key={t.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-[#24212b] px-3 py-3">
              <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 accent-[#9D8FE0]"
                  checked={Boolean(selected[t.id])}
                  onChange={() => setSelected((s) => ({ ...s, [t.id]: !s[t.id] }))}
                />
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold">{t.name}</span>
                  <span className="block text-[13px] text-[#9790a3]">
                    {t.what} · {t.rangeLabel}
                  </span>
                </span>
              </label>
              <span className="flex items-center gap-2 text-[13px] text-[#9790a3]">
                $
                <input
                  aria-label={`${t.name}, what you pay a month`}
                  inputMode="decimal"
                  className={input}
                  value={monthly[t.id] ?? 0}
                  onChange={(e) => setMonthly((m) => ({ ...m, [t.id]: num(e.target.value) }))}
                />
                a month
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={box}>
        <h3 className="mb-3 text-[17px] font-bold">2. And the people</h3>
        <div className="grid gap-2">
          {[
            { label: 'Web developer or designer', unit: 'a year', value: devAnnual, set: setDevAnnual },
            { label: 'Assistant or VA', unit: 'a month', value: vaMonthly, set: setVaMonthly },
            { label: 'A build you were quoted for and never did', unit: 'once', value: quotedBuild, set: setQuotedBuild },
          ].map((row) => (
            <label key={row.label} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#24212b] px-3 py-3">
              <span className="text-[15px] font-semibold">{row.label}</span>
              <span className="flex items-center gap-2 text-[13px] text-[#9790a3]">
                $
                <input inputMode="decimal" className={input} value={row.value} onChange={(e) => row.set(num(e.target.value))} />
                {row.unit}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className={`${box} border-[#9D8FE0]/50`}>
        <h3 className="mb-1 text-[17px] font-bold">3. Your total</h3>
        <p className="font-mono text-[34px] leading-tight text-[#F5C3C6]" aria-live="polite">
          {money(yearly)} <span className="text-[15px] text-[#9790a3]">a year</span>
        </p>
        {quotedBuild > 0 ? (
          <p className="mt-1 text-[14px] text-[#c3bccd]">Plus a {money(quotedBuild)} build you never did.</p>
        ) : null}
        <p className="mt-2 text-[13px] text-[#9790a3]">
          This is cost you could stop carrying. It is not revenue, not a return, and not a promise about your business.
        </p>
      </div>

      <div className={box}>
        <h3 className="mb-1 text-[17px] font-bold">4. Ask the AI what to replace</h3>
        <p className="mb-3 text-[14px] text-[#c3bccd]">
          Your list is already in the prompt. Copy it, open a new chat in Claude or ChatGPT, paste and send.
        </p>
        <div className="mb-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={copy}
            aria-live="polite"
            className={`col-span-2 min-h-[52px] rounded-xl px-4 font-bold text-[#151515] ${copied === 'idle' ? 'bg-[#9D8FE0]' : 'bg-[#a8dcbd]'}`}
          >
            {copied === 'copied' ? 'Copied. Now paste it into a new chat.' : copied === 'selected' ? 'Selected. Press copy on your keyboard.' : 'Copy my audit prompt'}
          </button>
          <a
            className="flex min-h-[46px] items-center justify-center rounded-xl border border-white/20 px-3 text-[14.5px] font-semibold"
            href={`https://claude.ai/new?q=${encodeURIComponent(auditPrompt)}`}
            target="_blank"
            rel="noopener"
            onClick={() => ask('download')}
          >
            Open in Claude &#8599;
          </a>
          <a
            className="flex min-h-[46px] items-center justify-center rounded-xl border border-white/20 px-3 text-[14.5px] font-semibold"
            href={`https://chatgpt.com/?q=${encodeURIComponent(auditPrompt)}`}
            target="_blank"
            rel="noopener"
            onClick={() => ask('download')}
          >
            Open in ChatGPT &#8599;
          </a>
        </div>
        <pre
          ref={pre}
          className="max-h-[260px] overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-[#0e0d11] p-3 font-mono text-[12.5px] leading-relaxed text-[#ddd5e6] [overflow-wrap:anywhere]"
        >
          {auditPrompt}
        </pre>
      </div>
    </div>
  )
}
