// Free AI Tools giveaway batch (2026-10-07, approved by Illy 2026-10-08).
// The first ten were GENERATED from agents/repo-giveaways/data/batch-2026-10-07/*/setup-notes.md
// + picks.json by the free-ai-tools-pages session. Week 2 reels (VOICE, DATA, NOTES, BROWSER,
// STYLE, MEMORY; Illy approved 2026-10-16) were added by hand from each tool's own GitHub
// README, docs and pricing page (research notes: tasks/swarms/2026-10-16-week2-setup-notes/).
// Page copy and the delivery email both read from this table, so a fix here fixes both.
// One entry per /giveaways/<slug> page.

import type { GiveawayLevel } from './giveaway-offers'

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
