import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { getAllArtikel, getAllKategoriArtikel, kategoriArtikelConfig } from '@/lib/articles'
import type { KategoriArtikel } from '@/lib/types'

interface Props { params: Promise<{ kategori: string }> }

export async function generateStaticParams() {
  return getAllKategoriArtikel().map(k => ({ kategori: k }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params
  const cfg = kategoriArtikelConfig[kategori as KategoriArtikel]
  if (!cfg) return {}
  return {
    title: `Artikel ${cfg.nama} | FincTools`,
    description: `Panduan dan edukasi ${cfg.nama.toLowerCase()} untuk investor Indonesia.`,
  }
}

export default async function ArtikelKategoriPage({ params }: Props) {
  const { kategori } = await params
  const cfg   = kategoriArtikelConfig[kategori as KategoriArtikel]
  const arts  = getAllArtikel().filter(a => a.kategori === kategori)
  if (!cfg) notFound()

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/" className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/artikel" className="hover:text-finc-green transition-colors">Artikel</Link>
          <ChevronRight size={10} />
          <span className="text-[--text-primary]">{cfg.nama}</span>
        </nav>

        <h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">Artikel {cfg.nama}</h1>
        <p className="text-[--text-secondary] text-sm mb-8">{arts.length} artikel</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {arts.map(a => <ArticleCard key={a.slug} artikel={a} />)}
        </div>

        {arts.length === 0 && (
          <div className="text-center py-12 text-[--text-secondary] text-sm">
            Belum ada artikel di kategori ini.
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
