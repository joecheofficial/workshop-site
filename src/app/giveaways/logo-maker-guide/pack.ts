import type { PackPageContent } from '@/lib/pack-page'

// Words for the logo maker guide pack page (moved onto PackPage 15 Oct 2026).
// Layout, the email ask and the end offer live in src/components/giveaways/PackPage.tsx.
// Every tool, price and finding comes from the old page. Changes on 15 Oct 2026:
// Fiverr's old /logo-design link returned 404, it now points at Fiverr's Logo Design
// category; Hatchful is now called the Shopify Logo Maker (same URL, checked live);
// MCP-LOGO-GEN moved to github.com/arekhalpern (GitHub redirects the old path).

export const FIVERR_LOGO_URL = 'https://www.fiverr.com/categories/graphics-design/creative-logo-design'
const SHOPIFY_LOGO = 'https://www.shopify.com/tools/logo-maker'
const CANVA_LOGO = 'https://www.canva.com/create/logos/'
const ADOBE_LOGO = 'https://www.adobe.com/express/create/logo'
const TURBOLOGO = 'https://turbologo.com/'
const PLACEIT = 'https://placeit.net/logo-maker'
const LOGO_LAVA = 'https://logolava.com'
const FLUX = 'https://huggingface.co/black-forest-labs/FLUX.1-schnell'
const BRANDFETCH = 'https://brandfetch.com/developers'

