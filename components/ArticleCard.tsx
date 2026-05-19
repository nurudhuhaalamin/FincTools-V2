import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { kategoriArtikelConfig } from '@/lib/articles'
import type { Artikel } from '@/lib/types'

interface Props {
  artikel: Artikel
  showKategori?: boolean
}

export default function ArticleCard({ artikel, showKategori = false }: Props) {
  const cfg  = kategoriArtikelConfig[artikel.kategori]
  const href = `/artikel/${artikel.kategori}/${artikel.slug}`

  return (
    <Link href={href} className="group finc-card-hover flex flex-col gap-3">

      {/* Gradient header */}
      <div className={`h-1.5 -mx-4 -mt-4 rounded-t-xl bg-gradient-to-r ${cfg.gradientFrom} ${cfg.gradientTo}`} />

      {/* Kategori badge */}
      {showKategori && (
        <span className={`finc-badge text-xs border-transparent ${cfg.badge} w-fit`}>
          {cfg.nama}
        </span>
      )}

      {/* Judul */}
      <h3 className="font-heading text-sm font-bold text-[--text-primary] leading-snug
                     group-hover:text-finc-green transition-colors line-clamp-2">
        {artikel.judul}
      </h3>

      {/* Ringkasan */}
      <p className="text-xs text-[--text-secondary] leading-relaxed line-clamp-2 flex-1">
        {artikel.ringkasan}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-[--border]">
        <div className="flex items-center gap-1.5 text-xs text-[--text-secondary]">
          <Clock size={11} />
          {artikel.waktuBaca} menit
        </div>
        <span className="text-xs text-finc-green font-semibold flex items-center gap-1
                         opacity-0 group-hover:opacity-100 transition-opacity">
          Baca <ArrowRight size={11} />
        </span>
      </div>
    </Link>
  )
}
