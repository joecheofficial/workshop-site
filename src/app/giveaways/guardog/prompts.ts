// Prompts copied verbatim from the old page (src/app/giveaways/<slug>/page.tsx).

export const GUARDOG_SETUP_PROMPT = `Set up GuardDog on this computer and get a free VirusTotal API key.

--- STEP 1: Install GuardDog ---

Run these commands in the terminal:
npm install -g github:josephtandle/guardog
guardog setup

After setup:
1. Confirm the guardog command is available globally.
2. Tell me where npm installed the global command.
3. Explain how I use GuardDog before installing unfamiliar packages.

--- STEP 2: Get a free VirusTotal API key ---

VirusTotal scans packages against 70+ antivirus engines. The free tier gives 500 requests per day at 4 requests per minute. No credit card required.

1. Open https://www.virustotal.com in my browser.
2. Create a free account if I do not already have one (click Sign In).
3. Once I confirm I am logged in, go to my profile icon (top-right) and click API Key.
4. Tell me to copy the key shown there.
5. Add the key to my shell profile. On macOS add to ~/.zshrc, on Linux add to ~/.bashrc:
   export VIRUSTOTAL_API_KEY="<paste my key here>"
   Resolve the home directory dynamically. Do not hard-code any paths.
6. Reload the shell profile so the key is active immediately.
7. Confirm the key loaded: echo $VIRUSTOTAL_API_KEY

--- STEP 3: Confirm everything works ---

Run: guardog analyze lodash npm
Show me the result and explain the verdict (SILENT, WHINE, or BARK).
Remind me to run guardog analyze <package-name> <npm or pypi> before installing any unfamiliar package.`

