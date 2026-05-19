import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, AlertTriangle } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Disclaimer | FincTools',
  description: 'Disclaimer penggunaan FincTools — bukan saran investasi atau keuangan profesional.',
}

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/" className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={10} />
          <span>Disclaimer</span>
        </nav>
        <h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">Disclaimer</h1>
        <p className="text-xs text-[--text-secondary] mb-8">Terakhir diperbarui: Januari 2025</p>

        <div className="finc-card bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 mb-8 flex gap-3">
          <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
            <strong>FincTools bukan penasihat investasi, perencana keuangan, atau konsultan pajak.</strong> Semua konten dan tools di platform ini hanya untuk tujuan edukasi dan kalkulasi matematis.
          </p>
        </div>

        <div className="space-y-7 text-sm text-[--text-secondary] leading-relaxed">
          <section>
            <h2 className="font-heading text-base font-bold text-[--text-primary] mb-2">Bukan Saran Investasi</h2>
            <p>Tidak ada konten di FincTools yang merupakan atau harus ditafsirkan sebagai saran investasi, rekomendasi untuk membeli atau menjual instrumen keuangan apapun, atau ajakan untuk berinvestasi.</p>
          </section>
          <section>
            <h2 className="font-heading text-base font-bold text-[--text-primary] mb-2">Bukan Saran Pajak</h2>
            <p>Kalkulator pajak di FincTools menggunakan formula berdasarkan regulasi yang tersedia publik. Namun, kondisi pajak setiap individu berbeda. Selalu konsultasikan dengan konsultan pajak berlisensi untuk keputusan pajak kamu.</p>
          </section>
          <section>
            <h2 className="font-heading text-base font-bold text-[--text-primary] mb-2">Akurasi Kalkulasi</h2>
            <p>Meskipun kami berusaha memastikan akurasi, hasil kalkulasi mungkin berbeda dengan kondisi aktual karena perubahan regulasi, kondisi pasar, atau faktor lain yang tidak dapat kami prediksi. Formula terakhir diverifikasi pada tanggal yang tercantum di setiap tool.</p>
          </section>
          <section>
            <h2 className="font-heading text-base font-bold text-[--text-primary] mb-2">Investasi Memiliki Risiko</h2>
            <p>Setiap instrumen investasi memiliki risiko, termasuk kemungkinan kehilangan sebagian atau seluruh modal. Kinerja historis tidak menjamin hasil di masa depan.</p>
          </section>
          <section>
            <h2 className="font-heading text-base font-bold text-[--text-primary] mb-2">Tautan Afiliasi</h2>
            <p>FincTools mungkin menampilkan tautan ke produk atau layanan keuangan mitra. Kami mungkin menerima komisi jika kamu mendaftar melalui tautan tersebut. Ini tidak memengaruhi objektivitas kalkulasi atau konten edukasi kami.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
