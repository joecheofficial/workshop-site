// Copied character for character from the old page.tsx.
export const FABLE_AUDIT_PROMPT = `You are auditing this codebase to decide where Claude Fable 5 is actually worth using instead of Sonnet.

Important frame:
- Fable is expensive. Do not recommend it for routine work.
- Sonnet should be the default for contained edits, short summaries, simple debugging, and normal feature work.
- Fable is only justified when the task is long-horizon, high-context, ambiguous, risky, expensive to redo, or benefits from multi-stage agent execution.
- Use the surgeon/pickle-jar rule: do not hire a surgeon to open a pickle jar.

Audit the repository and return:

1. Executive verdict
- Should this repo use Fable at all right now?
- If yes, for which 3-5 workflows?
- If no, what should stay on Sonnet?

2. Ranked Fable opportunities
For each opportunity, include:
- Workflow name
- Why Sonnet may struggle
- Why Fable may be worth the cost
- Risk if the model gets it wrong
- Required files, services, data, and tools
- Verification plan
- Estimated first experiment under 90 minutes
- Decision: Sonnet, Opus, Fable, or Managed Agent

3. Pickle jar list
List tasks that sound impressive but should not use Fable.

4. Agent readiness
Identify any workflows that need Claude Managed Agents or another agent harness because they require memory, tools, permissions, sandboxes, tracing, or long-running execution.

5. First prototype
Give me one copy-paste task spec I can run today in Claude Code to test the highest-value Fable use case safely.

Be blunt. Save money where possible. Recommend Fable only when the value is obvious.`
