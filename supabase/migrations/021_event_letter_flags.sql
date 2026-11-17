-- Signals for scheduled event letters (src/lib/letter-schedule.ts) that the
-- site cannot see itself: who replied DONE, who came to the class, whether the
-- recording link is ready. Written by the Studio job
-- agents/events-manager/voice-class-letters/ (Illy 17 Nov 2026).
-- email = '*' marks an event-level flag.
CREATE TABLE IF NOT EXISTS event_letter_flags (
  event_slug text NOT NULL,
  email text NOT NULL,
  flag text NOT NULL,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (event_slug, email, flag)
);

ALTER TABLE event_letter_flags ENABLE ROW LEVEL SECURITY;
