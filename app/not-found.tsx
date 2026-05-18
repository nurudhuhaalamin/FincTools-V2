import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[--bg-primary] flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        {/* Angka 404 */}
        <div className="font-heading font-bold text-8xl text-finc-green/20 mb-4 select-none">
          404
        </div>

        <h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-sm text-[--text-secondary] leading-relaxed mb-8">
          Halaman yang kamu cari tidak ada atau sudah dipindahkan.
          Coba cek URL atau kembali ke homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="finc-btn">
            <Home size={16} />
            Kembali ke Homepage
          </Link>
          <Link href="/glossary" className="finc-btn-outline">
            <Search size={16} />
            Cari Istilah
          </Link>
        </div>

        {/* Shortcut ke kategori */}
        <div className="mt-10 pt-6 border-t border-[--border]">
          <p className="text-xs text-[--text-secondary] mb-4">Atau langsung ke tools:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { name: 'Trading',          href: '/trading'          },
              { name: 'Pajak',            href: '/pajak'            },
              { name: 'Investasi',        href: '/investasi'        },
              { name: 'Personal Finance', href: '/personal-finance' },
              { name: 'Kredit & Properti', href: '/kredit-properti' },
              { name: 'Saham',            href: '/saham'            },
              { name: 'Kripto',           href: '/kripto'           },
            ].map(c => (
              <Link
                key={c.href}
                href={c.href}
                className="text-xs px-3 py-1.5 rounded-full border border-[--border]
                           text-[--text-secondary] hover:border-finc-green
                           hover:text-finc-green transition-all"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
