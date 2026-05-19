'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronRight, Bookmark, BookmarkCheck, Share2, Check, Info, BookOpen } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HasilAnalisa from '@/components/HasilAnalisa'
import { kategoriToolConfig } from '@/lib/tools'
import type { ToolData, HasilAnalisisData, KategoriTool } from '@/lib/types'

interface Props {
  tool: ToolData
  children: React.ReactNode        // Form input kalkulator
  hasil?: React.ReactNode          // Output hasil kalkulasi
  analisis?: HasilAnalisisData     // Data untuk HasilAnalisa
  onSubmit?: () => void            // Callback tombol submit
  hasResult?: boolean              // Apakah sudah ada hasil
  schema?: object                  // JSON-LD schema tambahan
}

export default function ToolPage({ tool, children, hasil, analisis, onSubmit, hasResult = false, schema }: Props) {
  const [isFav, setIsFav]         = useState(false)
  const [shared, setShared]       = useState(false)

  const favKey = `finctools-fav`

  // ── Load favorit dari localStorage ───────────
  useEffect(() => {
    try {
      const favs: string[] = JSON.parse(localStorage.getItem(favKey) || '[]')
      const toolId = `${tool.kategori}/${tool.slug}`
      setIsFav(favs.includes(toolId))
    } catch {}
  }, [tool.kategori, tool.slug])

  // ── Toggle favorit ────────────────────────────
  function toggleFav() {
    try {
      const favs: string[] = JSON.parse(localStorage.getItem(favKey) || '[]')
      const toolId = `${tool.kategori}/${tool.slug}`
      const next = isFav ? favs.filter(f => f !== toolId) : [...favs, toolId]
      localStorage.setItem(favKey, JSON.stringify(next))
      setIsFav(!isFav)
    } catch {}
  }

  // ── Share URL ─────────────────────────────────
  async function handleShare() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: tool.nama, text: tool.deskripsi, url })
      } else {
        await navigator.clipboard.writeText(url)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch {}
  }

  const cfg = kategoriToolConfig[tool.kategori as KategoriTool]

  // ── Schema JSON-LD ────────────────────────────
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.nama,
    description: tool.deskripsi,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'IDR' },
    dateModified: tool.dateVerified,
  }

  const faqSchema = tool.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  const howToSchema = tool.steps.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Cara menggunakan ${tool.nama}`,
    step: tool.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.judul,
      text: s.desc,
    })),
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://finctools.com' },
      { '@type': 'ListItem', position: 2, name: cfg.nama, item: `https://finctools.com/${tool.kategori}` },
      { '@type': 'ListItem', position: 3, name: tool.nama, item: `https://finctools.com/${tool.kategori}/${tool.slug}` },
    ],
  }

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {howToSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}

      <Header />
      <main className="mx-auto max-w-2xl px-4 py-6">

        {/* ── Breadcrumb ─────────────────────── */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1 text-xs text-[--text-secondary] mb-4 flex-wrap">
          <Link href="/" className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href={`/${tool.kategori}`} className="hover:text-finc-green transition-colors">{cfg.nama}</Link>
          <ChevronRight size={10} />
          <span className="text-[--text-primary]">{tool.nama}</span>
        </nav>

        {/* ── Header ─────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className={`finc-badge text-xs mb-2 ${cfg.badge} border-transparent`}>
                {cfg.nama}
              </span>
              <h1 className="font-heading text-xl font-bold text-[--text-primary] leading-tight">
                {tool.nama}
              </h1>
              <p className="text-sm text-[--text-secondary] mt-1 leading-relaxed">
                {tool.deskripsi}
              </p>
            </div>

            {/* Favorit & Share */}
            <div className="flex gap-1 shrink-0">
              <button
                onClick={toggleFav}
                className={`finc-btn-ghost p-2 ${isFav ? 'text-finc-green' : ''}`}
                aria-label={isFav ? 'Hapus dari favorit' : 'Simpan ke favorit'}
                title={isFav ? 'Hapus favorit' : 'Simpan favorit'}
              >
                {isFav ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
              </button>
              <button
                onClick={handleShare}
                className="finc-btn-ghost p-2"
                aria-label="Bagikan tool"
                title="Bagikan link"
              >
                {shared ? <Check size={17} className="text-finc-green" /> : <Share2 size={17} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Calculator Form ─────────────────── */}
        <section className="finc-card mb-4">
          {children}

          {onSubmit && (
            <div className="mt-4 pt-4 border-t border-[--border]">
              <button onClick={onSubmit} className="finc-btn w-full justify-center">
                {tool.tombol}
              </button>
            </div>
          )}
        </section>

        {/* ── Results ─────────────────────────── */}
        {hasResult && hasil && (
          <section className="mb-4 space-y-3">
            {hasil}
          </section>
        )}

        {/* ── Hasil Analisa ────────────────────── */}
        {hasResult && analisis && (
          <section className="mb-6">
            <HasilAnalisa data={analisis} />
          </section>
        )}

        {/* ── Cara Pakai ──────────────────────── */}
        {tool.steps.length > 0 && (
          <section className="finc-card mb-4">
            <h2 className="font-heading text-sm font-bold text-[--text-primary] mb-3 flex items-center gap-2">
              <Info size={14} className="text-finc-green" />
              Cara Pakai
            </h2>
            <ol className="space-y-2.5">
              {tool.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-finc-green/10 text-finc-green
                                   text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[--text-primary]">{s.judul}</p>
                    <p className="text-xs text-[--text-secondary] mt-0.5">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* ── Disclaimer ──────────────────────── */}
        <div className="finc-disclaimer mb-4">
          <span className="shrink-0">⚠️</span>
          <span>
            Tool ini hanya untuk kalkulasi dan edukasi. Bukan saran investasi atau nasihat keuangan profesional.
            Hasil dapat berbeda dengan kondisi aktual. Formula terakhir diverifikasi: {tool.dateVerified}.
          </span>
        </div>

        {/* ── FAQ ─────────────────────────────── */}
        {tool.faqs.length > 0 && (
          <section className="mb-6">
            <h2 className="font-heading text-sm font-bold text-[--text-primary] mb-3">
              Pertanyaan Umum
            </h2>
            <div className="space-y-3">
              {tool.faqs.map((f, i) => (
                <div key={i} className="finc-card">
                  <p className="text-sm font-semibold text-[--text-primary] mb-1.5">{f.q}</p>
                  <p className="text-xs text-[--text-secondary] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Referensi ───────────────────────── */}
        {tool.references.length > 0 && (
          <section className="mb-6">
            <h2 className="font-heading text-xs font-bold text-[--text-secondary] uppercase tracking-wide mb-2">
              Referensi
            </h2>
            <ul className="space-y-1">
              {tool.references.map((r, i) => (
                <li key={i} className="text-xs text-[--text-secondary] flex items-start gap-1.5">
                  <span className="text-finc-green mt-0.5">—</span>
                  {r}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Related Tools ───────────────────── */}
        {tool.relatedTools.length > 0 && (
          <section>
            <h2 className="font-heading text-sm font-bold text-[--text-primary] mb-3 flex items-center gap-2">
              <BookOpen size={14} className="text-finc-green" />
              Tools Terkait
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tool.relatedTools.slice(0, 4).map(ref => {
                const parts = ref.split('/')
                const label = parts[parts.length - 1].split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                return (
                  <Link
                    key={ref}
                    href={`/${ref}`}
                    className="finc-card-hover flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-[--text-primary] group-hover:text-finc-green transition-colors">
                        {label}
                      </p>
                    </div>
                    <ChevronRight size={13} className="text-[--text-secondary] group-hover:text-finc-green transition-colors" />
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
