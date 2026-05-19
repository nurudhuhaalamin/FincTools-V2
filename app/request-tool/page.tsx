'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Send, Check } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const KATEGORI_OPTIONS = [
  'Trading', 'Pajak', 'Investasi', 'Personal Finance',
  'Kredit & Properti', 'Saham', 'Kripto', 'Lainnya',
]

export default function RequestToolPage() {
  const [nama,     setNama]     = useState('')
  const [email,    setEmail]    = useState('')
  const [kategori, setKategori] = useState('')
  const [judul,    setJudul]    = useState('')
  const [desc,     setDesc]     = useState('')
  const [sent,     setSent]     = useState(false)

  function handleSubmit() {
    if (!judul.trim() || !desc.trim()) return
    // Kirim ke mailto sebagai fallback (bisa diganti form handler)
    const subject = encodeURIComponent(`[Request Tool] ${judul}`)
    const body    = encodeURIComponent(
      `Nama: ${nama}\nEmail: ${email}\nKategori: ${kategori}\n\nDeskripsi:\n${desc}`
    )
    window.open(`mailto:hello@finctools.com?subject=${subject}&body=${body}`)
    setSent(true)
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-xl px-4 py-8">
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/" className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={10} />
          <span className="text-[--text-primary]">Request Tool</span>
        </nav>

        <h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-2">Request Tool Baru</h1>
        <p className="text-[--text-secondary] text-sm mb-8 leading-relaxed">
          Ada tool keuangan yang ingin kamu lihat di FincTools? Ceritakan detailnya — semua request dibaca dan dipertimbangkan.
        </p>

        {sent ? (
          <div className="finc-card bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-center py-10">
            <div className="w-12 h-12 rounded-full bg-finc-green flex items-center justify-center mx-auto mb-4">
              <Check size={22} className="text-white" />
            </div>
            <p className="font-heading text-base font-bold text-[--text-primary] mb-2">Request Terkirim!</p>
            <p className="text-xs text-[--text-secondary] mb-4">Terima kasih, kami akan mempertimbangkan request kamu.</p>
            <Link href="/" className="finc-btn text-sm">Kembali ke Home</Link>
          </div>
        ) : (
          <div className="finc-card space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="finc-label">Nama (opsional)</label>
                <input type="text" value={nama} onChange={e => setNama(e.target.value)} placeholder="Nama kamu" className="finc-input" />
              </div>
              <div>
                <label className="finc-label">Email (opsional)</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@kamu.com" className="finc-input" />
              </div>
            </div>

            <div>
              <label className="finc-label">Kategori</label>
              <select value={kategori} onChange={e => setKategori(e.target.value)} className="finc-input">
                <option value="">Pilih kategori…</option>
                {KATEGORI_OPTIONS.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>

            <div>
              <label className="finc-label">Nama Tool yang Diinginkan *</label>
              <input type="text" value={judul} onChange={e => setJudul(e.target.value)} placeholder="Mis: Kalkulator Biaya Investasi Reksa Dana" className="finc-input" />
            </div>

            <div>
              <label className="finc-label">Deskripsi & Kegunaan *</label>
              <textarea
                rows={4}
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder="Jelaskan apa yang ingin dihitung, input apa yang dibutuhkan, dan output yang diharapkan..."
                className="finc-input resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!judul.trim() || !desc.trim()}
              className="finc-btn w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={14} /> Kirim Request
            </button>

            <p className="text-2xs text-[--text-secondary] text-center">
              Atau email langsung ke <a href="mailto:hello@finctools.com" className="text-finc-green">hello@finctools.com</a>
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
