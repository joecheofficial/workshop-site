// Setup prompt for GuardDog (MyOS Guard Dog 5.2.1), shared by the page and the
// delivery email (src/app/api/lead-magnet/route.ts). Based on the official
// GUARD_DOG_PROMPT.md in github.com/joecheofficial/myos-guard-dog, cut down for
// beginners. Commands were tested on a clean install on 9 Nov 2026.
// When the tool ships a new version, update GUARDOG_VERSION and re-test.

export const GUARDOG_VERSION = '5.2.1'
export const GUARDOG_REPO = 'https://github.com/joecheofficial/myos-guard-dog'

export const GUARDOG_SETUP_PROMPT = `Install GuardDog on this computer and show me it works.

Use this exact project: ${GUARDOG_REPO}
The product is MyOS Guard Dog and its command is myos-guard-dog. Do not use any other package with a similar name (guarddog, guardog or guard-dog are different projects).

STEP 1: Check my computer
Check my operating system and my Node.js version. GuardDog needs Node 22 or Node 24. If I have a different version, explain in plain English how to switch, then continue.

STEP 2: Install it
Confirm the v${GUARDOG_VERSION} release exists on GitHub, then run:
npm install -g --ignore-scripts github:joecheofficial/myos-guard-dog#v${GUARDOG_VERSION}
myos-guard-dog doctor --repair
myos-guard-dog --version

STEP 3: Set it up
Run: myos-guard-dog setup --quick
Then help me add a free VirusTotal key with: myos-guard-dog setup
I get the key from my profile at https://www.virustotal.com (free account, no card). I type the key into the setup command myself. Never ask me to paste the key in this chat and never print it.
Then run: myos-guard-dog test
Tell me what actually passed. If I skip VirusTotal, say that the scans still run but the malware check is incomplete.

STEP 4: Show me a first scan
Run: myos-guard-dog artifact npm:lodash@4.17.21
Explain the result in plain English, and that no scan can prove a package is safe.

STEP 5: Teach me the habit
Explain how I use these from now on:
- myos-guard-dog analyze <package> npm (or pypi) to check a package before I install it
- myos-guard-dog install <package> to check an npm package and install it only if the checks pass (this one needs the VirusTotal key)
Explain the verdicts: SILENT (no warning signs found), WHINE (look closer before installing), BARK (do not install), INCOMPLETE (some checks could not run, so it is not a clean result).

Finish with a short report: version installed, whether VirusTotal works, and anything I still need to do.`
