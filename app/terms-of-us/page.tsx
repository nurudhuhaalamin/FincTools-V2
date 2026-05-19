import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan | FincTools',
  description: 'Syarat dan ketentuan penggunaan platform FincTools.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-heading text-base font-bold text-[--text-primary] mb-2">{title}</h2>
      <div className="text-sm text-[--text-secondary] leading-relaxed space-y-2">{children}</div>
    </section>
  )
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/" className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={10} />
          <span>Syarat &amp; Ketentuan</span>
        </nav>
        <h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">Syarat &amp; Ketentuan</h1>
        <p className="text-xs text-[--text-secondary] mb-8">Terakhir diperbarui: Januari 2025</p>

        <div className="space-y-7">
          <Section title="Penerimaan Syarat">
            <p>Dengan mengakses dan menggunakan FincTools, kamu menyetujui syarat dan ketentuan ini. Jika tidak setuju, harap tidak menggunakan layanan kami.</p>
          </Section>
          <Section title="Sifat Layanan">
            <p>FincTools menyediakan tools kalkulator keuangan untuk tujuan edukasi dan referensi. Semua hasil kalkulasi bersifat estimasi dan tidak merupakan saran investasi, pajak, atau keuangan profesional.</p>
            <p>Kami tidak terdaftar atau berlisensi sebagai penasihat keuangan, perencana keuangan, atau konsultan pajak di Indonesia maupun negara lain.</p>
          </Section>
          <Section title="Keterbatasan">
            <p>Meskipun kami berusaha memastikan akurasi formula, FincTools tidak menjamin bahwa hasil kalkulasi bebas dari kesalahan. Kondisi pasar, perubahan regulasi, dan faktor lain dapat memengaruhi hasil aktual.</p>
          </Section>
          <Section title="Tanggung Jawab Pengguna">
            <p>Pengguna bertanggung jawab penuh atas keputusan finansial berdasarkan penggunaan tools ini. FincTools tidak bertanggung jawab atas kerugian finansial yang timbul dari penggunaan platform ini.</p>
          </Section>
          <Section title="Kekayaan Intelektual">
            <p>Seluruh konten, desain, dan kode FincTools adalah milik FincTools. Penggunaan kembali atau reproduksi memerlukan izin tertulis.</p>
          </Section>
          <Section title="Perubahan Layanan">
            <p>Kami berhak mengubah, menangguhkan, atau menghentikan layanan kapan saja tanpa pemberitahuan sebelumnya.</p>
          </Section>
          <Section title="Hukum yang Berlaku">
            <p>Syarat ini tunduk pada hukum Republik Indonesia.</p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  )
}
