// Free AI Tools giveaway batch (2026-10-07, approved by Illy 2026-10-08).
// The first ten were GENERATED from agents/repo-giveaways/data/batch-2026-10-07/*/setup-notes.md
// + picks.json by the free-ai-tools-pages session. Week 2 reels (VOICE, DATA, NOTES, BROWSER,
// STYLE, MEMORY; Illy approved 2026-10-16) were added by hand from each tool's own GitHub
// README, docs and pricing page (research notes: tasks/swarms/2026-10-16-week2-setup-notes/).
// Page copy and the delivery email both read from this table, so a fix here fixes both.
// One entry per /giveaways/<slug> page.

import type { GiveawayLevel, GiveawayOfferId } from './giveaway-offers'

export type FreeAiToolLink = { label: string; url: string }

export type FreeAiTool = {
  slug: string
  keyword: string
  name: string
  tagline: string
  subline: string
  toolUrl: string
  primaryLabel: string
  intro: string
  steps: string[]
  howIUse: string[]
  goodToKnow: string
  links: FreeAiToolLink[]
  githubUrl: string
  stars: number
  license: string
  why: string
  // Optional extras (Week 2, 2026-10-16). Absent on the first ten, which keep their old page.
  /** Buyer's AI level, picks the end offer. Default beginner. Terminal or Claude Code setup = builder. */
  level?: GiveawayLevel
  /** Who it is for, one plain sentence. */
  who?: string
  /** What you need, said up front next to the download button. */
  needs?: string
  /** Hero ticks, when the default "Free and open source" line would not be the honest one. */
  ticks?: string[]
  /** One prompt to paste into Claude Code that installs and sets it up. */
  claudePrompt?: string
  /** "What you need" list in the guide. */
  requirements?: string[]
  /** A copyable prompt for after it is set up. */
  usePrompt?: { title: string; text: string }
  /** "It does / It does not". */
  does?: string[]
  doesNot?: string[]
  /** Honest limits, costs and licence. */
  limits?: string[]
  /** Tool-specific "Stuck?" lines, shown before the general ones. */
  stuck?: { q: string; a: string }[]
  /** A named paid offer that fits this gift better than the level default (giveaway-offers PAGE_OFFERS). */
  offerId?: GiveawayOfferId
}

