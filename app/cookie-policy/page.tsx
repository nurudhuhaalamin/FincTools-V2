import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Kebijakan Cookie | FincTools',
  description: 'Informasi tentang penggunaan cookies di FincTools.',
}

export default function CookiePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/" className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={10} />
          <span>Kebijakan Cookie</span>
        </nav>
        <h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">Kebijakan Cookie</h1>
        <p className="text-xs text-[--text-secondary] mb-8">Terakhir diperbarui: Januari 2025</p>

        <div className="space-y-7 text-sm text-[--text-secondary] leading-relaxed">
          <section>
            <h2 className="font-heading text-base font-bold text-[--text-primary] mb-3">Cookie yang Kami Gunakan</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-[--bg-secondary]">
                    {['Nama', 'Tipe', 'Tujuan', 'Durasi'].map(h => (
                      <th key={h} className="text-left font-semibold text-[--text-primary] px-3 py-2 border border-[--border]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['finctools-theme',   'Fungsional',  'Preferensi tema light/dark',       'Permanen'],
                    ['finctools-fav',     'Fungsional',  'Daftar tool favorit',               'Permanen'],
                    ['_ga',              'Analitik',    'Google Analytics — identifikasi sesi', '2 tahun'],
                    ['_ga_*',            'Analitik',    'Google Analytics — status sesi',      '2 tahun'],
                  ].map(([n, t, p, d]) => (
                    <tr key={n} className="border border-[--border]">
                      <td className="px-3 py-2 font-mono text-xs">{n}</td>
                      <td className="px-3 py-2">{t}</td>
                      <td className="px-3 py-2">{p}</td>
                      <td className="px-3 py-2">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section>
            <h2 className="font-heading text-base font-bold text-[--text-primary] mb-2">Cara Mengelola Cookie</h2>
            <p>Kamu dapat menghapus atau memblokir cookies melalui pengaturan browser. Untuk cookies yang disimpan di localStorage (finctools-theme, finctools-fav), kamu dapat menghapusnya melalui DevTools browser → Application → Local Storage.</p>
          </section>
          <section>
            <h2 className="font-heading text-base font-bold text-[--text-primary] mb-2">Cookie yang Tidak Kami Gunakan</h2>
            <p>FincTools tidak menggunakan cookies iklan, retargeting, atau pelacakan lintas situs. Kami tidak menjual data pengguna kepada pihak ketiga.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
