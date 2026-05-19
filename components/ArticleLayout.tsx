import Link from 'next/link'
import { Clock, ChevronRight, ArrowRight, Info, Lightbulb, AlertTriangle, AlertCircle } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { kategoriArtikelConfig } from '@/lib/articles'
import type { Artikel, KontenBlock } from '@/lib/types'

// ─── Block Renderers ─────────────────────────────

function renderBlock(block: KontenBlock, idx: number): React.ReactNode {
  switch (block.type) {

    case 'paragraph':
      return <p key={idx} className="text-sm text-[--text-primary] leading-relaxed">{block.text}</p>

    case 'heading':
      if (block.level === 2) return (
        <h2 key={idx} className="font-heading text-lg font-bold text-[--text-primary] mt-6 mb-3">
          {block.text}
        </h2>
      )
      return (
        <h3 key={idx} className="font-heading text-base font-bold text-[--text-primary] mt-4 mb-2">
          {block.text}
        </h3>
      )

    case 'callout': {
      const styles = {
        info:    { bg: 'bg-blue-50 dark:bg-blue-950/20',    border: 'border-blue-200 dark:border-blue-800',    Icon: Info,          ic: 'text-blue-500'   },
        tip:     { bg: 'bg-emerald-50 dark:bg-emerald-950/20', border: 'border-emerald-200 dark:border-emerald-800', Icon: Lightbulb,     ic: 'text-emerald-500' },
        warning: { bg: 'bg-amber-50 dark:bg-amber-950/20',  border: 'border-amber-200 dark:border-amber-800',  Icon: AlertTriangle,  ic: 'text-amber-500'  },
        danger:  { bg: 'bg-red-50 dark:bg-red-950/20',      border: 'border-red-200 dark:border-red-800',      Icon: AlertCircle,    ic: 'text-red-500'    },
      }
      const s = styles[block.variant]
      return (
        <div key={idx} className={`rounded-xl border p-4 ${s.bg} ${s.border}`}>
          <div className="flex items-start gap-2.5">
            <s.Icon size={15} className={`${s.ic} shrink-0 mt-0.5`} />
            <div>
              {block.judul && <p className="text-xs font-bold text-[--text-primary] mb-1">{block.judul}</p>}
              <p className="text-xs text-[--text-secondary] leading-relaxed">{block.text}</p>
            </div>
          </div>
        </div>
      )
    }

    case 'table':
      return (
        <div key={idx} className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-xs border-collapse min-w-max">
            <thead>
              <tr className="bg-[--bg-secondary]">
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left font-semibold text-[--text-primary] px-3 py-2 border border-[--border]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? '' : 'bg-[--bg-secondary]/50'}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 text-[--text-secondary] border border-[--border] leading-relaxed">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'step-list':
      return (
        <ol key={idx} className="space-y-3">
          {block.steps.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-finc-green text-white text-xs
                               font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-[--text-primary]">{s.judul}</p>
                <p className="text-xs text-[--text-secondary] mt-0.5 leading-relaxed">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      )

    case 'formula-box':
      return (
        <div key={idx} className="finc-card bg-[--bg-secondary]">
          <p className="text-xs font-bold text-[--text-secondary] uppercase tracking-wide mb-2">Formula</p>
          <pre className="text-sm font-mono text-finc-green whitespace-pre-wrap leading-relaxed">
            {block.formula}
          </pre>
          {block.contoh && (
            <div className="mt-3 pt-3 border-t border-[--border]">
              <p className="text-xs font-semibold text-[--text-secondary] mb-1">Contoh:</p>
              <pre className="text-xs text-[--text-secondary] whitespace-pre-wrap leading-relaxed font-mono">
                {block.contoh}
              </pre>
            </div>
          )}
        </div>
      )

    case 'stat-highlight':
      return (
        <div key={idx} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {block.items.map((item, i) => (
            <div key={i} className="finc-card text-center">
              <p className="font-heading text-xl font-bold text-finc-green mb-1">{item.angka}</p>
              <p className="text-xs font-semibold text-[--text-primary] leading-tight">{item.label}</p>
              {item.sublabel && <p className="text-2xs text-[--text-secondary] mt-0.5">{item.sublabel}</p>}
            </div>
          ))}
        </div>
      )

    case 'comparison':
      return (
        <div key={idx} className="space-y-2">
          {block.judul && <p className="text-xs font-bold text-[--text-secondary] uppercase tracking-wide">{block.judul}</p>}
          <div className="grid sm:grid-cols-2 gap-3">
            {block.items.map((item, i) => (
              <div key={i} className="finc-card">
                <p className="text-xs font-bold text-[--text-primary] mb-2">{item.nama}</p>
                <div className="space-y-1">
                  {item.pros.map((p, j) => (
                    <p key={j} className="text-xs text-[--text-secondary] flex items-start gap-1.5">
                      <span className="text-emerald-500 shrink-0">+</span>{p}
                    </p>
                  ))}
                  {item.cons.map((c, j) => (
                    <p key={j} className="text-xs text-[--text-secondary] flex items-start gap-1.5">
                      <span className="text-red-400 shrink-0">−</span>{c}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'key-takeaway':
      return (
        <div key={idx} className="finc-card bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide mb-2">
            Key Takeaway
          </p>
          <ul className="space-y-1.5">
            {block.points.map((p, i) => (
              <li key={i} className="text-xs text-[--text-secondary] flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      )

    case 'tool-cta':
      return (
        <div key={idx} className="finc-card border-finc-green/30 bg-emerald-50/50 dark:bg-emerald-950/10">
          <p className="text-xs text-[--text-secondary] mb-2">{block.desc}</p>
          <Link href={block.href} className="finc-btn text-sm">
            Coba {block.nama} <ArrowRight size={14} />
          </Link>
        </div>
      )

    case 'grafik-garis': {
      const seri = block.seri || [{ key: 'nilai' as const, nama: 'Nilai', warna: '#10b981' }]
      return (
        <div key={idx} className="finc-card">
          <p className="text-xs font-bold text-[--text-primary] mb-3">{block.judul}</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={block.data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="var(--text-secondary)" />
              <YAxis tick={{ fontSize: 10 }} stroke="var(--text-secondary)" label={block.labelY ? { value: block.labelY, angle: -90, position: 'insideLeft', style: { fontSize: 9 } } : undefined} />
              <Tooltip contentStyle={{ fontSize: 11, background: 'var(--bg-card)', border: '1px solid var(--border)' }} />
              {seri.length > 1 && <Legend wrapperStyle={{ fontSize: 10 }} />}
              {seri.map(s => (
                <Line key={s.key} type="monotone" dataKey={s.key} name={s.nama} stroke={s.warna} dot={false} strokeWidth={2} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )
    }

    case 'grafik-batang':
      return (
        <div key={idx} className="finc-card">
          <p className="text-xs font-bold text-[--text-primary] mb-3">{block.judul}</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={block.data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="var(--text-secondary)" />
              <YAxis tick={{ fontSize: 10 }} stroke="var(--text-secondary)" />
              <Tooltip contentStyle={{ fontSize: 11, background: 'var(--bg-card)', border: '1px solid var(--border)' }} />
              <Bar dataKey="nilai" fill={block.warna || '#10b981'} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )

    default:
      return null
  }
}

// ─── Main Layout ──────────────────────────────────

interface Props {
  artikel: Artikel
  related?: Artikel[]
}

export default function ArticleLayout({ artikel, related = [] }: Props) {
  const cfg  = kategoriArtikelConfig[artikel.kategori]
  const href = `/artikel/${artikel.kategori}/${artikel.slug}`

  // Article schema JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: artikel.judul,
    description: artikel.ringkasan,
    datePublished: artikel.tanggal,
    dateModified: artikel.tanggal,
    publisher: {
      '@type': 'Organization',
      name: 'FincTools',
      url: 'https://finctools.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://finctools.com${href}`,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',    item: 'https://finctools.com' },
      { '@type': 'ListItem', position: 2, name: 'Artikel', item: 'https://finctools.com/artikel' },
      { '@type': 'ListItem', position: 3, name: cfg.nama,  item: `https://finctools.com/artikel/${artikel.kategori}` },
      { '@type': 'ListItem', position: 4, name: artikel.judul, item: `https://finctools.com${href}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />
      <main className="mx-auto max-w-2xl px-4 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-4 flex-wrap">
          <Link href="/"           className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/artikel"    className="hover:text-finc-green transition-colors">Artikel</Link>
          <ChevronRight size={10} />
          <Link href={`/artikel/${artikel.kategori}`} className="hover:text-finc-green transition-colors">{cfg.nama}</Link>
          <ChevronRight size={10} />
          <span className="text-[--text-primary] truncate max-w-[160px]">{artikel.judul}</span>
        </nav>

        {/* Article header */}
        <header className="mb-6">
          <div className={`h-1 rounded-full bg-gradient-to-r ${cfg.gradientFrom} ${cfg.gradientTo} mb-4`} />
          <span className={`finc-badge text-xs border-transparent ${cfg.badge} mb-3 block w-fit`}>
            {cfg.nama}
          </span>
          <h1 className="font-heading text-2xl font-bold text-[--text-primary] leading-tight mb-3">
            {artikel.judul}
          </h1>
          <p className="text-sm text-[--text-secondary] leading-relaxed mb-4">
            {artikel.ringkasan}
          </p>
          <div className="flex items-center gap-3 text-xs text-[--text-secondary]">
            <span>
              {new Date(artikel.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {artikel.waktuBaca} menit baca
            </span>
          </div>
        </header>

        {/* Article content */}
        <article className="space-y-4 mb-8">
          {artikel.konten.map((block, idx) => renderBlock(block, idx))}
        </article>

        {/* Tags */}
        {artikel.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-[--border]">
            {artikel.tags.map(t => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-[--border] text-[--text-secondary]">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Related articles */}
        {related.length > 0 && (
          <section>
            <h2 className="font-heading text-sm font-bold text-[--text-primary] mb-3">
              Artikel Terkait
            </h2>
            <div className="space-y-3">
              {related.map(a => (
                <Link
                  key={a.slug}
                  href={`/artikel/${a.kategori}/${a.slug}`}
                  className="finc-card-hover flex items-center justify-between gap-3 group"
                >
                  <div>
                    <p className="text-sm font-semibold text-[--text-primary] group-hover:text-finc-green
                                   transition-colors leading-snug line-clamp-1">
                      {a.judul}
                    </p>
                    <p className="text-xs text-[--text-secondary] flex items-center gap-1 mt-0.5">
                      <Clock size={10} /> {a.waktuBaca} menit
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-[--text-secondary] group-hover:text-finc-green shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
