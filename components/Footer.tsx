import Link from 'next/link'
import { BarChart2 } from 'lucide-react'
import { kategoriToolConfig, getAllKategoriTools } from '@/lib/tools'
import { getAllKategoriArtikel, kategoriArtikelConfig } from '@/lib/articles'

export default function Footer() {
  const tools   = getAllKategoriTools()
  const artikel = getAllKategoriArtikel()

  return (
    <footer className="border-t border-[--border] bg-[--bg-secondary] mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10">

        {/* ── Top grid ─────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-heading font-bold text-base text-[--text-primary] mb-3">
              <div className="w-6 h-6 rounded-md bg-finc-green flex items-center justify-center">
                <BarChart2 size={12} className="text-white" />
              </div>
              FincTools
            </Link>
            <p className="text-xs text-[--text-secondary] leading-relaxed mb-4">
              46 tools keuangan dan investasi gratis untuk investor Indonesia. Kalkulasi akurat berbasis matematika.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/about"          className="text-xs text-[--text-secondary] hover:text-finc-green transition-colors">Tentang</Link>
              <span className="text-[--border]">·</span>
              <Link href="/contact"        className="text-xs text-[--text-secondary] hover:text-finc-green transition-colors">Kontak</Link>
              <span className="text-[--border]">·</span>
              <Link href="/request-tool"   className="text-xs text-[--text-secondary] hover:text-finc-green transition-colors">Request Tool</Link>
            </div>
          </div>

          {/* Tools */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[--text-secondary] mb-3">Tools</p>
            <ul className="space-y-2">
              {tools.map(k => (
                <li key={k}>
                  <Link
                    href={`/${k}`}
                    className="text-xs text-[--text-secondary] hover:text-finc-green transition-colors"
                  >
                    {kategoriToolConfig[k].nama}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Artikel */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[--text-secondary] mb-3">Artikel</p>
            <ul className="space-y-2">
              {artikel.map(k => (
                <li key={k}>
                  <Link
                    href={`/artikel/${k}`}
                    className="text-xs text-[--text-secondary] hover:text-finc-green transition-colors"
                  >
                    {kategoriArtikelConfig[k].nama}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[--text-secondary] mb-3">Informasi</p>
            <ul className="space-y-2">
              {[
                { href: '/glossary',       label: 'Glossary' },
                { href: '/about',          label: 'Tentang Kami' },
                { href: '/contact',        label: 'Kontak' },
                { href: '/request-tool',   label: 'Request Tool' },
                { href: '/privacy-policy', label: 'Kebijakan Privasi' },
                { href: '/terms-of-use',   label: 'Syarat & Ketentuan' },
                { href: '/disclaimer',     label: 'Disclaimer' },
                { href: '/cookie-policy',  label: 'Kebijakan Cookie' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-[--text-secondary] hover:text-finc-green transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Disclaimer ───────────────────────── */}
        <div className="finc-disclaimer mb-6">
          <span className="text-amber-500 mt-0.5 shrink-0">⚠️</span>
          <span>
            FincTools hanya untuk tujuan edukasi dan kalkulasi. Bukan merupakan saran investasi, rekomendasi trading, atau nasihat keuangan profesional. Hasil kalkulasi dapat berbeda dengan kondisi aktual. Selalu konsultasikan keputusan finansial penting dengan profesional berlisensi.
          </span>
        </div>

        {/* ── Bottom ───────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-[--border]">
          <p className="text-xs text-[--text-secondary]">
            © {new Date().getFullYear()} FincTools. Dibuat untuk investor Indonesia.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/privacy-policy" className="text-xs text-[--text-secondary] hover:text-finc-green transition-colors">Privasi</Link>
            <Link href="/terms-of-use"   className="text-xs text-[--text-secondary] hover:text-finc-green transition-colors">Syarat</Link>
            <Link href="/disclaimer"     className="text-xs text-[--text-secondary] hover:text-finc-green transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
