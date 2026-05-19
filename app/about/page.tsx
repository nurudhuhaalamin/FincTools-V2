import type { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, Shield, Zap, Users, BarChart2 } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAllTools } from '@/lib/tools'

export const metadata: Metadata = {
  title: 'Tentang FincTools | Platform Tools Keuangan Indonesia',
  description: 'FincTools adalah platform 46 tools keuangan dan investasi gratis berbasis kalkulasi matematis untuk investor Indonesia. Tanpa akun, tanpa iklan.',
}

export default function AboutPage() {
  const totalTools = getAllTools().length

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12">

        <h1 className="font-heading text-3xl font-bold text-[--text-primary] mb-4">Tentang FincTools</h1>
        <p className="text-[--text-secondary] leading-relaxed mb-10">
          FincTools adalah platform tools keuangan dan investasi gratis untuk komunitas investor dan trader Indonesia. Semua kalkulasi berbasis logika dan matematika — tidak ada koneksi data eksternal, tidak perlu akun, tidak ada biaya.
        </p>

        {/* Nilai Utama */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            { icon: Calculator, title: `${totalTools} Tools Gratis`, desc: 'Semua tools tersedia tanpa biaya, tanpa akun, tanpa batasan penggunaan.' },
            { icon: Shield,     title: 'Privasi Terjaga',            desc: 'Semua kalkulasi berjalan di browser. Data kamu tidak pernah dikirim ke server kami.' },
            { icon: Zap,        title: 'Real-time',                  desc: 'Ubah angka, hasil langsung berubah. Tidak perlu klik "hitung".' },
            { icon: Users,      title: 'Untuk Indonesia',            desc: 'Dirancang khusus untuk konteks pajak, investasi, dan keuangan Indonesia.' },
          ].map(v => {
            const Icon = v.icon
            return (
              <div key={v.title} className="finc-card flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-finc-green/10 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-finc-green" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[--text-primary] mb-1">{v.title}</p>
                  <p className="text-xs text-[--text-secondary] leading-relaxed">{v.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Prinsip */}
        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-4">Prinsip Kami</h2>
          <div className="space-y-3 text-sm text-[--text-secondary] leading-relaxed">
            <p><strong className="text-[--text-primary]">Akurasi di atas segalanya.</strong> Setiap formula diverifikasi dengan referensi akademis dan regulasi resmi Indonesia (PMK, OJK, BI). Tanggal verifikasi terakhir dicantumkan di setiap tool.</p>
            <p><strong className="text-[--text-primary]">Tidak ada saran investasi.</strong> FincTools hanya menyediakan kalkulasi matematika. Keputusan investasi tetap ada di tangan kamu. Selalu konsultasikan keputusan finansial penting dengan profesional berlisensi.</p>
            <p><strong className="text-[--text-primary]">Independen dan bebas iklan.</strong> Kami tidak menerima pembayaran dari produk keuangan manapun untuk memengaruhi hasil kalkulasi atau rekomendasi tool.</p>
          </div>
        </section>

        {/* Stat */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { angka: `${totalTools}`, label: 'Tools Aktif' },
            { angka: '7',            label: 'Kategori' },
            { angka: '0',            label: 'Biaya Apapun' },
          ].map(s => (
            <div key={s.label} className="finc-card text-center">
              <p className="font-heading text-2xl font-bold text-finc-green mb-0.5">{s.angka}</p>
              <p className="text-xs text-[--text-secondary]">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="finc-btn">Hubungi Kami</Link>
          <Link href="/request-tool" className="finc-btn-outline">Request Tool</Link>
        </div>

      </main>
      <Footer />
    </>
  )
}
