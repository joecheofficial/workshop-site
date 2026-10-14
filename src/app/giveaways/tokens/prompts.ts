// Prompts copied verbatim from the old page (src/app/giveaways/<slug>/page.tsx).

export const RTK_COMMANDS = `brew install rtk
mkdir -p ~/.claude
rtk init -g --auto-patch
# quit and reopen Claude Code, then work normally for a day or two
rtk gain`

export const STARTUP_TEMPLATE = `Read my CLAUDE.md (and AGENTS.md if I have one). Then read Joe Che's Ultimate CLAUDE.md at https://workshop.mastermindshq.business/giveaways/claude-md

Audit mine against his:
1. What useful rules or sections am I missing?
2. What in mine is stale, repeated, or too long?
3. What in his does not apply to my business? Skip those.

Then upgrade my CLAUDE.md. Add only what is relevant to how I actually work. Keep it short: move long details into separate docs files and point to them. Show me the changes before you save.`

