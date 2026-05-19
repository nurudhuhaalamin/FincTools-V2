import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi | FincTools',
  description: 'Kebijakan privasi FincTools mengenai pengumpulan dan penggunaan data pengguna.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-heading text-base font-bold text-[--text-primary] mb-2">{title}</h2>
      <div className="text-sm text-[--text-secondary] leading-relaxed space-y-2">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/" className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={10} />
          <span>Kebijakan Privasi</span>
        </nav>
        <h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">Kebijakan Privasi</h1>
        <p className="text-xs text-[--text-secondary] mb-8">Terakhir diperbarui: Januari 2025</p>

        <div className="space-y-7">
          <Section title="Prinsip Utama">
            <p>FincTools dirancang dengan prinsip privasi-by-default. Semua kalkulasi berjalan sepenuhnya di browser. Kami tidak mengumpulkan, menyimpan, atau memproses data keuangan pribadi di server kami.</p>
          </Section>
          <Section title="Data yang Kami Kumpulkan">
            <p>Kami hanya menggunakan Google Analytics untuk mengukur pengunjung secara agregat (jumlah pengunjung, halaman yang dikunjungi) tanpa mengidentifikasi individu.</p>
            <p>Preferensi tema (light/dark) dan favorit tool disimpan di localStorage browser kamu — bukan di server.</p>
          </Section>
          <Section title="Cookies">
            <p>FincTools menggunakan cookies minimal untuk fungsionalitas dasar dan analitik. Kamu dapat menonaktifkan cookies melalui pengaturan browser, namun beberapa fitur mungkin tidak berfungsi optimal.</p>
          </Section>
          <Section title="Pihak Ketiga">
            <p>Kami mungkin menampilkan tautan afiliasi ke produk keuangan. Klik tautan tersebut mungkin dipantau oleh penyedia afiliasi. FincTools tidak bertanggung jawab atas kebijakan privasi pihak ketiga.</p>
          </Section>
          <Section title="Keamanan Data">
            <p>Karena data keuangan tidak meninggalkan browser kamu, risiko kebocoran data ke pihak ketiga sangat minimal. Koneksi ke website ini menggunakan HTTPS.</p>
          </Section>
          <Section title="Hak Pengguna">
            <p>Kamu dapat menghapus data yang tersimpan di browser kapan saja melalui localStorage. Tidak ada data pengguna yang tersimpan di server kami.</p>
          </Section>
          <Section title="Perubahan Kebijakan">
            <p>Kebijakan ini dapat berubah sewaktu-waktu. Perubahan material akan diumumkan di halaman ini dengan tanggal pembaruan.</p>
          </Section>
          <Section title="Kontak">
            <p>Pertanyaan tentang privasi? Email ke <a href="mailto:hello@finctools.com" className="text-finc-green hover:underline">hello@finctools.com</a>.</p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  )
}
