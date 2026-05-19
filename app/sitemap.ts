import type { MetadataRoute } from 'next'
import { getAllTools } from '@/lib/tools'
import { getAllArtikel } from '@/lib/articles'

const BASE = 'https://finctools.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                       lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,            lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`,          lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/glossary`,         lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/artikel`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/request-tool`,     lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE}/privacy-policy`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/terms-of-use`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/disclaimer`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/cookie-policy`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ]

  // Tool pages
  const tools = getAllTools()
  const toolPages: MetadataRoute.Sitemap = tools.map(t => ({
    url: `${BASE}/${t.kategori}/${t.slug}`,
    lastModified: t.dateVerified,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Artikel pages
  const artikel = getAllArtikel()
  const artikelPages: MetadataRoute.Sitemap = artikel.map(a => ({
    url: `${BASE}/artikel/${a.kategori}/${a.slug}`,
    lastModified: a.tanggal,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...toolPages, ...artikelPages]
}
