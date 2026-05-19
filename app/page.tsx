import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BarChart2, TrendingUp, FileText, Wallet, Activity,
  Bitcoin, Home, ArrowRight, Zap, Shield, BookOpen,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { kategoriToolConfig, getAllTools, getToolsByKategori } from '@/lib/tools'
import { getArtikelTerbaru } from '@/lib/articles'
import type { KategoriTool } from '@/lib/types'

export const metadata: Metadata = {
  title: 'FincTools — 46 Tools Keuangan & Investasi Gratis Indonesia',
  description: 'Platform 46 tools keuangan dan investasi gratis untuk investor Indonesia. Kalkulasi pajak, trading, investasi, FIRE, KPR, dan kripto secara akurat dan real-time.',
  keywords: ['tools keuangan indonesia', 'kalkulator investasi', 'kalkulator pajak', 'kalkulator trading', 'kpr calculator', 'fire calculator indonesia'],
  openGraph: {
    title: 'FincTools — 46 Tools Keuangan & Investasi Gratis',
    description: 'Platform tools keuangan gratis untuk investor Indonesia.',
    url: 'https://finctools.com',
    type: 'website',
  },
}

// ─── Icon & colour per kategori ────────────────
const katConfig: Record<KategoriTool, {
  icon: React.ElementType; color: string; iconColor: string; featured: string[]
}> = {
  trading: {
    icon: Activity, color: 'bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900',
    iconColor: 'text-red-600 dark:text-red-400',
    featured: ['Risk Manager', 'Trade Analyzer', 'Kelly Criterion Optimizer'],
  },
  pajak: {
    icon: FileText, color: 'bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900',
    iconColor: 'text-purple-600 dark:text-purple-400',
    featured: ['Tax Optimizer PPh 21', 'THR Tax Planner', 'Zakat & Tax Planner'],
  },
  investasi: {
    icon: TrendingUp, color: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    featured: ['DCA Simulator', 'Dividend Income Projector', 'Bond Yield Analyzer'],
  },
  'personal-finance': {
    icon: Wallet, color: 'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
    featured: ['Wealth Freedom Planner', 'Budget Architect', 'Emergency Shield Builder'],
  },
  'kredit-properti': {
    icon: Home, color: 'bg-orange-50 dark:bg-orange-950/30 border-orange-100 dark:border-orange-900',
    iconColor: 'text-orange-600 dark:text-orange-400',
    featured: ['KPR Affordability Checker', 'Buy vs Rent Analyzer', 'Rental Yield Analyzer'],
  },
  saham: {
    icon: BarChart2, color: 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    featured: ['Averaging Strategy Builder', 'Entry Price Optimizer', 'Break-even Analyzer'],
  },
  kripto: {
    icon: Bitcoin, color: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-100 dark:border-yellow-900',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    featured: ['Crypto DCA Simulator', 'Liquidation Price Analyzer', 'Staking Reward Projector'],
  },
}

const kategoriList: KategoriTool[] = ['personal-finance', 'kredit-properti', 'pajak', 'investasi', 'trading', 'saham', 'kripto']

