import { CheckCircle, AlertTriangle, XCircle, Lightbulb } from 'lucide-react'
import type { HasilAnalisisData, AnalisisLevel } from '@/lib/types'

interface Props {
  data: HasilAnalisisData
}

const config: Record<AnalisisLevel, {
  bg: string; border: string; icon: React.ElementType; iconColor: string; badgeBg: string; badgeText: string
}> = {
  baik: {
    bg:         'bg-emerald-50 dark:bg-emerald-950/20',
    border:     'border-emerald-200 dark:border-emerald-800',
    icon:       CheckCircle,
    iconColor:  'text-emerald-500',
    badgeBg:    'bg-emerald-100 dark:bg-emerald-900/40',
    badgeText:  'text-emerald-700 dark:text-emerald-300',
  },
  perhatian: {
    bg:         'bg-amber-50 dark:bg-amber-950/20',
    border:     'border-amber-200 dark:border-amber-800',
    icon:       AlertTriangle,
    iconColor:  'text-amber-500',
    badgeBg:    'bg-amber-100 dark:bg-amber-900/40',
    badgeText:  'text-amber-700 dark:text-amber-300',
  },
  buruk: {
    bg:         'bg-red-50 dark:bg-red-950/20',
    border:     'border-red-200 dark:border-red-800',
    icon:       XCircle,
    iconColor:  'text-red-500',
    badgeBg:    'bg-red-100 dark:bg-red-900/40',
    badgeText:  'text-red-700 dark:text-red-300',
  },
}

const levelLabel: Record<AnalisisLevel, string> = {
  baik:      'Kondisi Baik',
  perhatian: 'Perlu Perhatian',
  buruk:     'Perlu Tindakan',
}

export default function HasilAnalisa({ data }: Props) {
  const cfg  = config[data.level]
  const Icon = cfg.icon

  return (
    <div className={`rounded-xl border p-4 ${cfg.bg} ${cfg.border}`}>

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <Icon size={20} className={`${cfg.iconColor} shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}>
              {levelLabel[data.level]}
            </span>
          </div>
          <p className="font-semibold text-sm text-[--text-primary] leading-snug">
            {data.diagnosa}
          </p>
        </div>
      </div>

      {/* Penjelasan */}
      <p className="text-xs text-[--text-secondary] leading-relaxed mb-3 pl-8">
        {data.penjelasan}
      </p>

      {/* Rekomendasi */}
      {data.rekomendasi.length > 0 && (
        <div className="pl-8">
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb size={12} className="text-[--text-secondary]" />
            <span className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wide">
              Rekomendasi
            </span>
          </div>
          <ul className="space-y-1.5">
            {data.rekomendasi.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[--text-secondary]">
                <span className={`shrink-0 mt-0.5 font-bold ${cfg.badgeText}`}>→</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
