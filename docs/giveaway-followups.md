# Free-gift follow-ups

Illy approved the outline on 17 Oct 2026 (Hormozi, $100M Money Models: don't go quiet after a free gift).
Copy + rules: `src/lib/giveaway-followups.ts`. Sender: `scripts/giveaway-followups.mjs`.
Sent log: Supabase `giveaway_followup_sends` (migrations 018 + 019, applied 17 Oct).

| When | What | Channel |
|---|---|---|
| Day 0 | the existing delivery email + one P.S. by gift level (`dayZeroPs`) | /api/lead-magnet |
| ~20h after their last IG message | "Where are you with AI right now? 1 / 2 / 3" | IG DM via ManyChat sendContent |
| they answer 1, 2 or 3 | "Got it, thank you / I'll email you one quick win" + level saved | IG DM |
| they answer in words | no bot reply; Lina pings Illy; their emails stop | Telegram |
| 48h after the gift | one quick win for their level + soft link (demo, or Meta course for builders) | email |
| 5 days after the gift | last email: workshop $67 (no deadline exists, so an honest "last one"), or Meta Ads Final Review 2 Nov, or the recorded course after 3 Nov | email |
| 14 days after the gift | a NEW free gift for their level they haven't grabbed (`GIFT_ORDER`) + one soft next-step line | email |
| 30 days after the gift | invite to a REAL live date from `LIVE_EVENTS` (2 to 21 days ahead), only if they showed a sign of life (answered the DM, or grabbed another gift); no real date = skipped | email |
| after that | nothing automatic (monthly or weekly is Joe's call); DB check constraint enforces it | |

Day 14 and day 30 stop rules: started any Stripe checkout (incl. the 72h bonus link), entered the
workshop demo/checkout, or has a call on Illy's or Joe's calendar = out. Opens can't be used: open and
click tracking are OFF on the mastermindshq.business Resend domain, so the sign-of-life proxy stands in.
To invite day-30 people, add a real event (with Illy-approved intro and, if paid, a price `note`) to
`LIVE_EVENTS`.

Levels: the DM answer wins, then the AI Levels quiz score, then the gift (`BUILDER_SOURCES`). Builder =
already in Claude Code / agents, the only level that sees the Meta Ads course.

Never sent to: anyone who grabbed before `GIVEAWAY_FOLLOWUPS_START`, IG sales keywords (`kw-*`), test
addresses, unsubscribes (`email_suppressions`), participants and Stripe buyers, Joe's close circle
(shared close-circle guard), the lead-machine do-not-contact list, dead email domains, anyone who wrote
to joe@ since the gift, anyone who answered the DM in words. Starters who enter the Website Workshop
demo / checkout get that funnel's own emails instead. A lookup failure skips the person for the run.

Instagram only allows a message within 24h of the person's last message, so the DM goes out 20 to
23.5h after it and is skipped otherwise.

```bash
node scripts/giveaway-followups.mjs --show                              # dry run, full text
node scripts/giveaway-followups.mjs --render-dir <dir>                  # every variant to files
node scripts/giveaway-followups.mjs --test-to delivered@resend.dev      # every email to the sink
node scripts/giveaway-followups.mjs --only <email> --force-step dm_level [--live]   # one test DM
GIVEAWAY_FOLLOWUPS_ENABLED=1 GIVEAWAY_FOLLOWUPS_START=<iso> node scripts/giveaway-followups.mjs --live --alert
```

Schedule (only after Illy's go on the final text): illy crontab, every 15 min, `lockf` guarded, log
`~/.myos/logs/giveaway-followups.log`.
