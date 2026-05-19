import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { getAllArtikel, getAllKategoriArtikel, kategoriArtikelConfig } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Artikel Keuangan & Investasi Indonesia | FincTools',
  description: 'Panduan, strategi, dan edukasi keuangan untuk investor Indonesia. Mulai dari dasar-dasar investasi hingga analisis teknikal dan perencanaan pajak.',
  openGraph: { title: 'Artikel | FincTools', description: 'Edukasi keuangan dan investasi untuk Indonesia.' },
}

export default function ArtikelPage() {
  const semua    = getAllArtikel()
  const kategori = getAllKategoriArtikel()

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/" className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={10} />
          <span className="text-[--text-primary]">Artikel</span>
        </nav>

        <h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-2">Artikel Keuangan & Investasi</h1>
        <p className="text-[--text-secondary] text-sm mb-8">{semua.length} artikel · edukasi gratis untuk investor Indonesia</p>

        {/* Per kategori */}
        {kategori.map(kat => {
          const cfg  = kategoriArtikelConfig[kat]
          const arts = semua.filter(a => a.kategori === kat)
          if (arts.length === 0) return null
          return (
            <section key={kat} className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading text-base font-bold text-[--text-primary]">{cfg.nama}</h2>
                  <p className="text-xs text-[--text-secondary] mt-0.5">{arts.length} artikel</p>
                </div>
                <Link href={`/artikel/${kat}`} className="text-xs text-finc-green font-medium flex items-center gap-1">
                  Lihat semua <ChevronRight size={12} />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {arts.slice(0, 3).map(a => <ArticleCard key={a.slug} artikel={a} />)}
              </div>
            </section>
          )
        })}

      </main>
      <Footer />
    </>
  )
}
