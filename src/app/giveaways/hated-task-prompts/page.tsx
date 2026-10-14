import PackPage from '@/components/giveaways/PackPage'
import { HATED_TASK_PROMPTS_PACK } from './pack'

// Hated-Task Prompt Pack on the pack page template (Illy, 2026-10-14). Words in ./pack.ts,
// the nine prompts in ./prompts.ts.

export default function HatedTaskPromptsPage() {
  return <PackPage slug="hated-task-prompts" content={HATED_TASK_PROMPTS_PACK} />
}
