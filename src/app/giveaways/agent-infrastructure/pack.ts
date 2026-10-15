import type { PackPageContent } from '@/lib/pack-page'

// Words for the multi-agent infrastructure guide pack page (moved onto PackPage
// 15 Oct 2026). Layout, the email ask and the end offer live in
// src/components/giveaways/PackPage.tsx. All six layers come from the old page.

export const AGENT_INFRASTRUCTURE_PACK: PackPageContent = {
  slug: 'agent-infrastructure',
  level: 'builder',
  hero: {
    title: 'Here is the agent infrastructure guide.',
    free: 'It is free.',
    lede: 'For builders who have moved past single agents. Six layers that turn a pile of agents into one system that remembers, finds its way, learns and routes work: memory, navigation, self-learning, coordination, dispatch and reusable parts.',
    button: {
      label: 'Read the six layers',
      meta: 'free · on this page',
      target: 'guide',
    },
    ticks: ['No sign-up', 'No card', 'For Claude Code builders'],
  },
  jumps: [
    {
      target: 'guide',
      label: 'The six layers',
      text: 'What each layer does, and the tools and files behind it.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'Where to start, and what to skip for now.',
    },
  ],
  guide: {
    eyebrow: 'The guide',
    heading: 'Six layers that make agents work as one system',
    intro:
      'Most people stop at the agent layer. They build ten agents, maybe twenty, and the system gets harder to manage instead of easier. The fix is not more agents. It is infrastructure. Agents that cannot remember the last session, cannot see how the code connects and cannot share what they know do a fraction of what they could.',
    sections: [
      {
        title: '01. The memory and knowledge stack',
        text: 'Agents that forget are just expensive search boxes. Three tools give your agents memory, a map of the code, and shared knowledge across the whole system.',
        bullets: [
          'AgentMem: a local worker service that gives all your agents shared, searchable memory. Agents write to it at the end of a session and recall from it at the start. They remember what worked, what a user said last week and what was decided. Install it once with npm and every agent can use it.',
          'Graphify: a Python tool that reads your whole agent codebase and builds a knowledge graph. Every function, class and module is a node, every dependency is a link. You get a map you can query of how the system connects. With 20+ agents sharing code, it is how you know for sure what uses what.',
          'Graphiti: a knowledge graph by Zep that tracks time. AgentMem answers "what do I remember?". Graphiti answers "what does the whole system know, and when did it learn it?". Every observation is timestamped and linked by who and what it is about, so the graph gets more useful every day.',
        ],
      },
      {
        title: '02. The index system',
        text: 'Any agent should find its way in 3 reads. A flat filing habit makes the whole system easy to navigate without searching through files.',
        bullets: [
          'INDEX.md in every folder: it says what is in the folder and where things live. It points to things, it does not hold them. With 60+ agents in a folder, an agent that reads a good INDEX.md knows exactly what to open next.',
          'CONTEXT.md in every project: what the code does not show. Current state, decisions and why, work in progress, what failed, and the limits. Agents write and update it too, so the next agent starts with full context.',
          'ROUTING-SLIM.md at the top: one line per area, pointing to the right INDEX or CONTEXT file. From anywhere, three reads gets an agent to full context: ROUTING-SLIM.md, then INDEX.md, then CONTEXT.md.',
        ],
      },
      {
        title: '03. Self-learning for each agent',
        text: 'Agents that do the same thing the same way are not learning. This pattern makes each agent better over time, with no retraining.',
        steps: [
          'Recall at the start: the agent pulls from AgentMem only what matters for this task, not the whole history.',
          'Observe during the session: it keeps notes on what it tried, what worked, what the user liked and what failed. If it learned something, it writes it down.',
          'Flush at the end: it sends its notes to Graphiti and updates its own CONTEXT.md with decisions and changes. Over time it stops asking what it should do and starts asking what it already knows.',
        ],
      },
      {
        title: '04. Project manager architecture',
        text: 'PMs do not execute. They coordinate. This is how project manager agents run a whole area without a human in the loop.',
        bullets: [
          'One PM per major area: each owns its area fully, with its own CONTEXT.md, memory, people, open items, limits and goals. It reads that at the start of a session and updates it at the end. A top-level agent pulls signals from every PM for the morning brief.',
          'Five things a good PM does: it reads agent outputs and logs to see what happened. It spots what needs action, like billing issues, missed milestones, relationships at risk and open loops. It routes work to specialist agents instead of doing it. It briefs the human only when a decision is needed or something is out of the ordinary. It updates its CONTEXT.md so the next session starts right.',
          'PMs route, specialists execute: the moment a PM starts doing a specialist\'s work, it loses the height it needs to see the whole area. Keep them apart and one PM can run an area with dozens of moving parts.',
        ],
      },
      {
        title: '05. Dispatch and models',
        text: 'The right task, to the right agent, with the right model.',
        bullets: [
          'Pick the model by the task: architecture decisions, new agent builds and hard multi-file problems get the most capable model. Everyday tasks, writing and coordination get a mid-tier model. Fast, high-volume jobs like sorting, routing and short lookups get a light model. Getting this right cuts costs without losing quality.',
          'Three questions for every task: which area is it? (ROUTING-SLIM.md answers.) Which specialist handles it? (INDEX.md and the PM\'s CONTEXT.md answer.) Does it need to run now, or can it wait in a queue? Most tasks can wait. Only decisions and replies to people need to happen right away.',
          'Run everything in parallel that can be: five separate research tasks become five agents running at once. A task that combines their results waits until all five are done. The default question is: what is the most work I can send out right now without one job blocking another?',
        ],
      },
      {
        title: '06. Recipes, skills and agents',
        text: 'Write it once. Every agent in the system gets better.',
        bullets: [
          'Recipes, the utility layer: small, single-job scripts in a shared folder every agent can use. One sends a WhatsApp message, one looks up a CRM contact, one posts a Telegram alert. Improve a recipe and every agent that uses it improves. Fix a bug once, in one place.',
          'Skills, packaged know-how: Claude Code slash commands, available in any session. A skill is a set of instructions that holds real expertise about one kind of work. A hook-writing skill does not just say "write a hook". It holds the framework, the voice profile, the format and how to judge the result.',
          'Agents, complete jobs on their own: programs with their own CONTEXT.md, memory, scope and outside services. They use recipes inside. The rule: recipes own the how, agents own the what and why, skills own the way of thinking. Keep them in their lanes and the system stays easy to maintain, extend and debug.',
        ],
      },
      {
        title: 'How the six layers work together',
        table: {
          head: ['Layer', 'What it gives the system'],
          rows: [
            ['Foundation', 'Recipes and skills: reusable parts any agent or session can use without rebuilding.'],
            ['Navigation', 'The index system. INDEX.md, CONTEXT.md and ROUTING-SLIM.md let any agent find its way in three reads.'],
            ['Memory', 'AgentMem, Graphify and Graphiti: each agent\'s memory, a map of the code, and shared knowledge.'],
            ['Coordination', 'PM agents gather signals and route work to specialists. Humans get a brief. Agents handle the rest.'],
            ['Learning', 'Observe, flush, update. Every agent writes at the end of a session, so the system builds up know-how.'],
            ['Dispatch', 'The right task to the right agent with the right model. Parallel by default.'],
          ],
        },
      },
    ],
  },
  stuck: [
    {
      q: 'Where do I start?',
      a: 'With the index system. An INDEX.md in each folder, a CONTEXT.md in each project and one ROUTING-SLIM.md at the top. It needs no new tools, and every other layer leans on it.',
    },
    {
      q: 'I only have one or two agents',
      a: 'This guide is for people past single agents. Start with a CONTEXT.md for each project and come back when the system starts to feel harder to manage.',
    },
    {
      q: 'Which model should I use for what?',
      a: 'See layer 05: the most capable model for architecture and hard builds, a mid-tier one for everyday work, a light one for sorting, routing and short lookups.',
    },
    {
      q: 'My PM agent keeps doing the work itself',
      a: 'Tell it in its instructions to find and route, never to execute, and give it a specialist to hand each kind of work to. See layer 04.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Tell me which layer you are on and what you are running.',
    },
  ],
  bridge:
    'You came for the infrastructure behind a multi-agent system. The same Claude Code setup can also do a job that pays off quickly: getting your website found.',
  emailHeading: 'Want the six layers by email too?',
}
