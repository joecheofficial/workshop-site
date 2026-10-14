import PackPage from '@/components/giveaways/PackPage'
import { TERMINAL_TO_CLAUDE_DESKTOP_PACK } from './pack'

// Terminal to Claude Desktop giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

export default function TerminalToClaudeDesktopPage() {
  return <PackPage slug="terminal-to-claude-desktop" content={TERMINAL_TO_CLAUDE_DESKTOP_PACK} />
}