export default function HomePage() {
  const artikelTerbaru = getArtikelTerbaru(3)
  const totalTools     = getAllTools().length

  return (
    <>
      <Header />
      <main>

        {/* ── Hero ─────────────────────────────── */}
        <section className="bg-gradient-to-b from-emerald-50/60 to-transparent dark:from-emerald-950/20 dark:to-transparent border-b border-[--border]">
          <div className="mx-auto max-w-4xl px-4 py-14 text-center">
            <div className="inline-flex items-center gap-2 finc-badge text-finc-green bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 mb-4 text-xs">
              <Zap size={11} /> {totalTools} Tools Gratis · Tanpa Akun
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-[--text-primary] mb-4 leading-tight">
              Tools Keuangan &amp;<br className="hidden sm:block" /> Investasi untuk Indonesia
            </h1>
            <p className="text-[--text-secondary] text-base leading-relaxed max-w-xl mx-auto mb-8">
              {totalTools} kalkulator gratis berbasis matematika — pajak, trading, investasi, KPR, FIRE, dan kripto. Tidak perlu akun, tidak ada iklan.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/personal-finance/wealth-freedom-planner" className="finc-btn">
                Coba FIRE Calculator <ArrowRight size={14} />
              </Link>
              <Link href="/pajak/tax-optimizer-pph21" className="finc-btn-outline">
                Hitung PPh 21
              </Link>
            </div>
          </div>
        </section>

        {/* ── USP Pills ────────────────────────── */}
        <div className="border-b border-[--border] bg-[--bg-secondary]">
          <div className="mx-auto max-w-4xl px-4 py-3 flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {[
              { icon: Zap,     text: 'Real-time — ubah angka, hasil langsung berubah' },
              { icon: Shield,  text: 'Berjalan di browser — data tidak dikirim ke server' },
              { icon: BookOpen,text: 'Formula terverifikasi dengan referensi akademis' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 text-xs text-[--text-secondary]">
                <Icon size={12} className="text-finc-green shrink-0" />
                {text}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-10 space-y-14">

          {/* ── Kategori Grid ─────────────────── */}
          <section>
            <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-6">Pilih Kategori</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {kategoriList.map(kat => {
                const cfg     = kategoriToolConfig[kat]
                const kCfg    = katConfig[kat]
                const Icon    = kCfg.icon
                const jumlah  = getToolsByKategori(kat).length

                return (
                  <Link
                    key={kat}
                    href={`/${kat}`}
                    className={`group finc-card-hover border ${kCfg.color} flex flex-col gap-3`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${kCfg.color}`}>
                        <Icon size={17} className={kCfg.iconColor} />
                      </div>
                      <span className="text-xs text-[--text-secondary]">{jumlah} tools</span>
                    </div>
                    <div>
                      <p className="font-heading text-sm font-bold text-[--text-primary] group-hover:text-finc-green transition-colors mb-1">
                        {cfg.nama}
                      </p>
                      <p className="text-xs text-[--text-secondary] leading-relaxed line-clamp-2">
                        {cfg.deskripsi}
                      </p>
                    </div>
                    <div className="space-y-0.5 mt-auto">
                      {kCfg.featured.map(f => (
                        <p key={f} className="text-2xs text-[--text-secondary] flex items-center gap-1">
                          <span className={`w-1 h-1 rounded-full ${kCfg.iconColor.replace('text-', 'bg-')} shrink-0`} />
                          {f}
                        </p>
                      ))}
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* ── Featured Tools ────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-xl font-bold text-[--text-primary]">Tools Populer</h2>
              <Link href="/trading" className="text-xs text-finc-green font-medium flex items-center gap-1">
                Lihat semua <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { href: '/trading/risk-manager',              nama: 'Risk Manager',               kat: 'Trading',     desc: 'Hitung lot size optimal berdasarkan modal & risiko' },
                { href: '/personal-finance/wealth-freedom-planner', nama: 'Wealth Freedom (FIRE)', kat: 'Personal Finance', desc: 'Berapa yang kamu butuhkan untuk pensiun dini?' },
                { href: '/pajak/tax-optimizer-pph21',         nama: 'Tax Optimizer PPh 21',        kat: 'Pajak',       desc: 'Estimasi PPh 21 bulanan dan take home pay kamu' },
                { href: '/investasi/dca-simulator',           nama: 'DCA Simulator',               kat: 'Investasi',   desc: 'Proyeksikan hasil investasi rutin dengan DCA' },
                { href: '/kredit-properti/kpr-affordability-checker', nama: 'KPR Affordability', kat: 'Kredit',      desc: 'Cek harga properti maksimum yang mampu kamu beli' },
                { href: '/kripto/liquidation-price-analyzer', nama: 'Liquidation Analyzer',        kat: 'Kripto',      desc: 'Cek harga likuidasi sebelum buka posisi leverage' },
              ].map(t => (
                <Link key={t.href} href={t.href} className="finc-card-hover group flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs text-[--text-secondary] font-medium">{t.kat}</span>
                    <ArrowRight size={11} className="text-[--text-secondary] group-hover:text-finc-green transition-colors" />
                  </div>
                  <p className="font-heading text-sm font-bold text-[--text-primary] group-hover:text-finc-green transition-colors leading-tight">
                    {t.nama}
                  </p>
                  <p className="text-xs text-[--text-secondary] leading-relaxed">{t.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Artikel Terbaru ───────────────── */}
          {artikelTerbaru.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading text-xl font-bold text-[--text-primary]">Artikel Terbaru</h2>
                <Link href="/artikel" className="text-xs text-finc-green font-medium flex items-center gap-1">
                  Semua artikel <ArrowRight size={12} />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {artikelTerbaru.map(a => <ArticleCard key={a.slug} artikel={a} showKategori />)}
              </div>
            </section>
          )}

          {/* ── Glossary CTA ──────────────────── */}
          <section className="finc-card bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-100 dark:border-emerald-900 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <p className="font-heading text-base font-bold text-[--text-primary] mb-1">Glossary Keuangan & Investasi</p>
              <p className="text-xs text-[--text-secondary] leading-relaxed">
                Kamus istilah keuangan dari ATR sampai Zakat — lengkap dengan definisi dan konteks Indonesia.
              </p>
            </div>
            <Link href="/glossary" className="finc-btn shrink-0">
              Buka Glossary <ArrowRight size={14} />
            </Link>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
