-- 019_giveaway_followup_day14_day30.sql
--
-- Illy approved two more automatic steps on 17 Oct 2026: email_gift2 (day 14, a new
-- free gift for their level) and email_live (day 30, a real upcoming live date, or
-- nothing). Still nothing after day 30: the check constraint is the guard.

alter table public.giveaway_followup_sends drop constraint if exists giveaway_followup_sends_step_check;
alter table public.giveaway_followup_sends add constraint giveaway_followup_sends_step_check
  check (step in ('dm_level', 'dm_ack', 'dm_human', 'email_quickwin', 'email_last', 'email_gift2', 'email_live'));

notify pgrst, 'reload schema';

-- UNDO (only if needed):
-- alter table public.giveaway_followup_sends drop constraint giveaway_followup_sends_step_check;
-- alter table public.giveaway_followup_sends add constraint giveaway_followup_sends_step_check
--   check (step in ('dm_level', 'dm_ack', 'dm_human', 'email_quickwin', 'email_last'));
