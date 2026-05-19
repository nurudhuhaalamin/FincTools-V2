'use client'

import { CALC_REGISTRY } from '@/calculators'
import ToolPage from '@/components/ToolPage'
import type { ToolData } from '@/lib/types'

interface Props {
  tool: ToolData
}

export default function ToolClientWrapper({ tool }: Props) {
  const Calculator = CALC_REGISTRY[tool.slug]

  if (!Calculator) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-[--text-secondary]">Kalkulator untuk tool ini belum tersedia.</p>
      </div>
    )
  }

  return (
    <ToolPage tool={tool}>
      <Calculator />
    </ToolPage>
  )
}
