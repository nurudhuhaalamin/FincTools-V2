import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllArtikel, getArtikelBySlug, getArtikelTerkait } from '@/lib/articles'
import type { KategoriArtikel } from '@/lib/types'
import ArticleLayout from '@/components/ArticleLayout'

interface Props { params: Promise<{ kategori: string; slug: string }> }

export async function generateStaticParams() {
  return getAllArtikel().map(a => ({ kategori: a.kategori, slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori, slug } = await params
  const artikel = getArtikelBySlug(kategori as KategoriArtikel, slug)
  if (!artikel) return {}

  return {
    title: artikel.judul + ' | FincTools',
    description: artikel.ringkasan,
    keywords: artikel.tags,
    openGraph: {
      title: artikel.judul,
      description: artikel.ringkasan,
      type: 'article',
      publishedTime: artikel.tanggal,
    },
    alternates: { canonical: `https://finctools.com/artikel/${kategori}/${slug}` },
  }
}

export default async function ArtikelDetailPage({ params }: Props) {
  const { kategori, slug } = await params
  const artikel = getArtikelBySlug(kategori as KategoriArtikel, slug)
  if (!artikel) notFound()

  const related = getArtikelTerkait(artikel, 3)

  return <ArticleLayout artikel={artikel} related={related} />
}
