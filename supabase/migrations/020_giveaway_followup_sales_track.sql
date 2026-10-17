-- 020_giveaway_followup_sales_track.sql
--
-- Illy approved 17 Oct 2026: IG sales-keyword leads (kw-book, kw-mastermind, kw-meta,
-- kw-ads, kw-team, kw-build) get their own two emails about the offer they asked about
-- (sales_day2, sales_day5), then the same day 14 / day 30 tail. Still nothing else.

alter table public.giveaway_followup_sends drop constraint if exists giveaway_followup_sends_step_check;
alter table public.giveaway_followup_sends add constraint giveaway_followup_sends_step_check
  check (step in ('dm_level', 'dm_ack', 'dm_human', 'email_quickwin', 'email_last', 'email_gift2', 'email_live', 'sales_day2', 'sales_day5'));

notify pgrst, 'reload schema';

-- UNDO (only if needed): re-run 019 to restore the 7-step constraint.
