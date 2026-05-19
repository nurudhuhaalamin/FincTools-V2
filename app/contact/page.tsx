import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Bug, Lightbulb, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Kontak | FincTools',
  description: 'Hubungi tim FincTools untuk pertanyaan, saran, laporan bug, atau kerjasama.',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-xl px-4 py-12">
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/" className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={10} />
          <span className="text-[--text-primary]">Kontak</span>
        </nav>

        <h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-2">Hubungi Kami</h1>
        <p className="text-[--text-secondary] text-sm mb-8">Ada pertanyaan, saran, atau menemukan bug? Kami senang mendengarnya.</p>

        <div className="space-y-3 mb-8">
          {[
            { icon: Lightbulb, title: 'Request Tool atau Fitur', desc: 'Ingin tool baru? Ceritakan kepada kami.', href: '/request-tool', label: 'Request Tool' },
            { icon: Bug,       title: 'Laporan Bug / Kalkulasi Salah', desc: 'Temukan hasil kalkulasi yang tidak sesuai?', href: 'mailto:hello@finctools.com?subject=[Bug]', label: 'Email Kami' },
            { icon: Mail,      title: 'Pertanyaan Umum & Kerjasama', desc: 'Kolaborasi, media, atau pertanyaan lainnya.', href: 'mailto:hello@finctools.com', label: 'Email Kami' },
          ].map(c => {
            const Icon = c.icon
            return (
              <div key={c.title} className="finc-card flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[--bg-secondary] flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-finc-green" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[--text-primary] mb-0.5">{c.title}</p>
                  <p className="text-xs text-[--text-secondary] mb-2">{c.desc}</p>
                  <a href={c.href} className="text-xs text-finc-green font-medium hover:underline">{c.label} →</a>
                </div>
              </div>
            )
          })}
        </div>

        <div className="finc-card bg-[--bg-secondary] text-center">
          <p className="text-xs text-[--text-secondary] leading-relaxed">
            Email utama: <a href="mailto:hello@finctools.com" className="text-finc-green font-medium">hello@finctools.com</a>
            <br />Kami merespons dalam 1–3 hari kerja.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
