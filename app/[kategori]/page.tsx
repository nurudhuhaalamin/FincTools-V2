import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { kategoriToolConfig, getToolsByKategori, getAllKategoriTools } from '@/lib/tools'
import type { KategoriTool } from '@/lib/types'

interface Props {
  params: Promise<{ kategori: string }>
}

export async function generateStaticParams() {
  return getAllKategoriTools().map(k => ({ kategori: k }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params
  const cfg = kategoriToolConfig[kategori as KategoriTool]
  if (!cfg) return {}
  const tools = getToolsByKategori(kategori as KategoriTool)
  return {
    title: `${cfg.nama} — ${tools.length} Tools Gratis | FincTools`,
    description: cfg.deskripsi,
    openGraph: { title: cfg.nama + ' | FincTools', description: cfg.deskripsi },
  }
}

export default async function KategoriPage({ params }: Props) {
  const { kategori } = await params
  const cfg   = kategoriToolConfig[kategori as KategoriTool]
  const tools = getToolsByKategori(kategori as KategoriTool)

  if (!cfg || tools.length === 0) notFound()

  // JSON-LD
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: cfg.nama + ' — FincTools',
    description: cfg.deskripsi,
    url: `https://finctools.com/${kategori}`,
    hasPart: tools.map(t => ({
      '@type': 'SoftwareApplication',
      name: t.nama,
      url: `https://finctools.com/${kategori}/${t.slug}`,
      applicationCategory: 'FinanceApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'IDR' },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/" className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={10} />
          <span className="text-[--text-primary]">{cfg.nama}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-[--text-primary] mb-2">
            {cfg.nama}
          </h1>
          <p className="text-[--text-secondary] leading-relaxed max-w-xl">
            {cfg.deskripsi}
          </p>
          <p className="text-xs text-[--text-secondary] mt-2">{tools.length} tools tersedia · gratis · tanpa akun</p>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 gap-3">
          {tools.map(tool => (
            <Link
              key={tool.slug}
              href={`/${kategori}/${tool.slug}`}
              className="finc-card-hover group flex items-start justify-between gap-3"
            >
              <div className="flex-1 min-w-0">
                <p className="font-heading text-sm font-bold text-[--text-primary] group-hover:text-finc-green transition-colors mb-1 leading-snug">
                  {tool.name}
                </p>
                <p className="text-xs text-[--text-secondary] leading-relaxed line-clamp-2">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {tool.keywords.slice(0, 2).map(kw => (
                    <span key={kw} className="text-2xs px-1.5 py-0.5 rounded bg-[--bg-secondary] text-[--text-secondary]">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowRight size={14} className="text-[--text-secondary] group-hover:text-finc-green shrink-0 mt-0.5 transition-colors" />
            </Link>
          ))}
        </div>

        {/* Other Categories */}
        <div className="mt-12 pt-6 border-t border-[--border]">
          <p className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide mb-3">Kategori Lain</p>
          <div className="flex flex-wrap gap-2">
            {getAllKategoriTools()
              .filter(k => k !== kategori)
              .map(k => (
                <Link
                  key={k}
                  href={`/${k}`}
                  className="text-xs px-3 py-1.5 rounded-full border border-[--border] text-[--text-secondary] hover:border-finc-green hover:text-finc-green transition-colors"
                >
                  {kategoriToolConfig[k].nama}
                </Link>
              ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
