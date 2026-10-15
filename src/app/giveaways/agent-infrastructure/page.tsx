import PackPage from '@/components/giveaways/PackPage'
import { AGENT_INFRASTRUCTURE_PACK } from './pack'

// Advanced infrastructure for multi-agent AI systems, on the pack page template
// (Illy approved 15 Oct 2026). Email ask, layout and the end offer live in
// PackPage; words in ./pack.ts.

export default function AgentInfrastructurePage() {
  return <PackPage slug="agent-infrastructure" content={AGENT_INFRASTRUCTURE_PACK} />
}
