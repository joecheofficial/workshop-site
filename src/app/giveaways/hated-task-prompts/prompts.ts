import type { PackPromptCard } from '@/lib/pack-page'

// The nine Hated-Task prompts, generated from public/hated-task-prompts.html (the old page) on 2026-10-14.
// Titles, prompts, fields and worked examples are unchanged. This file is now the source of truth.
export const HATED_TASK_CARDS: PackPromptCard[] = [
  {
    label: 'fill in the blanks',
    title: "The inbox you've been avoiding",
    text: 'You open your email, feel the dread, and close it again.',
    prompt:
      "You are my email assistant. Below is a batch of emails. For each one, tell me in one line what it's really asking for, how urgent it is (now / this week / whenever), and draft a short reply in my voice: warm, direct, no filler, no exclamation points. If an email needs a decision only I can make, flag it and ask me the one question you need.\n\nHere are the emails:\n{{emails}}",
    fields: [
      {
        key: 'emails',
        label: 'Paste your emails',
        token: 'paste your emails here',
        multiline: true,
      },
    ],
  },
  {
    label: 'fill in the blanks',
    title: "The invoice they still haven't paid",
    text: 'Someone owes you money and you hate being the one to bring it up.',
    prompt:
      'Write a short, friendly payment reminder for an overdue invoice. Keep it warm and human, not stiff or legal. One short paragraph. Assume good intent, make it easy to pay, give one clear next step.\n\nClient: {{client}}\nAmount: {{amount}}\nInvoice sent: {{sent}}\nWas due: {{due}}\nThey pay via: {{method}}',
    fields: [
      {
        key: 'client',
        label: 'Client name',
        token: 'client name',
      },
      {
        key: 'amount',
        label: 'Amount owed',
        token: 'amount',
      },
      {
        key: 'sent',
        label: 'Date invoice sent',
        token: 'date',
      },
      {
        key: 'due',
        label: 'Date it was due',
        token: 'date',
      },
      {
        key: 'method',
        label: 'How they pay',
        token: 'payment link or method',
      },
    ],
  },
  {
    label: 'with a worked example',
    title: 'The call you now have to write up',
    text: 'The call ended, and now you have to turn 40 minutes of talking into notes.',
    prompt:
      'Turn this messy call into clean notes. Give me: a 3-line summary, the decisions we made, the action items with who owns each one and any dates mentioned, and anything left open that needs a follow-up. Keep it short and skimmable.\n\nTranscript or rough notes:\n{{transcript}}',
    fields: [
      {
        key: 'transcript',
        label: 'Paste the transcript or your rough notes',
        token: 'paste transcript or notes',
        multiline: true,
      },
    ],
    example: {
      before:
        "so yeah maria wants the landing page done, she'll send logo files, i said probably next friday, oh and she's not sure about the pricing section, budget is around 2k she thinks, need to check with her partner, we said we'd hop on again after she talks to him...",
      after:
        'Summary: Maria wants a landing page, budget ~$2k, pending partner sign-off. Draft target next Friday. Pricing section still undecided.\n\nDecisions: Proceed on the build, hold the pricing section for now.\n\nActions:\n- Maria: send logo files\n- Maria: confirm budget with her partner\n- Me: draft landing page by Fri\n- Both: follow-up call after partner talk\n\nOpen: pricing section direction.',
    },
  },
  {
    label: 'fill in the blanks',
    title: 'The follow-up you keep putting off',
    text: "You met someone good, meant to follow up, and now it's been two weeks.",
    prompt:
      'Write a short follow-up message to someone I met recently. Warm, specific, no pressure, and do not use "just checking in". Reference what we actually talked about and suggest one easy next step. Keep it to four sentences.\n\nContext (who they are, what we talked about, what I want next):\n{{context}}',
    fields: [
      {
        key: 'context',
        label: 'Who they are and what you want next',
        token: 'who they are, what you talked about, what you want',
        multiline: true,
      },
    ],
  },
  {
    label: 'with a worked example',
    title: 'The one idea you could post ten times',
    text: 'You have one good thought and no time to make content from it.',
    prompt:
      'Here is one idea I care about:\n{{idea}}\n\nTurn it into a week of content: three short social posts, one longer post, and two one-line hooks. Keep my voice plain and human. Short common words, no jargon, no hype, no exclamation points. Each one should stand on its own.',
    fields: [
      {
        key: 'idea',
        label: 'Your idea, in a few sentences',
        token: 'paste your idea',
        multiline: true,
      },
    ],
    example: {
      before:
        "most people think they need more clients. they actually need to stop doing the work that doesn't pay. i cut 3 services last year and made more money.",
      after:
        'Hook: You don\'t need more clients. You need to fire the work that doesn\'t pay.\n\nPost: Last year I cut three services. I made more money. Turns out "busy" and "paid" are not the same thing...\n\nPost: The fastest raise I ever gave myself was a subtraction, not an addition.\n\n(+ 1 long post and a second hook, all in your voice)',
    },
  },
  {
    label: 'fill in the blanks',
    title: 'The boring update nobody wants to write',
    text: 'A weekly report, a client update, a status email. Necessary. Dull.',
    prompt:
      "Write a clear, short status update from these rough notes. Structure it as: what got done, what's next, and anything blocked or needing a decision. Plain language, no fluff, easy to skim in twenty seconds.\n\nNotes:\n{{notes}}",
    fields: [
      {
        key: 'notes',
        label: 'Your rough notes',
        token: 'paste your notes',
        multiline: true,
      },
    ],
  },
  {
    label: 'fill in the blanks',
    title: "The email you're a little scared to send",
    text: 'You need to say no, push back, or set a boundary, and you keep rewriting it.',
    prompt:
      'Help me reply to a difficult email. I need to {{goal}} without hurting the relationship. Keep it kind, honest, and short. Do not over-apologize or over-explain. Give me two versions, one softer and one firmer.\n\nHere is the email and what I want to say:\n{{email}}',
    fields: [
      {
        key: 'goal',
        label: 'What you need to do',
        token: 'say no / push back / set a boundary',
        options: ['say no', 'push back', 'set a boundary', 'ask for more time', 'raise my price'],
      },
      {
        key: 'email',
        label: 'The email + what you want to say back',
        token: 'paste the email and your intent',
        multiline: true,
      },
    ],
  },
  {
    label: 'with a worked example',
    title: 'The week that runs you',
    text: 'Monday morning, and everything feels equally urgent.',
    prompt:
      'Here is everything on my plate this week:\n{{dump}}\n\nHelp me sort it. Tell me the three things that actually move something forward, what can wait, what I can drop or hand off, and what I should do first today. Be honest with me, not encouraging.',
    fields: [
      {
        key: 'dump',
        label: 'Dump everything on your plate',
        token: 'list it all here',
        multiline: true,
      },
    ],
    example: {
      before:
        "finish client proposal, reply to 40 emails, post on instagram, book flights, fix website bug, call accountant, plan next launch, buy mom's birthday gift, review contractor invoice, update the deck...",
      after:
        "Move the needle (do these): 1) client proposal, 2) plan next launch, 3) call accountant.\n\nDo first today: the proposal, it's the only one with money attached.\n\nCan wait: instagram, deck, flights.\n\nDrop or hand off: email triage and the website bug (use prompt 1, and send the bug to a dev).\n\nDon't lose: mom's gift. Order it in 2 minutes now.",
    },
  },
  {
    label: 'fill in the blanks',
    title: 'The question you keep answering over and over',
    text: 'You type nearly the same reply for the fifth time this month.',
    prompt:
      "I keep answering the same question. Here are a few times I've answered it:\n{{answers}}\n\nWrite me one clean, reusable answer I can save and tweak, plus a shorter one-line version. Keep it in my voice: warm, plain, and direct.",
    fields: [
      {
        key: 'answers',
        label: 'Paste 3-4 of your past answers',
        token: 'paste past answers',
        multiline: true,
      },
    ],
  },
]