export const LOGO_MAKER_GUIDE_PACK: PackPageContent = {
  slug: 'logo-maker-guide',
  level: 'beginner',
  hero: {
    title: 'Here is the logo guide.',
    free: 'It is free.',
    lede: 'Every way to get a good logo: free tools, paid tools, hiring a designer, and building your own with APIs. Sorted cheapest first, with what each one costs. Plus my honest notes on what worked when I built a logo maker myself.',
    button: {
      label: 'Find my path',
      meta: 'free · on this page',
      target: 'guide',
    },
    ticks: ['No sign-up', 'No card', 'Nothing to install'],
  },
  jumps: [
    {
      target: 'guide',
      label: 'Pick your path',
      text: 'Four ways to get a logo, and the best pick for your situation.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'Not sure which one? Start here.',
    },
  ],
  guide: {
    eyebrow: 'Pick your path',
    heading: 'Four ways to get a logo',
    intro:
      'Find your situation in the first table and open the best pick. The rest of the guide lists every option in each path, cheapest first. Prices are what each site charged when this guide was written, so check the price before you pay.',
    sections: [
      {
        title: 'Every situation in one table',
        table: {
          head: ['Your situation', 'Best pick', 'Cost'],
          rows: [
            ['Already paying for Canva Pro', 'Use Canva, you already have it', '$0 extra'],
            ['Free and fast', 'Shopify Logo Maker', 'Free'],
            ['One-time purchase, best quality', 'Turbologo', '$19.99'],
            ['Subscription, unlimited downloads', 'Placeit', '$29 a year'],
            ['Hire a designer on a tight budget', 'Fiverr, Level 2 or Top Rated sellers', '$50 to $150'],
            ['API: make new logos with the text right', 'Logo Lava', 'Free'],
            ['API: the most creative AI results', 'HuggingFace FLUX.1-schnell', 'Free tier'],
            ['API: look up logos of existing brands', 'Brandfetch', 'Free, 500,000 a month'],
          ],
        },
        links: [
          { label: 'Canva logo maker', href: CANVA_LOGO },
          { label: 'Shopify Logo Maker', href: SHOPIFY_LOGO },
          { label: 'Turbologo', href: TURBOLOGO },
          { label: 'Placeit', href: PLACEIT },
          { label: 'Fiverr logo design', href: FIVERR_LOGO_URL },
          { label: 'Logo Lava', href: LOGO_LAVA },
          { label: 'FLUX.1-schnell on HuggingFace', href: FLUX },
          { label: 'Brandfetch', href: BRANDFETCH },
        ],
      },
      {
        title: 'The four paths at a glance',
        table: {
          head: ['Path', 'What it costs', 'Good for'],
          rows: [
            ['1. Do it yourself, free', '$0, no card', 'Getting a clean logo today. The Shopify and Namecheap tools are both good.'],
            ['2. Do it yourself, paid', 'One-time from about $20, or from $3 a month', 'Better quality, more control, and SVG files.'],
            ['3. Hire a designer', '$50 minimum for anything worth keeping', 'A logo nobody else has.'],
            ['4. Build with APIs', 'Free tiers to start', 'Developers and automation builders.'],
          ],
        },
      },
      {
        title: 'Before you spend anything, check what you already pay for',
        bullets: [
          'Canva Pro: if you pay $10 to $15 a month for Canva, you already have a logo maker, brand kits for up to 1,000 brands and 140M+ design assets. Most people never open the logo tools.',
          'Adobe Express: included in most Adobe Creative Cloud plans. It has an AI logo generator and thousands of templates. Check your Adobe account first.',
          'Wix, Squarespace or Shopify: all three include free logo tools for subscribers. If you pay for a website builder, log in and look for the logo section.',
          'HubSpot and other marketing tools: some all-in-one platforms include basic brand tools. Check your dashboard before you buy a separate logo maker.',
        ],
        links: [
          { label: 'Canva logo maker', href: CANVA_LOGO },
          { label: 'Adobe Express logo maker', href: ADOBE_LOGO },
          { label: 'Shopify Logo Maker', href: SHOPIFY_LOGO },
          { label: 'HubSpot', href: 'https://www.hubspot.com/' },
        ],
      },
      {
        title: 'Path 1: free tools that actually deliver',
        bullets: [
          'Shopify Logo Maker (it used to be called Hatchful): the best completely free option. Type your brand name, pick a design and change it as you like. No fees, and the logo is yours. Comes ready for social media and business cards.',
          'Namecheap Logo Maker: surprisingly strong for free. AI designs, downloadable vector files, and previews on shirts, business cards and websites. No sign-up needed.',
        ],
        links: [
          { label: 'Shopify Logo Maker', href: SHOPIFY_LOGO },
          { label: 'Namecheap Logo Maker', href: 'https://www.namecheap.com/logo-maker/' },
        ],
      },
      {
        title: 'Path 2: paid, one-time purchase',
        bullets: [
          'Turbologo, $19.99: the best value one-time buy. 3M+ icons, lifetime access and a full branding kit. Its AI ideas really do change between runs.',
          'Brandmark.io, $25: the best AI quality at this price. A scoring tool grades your logo and explains why. Font generator and business card templates included.',
          'Looka, $20 to download: make as many logos as you like for free and pay only when you download. The brand kit add-on is $96 a year.',
          'Designhill, $20 basic: over 1M icons, print-ready files (PNG, SVG, EPS) and commercial rights. Good for product packaging and print.',
          'LogoAI, $29 per download: no subscription. It also makes social posts, ad mockups and stationery from your logo.',
          'Freelogodesign.org, $44.99 basic: 2,000+ templates, 1M+ icons and lifetime updates. The plans are confusing, but the base price is solid.',
        ],
        links: [
          { label: 'Turbologo', href: TURBOLOGO },
          { label: 'Brandmark.io', href: 'https://brandmark.io/' },
          { label: 'Looka', href: 'https://looka.com/' },
          { label: 'Designhill', href: 'https://www.designhill.com/tools/logo-maker' },
          { label: 'LogoAI', href: 'https://www.logoai.com/' },
          { label: 'Freelogodesign.org', href: 'https://www.freelogodesign.org/' },
        ],
      },
      {
        title: 'Path 2: paid, monthly or yearly',
        bullets: [
          'Placeit, $29 a year ($2.42 a month): the best value subscription. 3,500+ logo templates, unlimited downloads, mockups and video templates.',
          'BrandCrowd, $3 a month on the yearly plan: 300,000+ ready-made logos and 224,000+ templates, with unlimited edits.',
          'Tailor Brands, $3.99 a month on the 2-year plan: includes a website builder and business identity tools. Watch for extra offers during checkout.',
          'Canva Pro, $10 a month on the yearly plan: better as an all-round design tool than as a logo maker. Worth it if you design often.',
          'Adobe Express, $8.33 a month on the yearly plan: good if you already use Adobe. It does not export SVG files.',
        ],
        links: [
          { label: 'Placeit', href: PLACEIT },
          { label: 'BrandCrowd', href: 'https://www.brandcrowd.com/' },
          { label: 'Tailor Brands', href: 'https://www.tailorbrands.com/' },
          { label: 'Canva', href: CANVA_LOGO },
          { label: 'Adobe Express', href: ADOBE_LOGO },
        ],
      },
      {
        title: 'Path 3: hire a designer',
        bullets: [
          'Fiverr, $5 to $500+: the biggest marketplace. Filter for "Level 2" or "Top Rated" sellers. Good work usually costs $50 to $150. Always look at the portfolio before you order.',
          '99designs, $299+: a design contest. You get 30+ ideas from different designers. Quality is higher than Fiverr on average, and you get real variety.',
          'Dribbble or Behance: find a designer whose style you already love and hire them directly. The most original work. Budget $300 to $800 for an established designer.',
          'Upwork, flat project rate: better when you want an ongoing design relationship. Fixed-price logo projects usually run $100 to $300, with payment held safely until the work is done.',
        ],
        links: [
          { label: 'Fiverr logo design', href: FIVERR_LOGO_URL },
          { label: '99designs logo design', href: 'https://99designs.com/logo-design' },
          { label: 'Dribbble logo designers', href: 'https://dribbble.com/designers/logo' },
          { label: 'Upwork logo designers', href: 'https://www.upwork.com/hire/logo-designers/' },
        ],
      },
      {
        title: 'Path 4: build with APIs (for builders)',
        bullets: [
          'Logo Lava, free: the best place to start. No API key, no sign-up. It uses templates, so the text always comes out right. One curl command returns a PNG logo.',
          'HuggingFace FLUX.1-schnell, free tier: the best creative results of any image API I tested. Fast. I use it next to Logo Lava in my own logo agent.',
          'Brandfetch Logo API, 500,000 requests a month free: fetches the logos of existing companies, as SVG files plus their colors and fonts.',
          'Logo.dev, generous free tier: the official Clearbit replacement, with millions of logos. If you used Clearbit, switch here.',
          'fal.ai, pay per image: the cheapest text-to-image at scale. Runs FLUX and Stable Diffusion. Results vary more than on HuggingFace.',
          'Canva Connect API, skip it: enterprise only (30+ seats, custom pricing), and it cannot make logos without that plan.',
        ],
        links: [
          { label: 'Logo Lava', href: LOGO_LAVA },
          { label: 'FLUX.1-schnell', href: FLUX },
          { label: 'Brandfetch developers', href: BRANDFETCH },
          { label: 'Logo.dev', href: 'https://www.logo.dev' },
          { label: 'fal.ai', href: 'https://fal.ai' },
          { label: 'Canva Connect API', href: 'https://www.canva.dev' },
        ],
      },
      {
        title: 'What actually worked when I built a logo maker',
        text: 'I tried several image APIs. Most were disappointing. This is the same research behind my own logo maker agent, so you get the finished answer without the hours of testing.',
        bullets: [
          'What did not work: most image APIs gave uneven results, garbled text, or images that did not look like a logo. The more control you want, the more prompt work it takes, and results still changed between runs.',
          'What worked: HuggingFace with FLUX.1-schnell. Free tier, fast, and clearly better than the others for creative brand ideas. If you try one image API, start here.',
          'The mix that works best: Logo Lava for text that is always right (templates), next to FLUX for creative ideas. My logo agent shows both side by side: one safe, one interesting.',
        ],
      },
      {
        title: 'Know this before you build',
        bullets: [
          'AI makes pictures, not clean vector files. You get JPG or PNG, not SVG. For print or logos that must scale, use a template tool or convert the file.',
          'AI often gets the text wrong. Models misspell brand names. Template tools like Logo Lava are far more reliable when the exact words matter.',
          'Lookup APIs only know brands that already exist. Brandfetch and Logo.dev cannot make a logo for a new brand.',
          'AI logos need careful prompts. Say the style, colors, where the text goes and the background, then try again. It takes real rounds.',
          'Free tiers have limits. Brandfetch gives 500,000 requests a month and Logo Lava handles light use. An app with thousands of daily users needs a paid plan.',
        ],
      },
      {
        title: 'Claude Code users: plug these straight in',
        text: 'Three MCP servers that let Claude make or look up logos without writing any code.',
        bullets: [
          "brandfetch-mcp: fetch any company's logo, colors and fonts by its web address. Needs a free Brandfetch key.",
          'MCP-LOGO-GEN: make logos, remove backgrounds and resize. Runs on fal.ai and needs a FAL key.',
          'Icons8 MCP: 368,000+ icons in 116 styles. Free PNGs, full SVGs with an API key.',
        ],
        links: [
          { label: 'brandfetch-mcp', href: 'https://github.com/djmoore711/brandfetch-mcp' },
          { label: 'MCP-LOGO-GEN', href: 'https://github.com/arekhalpern/MCP-LOGO-GEN' },
          { label: 'Icons8 MCP', href: 'https://github.com/icons8/icons8-mcp' },
        ],
      },
    ],
  },
  stuck: [
    {
      q: 'I just want a logo today, for free',
      a: 'Open the Shopify Logo Maker, type your brand name and pick one. If you already pay for Canva, use Canva instead.',
    },
    {
      q: 'I need an SVG file for print',
      a: 'Pick a tool that lists SVG files, like Designhill (PNG, SVG and EPS), the free Namecheap maker (vector files), or hire a designer. Adobe Express and AI image tools do not export SVG.',
    },
    {
      q: 'The AI keeps misspelling my brand name',
      a: 'That is normal for image AI. Use a template tool like Logo Lava or any of the logo makers above, which put real text on the logo.',
    },
    {
      q: 'How do I pick a good designer on Fiverr?',
      a: 'Filter for Level 2 or Top Rated sellers, look at the portfolio first, and expect to pay $50 to $150 for good work.',
    },
    {
      q: 'A price is different from this guide',
      a: 'Prices change. Trust the price on the site, and check what is included before you pay.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Tell me what the logo is for and your budget.',
    },
  ],
  bridge:
    'A logo is the first piece of your brand. The place it lives is your website, and you can build that yourself too.',
  emailHeading: 'Want the logo guide by email too?',
}
