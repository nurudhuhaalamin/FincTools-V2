'use client'

/**
 * FincTools v2 — Saham Calculators
 * 3 tools: AveragingStrategyBuilder, EntryPriceOptimizer, BreakEvenAnalyzer
 */

import { useState, useMemo } from 'react'
import { hitungAveragingSimple, hitungEntryPrice, hitungBreakEven } from '@/lib/calculations'

const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const lC = { good: 'finc-result-good', moderate: 'finc-result-warn', bad: 'finc-result-danger' }
const lT = { good: 'text-emerald-600 dark:text-emerald-400', moderate: 'text-amber-600 dark:text-amber-400', bad: 'text-red-600 dark:text-red-400' }

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
      <span className="text-xs text-[--text-secondary]">{label}</span>
      <span className="text-xs font-mono font-medium text-[--text-primary]">{value}</span>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 1. AVERAGING STRATEGY BUILDER
// ══════════════════════════════════════════════════
export function AveragingStrategyBuilder() {
  const [h1, setH1] = useState(5000)
  const [l1, setL1] = useState(10)
  const [h2, setH2] = useState(4000)
  const [l2, setL2] = useState(10)

  const r      = useMemo(() => hitungAveragingSimple(h1, l1, h2, l2), [h1, l1, h2, l2])
  const isDown = h2 < h1

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="finc-card bg-[--bg-secondary]">
          <p className="text-xs font-semibold text-[--text-secondary] mb-3">Posisi Pertama</p>
          <div className="space-y-3">
            <div><label className="finc-label">Harga Beli Pertama (Rp)</label><input type="number" value={h1} onChange={e => setH1(Number(e.target.value))} className="finc-input font-mono" /></div>
            <div><label className="finc-label">Jumlah Lot Pertama</label><input type="number" value={l1} onChange={e => setL1(Number(e.target.value))} className="finc-input font-mono" /></div>
          </div>
        </div>
        <div className="finc-card bg-[--bg-secondary]">
          <p className="text-xs font-semibold text-[--text-secondary] mb-3">{isDown ? 'Average Down' : 'Average Up'}</p>
          <div className="space-y-3">
            <div><label className="finc-label">Harga Beli Berikutnya (Rp)</label><input type="number" value={h2} onChange={e => setH2(Number(e.target.value))} className="finc-input font-mono" /></div>
            <div><label className="finc-label">Jumlah Lot Berikutnya</label><input type="number" value={l2} onChange={e => setL2(Number(e.target.value))} className="finc-input font-mono" /></div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Harga Rata-rata</p>
          <div className="font-mono font-bold text-5xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.avgHarga)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">{isDown ? `Turun ${r.persenPerubahan.toFixed(2)}% dari harga awal` : `Naik ${r.persenPerubahan.toFixed(2)}% dari harga awal`}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Harga Rata-rata" value={fmt(r.avgHarga)} />
          <Row label="Total Lot" value={`${r.totalLot} lot`} />
          <Row label="Total Nilai" value={fmt(r.totalNilai)} />
          <Row label="Jenis" value={isDown ? 'Average Down' : 'Average Up'} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 2. ENTRY PRICE OPTIMIZER
// ══════════════════════════════════════════════════
export function EntryPriceOptimizer() {
  const [harga,  setHarga]  = useState(5000)
  const [sl,     setSl]     = useState(5)
  const [tp,     setTp]     = useState(15)
  const [modal,  setModal]  = useState(100_000_000)
  const [risiko, setRisiko] = useState(2)

  const r = useMemo(() => hitungEntryPrice(harga, sl, tp, modal, risiko), [harga, sl, tp, modal, risiko])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Harga Entry (Rp/lembar)</label><input type="number" value={harga} onChange={e => setHarga(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Stop Loss: {sl}% dari entry</label><input type="range" min={1} max={20} step={0.5} value={sl} onChange={e => setSl(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Target Profit: {tp}% dari entry</label><input type="range" min={1} max={50} step={1} value={tp} onChange={e => setTp(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Modal (Rp)</label><input type="number" value={modal} onChange={e => setModal(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Risiko per Trade: {risiko}%</label><input type="range" min={0.5} max={5} step={0.5} value={risiko} onChange={e => setRisiko(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel as keyof typeof lC]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">R/R Ratio</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${lT[r.riskLevel as keyof typeof lT]}`}>1:{r.rrRatio}</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel as keyof typeof lT]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Harga Entry" value={fmt(r.entryHarga)} />
          <Row label="Stop Loss" value={fmt(r.stopLossHarga)} />
          <Row label="Take Profit" value={fmt(r.takeProfitHarga)} />
          <Row label="Lot Optimal" value={`${r.lotOptimal} lot`} />
          <Row label="Modal Berisiko" value={fmt(r.modalBerisiko)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 3. BREAK-EVEN ANALYZER
// ══════════════════════════════════════════════════
export function BreakEvenAnalyzer() {
  const [harga,   setHarga]   = useState(5000)
  const [lot,     setLot]     = useState(10)
  const [feeBeli, setFeeBeli] = useState(0.19)
  const [feeJual, setFeeJual] = useState(0.29)

  const r = useMemo(() => hitungBreakEven(harga, lot, feeBeli, feeJual), [harga, lot, feeBeli, feeJual])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Harga Beli (Rp/lembar)</label><input type="number" value={harga} onChange={e => setHarga(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Jumlah Lot</label><input type="number" value={lot} onChange={e => setLot(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Fee Beli: {feeBeli}%</label><input type="range" min={0.05} max={0.5} step={0.01} value={feeBeli} onChange={e => setFeeBeli(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Fee Jual (+ pajak): {feeJual}%</label><input type="range" min={0.05} max={0.5} step={0.01} value={feeJual} onChange={e => setFeeJual(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-warn">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Harga Jual Break-even</p>
          <div className="font-mono font-bold text-5xl tracking-tight text-amber-600 dark:text-amber-400 mb-1">{fmt(r.hargaJualMin)}</div>
          <p className="text-sm text-amber-600 dark:text-amber-400">+{r.selisihHarga} ({r.persenSelisih}%) dari harga beli</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Harga Beli" value={fmt(r.hargaBeli)} />
          <Row label="Harga Jual Min" value={fmt(r.hargaJualMin)} />
          <Row label="Fee Beli" value={fmt(r.totalFeeBeli)} />
          <Row label="Fee Jual" value={fmt(r.totalFeeJual)} />
          <Row label="Total Fee" value={fmt(r.totalFee)} />
          <Row label="Nilai Pembelian" value={fmt(r.nilaiPembelian)} />
        </div>
      </div>
    </div>
  )
}