export const FREE_AI_TOOLS: FreeAiTool[] = [
  {
    "slug": "free-ai-claude-skills",
    "keyword": "SKILL",
    "name": "Claude Skills",
    "tagline": "Teach Claude your way of working once.",
    "subline": "Anthropic's free library of Claude skills: real Word, PowerPoint and Excel files, your brand on every one.",
    "toolUrl": "https://github.com/anthropics/skills",
    "primaryLabel": "Open the skill library",
    "intro": "Anthropic's own library of Claude skills. A skill is a short recipe that teaches Claude how to do one job your way, every time.",
    "steps": [
      "Open Claude (claude.ai or the desktop app) and go to Settings, then Capabilities.",
      "Turn on Skills. Many from this library are already there, ready to switch on.",
      "Ask Claude to use one, for example: \"Use the skill creator to make a skill for how I write client proposals.\""
    ],
    "howIUse": [
      "Start with three: the brand guidelines skill, the PowerPoint skill and the skill creator.",
      "When Claude gets something right, ask it to save that as a skill so it stays right."
    ],
    "goodToKnow": "You need a paid Claude plan to use skills. The library is made by Anthropic, the company behind Claude.",
    "links": [
      {
        "label": "The skill library",
        "url": "https://github.com/anthropics/skills"
      },
      {
        "label": "How to turn skills on (Anthropic help page)",
        "url": "https://support.claude.com/en/articles/12512180-using-skills-in-claude"
      }
    ],
    "githubUrl": "https://github.com/anthropics/skills",
    "stars": 179983,
    "license": "Apache-2.0 (document skills source-available)",
    "why": "Anthropic's own skill library: teach Claude your process once, get real Word/PowerPoint/Excel files and on-brand output."
  },
  {
    "slug": "free-ai-handy",
    "keyword": "HANDY",
    "name": "Handy",
    "tagline": "Talk instead of type. In any app.",
    "subline": "Hold a key, say it, let go. The words appear wherever your cursor is. Free, and it runs on your own computer.",
    "toolUrl": "https://handy.computer",
    "primaryLabel": "Download Handy",
    "intro": "A free app that types what you say. Hold a key, talk, let go, and the text appears wherever your cursor is.",
    "steps": [
      "Go to handy.computer and download the Mac or Windows version. Install it like any other app.",
      "Open it and allow the microphone and accessibility permissions it asks for. That's how it types for you.",
      "Pick your shortcut key in Settings. Then click into any text box, hold the key, talk, and let go."
    ],
    "howIUse": [
      "Use it for long AI prompts. You'll give the AI far more context, and the answers get better.",
      "Right after a call, talk out who, what, next step and deadline into your notes app."
    ],
    "goodToKnow": "It's free and open source, and the speech is turned into text on your own computer, not in the cloud. The first run downloads a speech model, so give it a minute.",
    "links": [
      {
        "label": "Download Handy",
        "url": "https://handy.computer"
      },
      {
        "label": "The code on GitHub",
        "url": "https://github.com/cjpais/Handy"
      }
    ],
    "githubUrl": "https://github.com/cjpais/Handy",
    "stars": 33081,
    "license": "MIT",
    "why": "Free offline voice-to-text: hold a key, talk, and the words appear in any app. Biggest daily time saver for non-typists."
  },
  {
    "slug": "free-ai-anythingllm",
    "keyword": "BRAIN",
    "name": "AnythingLLM",
    "tagline": "A private ChatGPT that has read your files.",
    "subline": "Drag in your course PDFs, SOPs and client notes, then ask questions and get answers with sources.",
    "toolUrl": "https://anythingllm.com/download",
    "primaryLabel": "Download AnythingLLM",
    "intro": "A free desktop app that turns your own files into an AI you can ask questions. Think of it as a private ChatGPT that has read your documents.",
    "steps": [
      "Download the desktop app for Mac or Windows and install it like any other app.",
      "When it asks which AI to use, pick the built-in one to keep everything on your computer, or paste in your Claude or OpenAI key for stronger answers.",
      "Make a workspace (for example \"My course\"), drag in your PDFs and docs, and start asking questions."
    ],
    "howIUse": [
      "Make one workspace per topic: course, clients, team how-tos. Answers stay cleaner.",
      "Ask it to show sources, then click through to check the answer against your own document."
    ],
    "goodToKnow": "Free and open source (MIT), made by Mintplex Labs. With the built-in AI your files never leave your computer. If you plug in a cloud AI, your questions go to that company.",
    "links": [
      {
        "label": "Download AnythingLLM",
        "url": "https://anythingllm.com/download"
      },
      {
        "label": "The code on GitHub",
        "url": "https://github.com/Mintplex-Labs/anything-llm"
      }
    ],
    "githubUrl": "https://github.com/Mintplex-Labs/anything-llm",
    "stars": 66781,
    "license": "MIT",
    "why": "Desktop app that lets you chat with your own course PDFs, SOPs and client notes, privately, with sources."
  },
  {
    "slug": "free-ai-stirling-pdf",
    "keyword": "PAPER",
    "name": "Stirling PDF",
    "tagline": "Every PDF tool you need, in one free app.",
    "subline": "Merge, compress, sign, redact and convert, without uploading client contracts to random websites.",
    "toolUrl": "https://stirlingpdf.com",
    "primaryLabel": "Download Stirling PDF",
    "intro": "One free app with 50+ PDF tools: merge, split, compress, convert, sign, redact (black out) and turn scans into text.",
    "steps": [
      "Go to stirlingpdf.com and download the desktop app for Mac or Windows.",
      "Install and open it like any other app.",
      "Drag a PDF in, pick a tool on the left (Merge, Compress, Sign, Redact) and save the result."
    ],
    "howIUse": [
      "Use Compress before you email big files. Most clients' inboxes will thank you.",
      "Use Redact before you share anything with bank details, ID numbers or health info."
    ],
    "goodToKnow": "Free for individual use. Teams and big companies have paid plans. Made by Stirling Tools, 94k stars, very actively updated.",
    "links": [
      {
        "label": "Download Stirling PDF",
        "url": "https://stirlingpdf.com"
      },
      {
        "label": "The code on GitHub",
        "url": "https://github.com/Stirling-Tools/Stirling-PDF"
      }
    ],
    "githubUrl": "https://github.com/Stirling-Tools/Stirling-PDF",
    "stars": 93701,
    "license": "MIT (core)",
    "why": "50+ PDF tools in one free desktop app (merge, compress, sign, redact, OCR) so client contracts stop going to random upload sites."
  },
  {
    "slug": "free-ai-buzz",
    "keyword": "CALLS",
    "name": "Buzz",
    "tagline": "Turn every call into text you can use.",
    "subline": "Free, offline transcription for calls, voice notes and videos, plus subtitle files for your reels.",
    "toolUrl": "https://chidiwilliams.github.io/buzz/",
    "primaryLabel": "Get Buzz",
    "intro": "A free app that turns recordings into text on your own computer: calls, voice notes, videos. It also makes subtitle files for reels.",
    "steps": [
      "Open the GitHub page and follow the download link for Mac or Windows (the files are hosted on SourceForge, which is the official link).",
      "Install it. If Windows shows a blue \"Windows protected your PC\" warning, that's normal for small free apps: click More info, then Run anyway. On a Mac, if it says the app can't be opened, right-click the app, choose Open, then click Open again.",
      "Open Buzz, drop in a recording, press start, then export as TXT (text) or SRT (subtitles)."
    ],
    "howIUse": [
      "Paste the transcript into Claude and ask: \"Pull out 5 post ideas and 3 quotes from this call.\"",
      "Export SRT files and drop them into CapCut or your editor for instant subtitles."
    ],
    "goodToKnow": "Free and open source (MIT). On Mac it needs an Apple chip (M1 or newer). Everything happens offline, nothing is uploaded.",
    "links": [
      {
        "label": "Buzz downloads and guide",
        "url": "https://chidiwilliams.github.io/buzz/"
      },
      {
        "label": "The code on GitHub",
        "url": "https://github.com/chidiwilliams/buzz"
      }
    ],
    "githubUrl": "https://github.com/chidiwilliams/buzz",
    "stars": 21862,
    "license": "MIT",
    "why": "Offline transcription of calls, voice notes and videos, with subtitle files and speaker labels; turns recordings into content."
  },
  {
    "slug": "free-ai-upscayl",
    "keyword": "SHARP",
    "name": "Upscayl",
    "tagline": "Blurry photo in, sharp photo out.",
    "subline": "Drag in a small or blurry image and AI makes it bigger and sharper. Free, and your photos stay on your computer.",
    "toolUrl": "https://upscayl.org",
    "primaryLabel": "Download Upscayl",
    "intro": "A free app that uses AI to make small or blurry images bigger and sharper.",
    "steps": [
      "Go to upscayl.org and download the Mac or Windows version. Install it like any other app.",
      "Open it and drag in a photo.",
      "Pick a model (the default is fine for photos), pick a save folder, and click Upscayl."
    ],
    "howIUse": [
      "Use batch mode to fix a whole folder of event photos at once.",
      "4x is usually plenty for Instagram. Go bigger only for print."
    ],
    "goodToKnow": "Free and open source. It needs a graphics chip: any Mac with an Apple chip (M1 or newer) works well, and most gaming or design PCs do too. Very old laptops may not. Photos never leave your computer.",
    "links": [
      {
        "label": "Download Upscayl",
        "url": "https://upscayl.org"
      },
      {
        "label": "The code on GitHub",
        "url": "https://github.com/upscayl/upscayl"
      }
    ],
    "githubUrl": "https://github.com/upscayl/upscayl",
    "stars": 50188,
    "license": "AGPL-3.0",
    "why": "Drag-and-drop AI photo upscaler: blurry headshots, old logos and event photos become usable for posts and ads."
  },
  {
    "slug": "free-ai-cal-com",
    "keyword": "SLOTS",
    "name": "Cal.com",
    "tagline": "One link. No more back and forth.",
    "subline": "A free booking page: people pick a time from your calendar and it books the call and sends the reminders.",
    "toolUrl": "https://cal.com",
    "primaryLabel": "Sign up at Cal.com",
    "intro": "A free booking page. You share one link, people pick an open time from your calendar, and it books the call and sends reminders.",
    "steps": [
      "Go to cal.com and sign up with your Google account (free plan, no card).",
      "Connect your calendar and Zoom or Google Meet when it asks.",
      "Make your first call type, for example \"20 minute discovery call\", add two questions, and copy your link."
    ],
    "howIUse": [
      "Add your link to your email signature and Instagram bio-link page.",
      "Ask one question on the booking form: \"What do you want help with?\" You'll walk in prepared."
    ],
    "goodToKnow": "The free plan is free forever for one person, with unlimited call types and reminders. Team features are paid. Made by Cal.com Inc. The open source version now lives on GitHub as Cal.diy and is meant for self-hosting; you don't need it.",
    "links": [
      {
        "label": "Sign up at Cal.com",
        "url": "https://cal.com"
      },
      {
        "label": "The open source edition on GitHub (for techies)",
        "url": "https://github.com/calcom/cal.diy"
      }
    ],
    "githubUrl": "https://github.com/calcom/cal.diy",
    "stars": 48907,
    "license": "hosted product; open source edition cal.diy is MIT",
    "why": "Free-forever booking page (born open source, 49k-star repo now cal.diy) (Calendly alternative) with reminders and time zones; ends the email back and forth on discovery calls."
  },
  {
    "slug": "free-ai-excalidraw",
    "keyword": "DRAW",
    "name": "Excalidraw",
    "tagline": "Explain anything in one picture.",
    "subline": "A free whiteboard in your browser with a hand-drawn look. No download, no account.",
    "toolUrl": "https://excalidraw.com",
    "primaryLabel": "Open Excalidraw",
    "intro": "A free whiteboard in your browser with a friendly hand-drawn look. No download and no account.",
    "steps": [
      "Go to excalidraw.com. That's the whole install.",
      "Draw with the boxes, arrows and text tools at the top. Keep it to 5 or 6 boxes.",
      "Click Share to draw live with a client, or Export to save it as an image for a post or slide."
    ],
    "howIUse": [
      "Three drawings worth making this week: your offer, your client journey from first hello to result, and your weekly process.",
      "Your drawing saves in your browser. Export a file if you want to keep it safe."
    ],
    "goodToKnow": "Free and open source (MIT), 134k stars, used by huge numbers of teams. There's an optional paid version (Excalidraw+) for teams, but you don't need it.",
    "links": [
      {
        "label": "Open Excalidraw",
        "url": "https://excalidraw.com"
      },
      {
        "label": "The code on GitHub",
        "url": "https://github.com/excalidraw/excalidraw"
      }
    ],
    "githubUrl": "https://github.com/excalidraw/excalidraw",
    "stars": 133628,
    "license": "MIT",
    "why": "No-signup browser whiteboard with a hand-drawn look: explain offers, funnels and processes in one picture, draw live with clients."
  },
  {
    "slug": "free-ai-documenso",
    "keyword": "INKED",
    "name": "Documenso",
    "tagline": "Contracts signed from a phone.",
    "subline": "A free, open source DocuSign alternative. Upload, drag a signature box, send.",
    "toolUrl": "https://documenso.com",
    "primaryLabel": "Sign up at Documenso",
    "intro": "An open source alternative to DocuSign. Upload a contract, mark where to sign, and send it. People sign from their phone or laptop.",
    "steps": [
      "Go to documenso.com and make a free account (no credit card).",
      "Upload your agreement as a PDF and drag a signature box onto the page.",
      "Add your client's name and email and click Send. You'll see when they've signed."
    ],
    "howIUse": [
      "Turn your coaching agreement into a ready-to-send PDF once, so every new client is one upload away.",
      "Send it right after the yes on the call, while the energy is high."
    ],
    "goodToKnow": "The free plan covers 5 documents a month with up to 10 signers each. More than that needs a paid plan. Made by Documenso Inc., open source.",
    "links": [
      {
        "label": "Sign up at Documenso",
        "url": "https://documenso.com"
      },
      {
        "label": "The code on GitHub",
        "url": "https://github.com/documenso/documenso"
      }
    ],
    "githubUrl": "https://github.com/documenso/documenso",
    "stars": 15350,
    "license": "AGPL-3.0",
    "why": "Open source DocuSign alternative with a free-forever plan (5 documents a month): coaching agreements, waivers and contracts signed from a phone."
  },
  {
    "slug": "free-ai-jan",
    "keyword": "LOCAL",
    "name": "Jan",
    "tagline": "ChatGPT style AI that never leaves your laptop.",
    "subline": "Runs fully offline on your own computer, for client info you would never paste online.",
    "toolUrl": "https://jan.ai",
    "primaryLabel": "Download Jan",
    "intro": "A free app that runs a ChatGPT style AI on your own computer. Once set up, it works with no internet and nothing leaves your laptop.",
    "steps": [
      "Go to jan.ai and download the Mac or Windows version. Install it like any other app.",
      "Open the Hub inside Jan and download one of the recommended small models. Jan shows which ones fit your computer.",
      "Start a new chat. Turn off your wifi once just to see it still works."
    ],
    "howIUse": [
      "Use it for anything private: client notes, contracts, health or money details.",
      "Local models are a bit less clever than the big online ones. Use Jan for private drafts, and the big ones for public stuff."
    ],
    "goodToKnow": "Free and open source (Apache 2.0). Needs 8GB of memory or more; 16GB is better. Models are big downloads (a few GB), so do it on good wifi.",
    "links": [
      {
        "label": "Download Jan",
        "url": "https://jan.ai"
      },
      {
        "label": "The code on GitHub",
        "url": "https://github.com/janhq/jan"
      }
    ],
    "githubUrl": "https://github.com/janhq/jan",
    "stars": 44836,
    "license": "Apache-2.0",
    "why": "Free ChatGPT-style app that runs AI fully offline on your own laptop: for client info you'd never paste online."
  },
  // ---------------------------------------------------------------------------
  // Week 2 reels (19-25 Oct 2026). Facts from each repo's README, install docs
  // and pricing page as of 2026-10-16. Stars are the GitHub count on that day.
  // ---------------------------------------------------------------------------
  {
    slug: 'free-ai-voicestudio',
    keyword: 'VOICE',
    name: 'VoiceStudio',
    tagline: 'Your own voice, cloned, on your own computer.',
    subline:
      'A free app that clones your voice from a short recording, designs new voices and dubs your videos, in 646 languages. It runs on your own computer.',
    toolUrl: 'https://github.com/debpalash/VoiceStudio/releases/latest',
    primaryLabel: 'Download VoiceStudio',
    intro:
      'VoiceStudio is a free, open source app for voice work. Give it a short, clean recording of your voice, and it can read any text back in your voice. It can also design a brand new voice from a description and dub a video into another language.',
    steps: [
      'Open the VoiceStudio download page and get the file for your computer: the one ending in mac-arm64.dmg for a Mac with an Apple chip, or win-x64.exe for Windows. Install it like any other app.',
      'Open it. The first time, it sets itself up. When it asks to install a voice model, say yes to the one it suggests. It is a big download, so do it on good wifi.',
      'Go to Voice cloning, add a clean recording of your voice, type a sentence and press generate. Then try Voice design and Dubbing.',
    ],
    howIUse: [
      'Record one short, clean clip of your voice in a quiet room. Then use it for course intros, reel voiceovers and audiobook drafts.',
      'Dub one of your best videos into another language your clients speak.',
      'Only clone a voice you have permission to use. Your own is always fine.',
    ],
    goodToKnow:
      'The app is free and open source (AGPL-3.0), made by Palash Debnath and contributors. Your voice stays on your computer unless you turn on an online service. The voice models have their own licences, so check them before you use a cloned voice in paid work.',
    links: [
      { label: 'Download VoiceStudio (official GitHub releases)', url: 'https://github.com/debpalash/VoiceStudio/releases/latest' },
      { label: 'The VoiceStudio website', url: 'https://voicestudio.sh' },
      { label: 'Install help for Mac', url: 'https://github.com/debpalash/VoiceStudio/blob/main/docs/install/macos.md' },
      { label: 'Install help for Windows', url: 'https://github.com/debpalash/VoiceStudio/blob/main/docs/install/windows.md' },
      { label: 'Fixes for common problems', url: 'https://github.com/debpalash/VoiceStudio/blob/main/docs/install/troubleshooting.md' },
      { label: 'The code on GitHub', url: 'https://github.com/debpalash/VoiceStudio' },
    ],
    githubUrl: 'https://github.com/debpalash/VoiceStudio',
    stars: 69330,
    license: 'AGPL-3.0 (voice models have their own licences)',
    why: 'Free local voice cloning, voice design and video dubbing in 646 languages, instead of a monthly AI voice plan.',
    level: 'beginner',
    who: 'Anyone who records voiceovers, reels, course videos or audiobooks and is tired of paying every month for an AI voice.',
    needs:
      'A Mac with an Apple chip (M1 or newer), a Windows 10 or 11 PC, or Linux, with about 10 GB free. It can not make voices on an older Intel Mac.',
    claudePrompt: `Install the VoiceStudio desktop app on this computer and check that it works. Follow the official agent guide: https://github.com/debpalash/VoiceStudio/blob/main/docs/install/agent.md

My rules:
1. Only download from github.com/debpalash/VoiceStudio or voicestudio.sh.
2. First check this computer (Mac chip or Windows, free disk space, graphics card) and tell me if it can run VoiceStudio on its own. If it is an Intel Mac, stop and tell me.
3. Ask me before every model download, and tell me its size and licence first.
4. Leave the analytics question for me to answer.
5. When it works, make a 10 second test clip with the built-in demo voice. Then tell me how to open the app again and where my audio files are saved.`,
    requirements: [
      'A Mac with an Apple chip (M1 or newer) on macOS 13.3 or later, a Windows 10 or 11 PC, or Linux.',
      'About 10 GB of free space for the app and its voice models.',
      'A clean recording of your voice: a quiet room, no music, no other voices.',
      'No graphics card needed. Without one it still works, just slower.',
    ],
    does: [
      'Clone your own voice from a short recording',
      'Read any text you type in that voice',
      'Design a brand new voice from a description',
      'Dub a video into another language',
      'Run on your own computer, so your voice stays with you',
    ],
    doesNot: [
      'Charge a monthly fee for the app',
      'Send your voice online, unless you turn on an online service yourself',
      'Make voices on an older Intel Mac',
      'Give you the right to clone someone else without asking',
    ],
    limits: [
      'The app is free and open source (AGPL-3.0), and that includes using it in your business.',
      'The voice models are separate and have their own licences. The default model is marked non-commercial. Before you use a cloned voice in ads or paid client work, check that model in the app, or pick one that allows business use.',
      'There is a paid Pro version with extra features. The free app already clones, designs voices and dubs.',
      'The Mac app is not signed by Apple yet, so the first time you open it takes one extra click (see Stuck below).',
      'Without a graphics card it works, but slower.',
    ],
    stuck: [
      {
        q: 'My Mac says it can not verify the developer',
        a: 'Normal for now, the app is not signed by Apple yet. In Finder, right-click VoiceStudio, choose Open, then click Open again. On macOS 15, try to open it once, then go to System Settings, Privacy and Security, and click Open Anyway. Only do this with the file from the official GitHub page.',
      },
      {
        q: 'I have an older Intel Mac',
        a: 'The app opens, but it can not make voices on an Intel Mac. It can only connect to VoiceStudio running on another computer. Use a Mac with an Apple chip, or a Windows PC.',
      },
      {
        q: 'It is really slow',
        a: 'It is probably running without a graphics card. That still works. Pick one of the lighter voice engines the setup screen suggests for computers without a graphics card.',
      },
      {
        q: 'My cloned voice sounds off',
        a: 'Record again in a quiet room, close to the mic, with no music and no other voices. A clean clip makes the biggest difference.',
      },
      {
        q: 'Something else broke',
        a: 'In the app, open Settings, then About, and click Run self-check. It checks your setup and gives you a hint for anything that is wrong.',
      },
    ],
  },
  {
    slug: 'free-ai-firecrawl',
    keyword: 'DATA',
    name: 'Firecrawl',
    tagline: 'Any website, turned into clean text your AI can read.',
    subline:
      'Paste a web address and get the page back as clean text, with the menus and clutter stripped out. The free plan covers 1,000 pages a month, no card.',
    toolUrl: 'https://www.firecrawl.dev/playground',
    primaryLabel: 'Open Firecrawl',
    intro:
      'Firecrawl reads a website for you and hands back clean text, with the menus, pop-ups and clutter stripped out. That clean text is what your AI reads best. The code is open source, and the company behind it runs a free plan you can use in your browser.',
    steps: [
      'Go to firecrawl.dev and sign up for the free plan. No card needed.',
      'Open the Playground, choose Scrape, paste the web address you want and run it.',
      'Copy the clean text it gives you, paste it into Claude or ChatGPT, and ask your question. The one I would ask is below.',
    ],
    howIUse: [
      'Read a competitor’s home page and pricing page, then ask your AI what they sell, what they promise and what is missing.',
      'Scrape your own website and ask your AI what a new visitor would find confusing.',
      'Use what you learn, in your own words. Never copy someone else’s text onto your site.',
    ],
    goodToKnow:
      'The free plan gives you 1,000 credits a month, no card. A basic page costs one credit. The code is open source (AGPL-3.0), made by Firecrawl. By default it follows each site’s robots.txt rules, and you are responsible for respecting each site’s terms.',
    links: [
      { label: 'The Firecrawl Playground', url: 'https://www.firecrawl.dev/playground' },
      { label: 'Plans and prices', url: 'https://www.firecrawl.dev/pricing' },
      { label: 'Connect it to Claude Code (official docs)', url: 'https://docs.firecrawl.dev/sdks/cli' },
      { label: 'The code on GitHub', url: 'https://github.com/firecrawl/firecrawl' },
    ],
    githubUrl: 'https://github.com/firecrawl/firecrawl',
    stars: 191940,
    license: 'AGPL-3.0 (SDKs MIT); hosted free plan 1,000 credits a month',
    why: 'Turns any public web page into clean text for your AI, so you stop copying websites into ChatGPT by hand.',
    level: 'beginner',
    who: 'Business owners who want their AI to read a competitor’s site, their own site or any public page, without copying it in by hand.',
    needs:
      'Works in your browser. Sign up free, no card. If you use Claude Code, one prompt connects it so Claude can read websites itself.',
    ticks: ['No sign-up here', 'Free plan, no card', '192k stars on GitHub'],
    claudePrompt: `Set up Firecrawl in Claude Code for me, so you can read websites as clean text.

1. Run this in the terminal: npx -y firecrawl-cli@latest init --all --browser
2. It opens my browser so I can sign in or sign up to Firecrawl's free plan (no card). Wait for me to finish. Never ask me to paste an API key into this chat.
3. When it is done, tell me to restart Claude Code.
4. After the restart, test it: scrape https://www.firecrawl.dev and show me the first 10 lines of clean text.

If Node.js is missing, tell me how to install it from nodejs.org and stop.`,
    requirements: [
      'A free Firecrawl account.',
      'Any AI chat to paste the text into: Claude, ChatGPT or Gemini.',
      'Only for the Claude Code way: Claude Code and Node.js on your computer.',
    ],
    usePrompt: {
      title: 'The question I would ask your AI',
      text: `Below is the text of a competitor's website. Read it and tell me, in plain words:
1. What they sell, with prices if they show them.
2. What they promise their clients.
3. Who it is for.
4. What is missing or unclear that I could do better.
5. Three ideas I could use on my own website, in my own words.

Here is the text:
[paste the text from Firecrawl here]`,
    },
    does: [
      'Turn a public web page into clean text',
      'Strip out menus, pop-ups and clutter',
      'Read a whole site, page by page, with Crawl',
      'Plug into Claude Code, so Claude can read sites itself',
    ],
    doesNot: [
      'Read pages that sit behind someone else’s login',
      'Ignore a site’s robots.txt rules (it follows them by default)',
      'Write the analysis. Your AI does that part',
      'Make it fine to copy someone’s words. Use what you learn, not their text',
    ],
    limits: [
      'Free plan: 1,000 credits a month, refreshed monthly, no card. A basic page is one credit. Searches and extra formats use more.',
      'Paid plans start at $16 a month billed yearly, or $19 billed monthly, for 5,000 credits.',
      'The code is open source (AGPL-3.0) if you want to run it on your own server. That is a techie job. The free plan is the easy way.',
      'Some sites block it or load too slowly. You are responsible for following each site’s terms.',
    ],
    stuck: [
      {
        q: 'The page came back empty or blocked',
        a: 'Some sites block scrapers or load slowly. Try again, try another page on the same site, or check that the site allows it. Firecrawl follows robots.txt by default.',
      },
      {
        q: 'I ran out of credits',
        a: 'Free credits refill every month. Scrape one page at a time instead of a whole site, and skip the extra formats, which cost more credits.',
      },
      {
        q: 'Claude Code does not see Firecrawl',
        a: 'Restart Claude Code after the setup. New skills only load in a fresh session.',
      },
      {
        q: 'It says npx: command not found',
        a: 'Install Node.js from nodejs.org (the LTS version), close the terminal, open it again, and paste the prompt again.',
      },
    ],
  },
  {
    slug: 'free-ai-meetily',
    keyword: 'NOTES',
    name: 'Meetily',
    tagline: 'AI meeting notes that stay on your computer.',
    subline:
      'It records your call, writes the transcript while you talk, and gives you a summary at the end. Free and open source, on Mac and Windows.',
    toolUrl: 'https://github.com/Zackriya-Solutions/meetily/releases/latest',
    primaryLabel: 'Download Meetily',
    intro:
      'Meetily is a free, open source meeting note taker. It listens to your microphone and your computer’s sound, writes a live transcript, and makes a summary when the call ends. The transcript is made on your computer, not on someone else’s server.',
    steps: [
      'Open the Meetily download page. On a Mac with an Apple chip, download the file ending in aarch64.dmg and drag Meetily into Applications. On Windows, download the file ending in x64-setup.exe and run it.',
      'Open Meetily and allow the microphone and audio permissions it asks for. It needs both to hear you and the other people on the call.',
      'For summaries that never leave your computer, install Ollama from ollama.com, download a small model, and choose Ollama for summaries in Meetily. Then start a recording when your next call begins.',
    ],
    howIUse: [
      'Start it at the top of every client call, then paste the summary into your client notes.',
      'Ask your AI to turn the transcript into a follow-up email with the next steps and deadlines.',
      'Always tell people on the call that you are taking notes with AI.',
    ],
    goodToKnow:
      'Free and open source (MIT), made by Zackriya Solutions. Transcripts are made on your computer. Summaries stay private if you use Ollama. If you plug in a cloud AI instead, the transcript goes to that company for the summary.',
    links: [
      { label: 'Download Meetily (official GitHub releases)', url: 'https://github.com/Zackriya-Solutions/meetily/releases/latest' },
      { label: 'The Meetily website', url: 'https://meetily.ai' },
      { label: 'Ollama, for private summaries', url: 'https://ollama.com' },
      { label: 'The code on GitHub', url: 'https://github.com/Zackriya-Solutions/meetily' },
    ],
    githubUrl: 'https://github.com/Zackriya-Solutions/meetily',
    stars: 31782,
    license: 'MIT',
    why: 'Free AI meeting notes that record, transcribe and summarize on your own computer, so client calls stay private.',
    level: 'beginner',
    who: 'Coaches, consultants and anyone with client calls they would rather not upload to a cloud note taker.',
    needs:
      'A Mac with an Apple chip (the Mac download is for Apple chip Macs only) or a Windows PC. For private summaries you also install Ollama, which is free.',
    claudePrompt: `Install Meetily, the free open source meeting notes app, on this computer.

1. Check what computer this is. If it is an Intel Mac, stop and tell me: the Mac download only works on Macs with an Apple chip.
2. Download the latest release only from https://github.com/Zackriya-Solutions/meetily/releases/latest : the aarch64.dmg file on a Mac with an Apple chip, or the x64-setup.exe file on Windows. Install it.
3. Check if Ollama is installed. If not, ask me before you install it from ollama.com. Then suggest one small model that fits this computer, tell me its download size, and download it only after I say yes.
4. Tell me exactly which permissions to allow when I open Meetily, and where to choose Ollama for summaries.

Do not sign me up for anything and do not turn on any cloud AI.`,
    requirements: [
      'A Mac with an Apple chip, or a 64-bit Windows PC with a processor that supports AVX2 (most modern PCs do).',
      'For private summaries: Ollama, a free app that runs AI on your own computer.',
      'Or a Claude, OpenAI, Groq or OpenRouter key, if you are fine with the transcript going to that company for the summary.',
    ],
    does: [
      'Record your mic and your computer’s sound together',
      'Write a live transcript while you talk',
      'Summarize the meeting when it ends',
      'Turn an old recording into a transcript (in beta)',
      'Keep recordings and transcripts on your computer',
    ],
    doesNot: [
      'Join your calls as a bot. It records on your own computer',
      'Send your calls to the cloud, unless you choose a cloud AI for summaries',
      'Ask the other people for permission. That part is on you',
    ],
    limits: [
      'Free and open source (MIT). There is a paid PRO version with higher accuracy, summary templates and more export options. You do not need it to start.',
      'Summaries need an AI. Ollama keeps it on your computer. A cloud AI key sends the transcript to that company.',
      'AI that runs on your own computer is slower on older machines.',
      'The Mac download is for Apple chip Macs. Linux users build it from the code.',
      'Recording rules differ by country. Tell people on the call that you are taking notes with AI.',
    ],
    stuck: [
      {
        q: 'It only hears me, not the other people',
        a: 'Meetily needs permission to record your computer’s sound, not just your mic. On a Mac, open System Settings, Privacy and Security, and allow Meetily under Microphone and under Screen and System Audio Recording (the names change a little between macOS versions). Then restart Meetily.',
      },
      {
        q: 'There is no summary',
        a: 'The summary needs an AI. Install Ollama, download a model, and choose Ollama for summaries in Meetily. Or add a cloud AI key, knowing the transcript goes to that company.',
      },
      {
        q: 'My Mac will not open it',
        a: 'Right-click Meetily in Applications, choose Open, then click Open again. On macOS 15, go to System Settings, Privacy and Security, and click Open Anyway.',
      },
      {
        q: 'Windows shows a blue "Windows protected your PC" warning',
        a: 'That is common with small free apps. If you downloaded it from the official GitHub page, click More info, then Run anyway.',
      },
    ],
  },
  {
    slug: 'free-ai-browser-use',
    keyword: 'BROWSER',
    name: 'Browser Use',
    tagline: 'Type the job. The AI does the clicking.',
    subline:
      'Browser Use lets an AI open websites, click, type and fill in forms for you. The code is free and open source. You bring the AI.',
    toolUrl: 'https://github.com/browser-use/browser-use',
    primaryLabel: 'Open Browser Use on GitHub',
    intro:
      'Browser Use is a free, open source tool that lets an AI use a web browser like a person: open a page, click, type, fill in a form and bring back what it found. You tell it the job in plain English, and Claude Code does the rest.',
    steps: [
      'Install uv, a free installer for Python tools, from docs.astral.sh/uv. Close and reopen your terminal.',
      'In your terminal, run: uv tool install --python 3.12 browser-use, then: browser-use skill install',
      'Open Chrome. If it asks to allow remote debugging, say yes. Restart Claude Code and give it a small job, like: "Use browser-use to open github.com/browser-use/browser-use and tell me its star count."',
    ],
    howIUse: [
      'Start with jobs where nothing can go wrong: looking things up across a few sites and making a list.',
      'Then try boring copy jobs, like moving details from one website into a form on another, while you watch.',
      'Never let it pay, send or submit anything without you checking first.',
    ],
    goodToKnow:
      'The code is free and open source (MIT), made by Browser Use. The AI that does the thinking is not free: in Claude Code it runs on your Claude plan. Connected to your Chrome, it acts as you, logged in as you, so watch it and start with low-risk jobs.',
    links: [
      { label: 'Browser Use on GitHub', url: 'https://github.com/browser-use/browser-use' },
      { label: 'Browser Use for coding agents (official docs)', url: 'https://docs.browser-use.com/open-source/browser-use-cli' },
      { label: 'Fix-it guide when it will not connect', url: 'https://github.com/browser-use/browser-harness/blob/main/install.md' },
      { label: 'Browser Use Cloud (paid, optional)', url: 'https://browser-use.com' },
    ],
    githubUrl: 'https://github.com/browser-use/browser-use',
    stars: 118119,
    license: 'MIT (Browser Use Cloud is a paid service)',
    why: 'Open source tool that lets your AI open sites, click, type and fill in forms, so web chores stop eating your afternoon.',
    level: 'builder',
    who: 'People already using Claude Code (or Codex or Cursor) who want their AI to do web chores: look things up across sites, fill in forms, copy details from one site to another.',
    needs:
      'A computer with Claude Code (or Codex or Cursor) and Chrome. Setup happens in the terminal. The prompt below does it for you.',
    claudePrompt: `Install or upgrade browser-use to the latest stable version with uv using Python 3.12, run \`browser-use skill install\` to register the skill, and connect it to my browser. If setup or connection fails, follow https://github.com/browser-use/browser-harness/blob/main/install.md.

Before you start, tell me in one line what you will install. If uv is missing, ask me before you install it.
When it works, test it with a harmless job: open https://github.com/browser-use/browser-use and tell me its star count.
From now on, never log in, buy, send or submit anything in my browser without asking me first.`,
    requirements: [
      'Claude Code, Codex or Cursor on a Mac, Windows or Linux computer.',
      'Google Chrome, for it to drive.',
      'uv, a free installer for Python tools. Claude Code can install it for you.',
      'No extra AI key when you use it from Claude Code. Your Claude plan does the thinking.',
    ],
    usePrompt: {
      title: 'A first job to try',
      text: `Use browser-use. Open [a website you use every week], find [the information you need], and give me the answer as a short list. Do not log in, buy, send or submit anything without asking me first.`,
    },
    does: [
      'Open websites, click, scroll and type',
      'Fill in forms',
      'Pull information off pages and hand it back to you',
      'Work from Claude Code, so you just type the job',
    ],
    doesNot: [
      'Come with free AI. The code is free, the thinking is not (in Claude Code your plan covers it)',
      'Get past every CAPTCHA or "are you a robot" check',
      'Need your passwords typed into the chat',
    ],
    limits: [
      'The code is free (MIT). The AI that drives it is not: from Claude Code it uses your Claude plan, and in your own Python code it needs an AI key that charges per use. A free local model through Ollama also works, if your computer can run one.',
      'Browser Use Cloud is the paid version: cloud browsers that sites block less often, from $0.02 per browser hour. New sign-ups with Google, GitHub or Microsoft get $15 of credit. You do not need it to start.',
      'The driving test demo on their page gets past a CAPTCHA. On your own computer, CAPTCHAs and bot checks can stop it.',
      'Connected to your Chrome, it can see your open tabs and act as you, logged in as you. Watch it, and give it low-risk jobs first.',
    ],
    stuck: [
      {
        q: 'It says uv: command not found',
        a: 'Ask Claude Code to install uv from docs.astral.sh/uv, then close and reopen your terminal and paste the prompt again.',
      },
      {
        q: 'Claude Code does not use it',
        a: 'Restart Claude Code so it loads the new skill, then start your request with "Use browser-use".',
      },
      {
        q: 'It can not connect to my Chrome',
        a: 'Run browser-use --doctor in your terminal. In Chrome, open chrome://inspect/#remote-debugging and tick "Allow remote debugging for this browser instance". Still stuck? Paste the fix-it guide link (in Links above) into Claude Code and ask it to follow it.',
      },
      {
        q: 'It got stuck on a CAPTCHA',
        a: 'Normal on some sites. Do that step yourself, or pick a site with less bot protection. The paid cloud is built for this, but nothing gets past every check.',
      },
    ],
  },
  {
    slug: 'free-ai-ui-ux-pro-max',
    keyword: 'STYLE',
    name: 'UI UX Pro Max',
    tagline: 'Give your AI some design taste.',
    subline:
      'A free skill for Claude Code that picks a style, colours and fonts that fit your business, from 192 colour palettes and 74 font pairings.',
    toolUrl: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
    primaryLabel: 'Open UI UX Pro Max on GitHub',
    intro:
      'UI UX Pro Max is a free, open source skill for Claude Code and other coding agents. When you ask for a website or an app, it first builds a design system for your kind of business: a page layout, a style, colours, fonts, and a list of things to avoid. Then your AI builds with it.',
    steps: [
      'Open Claude Code and type: /plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill',
      'Then type: /plugin install ui-ux-pro-max@ui-ux-pro-max-skill and restart Claude Code.',
      'Ask for design work as normal, for example: "Build a landing page for my yoga studio." The skill switches on by itself for design jobs.',
    ],
    howIUse: [
      'Tell it your business, who you serve and the feeling you want, like "calm and premium" or "bold and playful".',
      'Ask it to show the design system first, change what you do not like, then let it build.',
      'Use it to redo one page you already have, and compare the two side by side.',
    ],
    goodToKnow:
      'Free and open source (MIT), made by Next Level Builder. A paid Premium version adds logos and brand kits. It needs Python 3 for its search script, and that script makes no network calls.',
    links: [
      { label: 'UI UX Pro Max on GitHub', url: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill' },
      { label: 'The UI UX Pro Max website', url: 'https://www.uupm.cc' },
      { label: 'Install Python 3', url: 'https://www.python.org/downloads/' },
    ],
    githubUrl: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
    stars: 136287,
    license: 'MIT (paid Premium version exists)',
    why: 'Free Claude Code skill with design rules, 192 palettes and 74 font pairings, so AI-built websites stop looking the same.',
    level: 'builder',
    who: 'Anyone building a website or landing page with Claude Code who is tired of it looking like every other AI-made site.',
    needs: 'Claude Code (or Cursor, Codex and other coding agents) on your computer, plus Python 3. Two commands install it.',
    claudePrompt: `Install the UI UX Pro Max design skill for me.

1. Run these two commands in the terminal:
   claude plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
   claude plugin install ui-ux-pro-max@ui-ux-pro-max-skill
2. Check that python3 --version works. The skill's search script needs Python 3. If it is missing, tell me how to install it from python.org and stop. Do not install it yourself.
3. Tell me to restart Claude Code, and give me one example request to try on my own business.`,
    requirements: [
      'Claude Code, or another coding agent such as Cursor, Windsurf, Codex or Gemini CLI.',
      'Python 3 on your computer, for its search script. Check with: python3 --version',
      'A website or app project to use it on.',
    ],
    usePrompt: {
      title: 'Try it on your business',
      text: `Use the ui-ux-pro-max skill. My business is [what you do and who you help, for example: a yoga studio in Ubud for beginners]. First show me the design system you would pick: the page layout, the style, the colours, the fonts and what to avoid. Wait for my OK, then build the homepage.`,
    },
    does: [
      'Pick a style, colours and fonts that fit your kind of business',
      'Suggest a page layout for landing pages',
      'Tell your AI what to avoid for your industry',
      'Give your AI a checklist before it hands over the design',
      'Work with 22 tech stacks, from plain HTML to React and Flutter',
    ],
    doesNot: [
      'Build the site on its own. Claude Code still does the building',
      'Make logos, brand kits or images. Those are in the paid Premium version',
      'Install software behind your back. If Python is missing, it asks you',
    ],
    limits: [
      'Free and open source (MIT). A paid Premium version adds brand identity, logos, banners, slides and image generation. You do not need it for website design.',
      'It needs Python 3 for its search script. The script only uses what comes with Python and makes no network calls.',
      'It guides your AI. The final look still depends on what you ask for and what you approve.',
    ],
    stuck: [
      {
        q: 'The /plugin command is not recognised',
        a: 'Update Claude Code to the latest version and try again. Or use the other way on the GitHub page: npm install -g ui-ux-pro-max-cli, then uipro init --ai claude in your project folder.',
      },
      {
        q: 'It says Python is missing',
        a: 'Install Python 3 from python.org, close and reopen your terminal, and check with python3 --version.',
      },
      {
        q: 'My site still looks generic',
        a: 'Give it more to work with: your business, your audience and the feeling you want. Ask it to show the design system first, and change what you do not like before it builds.',
      },
      {
        q: 'I use Cursor or another tool',
        a: 'Run npm install -g ui-ux-pro-max-cli, go to your project folder, and run uipro init --ai cursor (or your tool’s name, the GitHub page lists them all).',
      },
    ],
  },
  {
    slug: 'free-ai-mempalace',
    keyword: 'MEMORY',
    name: 'MemPalace',
    tagline: 'Give your AI a long-term memory.',
    subline:
      'MemPalace saves your past AI conversations word for word on your own computer, and lets your AI search them before it answers.',
    toolUrl: 'https://github.com/MemPalace/mempalace',
    primaryLabel: 'Open MemPalace on GitHub',
    intro:
      'MemPalace is a free, open source memory for your AI. It stores your past conversations exactly as they were said, on your computer, and lets your AI search them. So when you ask "what did we decide about pricing?", it can look it up instead of guessing.',
    steps: [
      'Install the tool. Get uv from docs.astral.sh/uv, then run in your terminal: uv tool install mempalace',
      'Add it to Claude Code: run claude plugin marketplace add MemPalace/mempalace, then claude plugin install --scope user mempalace, and restart Claude Code.',
      'Save your past sessions into it: mempalace mine ~/.claude/projects/ --mode convos. Then ask Claude Code about something you decided weeks ago.',
    ],
    howIUse: [
      'Set it up now, before Claude Code clears out your older sessions.',
      'Turn on the auto-save hooks so every new session is saved without you thinking about it.',
      'Start big questions with "search MemPalace first", so it checks what you already decided.',
    ],
    goodToKnow:
      'Free and open source (MIT), made by the MemPalace contributors. Everything stays on your computer unless you choose a server option. Watch out for fake sites: the only official ones are github.com/MemPalace/mempalace, the PyPI package and mempalaceofficial.com.',
    links: [
      { label: 'MemPalace on GitHub', url: 'https://github.com/MemPalace/mempalace' },
      { label: 'Getting started (official docs)', url: 'https://mempalaceofficial.com/guide/getting-started.html' },
      { label: 'The Claude Code plugin', url: 'https://mempalaceofficial.com/guide/claude-code.html' },
      { label: 'Save sessions before they expire (checklist)', url: 'https://mempalaceofficial.com/guide/claude-code-retention.html' },
      { label: 'Auto-save hooks', url: 'https://mempalaceofficial.com/guide/hooks.html' },
    ],
    githubUrl: 'https://github.com/MemPalace/mempalace',
    stars: 59586,
    license: 'MIT',
    why: 'Free local memory for your AI: saves past conversations word for word and lets Claude Code search them before it answers.',
    level: 'builder',
    who: 'People who use Claude Code (or Codex, Cursor or Gemini CLI) every day and are tired of explaining their business, projects and past decisions all over again.',
    needs:
      'A computer with Claude Code or another coding agent. Your coding agent sets it up with the prompt below. It does not work inside the regular ChatGPT app.',
    claudePrompt: `Set up MemPalace for me in Claude Code, as a private memory that stays on this computer.

Only use the official sources: github.com/MemPalace/mempalace, the PyPI package "mempalace", and mempalaceofficial.com. Other sites with similar names are fakes.

1. Install the CLI with uv: uv tool install mempalace (if uv is missing, ask me before you install it).
2. Add the Claude Code plugin: claude plugin marketplace add MemPalace/mempalace, then claude plugin install --scope user mempalace
3. Back up my Claude Code sessions from ~/.claude/projects/ to a folder in my Documents. Then ask me before you run: mempalace mine ~/.claude/projects/ --mode convos
4. Set up the auto-save hooks from https://mempalaceofficial.com/guide/hooks.html so new sessions are saved.
5. Do not turn on any server, hub or cloud option.

When you are done, search MemPalace for something from an old session to prove it works, and tell me to restart Claude Code.`,
    requirements: [
      'Claude Code (or Codex, Cursor, Gemini CLI or another app that supports MCP) on a Mac, Windows or Linux computer.',
      'Python 3.9 or newer. uv sets it up for you.',
      'About 300 MB of free space for its search model, downloaded the first time.',
    ],
    usePrompt: {
      title: 'Ask it something you decided before',
      text: `Search MemPalace first, then answer: what did we decide about [a past decision, for example: my pricing or my website colours], and when?`,
    },
    does: [
      'Save your past AI conversations word for word',
      'Search them by meaning, not just exact words',
      'Let Claude Code check its memory before it answers about past work',
      'Keep everything on your computer',
      'Save new sessions automatically once the hooks are set up',
    ],
    doesNot: [
      'Summarize or rewrite what you said. It keeps your original words',
      'Send your conversations anywhere by default',
      'Work inside the regular ChatGPT app. It is for coding agents and apps that support MCP',
      'Bring back sessions Claude Code already deleted',
    ],
    limits: [
      'Free and open source (MIT). No API key or cloud account needed.',
      'Claude Code clears out old local sessions after about 30 days unless you change that setting. MemPalace can only save what is still there, so back up and set it up early.',
      'Fake copies exist. The only official places are the GitHub page, the PyPI package and mempalaceofficial.com.',
      'It is a techie setup with Python and the terminal. The prompt above lets Claude Code do it for you.',
    ],
    stuck: [
      {
        q: 'It says uv: command not found',
        a: 'Ask Claude Code to install uv from docs.astral.sh/uv, then close and reopen your terminal and try again.',
      },
      {
        q: 'Claude Code does not seem to remember',
        a: 'Restart Claude Code after installing, type /skills and check that mempalace is listed. Then start your question with "Search MemPalace first".',
      },
      {
        q: 'My older sessions are missing',
        a: 'Claude Code removes old local sessions after about 30 days. Save what is left now, and set up the auto-save hooks so new sessions are kept.',
      },
      {
        q: 'I found a different MemPalace website',
        a: 'Do not install from it. The official sources are github.com/MemPalace/mempalace, pypi.org/project/mempalace and mempalaceofficial.com.',
      },
    ],
  },
  {
    slug: 'free-ai-concat',
    keyword: 'CUT',
    name: 'Concat',
    tagline: 'A free video editor with no watermark and no account.',
    subline:
      'Concat is a free, open source video editor. It adds captions, cuts clips and exports up to 4K with no watermark, no account and no subscription. It is a beta, and this page walks you through the Mac setup.',
    toolUrl: 'https://github.com/jub0t/Concat/releases/latest',
    primaryLabel: 'Download Concat (official GitHub releases)',
    intro:
      'Concat is a free, open source video editor made by one developer, jub0t. It covers what most people open CapCut for: cutting clips on several tracks, automatic captions, text to speech, background removal, effects and titles, and export up to 4K. No watermark, no account, no subscription. The AI parts (captions, voices, cutout) download once from Settings and then work without the internet. Your footage stays on your computer.',
    steps: [
      'Open the official download page (the button above). On a Mac with an Apple chip (any Mac from late 2020 on), download the file ending in macos-arm64.dmg. On an older Intel Mac, download the one ending in macos-x86_64.dmg. Not sure? Click the Apple menu, then About This Mac. It says Chip (Apple) or Processor (Intel).',
      'Open the downloaded file and drag Concat into your Applications folder.',
      'Open Concat from Applications. If your Mac says it cannot verify the app, click Done, open System Settings, then Privacy and Security, scroll down to the message about Concat and click Open Anyway, then confirm with your password or Touch ID. You only do this once.',
      'Drop in a video, cut it, and press Export. To add captions, open Settings, download the captions model once, then use the captions tool.',
    ],
    howIUse: [
      'Cut a talking video: drop it in, trim the start and end, and let it write the captions for you.',
      'Read the captions once before you export. Automatic captions get names and unusual words wrong.',
      'Export a short test clip first, so you know it looks right before you export the whole thing.',
    ],
    goodToKnow:
      'Free and open source (AGPL-3.0), made by jub0t. It is in beta, so expect a few rough edges, and the Mac build is not signed by Apple, which is why the first open needs Open Anyway. The people who make it say it does not send anything about you, your projects or your media over the internet. It only goes online when you ask it to, for example to check for updates or to download a model. I have not stress-tested it on long projects.',
    links: [
      { label: 'Download Concat (official GitHub releases)', url: 'https://github.com/jub0t/Concat/releases/latest' },
      { label: 'The Concat website', url: 'https://concat.standalones.org' },
      { label: 'Report a problem to the maker', url: 'https://github.com/jub0t/Concat/issues' },
      { label: 'The code on GitHub', url: 'https://github.com/jub0t/Concat' },
    ],
    githubUrl: 'https://github.com/jub0t/Concat',
    stars: 11372,
    license: 'AGPL-3.0',
    why: 'A free video editor with no watermark, no account and no subscription, so you can cut and caption your own videos without paying for CapCut.',
    level: 'beginner',
    who: 'Anyone who edits their own short videos and does not want a watermark, a subscription or an account.',
    needs:
      'A Mac (Apple chip or Intel), Windows PC, Linux computer or Android phone. These notes cover the Mac. The first open needs one extra click in Privacy and Security. It is a beta.',
    ticks: ['No sign-up here', 'No watermark, no account', '11k stars on GitHub'],
    claudePrompt: `Install Concat, the free open source video editor, on this Mac.

1. Check what chip this Mac has. Apple chip means the macos-arm64.dmg file. Intel means the macos-x86_64.dmg file.
2. Download the latest release only from https://github.com/jub0t/Concat/releases/latest . Also download the SHA256SUMS file from the same release and check the dmg against it. If the numbers do not match, stop and tell me.
3. Open the dmg and copy Concat into Applications. Do not run anything else from it.
4. The app is not signed by Apple, so macOS will probably block the first open. Tell me to open System Settings, Privacy and Security, and click Open Anyway next to the Concat message. Do not change my security settings yourself and do not run any command that removes the quarantine flag unless I ask you to.
5. Tell me where to download the captions model in Concat's Settings.

Do not sign me up for anything.`,
    requirements: [
      'A Mac. Apple chip Macs (2020 and newer) use the arm64 download. Older Intel Macs use the x86_64 one.',
      'Free disk space. The app is about 65 MB to download, and the optional AI models for captions, voices and cutout are extra.',
      'Your own videos. Concat does not come with footage.',
    ],
    does: [
      'Cut clips on several tracks',
      'Write captions from the sound of your video',
      'Turn text into speech and remove backgrounds, once you download those models',
      'Add effects, titles and keyframe animation',
      'Export up to 4K with no watermark',
      'Work without an account and keep your footage on your computer',
    ],
    doesNot: [
      'Come signed by Apple, so the first open needs a click in Privacy and Security',
      'Replace a finished, polished editor yet. It is a beta',
      'Get every caption right. Always read them before you post',
    ],
    limits: [
      'It is in beta. The maker says it works and still has edges. Report problems on its GitHub issues page.',
      'The Mac build is not signed by Apple, so you click Open Anyway once.',
      'The AI models for captions, voices and cutout are a separate download from Settings. They work offline after that.',
      'It is made mostly by one person, so updates and fixes depend on that one developer.',
      'Free and open source under AGPL-3.0. Using it to edit your videos costs nothing and your videos stay yours. If you ever change the code and share it, the licence asks you to share your changes too.',
    ],
    stuck: [
      {
        q: 'My Mac says Concat cannot be opened because it is from an unidentified developer',
        a: 'Click Done. Open System Settings, then Privacy and Security, scroll to the message about Concat and click Open Anyway. Confirm with your password or Touch ID, then open Concat again.',
      },
      {
        q: 'I do not see Open Anyway',
        a: 'Try to open Concat once first, so the message appears, and then look again in Privacy and Security. It stays there for about an hour after the attempt.',
      },
      {
        q: 'I am not sure which download to pick',
        a: 'Click the Apple menu and choose About This Mac. If it says Chip with Apple, pick the file ending in macos-arm64.dmg. If it says Processor with Intel, pick macos-x86_64.dmg.',
      },
      {
        q: 'There are no automatic captions',
        a: 'The captions model is a separate download. Open Concat Settings and download it once, then try the captions tool again.',
      },
      {
        q: 'Something looks broken or crashes',
        a: 'It is a beta. Update to the newest release on the download page first. If it still happens, tell the maker on the GitHub issues page, with what you clicked just before.',
      },
    ],
  },
  {
    slug: 'free-ai-salesman',
    keyword: 'SALESMAN',
    name: 'Salesman Kit', // email subject becomes "Your Salesman Kit setup notes"
    tagline: 'Find the right businesses. Write the first email.',
    subline:
      'Four Claude skills. Claude finds businesses that fit your dream customer, reads their websites and drafts a short email about something real. You read it and send it yourself.',
    toolUrl: 'https://workshop.mastermindshq.business/downloads/joes-salesman-v1.0.zip',
    primaryLabel: 'Download the kit',
    intro:
      'Four Claude skills that help you find customers and write the first email. Claude finds businesses that fit your dream customer, reads their websites, tells you why each one fits, and drafts a short email about something specific it found. It also helps you answer replies. You read every email and send it yourself, from your own inbox.',
    steps: [
      'Download the kit and unzip it.',
      'Pick how you want to use it. Claude Code: open a terminal in the unzipped folder and run "bash install.sh", then restart Claude Code. Claude app: go to Settings, then Capabilities, turn on Skills, upload the four zips from the claude-app folder, and turn on web search. No install: open START-HERE-PROMPT.md and paste the prompt into any new Claude chat.',
      'Start a chat and say "Set up Salesman". Claude asks what you sell, who your dream customer is and where they are, then saves it. Next say "Find me customers", and after that "Write emails for 1, 2 and 3".',
    ],
    howIUse: [
      'Be specific about your dream customer, and paste one or two emails you wrote yourself. The more real your answers, the more your drafts sound like you.',
      'Look at the first ten businesses before you write anything. Pick the three that fit best, read the email Claude drafts, change anything that does not sound like you, then send it by hand.',
      'When someone replies, paste the reply into the chat and say "They replied". Claude tells you what they meant and drafts the next message. A "no" or an "unsubscribe" is final.',
    ],
    goodToKnow:
      'Salesman drafts. It never sends an email for you, and it never makes up a client, a number or an email address. If it cannot find something, it tells you. Every email needs your real business postal address in the footer, and an easy way to say no. Send 10 to 20 a day by hand from your normal inbox. Skills in the Claude app need a paid Claude plan. No plan? The paste-in prompt works in any chat. It is not legal advice, so check the email rules where you and your customers live.',
    links: [
      { label: 'Download the kit', url: 'https://workshop.mastermindshq.business/downloads/joes-salesman-v1.0.zip' },
      {
        label: 'How to turn skills on (Anthropic help page)',
        url: 'https://support.claude.com/en/articles/12512180-using-skills-in-claude',
      },
      { label: 'Harvey, the open source project that inspired it', url: 'https://github.com/ethanplusai/harvey' },
    ],
    githubUrl: '',
    stars: 0,
    license: 'MIT (inspired by the open source Harvey project by Ethan Rogers, credited in the kit)',
    why: 'Four Claude skills that find businesses that fit, read their websites, draft a short specific email and help with replies. Drafts only, the follower sends every email.',
    level: 'beginner',
    who: 'Anyone who sells to businesses and wants a short list of good fits and a first email that does not sound like a template.',
    needs:
      'Claude Code, or the Claude app with Skills turned on (paid plan) and web search on. Or any Claude chat, using the paste-in prompt. Your real business postal address for the email footer.',
    ticks: ['No sign-up here', 'You send every email', 'Works in the Claude app'],
    claudePrompt: `Install Joe's Salesman kit on this computer and check that it works.
  
  My rules:
  1. Only download from https://workshop.mastermindshq.business/downloads/joes-salesman-v1.0.zip and its checksum at https://workshop.mastermindshq.business/downloads/joes-salesman-v1.0.zip.sha256
  2. Download both into a new empty folder. Check that the zip matches the checksum. If it does not, stop and tell me.
  3. Unzip it, read install.sh first and tell me in one line what it does, then run "bash install.sh" from the unzipped folder.
  4. Do not touch anything outside ~/.claude/.
  5. When it is done, tell me to restart Claude Code, then to say "Set up Salesman".`,
    requirements: [
      'Claude Code, or the Claude app with Skills turned on (this needs a paid Claude plan).',
      'Web search turned on in Claude, so it can look for businesses. Without it, you paste in a list of businesses yourself.',
      'A clear idea of who your dream customer is.',
      'Your real business postal address, for the footer of every email.',
    ],
    usePrompt: {
      title: 'Your first three messages',
      text: `Set up Salesman
  
  (then, when it has saved your notes)
  Find me customers
  
  (then, once you like the list)
  Write emails for 1, 2 and 3`,
    },
    does: [
      'Ask you a few questions and save your offer and dream customer',
      'Find 10 businesses that fit and read each website',
      'Score each one out of 100 and tell you why it fits',
      'Draft a short first email plus two follow-ups, in your voice',
      'Check each draft for spammy words, made-up details and the legal footer',
      'Read a reply and draft your next message',
    ],
    doesNot: [
      'Send any email for you',
      'Make up a client, a number or an email address',
      'Guess an address when a site does not show one',
      'Promise you customers or replies',
      'Log in to LinkedIn or anything behind a password',
    ],
    limits: [
      'The kit is free and open source (MIT). It is a small rework inspired by Harvey, an open source sales agent by Ethan Rogers. No code was copied, and Harvey is credited in the kit.',
      'It drafts and you send. Reading each email and pressing send is your job, and that is on purpose.',
      'Your emails need your real business postal address and an easy way to say no. Many countries require both, including the US under CAN-SPAM. The footer in each draft handles it. This is not legal advice, so check the rules where you and your customers are.',
      'Send 10 to 20 a day by hand from your normal inbox. To send many more, use a separate domain with SPF, DKIM and DMARC set up, and warm it up for a few weeks first.',
      'If someone asks whether AI helped, tell them the truth.',
      'It reads public websites only. Some sites will not load, and then Claude says so instead of guessing.',
      'Skills in the Claude app need a paid Claude plan. The paste-in prompt works without one.',
    ],
    stuck: [
      {
        q: 'Claude cannot find any businesses',
        a: 'Turn on web search in Claude. If you do not have it, paste a list of business names or websites into the chat and say "Find me customers from this list".',
      },
      {
        q: 'The Claude app does not show Skills',
        a: 'Skills need a paid Claude plan. Go to Settings, then Capabilities, and turn on Skills. No plan? Open START-HERE-PROMPT.md in the kit and paste the prompt into any new chat.',
      },
      {
        q: 'The email does not sound like me',
        a: 'Say "Set up Salesman" again and paste one or two emails you really wrote. Claude matches your sentences, not a template.',
      },
      {
        q: 'There is no email address for a business',
        a: 'Then Claude says "contact form" or "none found". It never guesses one. Use their contact form, or skip that business.',
      },
      {
        q: 'The install does not run in Claude Code',
        a: 'Open a terminal in the unzipped folder, not the zip. Run "bash install.sh", then restart Claude Code and say "Set up Salesman".',
      },
    ],
  },
  // Week 5 reels (Mon 9 to Sat 14 Nov 2026), Illy approved 2026-11-07 after hands-on tests.
  // Facts from tasks/swarms/2026-11-07-github-giveaways-week5/tests/<lane>/REPORT.md only:
  // photo (PHOTO), song (SONG), wow-av (DEMO), font (FONT), canva (CANVA), wow2-media (SHOT).
  {
    "slug": "free-ai-compositor",
    "keyword": "PHOTO",
    "name": "Compositor",
    "tagline": "A free Photoshop-style photo editor for your Mac.",
    "subline": "Compositor is a free, open source photo editor with layers, text and a Remove Background filter. It is under 15 MB, notarized by Apple, and runs on Apple chip Macs with macOS 26.",
    "toolUrl": "https://github.com/robbietilton/Compositor/releases/latest",
    "primaryLabel": "Download Compositor (official GitHub releases)",
    "intro": "Compositor is a free, open source photo editor for Mac, made by Robbie Tilton. It looks and works a lot like Photoshop: layers with blend modes and masks, a type tool for text on photos, a Remove Background filter, resize and crop (with 9:16 and 3:4 crop presets), and export to PNG and JPG. Background removal runs on your Mac with Apple's own built-in tech, so your photos are not uploaded. No account. For comparison, Photoshop is about $276 a year.",
    "steps": [
      "Check your Mac first. Click the Apple menu, then About This Mac. You need an Apple chip (M1 or newer) and macOS 26 Tahoe or later. Intel Macs and older macOS will not run it.",
      "Open the official download page (the button above) and download Compositor.dmg. It is about 9 MB.",
      "Open the file, drag Compositor into your Applications folder, then open it. It is signed and notarized, so it should open without a security warning.",
      "Try the simple flow first: drag in a photo, choose Filter, then Remove Background, press T to type your headline, then press Shift+Cmd+E to export a PNG."
    ],
    "howIUse": [
      "Make a quick post: your photo, the background removed, a bold headline, exported as a PNG.",
      "Use the 9:16 crop preset for story and reel covers, then Image Size to get the exact pixels you want.",
      "Zoom in on hair and edges after you remove the background, and check them before you post."
    ],
    "goodToKnow": "Free and open source (MIT), made by Robbie Tilton. It is very new (it first appeared in September 2026) and updates often. It only runs on Apple chip Macs with macOS 26 or later. It has no accounts and no analytics. It goes online in two small ways: it checks for updates, and one optional lighting filter downloads a small 2.6 MB model the first time you use it. Your photos are not uploaded.",
    "links": [
      {
        "label": "Download Compositor (official GitHub releases)",
        "url": "https://github.com/robbietilton/Compositor/releases/latest"
      },
      {
        "label": "The Compositor website",
        "url": "https://robbietilton.com/compositor"
      },
      {
        "label": "Report a problem to the maker",
        "url": "https://github.com/robbietilton/Compositor/issues"
      },
      {
        "label": "The code on GitHub",
        "url": "https://github.com/robbietilton/Compositor"
      }
    ],
    "githubUrl": "https://github.com/robbietilton/Compositor",
    "stars": 18500,
    "license": "MIT",
    "why": "A free Photoshop-style editor with layers, text and background removal, so you can make your own photo posts without paying about $276 a year for Photoshop.",
    "level": "beginner",
    "who": "Anyone with a newer Mac who makes their own photo posts, covers or ads and does not want a Photoshop subscription.",
    "needs": "An Apple chip Mac (M1 or newer) on macOS 26 Tahoe or later. It does not run on Intel Macs or Windows. About 15 MB of space.",
    "ticks": [
      "No sign-up here",
      "Notarized by Apple, no warning",
      "18,500 stars on GitHub"
    ],
    "claudePrompt": "Install Compositor, the free open source photo editor, on this Mac.\n\n1. Check this Mac first. It needs an Apple chip and macOS 26 or later. If it does not have both, stop and tell me, because Compositor will not run here.\n2. If Homebrew is already installed, run: brew install --cask robbietilton-compositor . If it is not, download Compositor.dmg only from https://github.com/robbietilton/Compositor/releases/latest , open it and copy Compositor into Applications. Do not install Homebrew without asking me.\n3. Check the app with: spctl -a -vv -t exec /Applications/Compositor.app . It should say accepted and Notarized Developer ID. If it does not, stop and tell me.\n4. Do not change my security settings.\n5. Tell me how to remove a background (Filter, then Remove Background), add text (press T) and export a PNG (Shift+Cmd+E).\n\nDo not sign me up for anything.",
    "requirements": [
      "A Mac with an Apple chip (M1 or newer). Intel Macs are not supported.",
      "macOS 26 Tahoe or later. Check in System Settings, then General, then Software Update.",
      "About 15 MB of free space. The download is about 9 MB.",
      "Your own photos."
    ],
    "does": [
      "Layers with blend modes, masks and opacity",
      "Remove the background from a photo, on your Mac",
      "Add text on photos with the type tool, with font, size and colour",
      "Resize and crop, with 9:16 and 3:4 crop presets",
      "Export PNG and JPG files",
      "Work with no account"
    ],
    "doesNot": [
      "Run on Intel Macs, older macOS, Windows, iPhone or iPad",
      "Do everything Photoshop does. It is a young project",
      "Get every cut-out perfect. Check hair and edges before you post"
    ],
    "limits": [
      "It runs only on Apple chip Macs with macOS 26 or later. People have asked the maker for Intel and older macOS support, and it is not there today. There is no Windows version.",
      "It is very new (September 2026) and changes fast, so expect the odd rough edge.",
      "It checks for updates online, and the optional Volumetric Light filter downloads a 2.6 MB model once. Everything else, including background removal, runs on your Mac.",
      "Photoshop for comparison: US$22.99 a month on Adobe's annual plan billed monthly, about $276 a year (adobe.com, 7 Nov 2026).",
      "Free and open source under the MIT licence."
    ],
    "stuck": [
      {
        "q": "It will not open or says it needs a newer macOS",
        "a": "Compositor needs macOS 26 Tahoe or later. Open System Settings, then General, then Software Update. If your Mac cannot update to macOS 26, it cannot run Compositor."
      },
      {
        "q": "I have an Intel Mac",
        "a": "Sorry, it only runs on Apple chip Macs (M1 or newer). Click the Apple menu, then About This Mac. If it says Processor and Intel, this one is not for your Mac."
      },
      {
        "q": "My Mac shows a security warning",
        "a": "It should not, because the app is notarized by Apple. If you see one, delete the file and download it again from the official link above, not from another site."
      },
      {
        "q": "The cut-out has rough edges",
        "a": "Zoom in and check hair and fine edges. The filter has a Basic and an Advanced mode, so try the other one. A photo with a plain background and good light cuts out best."
      },
      {
        "q": "A filter wants to download something",
        "a": "That is the optional 2.6 MB depth model for the Volumetric Light filter. It downloads once from the maker's GitHub. You can skip that filter if you prefer."
      }
    ]
  },
  {
    "slug": "free-ai-yovoice",
    "keyword": "SONG",
    "name": "yovoice",
    "tagline": "Make a song with vocals on your own computer.",
    "subline": "yovoice is a free, open source app. Type your lyrics and a style, and it makes a song with singing on your Mac or Windows PC. No account and no fee per song.",
    "toolUrl": "https://github.com/leemysw/yovoice/releases/latest",
    "primaryLabel": "Download yovoice (official GitHub releases)",
    "intro": "yovoice is a free, open source voice and music app made by leemysw. In the app you type lyrics and a style, and it makes a song with vocals on your own computer. For anything for your business, use the ACE-Step 1.5 model: the people who made that model say the music it makes can be used commercially. We made a 45 second song in about 22 seconds on a fast Mac Studio. I am not saying it sounds as good as Suno, so listen to each song before you use it. For comparison, Suno charges $8 or $24 a month for plans with commercial rights, and its free plan has none.",
    "steps": [
      "Check your computer. On a Mac you need an Apple chip and macOS 14 or later, and 16 GB of memory or more is recommended for songs. Windows works too, but songs are slow without a strong NVIDIA graphics card.",
      "Open the download page (the button above). On a Mac, download the file ending in macos-arm64.dmg, open it and drag yovoice into Applications. On Windows, download the file ending in windows-x64-setup.exe and run it.",
      "Open yovoice. In Settings, download the engine, then the ACE-Step 1.5 Turbo model. The model is about 6 GB, so give it 10 to 30 minutes on home wifi.",
      "Make your song in the app: choose the ACE-Step 1.5 model, type a style (for example \"upbeat acoustic pop\") and your lyrics with [verse] and [chorus] tags, pick a length and generate."
    ],
    "howIUse": [
      "Make a short jingle for a class, a launch or an ad. Twenty seconds is plenty.",
      "Write lyrics with [verse] and [chorus] tags and enough lines to fill the length. Very short lyrics just get repeated.",
      "Make two or three versions, listen all the way through, and keep the one where the words are clearest."
    ],
    "goodToKnow": "Free and open source (Apache-2.0), made mostly by one developer, leemysw. Use the ACE-Step 1.5 model for business. Some other models in the app (YuE2, OmniVoice, Breeze TTS) are for non-commercial use only. The Mac app checks GitHub for updates when it opens and every 4 hours, and downloads models when you ask. I found no tracking code in it. Your lyrics and songs are made on your computer.",
    "links": [
      {
        "label": "Download yovoice (official GitHub releases)",
        "url": "https://github.com/leemysw/yovoice/releases/latest"
      },
      {
        "label": "The yovoice website",
        "url": "https://yovoice.leemysw.com"
      },
      {
        "label": "Report a problem to the maker",
        "url": "https://github.com/leemysw/yovoice/issues"
      },
      {
        "label": "The code on GitHub",
        "url": "https://github.com/leemysw/yovoice"
      }
    ],
    "githubUrl": "https://github.com/leemysw/yovoice",
    "stars": 2096,
    "license": "Apache-2.0 (ACE-Step 1.5 model: MIT)",
    "why": "A free app that makes songs with vocals on your own computer, with a model whose makers allow commercial use, instead of paying Suno $8 to $24 a month.",
    "level": "beginner",
    "who": "Anyone who wants a jingle or a short song for a class, a launch or an ad, without a monthly music subscription.",
    "needs": "An Apple chip Mac on macOS 14 or later (16 GB of memory recommended for songs), or a Windows PC. About 7 GB of free space for the app and the song model.",
    "ticks": [
      "No sign-up here",
      "No fee per song",
      "2k stars on GitHub"
    ],
    "claudePrompt": "Install yovoice, the free open source voice and music app, on this computer.\n\n1. Check this computer. On a Mac it needs an Apple chip and macOS 14 or later. Tell me how much memory it has (16 GB or more is recommended for songs) and how much free disk space (the song model needs about 6 GB).\n2. Download only from https://github.com/leemysw/yovoice/releases/latest . On a Mac use the file ending in macos-arm64.dmg. On Windows use the file ending in windows-x64-setup.exe. Also download SHA256SUMS.txt from the same release and check the file against it. If it does not match, stop and tell me.\n3. On a Mac, copy yovoice into Applications. Do not change my security settings.\n4. Tell me to open yovoice, download the engine and the ACE-Step 1.5 Turbo model in Settings, and make songs with the ACE-Step 1.5 model.\n5. Do not set up voice cloning, and do not choose YuE2, OmniVoice or Breeze TTS. Those models are for non-commercial use only.\n\nDo not sign me up for anything.",
    "requirements": [
      "An Apple chip Mac on macOS 14 or later. Intel Macs are not supported. 16 GB of memory or more is recommended for songs.",
      "Or a Windows PC. Songs are slow without a strong NVIDIA graphics card (the docs suggest 12 GB of video memory).",
      "About 7 GB of free disk space. The ACE-Step 1.5 Turbo model alone is about 6 GB.",
      "Your own lyrics, or an idea for them."
    ],
    "usePrompt": {
      "title": "A starter song to try (change the words to your own)",
      "text": "Style: upbeat acoustic pop, warm female vocal, happy\n\nLyrics:\n[verse]\nMorning light at Sunny Yoga\nBreathe in slow, let it go\n\n[chorus]\nCome and stretch with us\nEverybody's welcome, come on down"
    },
    "does": [
      "Make a song with vocals from your lyrics and a style",
      "Make the song on your own computer, with no account",
      "Let you pick the model, including ACE-Step 1.5, whose makers allow commercial use",
      "Read text out loud too (text to speech)"
    ],
    "doesNot": [
      "Promise Suno quality. Listen before you use a song",
      "Get every word clear. Some lyrics come out mumbled",
      "Make every model safe for business. YuE2, OmniVoice and Breeze TTS are non-commercial",
      "Run on Intel Macs"
    ],
    "limits": [
      "Use ACE-Step 1.5 for anything for your business. Its makers (MIT licence) say the music it makes can be used commercially. YuE2, OmniVoice and Breeze TTS are for non-commercial use only. This is the model makers' statement, not legal advice, and AI music may not get copyright protection.",
      "Quality varies. In my test the singing was clear in places and mumbled in others. Listen to every song before you post it.",
      "The first setup downloads about 6 GB, so it takes a while on home wifi.",
      "I tested the app's own engine and the ACE-Step model, not every screen of the app, so your buttons may look a little different from my steps.",
      "The Mac app checks GitHub for updates every 4 hours and downloads models when you ask. I found no tracking code.",
      "It is new (September 2026) and made mostly by one developer, so updates depend on them.",
      "Suno for comparison: Pro $8 a month and Premier $24 a month, both with commercial rights. Suno Free has no commercial rights (suno.com, 7 Nov 2026).",
      "The app is free and open source under the Apache-2.0 licence."
    ],
    "stuck": [
      {
        "q": "It says I need a newer Mac or macOS",
        "a": "On a Mac, yovoice needs an Apple chip and macOS 14 or later. Intel Macs are not supported. Click the Apple menu, then About This Mac to check."
      },
      {
        "q": "The model download is taking forever",
        "a": "The ACE-Step 1.5 Turbo model is about 6 GB. Leave it running on good wifi, 10 to 30 minutes is normal. Keep your computer awake until it finishes."
      },
      {
        "q": "Which model do I pick?",
        "a": "ACE-Step 1.5 for any song you will use in your business. Skip YuE2, OmniVoice and Breeze TTS for business, because their licences are non-commercial."
      },
      {
        "q": "The words are hard to understand",
        "a": "Use [verse] and [chorus] tags and write enough lines to fill the length. Each run comes out different, so make two or three and keep the clearest one."
      },
      {
        "q": "It is very slow on Windows",
        "a": "The basic Windows setup runs on the processor, which is slow for songs. If you have an NVIDIA graphics card, use one of the cuda setup files from the same download page."
      }
    ]
  },
  {
    "slug": "free-ai-openscreen",
    "keyword": "DEMO",
    "name": "OpenScreen",
    "tagline": "Free screen recordings that zoom in where you click.",
    "subline": "OpenScreen is a free, open source screen recorder for Mac and Windows. It zooms in on your clicks, puts your recording on a clean background and exports with no watermark and no subscription.",
    "toolUrl": "https://github.com/getopenscreen/openscreen/releases/latest",
    "primaryLabel": "Download OpenScreen (official GitHub releases)",
    "intro": "OpenScreen is a free, open source screen recorder. You record your screen, and it zooms in smoothly wherever you clicked, then puts the recording on a clean background with rounded corners and a shadow. No watermark, no subscription. The auto zoom follows your clicks, it is not AI watching your screen. These notes use the maintained version at getopenscreen, the official continuation of the original OpenScreen project by siddharthvaddem, which moved there with the original author's approval. For comparison, Screen Studio costs $29 a month, or $9 a month billed yearly.",
    "steps": [
      "Open the download page (the button above). On a Mac with an Apple chip, download the file ending in macOS-Apple-Silicon dmg. On an Intel Mac, download the macOS-Intel dmg. On Windows, download the Setup exe (x64 for most PCs).",
      "Open the file, drag OpenScreen into Applications and open it. The Mac app is notarized, so it should open normally. You need macOS 13 or later.",
      "When it asks, allow Screen Recording and Accessibility in System Settings, then Privacy and Security. It needs these to record your screen and follow your clicks. Quit and reopen OpenScreen after you allow them.",
      "Record a short test: 30 seconds with five or six clicks, a few seconds apart. Stop, check the zooms, then export."
    ],
    "howIUse": [
      "Record a 30 to 60 second walkthrough of your website or your offer, and click slowly on the parts that matter.",
      "Leave a few seconds between clicks. Clicks close together get merged into one zoom.",
      "If you prefer, switch off the daily anonymous usage ping in the settings."
    ],
    "goodToKnow": "Free and open source (MIT). It sends one anonymous usage ping a day, and you can switch that off in the settings. The AI assistant inside is off unless you add your own AI key. Automatic captions need a one-time speech model download of about 264 MB. I am not saying it beats Screen Studio. It is a free option that does the main job.",
    "links": [
      {
        "label": "Download OpenScreen (official GitHub releases)",
        "url": "https://github.com/getopenscreen/openscreen/releases/latest"
      },
      {
        "label": "The OpenScreen website",
        "url": "https://getopenscreen.com"
      },
      {
        "label": "Report a problem to the team",
        "url": "https://github.com/getopenscreen/openscreen/issues"
      },
      {
        "label": "The code on GitHub",
        "url": "https://github.com/getopenscreen/openscreen"
      },
      {
        "label": "The original project by siddharthvaddem (archived)",
        "url": "https://github.com/siddharthvaddem/openscreen"
      }
    ],
    "githubUrl": "https://github.com/getopenscreen/openscreen",
    "stars": 6473,
    "license": "MIT",
    "why": "A free screen recorder that zooms in where you click and exports with no watermark, so you can make clean demo videos without paying for Screen Studio.",
    "level": "beginner",
    "who": "Anyone who records their screen to show a website, an app or how something works, and wants it to look polished.",
    "needs": "A Mac on macOS 13 or later (Apple chip or Intel), or a Windows PC. You give it Screen Recording and Accessibility permission once.",
    "ticks": [
      "No sign-up here",
      "No watermark, no subscription",
      "6k stars on GitHub"
    ],
    "claudePrompt": "Install OpenScreen, the free open source screen recorder, on this Mac.\n\n1. Check what chip this Mac has and that it runs macOS 13 or later. Apple chip means the dmg with macOS-Apple-Silicon in its name. Intel means the one with macOS-Intel in its name.\n2. Download the latest release only from https://github.com/getopenscreen/openscreen/releases/latest . This is the maintained version of OpenScreen. Do not download from the old archived repo or any other site.\n3. Open the dmg and copy OpenScreen into Applications. Check it with spctl -a -vv -t exec on the app. It should say accepted and Notarized Developer ID. If it does not, stop and tell me.\n4. Tell me to open it and allow Screen Recording and Accessibility in System Settings, Privacy and Security. Do not change those settings yourself.\n5. Tell me that it sends one anonymous usage ping a day, and that I can switch it off in its settings.\n\nDo not sign me up for anything.",
    "requirements": [
      "A Mac on macOS 13 or later, Apple chip or Intel. Or a Windows PC.",
      "Screen Recording and Accessibility permission, which you give once in System Settings.",
      "About 264 MB more if you want automatic captions (a one-time speech model download)."
    ],
    "does": [
      "Record your screen",
      "Zoom in smoothly where you click",
      "Add a background, rounded corners, a shadow and a smooth cursor",
      "Export in 1080p with no watermark",
      "Work with no subscription"
    ],
    "doesNot": [
      "Use AI to pick the zooms. The zoom follows your clicks",
      "Zoom on every click. Clicks close together get merged",
      "Record without permissions. It needs Screen Recording and Accessibility",
      "Stay fully silent. It sends one anonymous usage ping a day unless you switch it off"
    ],
    "limits": [
      "It sends one anonymous usage ping a day. You can switch it off in the settings.",
      "The auto zoom follows your clicks. Space your clicks a few seconds apart, or some get merged into one zoom.",
      "It needs Screen Recording and Accessibility permission to work.",
      "The AI assistant is off by default and only works with your own AI key, which that AI company may charge you for.",
      "This is the maintained version at getopenscreen, the official continuation of the original project, which is now archived. Updates come from that team.",
      "Screen Studio for comparison: $29 a month, or $9 a month billed yearly (screen.studio, November 2026).",
      "Free and open source under the MIT licence."
    ],
    "stuck": [
      {
        "q": "It records a black screen or nothing at all",
        "a": "Open System Settings, then Privacy and Security, then Screen Recording, and turn on OpenScreen. Then quit OpenScreen fully and open it again."
      },
      {
        "q": "It does not zoom where I click",
        "a": "Turn on OpenScreen under Privacy and Security, then Accessibility, and restart it. Also leave a few seconds between clicks, because clicks close together get merged."
      },
      {
        "q": "I am not sure which download to pick",
        "a": "Click the Apple menu, then About This Mac. Chip with Apple means the Apple-Silicon dmg. Processor with Intel means the Intel dmg. On Windows, most PCs use the x64 Setup file."
      },
      {
        "q": "I found another OpenScreen on GitHub",
        "a": "The original siddharthvaddem/openscreen is archived. The maintained version is github.com/getopenscreen/openscreen, which is the one linked on this page."
      },
      {
        "q": "Captions are not working",
        "a": "Captions need a one-time speech model download of about 264 MB. Let it finish, then try again."
      }
    ]
  },
  {
    "slug": "free-ai-draw-your-font",
    "keyword": "FONT",
    "name": "Draw Your Font",
    "tagline": "Turn your handwriting into a real font you can install.",
    "subline": "Draw Your Font is a free, open source tool. You write the alphabet on a printed template, photograph it, and Claude Code turns it into a font file for your computer. Plan about 35 to 50 minutes the first time.",
    "toolUrl": "https://github.com/danilo-znamerovszkij/draw-your-font",
    "primaryLabel": "Open Draw Your Font on GitHub",
    "intro": "Draw Your Font is a free, open source tool made by Danilo Znamerovszkij. You print a template, write each letter in its box with a dark pen, take a straight photo, and it builds a real font file (.ttf) you can install and type with. It runs on your own computer, nothing is uploaded. The easiest way is to let Claude Code do the fiddly part: it straightens the photo, finds your letters and fixes the messy bits. For comparison, Calligraphr Pro costs EUR 10 for one month, or EUR 6 a month on a 6 month plan.",
    "steps": [
      "Install Node.js (the LTS version from nodejs.org) and open Claude Code. Add the skill with: npx skills add danilo-znamerovszkij/draw-your-font",
      "Make the template with: npx draw-your-font template -o template.pdf --charset minimal . Print both pages.",
      "Write each letter in its box with a dark pen (a 0.5 mm pen works well). This is the longest part, about 15 to 20 minutes.",
      "Photograph each page flat, from straight above, in good light with no shadows. Fill the frame with the grid.",
      "Paste the prompt above into Claude Code and give it your two photos. When it is done, double-click the .ttf file and click Install Font."
    ],
    "howIUse": [
      "Make a font from your own handwriting for thank-you cards, class handouts and social posts.",
      "Write slowly and keep every letter inside its box. Neat letters make a better font.",
      "Type a test sentence after you install it, and redo any letters that look wrong."
    ],
    "goodToKnow": "Free and open source (MIT), made by Danilo Znamerovszkij. It runs offline on your computer. The font has 79 characters: A to Z, a to z, 0 to 9 and basic punctuation, with no accents and no kerning. You need Node.js and Claude Code, and Claude Code needs a paid Claude plan. A tilted photo with the page edges showing confuses the plain tool, which is why my prompt tells Claude to crop and straighten it first.",
    "links": [
      {
        "label": "Draw Your Font on GitHub",
        "url": "https://github.com/danilo-znamerovszkij/draw-your-font"
      },
      {
        "label": "The Draw Your Font website",
        "url": "https://drawyourfont.com"
      },
      {
        "label": "Report a problem to the maker",
        "url": "https://github.com/danilo-znamerovszkij/draw-your-font/issues"
      },
      {
        "label": "Get Node.js (free)",
        "url": "https://nodejs.org"
      }
    ],
    "githubUrl": "https://github.com/danilo-znamerovszkij/draw-your-font",
    "stars": 853,
    "license": "MIT",
    "why": "A free tool that turns a photo of your handwriting into an installable font, so you can use your own hand in posts and handouts without paying for Calligraphr.",
    "level": "builder",
    "who": "Anyone who wants their own handwriting as a font for cards, posts or handouts, and is happy to do a small setup in Claude Code.",
    "needs": "Node.js, Claude Code (needs a paid Claude plan), a printer, a dark pen and a phone camera. About 35 to 50 minutes the first time, most of it writing.",
    "ticks": [
      "No sign-up here",
      "Runs offline on your computer",
      "853 stars on GitHub"
    ],
    "claudePrompt": "Help me turn my handwriting into a font with draw-your-font (github.com/danilo-znamerovszkij/draw-your-font, MIT).\n\n1. Check that Node.js 18 or newer is installed. If it is not, tell me to install the LTS version from nodejs.org and stop.\n2. Install the skill with: npx skills add danilo-znamerovszkij/draw-your-font . Tell me in one line what it added.\n3. Make the template with: npx draw-your-font template -o template.pdf --charset minimal . Tell me where the PDF is so I can print both pages.\n4. When I give you my two photos, first crop and straighten each one to the letter grid. Remove the page edges, shadows and the printed header so only the grid is left. A tilted photo with page edges makes the letters come out wrong.\n5. Then follow the draw-your-font skill: find my letters, check them on the contact sheet by eye, and build the font. If printed guide lines stick to letters, use the skill's own fix (--cap 140).\n6. Name the font \"My Hand\", save the .ttf where I can find it, and tell me to double-click it and click Install Font.\n\nDo not upload my photos anywhere. Everything runs on this computer.",
    "requirements": [
      "Node.js 18 or newer, free from nodejs.org.",
      "Claude Code. It needs a paid Claude plan.",
      "A printer, plain paper and a dark pen (0.5 mm works well).",
      "A phone or camera and good, even light.",
      "About 35 to 50 minutes the first time, most of it writing."
    ],
    "does": [
      "Make a printable letter template",
      "Find your letters in a photo of the filled-in template",
      "Build a real font file (.ttf) you can install and type with",
      "Run on your own computer with no internet needed",
      "Keep letters like g and y hanging below the line"
    ],
    "doesNot": [
      "Work from just any snapshot. It needs a flat, straight, well-lit photo of the grid",
      "Include accents, symbols like % or *, or kerning",
      "Run without setup. You need Node.js and Claude Code",
      "Take two minutes. Plan 35 to 50 minutes the first time"
    ],
    "limits": [
      "79 characters: A to Z, a to z, 0 to 9 and basic punctuation like ! ? , . and @. No accents, no kerning, no ligatures.",
      "The photo matters most. A tilted photo with page edges and shadows confuses the plain tool, so my prompt tells Claude to crop and straighten it first.",
      "The tool is free, but Claude Code needs a paid Claude plan.",
      "We tested it with a handwriting-style practice page, not a real pen page yet. Write a few letters with your own pen as a test before you do the full set.",
      "It is a young tool (version 0.1.0) by one developer.",
      "Calligraphr for comparison: Pro is EUR 10 for one month, or EUR 6 a month on a 6 month plan. Its free plan allows 75 characters (calligraphr.com, 7 Nov 2026).",
      "Free and open source under the MIT licence."
    ],
    "stuck": [
      {
        "q": "The letters in my font are wrong or smeared",
        "a": "That usually means the photo had page edges, shadows or a tilt. Ask Claude to crop and straighten the photo to the grid and try again, or retake it flat from straight above in good light."
      },
      {
        "q": "Bits of the printed lines are stuck to my letters",
        "a": "Ask Claude to run the segment step again with --cap 140. That is the fix the skill itself suggests."
      },
      {
        "q": "It says npx is not found",
        "a": "Node.js is not installed yet. Install the LTS version from nodejs.org, close and reopen your terminal or Claude Code, then try again."
      },
      {
        "q": "I need an accent or a symbol like %",
        "a": "The minimal set has 79 characters with no accents and only basic punctuation. It cannot add those today."
      },
      {
        "q": "Where is my font?",
        "a": "Ask Claude Code \"where did you save the .ttf?\". Double-click that file and click Install Font, then pick your font in Pages, Word or Canva."
      }
    ]
  },
  {
    "slug": "free-ai-open-design",
    "keyword": "CANVA",
    "name": "Open Design",
    "tagline": "Ask Claude for your Instagram posts, in your colours.",
    "subline": "Open Design is a free, open source plugin for Claude. You describe the post, story or carousel you want, and Claude designs it in your brand colours and saves it as an Instagram-size PNG. You need a paid Claude plan.",
    "toolUrl": "https://github.com/feimacode/open-design-agent-kit",
    "primaryLabel": "Open the Open Design kit on GitHub",
    "intro": "Open Design Agent Kit is a free, open source plugin made by feimacode, built on the Open Design project by nexu-io. Once it is in Claude, you ask for an Instagram post, story, carousel or poster in your colours, and Claude designs it and exports a PNG at the right size. No Canva account and no extra API key. You change a design by telling Claude what to change, not by dragging things around. It never posts for you: you save the PNG and upload it yourself.",
    "steps": [
      "Check you have a paid Claude plan (Pro or higher), Node.js 18 or newer (from nodejs.org) and Google Chrome. Chrome is what turns the design into a PNG.",
      "In Claude Code, type /plugin marketplace add feimacode/open-design-agent-kit and then /plugin install open-design . Restart Claude Code.",
      "Ask for a design, for example: \"Make an Instagram post for my yoga class, Monday 7am, in teal and sand.\" Answer its questions.",
      "Look at the result and ask Claude to fix anything: text that overlaps, words that are hard to read, a colour that is off. Then ask it to export the PNG.",
      "Find the PNG, read every word, and upload it to Instagram yourself."
    ],
    "howIUse": [
      "Give it your exact brand colours and your real details (day, time, price). It sticks to what you give it.",
      "Ask for one design at a time, then ask for changes in plain words: \"make the date bigger\", \"darker background\".",
      "Read every word on the final PNG before you post. Its own check can miss text that overlaps."
    ],
    "goodToKnow": "The plugin is free and open source (MIT), made by feimacode on top of nexu-io's Open Design (Apache-2.0). It needs a paid Claude plan, so the software is free but Claude is not. It is young (September 2026) and run by a very small team. I found no tracking code in it. Only use text, photos and logos you have the rights to.",
    "links": [
      {
        "label": "Open Design Agent Kit on GitHub",
        "url": "https://github.com/feimacode/open-design-agent-kit"
      },
      {
        "label": "Setup guide for Claude Code (from the maker)",
        "url": "https://github.com/feimacode/open-design-agent-kit/blob/main/docs/getting-started/claude-code.md"
      },
      {
        "label": "The Open Design Agent Kit docs",
        "url": "https://feimacode.github.io/open-design-agent-kit/"
      },
      {
        "label": "Open Design by nexu-io, the project it is built on",
        "url": "https://github.com/nexu-io/open-design"
      },
      {
        "label": "Report a problem to the maker",
        "url": "https://github.com/feimacode/open-design-agent-kit/issues"
      }
    ],
    "githubUrl": "https://github.com/feimacode/open-design-agent-kit",
    "stars": 1039,
    "license": "MIT (built on nexu-io/open-design, Apache-2.0)",
    "why": "A free Claude plugin that designs Instagram posts, stories and carousels in your colours and saves real PNGs, so you can make simple posts without paying for Canva Pro.",
    "level": "builder",
    "who": "Anyone who already pays for Claude and wants simple, on-brand Instagram posts without opening Canva.",
    "needs": "A paid Claude plan (Pro or higher), Claude Code or the Claude desktop app, Node.js 18 or newer, and Google Chrome for the PNG export.",
    "ticks": [
      "No sign-up here",
      "No Canva account needed",
      "1k stars on GitHub"
    ],
    "claudePrompt": "Set up the Open Design plugin (github.com/feimacode/open-design-agent-kit, MIT) in Claude Code on this computer.\n\n1. Check that Node.js 18 or newer is installed (node -v). If not, tell me to install the LTS version from nodejs.org and stop.\n2. Check that Google Chrome, Edge or Chromium is installed. The PNG export needs one of them. If none is there, tell me.\n3. Tell me to type these two commands in Claude Code myself: /plugin marketplace add feimacode/open-design-agent-kit and then /plugin install open-design . Then tell me to restart Claude Code.\n4. After the restart, make me one test design: an Instagram post, 1080 x 1080, for my business in my colours. Ask me for my business name, my two brand colours and the event details first.\n5. Before you export, look at the design yourself and fix any text that overlaps or is hard to read. Then export the PNG and tell me the exact folder it is in.\n\nDo not connect Figma, Canva or any other account, and do not publish anything online.",
    "requirements": [
      "A paid Claude plan, Pro or higher. Plugins are not on the free plan.",
      "Claude Code or the Claude desktop app.",
      "Node.js 18 or newer, free from nodejs.org.",
      "Google Chrome (or Edge or Chromium) for the PNG export.",
      "Your brand colours and the details for your post."
    ],
    "usePrompt": {
      "title": "Three designs to try",
      "text": "Make an Instagram post (1080 x 1080) for my class: (what it is), (day and time). Use my colours (colour 1) and (colour 2). Big clear title, short details, no stock photos.\n\nNow make a story version (1080 x 1920) of the same event.\n\nNow make a 3-slide carousel (1080 x 1080 each) with 3 tips about (your topic). One tip per slide, big text, simple shapes."
    },
    "does": [
      "Design Instagram posts, stories, carousels and posters in your colours",
      "Export real PNG files at Instagram size (1080 x 1080 and 1080 x 1920)",
      "Change a design when you ask in plain words",
      "Work with no Canva account and no extra API key"
    ],
    "doesNot": [
      "Let you drag things around. You change designs by asking Claude",
      "Post for you. You save the PNG and upload it",
      "Catch every mistake. It can miss overlapping text, so check by eye",
      "Draw people well. Simple illustrations can look rough",
      "Work on the free Claude plan"
    ],
    "limits": [
      "The software is free, but the plugin needs a paid Claude plan (Pro or higher).",
      "It is not Canva. There is no photo library and no drag and drop, and the result is a PNG, not an editable layout.",
      "Expect a round of fixes. In my tests two of three designs needed one (pale text and overlapping text), and its own check missed the overlap.",
      "Its example library is mostly slide decks and web pages. The good social posts come from Claude designing fresh from your brief.",
      "It is young (September 2026) and built by a very small team. Do not connect Figma, Canva or shop accounts to it.",
      "Only use text, photos and logos you have the rights to.",
      "Free and open source under the MIT licence, built on Open Design by nexu-io (Apache-2.0)."
    ],
    "stuck": [
      {
        "q": "Claude does not show the plugin",
        "a": "Plugins need a paid Claude plan. In Claude Code, type /plugin, check that open-design is installed, then restart Claude Code. In the Claude desktop app, go to Customize, then Plugins, choose Add marketplace and type feimacode/open-design-agent-kit."
      },
      {
        "q": "It says Node or npx is not found",
        "a": "Install the LTS version of Node.js from nodejs.org, then quit and reopen Claude completely. If you installed Node another way (like nvm), the desktop app may not find it, so the nodejs.org installer is the easiest fix."
      },
      {
        "q": "The export fails",
        "a": "The PNG export needs Google Chrome, Edge or Chromium installed. Install Chrome and ask Claude to export again."
      },
      {
        "q": "I cannot find my PNG",
        "a": "Ask Claude \"what is the full path of the PNG you exported?\". In Claude Code it saves inside a hidden .open-design folder in your project, so ask Claude to copy it to your Desktop."
      },
      {
        "q": "Text overlaps or is hard to read",
        "a": "Tell Claude exactly what you see, for example \"the title on slide 3 overlaps the text, fix it\" or \"the date is too pale, make it darker\". Then export again."
      }
    ]
  },
  {
    "slug": "free-ai-draw-things",
    "keyword": "SHOT",
    "name": "Draw Things",
    "tagline": "Studio-style photos of you, made on your own Mac.",
    "subline": "Draw Things is a free app on the Mac App Store. It turns your own selfie into a studio-style headshot, puts you in a new place, or turns a product snapshot into an ad photo. It runs on your Mac, with no monthly plan.",
    "toolUrl": "https://apps.apple.com/us/app/draw-things-offline-ai-art/id6444050820",
    "primaryLabel": "Get Draw Things (Mac App Store)",
    "intro": "Draw Things is a free AI image app for Mac, iPhone and iPad, made by Draw Things Inc. Give it your own selfie and a prompt, and it makes a studio-style headshot that keeps your face. It can also put you in a new place, or turn a plain product photo into an ad-style shot. On our fast Mac Studio each picture took about 20 seconds. A normal laptop is slower. It runs on your Mac, so your photos stay with you, and there is no monthly plan like Midjourney.",
    "steps": [
      "Check your Mac. You need an Apple chip (M1 or newer). 16 GB of memory is recommended, plus about 15 GB of free space for the models.",
      "Get Draw Things free from the Mac App Store (the button above) and open it.",
      "Download one model first: FLUX.2 [klein] 4B, the one I tested. Find it in the model list and download it. It is several GB, so give it time.",
      "Add your own selfie as the starting image, paste the headshot prompt below, and generate.",
      "Not quite right? Change one thing in the prompt and generate again. Save the one you like."
    ],
    "howIUse": [
      "Start with a clear, well-lit selfie looking at the camera. A better starting photo gives a better headshot.",
      "Change one thing at a time in the prompt: the background, the clothes or the light.",
      "Use only your own face and your own products. Not celebrities, and not other people without their OK."
    ],
    "goodToKnow": "The app is free on the Mac App Store, made by Draw Things Inc. The app itself is not open source, but its engine is (draw-things-community on GitHub, GPL-3.0). Models download from the internet once, then pictures are made on your Mac. The FLUX.2 [klein] 4B model I used has an Apache-2.0 licence, which allows business use. It does not do text or logos well, and I am not promising video.",
    "links": [
      {
        "label": "Get Draw Things (Mac App Store)",
        "url": "https://apps.apple.com/us/app/draw-things-offline-ai-art/id6444050820"
      },
      {
        "label": "The Draw Things website",
        "url": "https://drawthings.ai"
      },
      {
        "label": "The open source engine on GitHub",
        "url": "https://github.com/drawthingsai/draw-things-community"
      }
    ],
    "githubUrl": "https://github.com/drawthingsai/draw-things-community",
    "stars": 614,
    "license": "Free app (closed source). Engine: GPL-3.0",
    "why": "A free Mac app that turns your own selfie into a studio-style headshot and your product snapshots into ad photos, with no monthly plan like Midjourney.",
    "level": "beginner",
    "who": "Anyone with a newer Mac who needs better photos of themselves or their products for posts, ads and their website.",
    "needs": "A Mac with an Apple chip (16 GB of memory recommended) and about 15 GB of free space for models. Also on iPhone and iPad. Not on Windows.",
    "ticks": [
      "No sign-up here",
      "Free on the Mac App Store",
      "Runs on your Mac"
    ],
    "claudePrompt": "Help me get Draw Things, the free AI image app, ready on this Mac.\n\n1. Check this Mac: it needs an Apple chip. Tell me how much memory it has (16 GB or more is recommended) and how much free disk space (the models need about 15 GB).\n2. Open the official Mac App Store page for me: https://apps.apple.com/us/app/draw-things-offline-ai-art/id6444050820 . Do not download Draw Things from any other site.\n3. Tell me to click Get, then open the app.\n4. Tell me to download the FLUX.2 [klein] 4B model from the model list first.\n5. Give me a starter prompt to turn my own selfie into a studio headshot that keeps my face exactly the same.\n\nDo not sign me up for anything and do not buy anything.",
    "requirements": [
      "A Mac with an Apple chip (M1 or newer). It also runs on iPhone and iPad.",
      "16 GB of memory recommended. Macs with 8 GB will be slow or may not work.",
      "About 15 GB of free disk space for the models.",
      "A free Apple ID for the App Store.",
      "A clear selfie or product photo of your own."
    ],
    "usePrompt": {
      "title": "A starter prompt for your headshot",
      "text": "Keep my face exactly the same. Professional studio headshot of this person, soft studio lighting, plain light grey background, simple dark blazer, friendly natural smile, sharp focus, photo realistic."
    },
    "does": [
      "Turn your selfie into a studio-style headshot that keeps your face",
      "Put you in a new place, in new clothes",
      "Turn a plain product snapshot into an ad-style photo",
      "Make pictures on your Mac once the model has downloaded",
      "Work with no monthly plan"
    ],
    "doesNot": [
      "Run on Windows or Android",
      "Put words or logos in pictures reliably. Text comes out misspelled",
      "Make videos. I am not promising that",
      "Run well on Macs with 8 GB of memory",
      "Keep every detail of a product exactly the same. Check shapes and labels"
    ],
    "limits": [
      "The settings screen is busy. Stick to my steps: one model, your photo, one prompt.",
      "The first model download is several GB and takes time. After that, pictures are made on your Mac.",
      "Speed depends on your Mac. On our fast Mac Studio each picture took about 20 seconds. A normal laptop is slower.",
      "Words and logos come out wrong, so add those yourself in another app.",
      "Use only your own face, your own products, or people who said yes.",
      "The app is free but not open source. Its engine is open source on GitHub under GPL-3.0. The FLUX.2 [klein] 4B model is Apache-2.0, which allows business use.",
      "Midjourney for comparison: it charges a monthly plan. Draw Things has no monthly plan."
    ],
    "stuck": [
      {
        "q": "I cannot find the model",
        "a": "Open the model list in Draw Things and search for FLUX.2, then pick FLUX.2 [klein] 4B. Apps change their lists, so if it is not there, pick another FLUX.2 model."
      },
      {
        "q": "The model download is very slow or stops",
        "a": "Models are several GB. Use good wifi, keep your Mac awake, and check you have about 15 GB of free space."
      },
      {
        "q": "It does not look like me",
        "a": "Start with a clearer, well-lit selfie looking straight at the camera, and keep \"Keep my face exactly the same\" at the start of the prompt. Then generate again."
      },
      {
        "q": "It is very slow or stops working",
        "a": "That usually means not enough memory. 16 GB is recommended. Close other apps and try again."
      },
      {
        "q": "The words in my picture are wrong",
        "a": "It does not spell well. Make the picture without words, then add your text in another app."
      }
    ]
  },
  {
    "slug": "free-ai-youtube-skills",
    "keyword": "YOUTUBE",
    "name": "YouTube Agent Skill",
    "tagline": "Claude writes the words for your videos. You film and post.",
    "subline": "Eleven free Claude skills for your videos: hooks that get scored before you film, a title and cover checker, a list of cuts from your transcript, comment replies in your voice, and a weekly plan. Made for YouTube, and most of it works for reels too.",
    "toolUrl": "https://github.com/Jakeschincariol/youtube-agent-skill",
    "primaryLabel": "Open the skills on GitHub",
    "intro": "A free pack of eleven Claude skills by Jake Schincariol (MIT licence). You type one line, like /yt-script, and Claude does that job for your video. Six of the skills come with a small checker that actually measures your hook, your title or your transcript, so it is more than a prompt. It writes and checks. You still film, edit and post.",
    "steps": [
      "You need a paid Claude plan (Pro or higher) and Claude Code, the version of Claude that can save files on your computer.",
      "Open Claude Code and paste the setup prompt from this page. It copies the eleven skills into your Claude skills folder.",
      "Make your voice file: give Claude three of your own videos or reels (transcripts work) and say \"write my voice.md from these\". Every skill reads it.",
      "Try it on your next video: type /yt-script and your idea. You get five hook options with scores, then the script.",
      "Before you post, type /yt-package for the title and cover text, and /yt-comment when the comments come in."
    ],
    "howIUse": [
      "Start with /yt-script for the first line. It scores five hook options and names the weakest part of each one.",
      "For reels, the cover rule is the one to keep: the cover should say what the caption does not, in three words or fewer.",
      "Paste your comments into /yt-comment. It sorts them into questions, corrections, praise and bait, and tells you which one to pin."
    ],
    "goodToKnow": "The skills are free and open source (MIT), made by Jake Schincariol. I am not affiliated with him or with YouTube. They need a paid Claude plan, so the skills are free but Claude is not. I read every line of the six checkers: they only read the file you give them and print a result. They do not go online, need no account and no API key, and nothing gets posted for you.",
    "links": [
      {
        "label": "The YouTube Agent Skill on GitHub",
        "url": "https://github.com/Jakeschincariol/youtube-agent-skill"
      },
      {
        "label": "The voice file template",
        "url": "https://github.com/Jakeschincariol/youtube-agent-skill/blob/main/templates/voice.md"
      },
      {
        "label": "The 21 hook formulas it scores against",
        "url": "https://github.com/Jakeschincariol/youtube-agent-skill/blob/main/skills/yt-script/hooks.json"
      },
      {
        "label": "Report a problem to the maker",
        "url": "https://github.com/Jakeschincariol/youtube-agent-skill/issues"
      }
    ],
    "githubUrl": "https://github.com/Jakeschincariol/youtube-agent-skill",
    "stars": 5202,
    "license": "MIT",
    "why": "Free Claude skills that do the writing work around a video: hooks, scripts, titles, cover text, cut lists and comment replies, in your own voice.",
    "level": "builder",
    "offerId": "video-agent",
    "who": "Business owners and coaches who make their own videos or reels and want Claude to do the writing and checking around them.",
    "needs": "A paid Claude plan (Pro or higher) and Claude Code on a Mac or PC. Python 3, which most Macs have or offer to install the first time.",
    "ticks": [
      "No sign-up here",
      "No API key, no account to connect",
      "5k stars on GitHub"
    ],
    "claudePrompt": "Install the YouTube Agent Skill (github.com/Jakeschincariol/youtube-agent-skill, MIT) in Claude Code on this computer.\n\n1. Download it from that GitHub address only, then copy every folder in its skills folder that starts with yt- into my Claude skills folder (~/.claude/skills).\n2. Check that python3 works on this computer. The six checkers need it and nothing else. If it is missing, tell me how to install it and stop.\n3. Copy templates/voice.md to ~/.claude/youtube/voice.md. Then ask me for three of my own videos or reels (links, transcripts or files) and fill in my voice file from how I really talk.\n4. Test it: run /yt-script on this idea: (your next video idea). Show me the two best hooks with their scores.\n5. Tell me which eleven commands I now have, one line each.\n\nDo not connect YouTube, Instagram or any other account, and do not post anything.",
    "requirements": [
      "A paid Claude plan, Pro or higher. Claude Code is included.",
      "Claude Code on a Mac or a PC.",
      "Python 3 for the six checkers. Nothing else to install.",
      "Three of your own videos or reels, to build your voice file."
    ],
    "usePrompt": {
      "title": "Three things to try first",
      "text": "/yt-script (your idea for your next video or reel). I film it myself, talking to camera, about 60 seconds.\n\n/yt-package Give me ten titles and the cover text for this video: (one line about it). Keep the cover to three words.\n\n/yt-comment Here are the comments on my last video. Sort them, write the replies in my voice, and tell me which one to pin: (paste the comments)"
    },
    "does": [
      "Write five hook options for your video and score each one before you film",
      "Write the full script, with what should be on screen at each beat",
      "Check a title and its cover text together, so they do not say the same thing twice",
      "Turn a transcript into a list of cuts: long pauses, \"um\" lines and back-to-back restarts, with timecodes",
      "Sort your comments and draft short replies in your voice",
      "Plan your week of videos around the hours you really have"
    ],
    "doesNot": [
      "Edit your video. It gives you a list of cuts, you make them",
      "Post anything. You copy the words and upload yourself",
      "Promise views. The hook score is a rough check, not a prediction",
      "Make thumbnails. It writes the cover words and a short brief",
      "Work on the free Claude plan"
    ],
    "limits": [
      "The skills are free, but Claude Code needs a paid Claude plan (Pro or higher).",
      "It was made for YouTube. The hook, script, cover-text and comment skills work for reels too. The title length check (60 and 40 characters) and the chapters, search and retention skills are for YouTube only.",
      "The hook score is a rough check, and the maker says so himself. We ran it on 20 of our own past reel hooks and it did not match which reels did well: \"Still paying for CapCut?\", the one that got the most comments, scored second lowest. Use it to spot a vague line, not to pick the winner.",
      "The cut list needs a transcript with timings. Claude can make one for you, or use the captions from an unlisted YouTube upload. It catches long pauses and a line restarted straight away. On our test clip it missed a line said again ten seconds later, so check the list by eye.",
      "Your voice file matters most. Without it the scripts sound generic.",
      "Free and open source under the MIT licence, by Jake Schincariol."
    ],
    "stuck": [
      {
        "q": "Claude does not know /yt-script",
        "a": "Quit and reopen Claude Code so it loads the new skills. Then ask \"which skills do you have that start with yt-?\". If none show up, paste the setup prompt again."
      },
      {
        "q": "It says python3 is not found",
        "a": "On a Mac, type python3 in Terminal and click Install when your Mac offers Apple's free developer tools. On a PC, install Python 3 from python.org. Then try again."
      },
      {
        "q": "The scripts do not sound like me",
        "a": "Your voice file is missing or thin. Give Claude three of your own videos or reels and say \"rewrite my voice.md from these\"."
      },
      {
        "q": "Where do I get a transcript for the cut list?",
        "a": "Ask Claude Code to make one from your video file, or upload the video to YouTube as unlisted and download its captions. The cut list needs the timings."
      },
      {
        "q": "I make reels, not YouTube videos",
        "a": "Use /yt-script, /yt-package for the cover words, /yt-edit and /yt-comment. Skip the chapters, search and retention skills, those are for YouTube."
      }
    ]
  }
]

const BY_SLUG: Record<string, FreeAiTool> = Object.fromEntries(FREE_AI_TOOLS.map((t) => [t.slug, t]))

export const FREE_AI_TOOL_SLUGS: readonly string[] = FREE_AI_TOOLS.map((t) => t.slug)

export function getFreeAiTool(slug: string): FreeAiTool {
  const tool = BY_SLUG[slug]
  if (!tool) throw new Error(`Unknown free AI tool slug: ${slug}`)
  return tool
}

export function isFreeAiToolSource(source: string): boolean {
  return Object.prototype.hasOwnProperty.call(BY_SLUG, source)
}

/** "179,983" style, for the GitHub star badge. */
export function formatStars(stars: number): string {
  return stars >= 1000 ? `${Math.round(stars / 1000)}k` : String(stars)
}
