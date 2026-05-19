import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAllGlossary, getGlossaryByLetter } from '@/lib/glossary'

export const metadata: Metadata = {
  title: 'Glossary Keuangan & Investasi Indonesia | FincTools',
  description: 'Kamus istilah keuangan dan investasi lengkap dari ATR hingga Zakat. Definisi dan penjelasan setiap istilah dalam konteks pasar Indonesia.',
  openGraph: { title: 'Glossary Keuangan | FincTools', description: 'Kamus istilah keuangan Indonesia.' },
}

export default function GlossaryPage() {
  const semua  = getAllGlossary()
  const byLtr  = getGlossaryByLetter()
  const huruf  = Object.keys(byLtr).sort()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Glossary Keuangan & Investasi',
    description: 'Kamus istilah keuangan untuk investor Indonesia',
    url: 'https://finctools.com/glossary',
    hasDefinedTerm: semua.map(g => ({
      '@type': 'DefinedTerm',
      name: g.istilah,
      description: g.definisi,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/" className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={10} />
          <span className="text-[--text-primary]">Glossary</span>
        </nav>

        <h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">Glossary Keuangan</h1>
        <p className="text-[--text-secondary] text-sm mb-6">{semua.length} istilah · dari ATR hingga Zakat</p>

        {/* Huruf nav */}
        <div className="flex flex-wrap gap-1 mb-8 p-3 finc-card bg-[--bg-secondary]">
          {huruf.map(h => (
            <a key={h} href={`#huruf-${h}`}
              className="w-7 h-7 flex items-center justify-center rounded text-xs font-bold text-[--text-secondary] hover:bg-finc-green hover:text-white transition-colors">
              {h}
            </a>
          ))}
        </div>

        {/* Terms */}
        <div className="space-y-8">
          {huruf.map(h => (
            <section key={h} id={`huruf-${h}`}>
              <h2 className="font-heading text-lg font-bold text-finc-green mb-3 sticky top-16 bg-[--bg-primary] py-1">
                {h}
              </h2>
              <div className="space-y-3">
                {byLtr[h].map(g => (
                  <div key={g.istilah} className="finc-card">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <p className="font-heading text-sm font-bold text-[--text-primary] mb-1">
                          {g.istilah}
                          {g.singkatan && <span className="ml-2 text-xs font-normal text-finc-green">({g.singkatan})</span>}
                        </p>
                        <p className="text-xs text-[--text-secondary] leading-relaxed">{g.definisi}</p>
                        {g.contoh && (
                          <p className="text-xs text-[--text-secondary] mt-1.5 italic border-l-2 border-finc-green/30 pl-2">
                            Contoh: {g.contoh}
                          </p>
                        )}
                      </div>
                      {g.kategori && (
                        <span className="text-2xs px-2 py-0.5 rounded-full border border-[--border] text-[--text-secondary] shrink-0">
                          {g.kategori}
                        </span>
                      )}
                    </div>
                    {g.toolTerkait && g.toolTerkait.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-[--border]">
                        <span className="text-2xs text-[--text-secondary]">Tools terkait:</span>
                        {g.toolTerkait.map(t => (
                          <Link key={t} href={`/${t}`} className="text-2xs text-finc-green hover:underline">
                            {t.split('/').pop()?.replace(/-/g, ' ')}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

      </main>
      <Footer />
    </>
  )
}
