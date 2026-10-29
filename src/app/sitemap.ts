import type { MetadataRoute } from 'next'
import { FREE_AI_TOOL_SLUGS } from '@/lib/free-ai-tools'

const BASE = 'https://workshop.mastermindshq.business'
const NOW = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Home
    { url: BASE, lastModified: NOW, changeFrequency: 'weekly', priority: 1 },

    // Giveaways
    { url: `${BASE}/giveaways`,                              lastModified: NOW, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/giveaways/terminal-to-claude-desktop`,   lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/giveaways/cross-cli-compatibility-routing`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/giveaways/claude-md`,                   lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/giveaways/web-design-arsenal`,          lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/giveaways/anthropic-safety-checklist`,  lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/giveaways/lead-magnet`,                 lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/giveaways/benchmark`,                   lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/giveaways/maccleaner`,                 lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/giveaways/speak-human`,                 lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/giveaways/ray-dalio-council`,           lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/giveaways/lead-machine`,                lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/giveaways/tokens`,                      lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/giveaways/whatsapp-agent`,              lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/giveaways/posture-coach`,               lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/giveaways/linkedin-kit`,               lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/giveaways/film`,                        lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/giveaways/chat-to-flowchart`,            lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    // Free AI Tools setup notes (one page per keyword, from the shared table)
    ...FREE_AI_TOOL_SLUGS.map((slug) => ({ url: `${BASE}/giveaways/${slug}`, lastModified: NOW, changeFrequency: 'monthly' as const, priority: 0.7 })),
    // Lead magnets
    { url: `${BASE}/lead-magnets/ultimate-claudemd`,        lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
