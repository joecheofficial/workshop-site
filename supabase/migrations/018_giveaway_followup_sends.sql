-- 018_giveaway_followup_sends.sql
--
-- Free-gift follow-up sequence (Illy, 17 Oct 2026): day 1 IG DM, day 2-3 quick
-- win email, day 5-7 last email. Sender: scripts/giveaway-followups.mjs.
--
-- One row per (email, step), written BEFORE each send, so two overlapping runs
-- can never message the same person twice. A failed send deletes its claim.
-- `level` is set on the dm_ack row (their own answer) and on email rows (the
-- level the copy was chosen for). dm_human rows are a stop marker: the person
-- wrote back in their own words, so a human answers and the bot stays quiet.

create table if not exists public.giveaway_followup_sends (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  step text not null check (step in ('dm_level', 'dm_ack', 'dm_human', 'email_quickwin', 'email_last')),
  level text check (level in ('starter', 'everyday', 'builder')),
  source text,
  detail jsonb,
  sent_at timestamptz not null default now(),
  message_id text,
  unique (email, step)
);

comment on table public.giveaway_followup_sends is
  'Free-gift follow-ups sent by workshop-site scripts/giveaway-followups.mjs. One row per (email, step), so nobody gets the same message twice.';

-- Service key only (the sender script). No public access.
alter table public.giveaway_followup_sends enable row level security;

notify pgrst, 'reload schema';

-- UNDO (only if needed):
-- drop table if exists public.giveaway_followup_sends;
