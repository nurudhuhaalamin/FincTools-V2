'use client'

/**
 * FincTools v2 — Trading Calculators
 * 13 tools: RiskManager, TradeAnalyzer, StopLossOptimizer, MaxLossGuardian,
 * TradingPerformanceAnalyzer, WinRateExpectancyTracker, DrawdownRecoveryPlanner,
 * PipProfitAnalyzer, MarginLeverageGuard, SwapCostEstimator,
 * KellyCriterionOptimizer, ProbabilityOfRuinAnalyzer, StreakAnalyzer
 */

import { useState, useMemo } from 'react'
import { Copy, Check } from 'lucide-react'
import {
  hitungRiskManager, hitungTradeAnalyzer, hitungStopLoss, hitungMaxLoss,
  hitungPerformance, hitungExpectancy, hitungDrawdown, hitungPipProfit,
  hitungMargin, hitungSwap, hitungKelly, hitungProbabilityOfRuin, hitungStreak,
} from '@/lib/calculations'

// ─── Shared Helpers ───────────────────────────────
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const lC = { safe: 'finc-result-good', good: 'finc-result-good', moderate: 'finc-result-warn', danger: 'finc-result-danger', bad: 'finc-result-danger' }
const lT = { safe: 'text-emerald-600 dark:text-emerald-400', good: 'text-emerald-600 dark:text-emerald-400', moderate: 'text-amber-600 dark:text-amber-400', danger: 'text-red-600 dark:text-red-400', bad: 'text-red-600 dark:text-red-400' }

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
      <span className="text-xs text-[--text-secondary]">{label}</span>
      <span className="text-xs font-mono font-medium text-[--text-primary]">{value}</span>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 1. RISK MANAGER
// ══════════════════════════════════════════════════
export function RiskManager() {
  const [modal,    setModal]    = useState(10_000_000)
  const [risiko,   setRisiko]   = useState(1)
  const [stopLoss, setStopLoss] = useState(50)
  const [pipValue, setPipValue] = useState(10)
  const [copied,   setCopied]   = useState(false)

  const r = useMemo(() => hitungRiskManager({ modal, risikoPercent: risiko, stopLossPips: stopLoss, pipValue }), [modal, risiko, stopLoss, pipValue])

  const copy = () => {
    navigator.clipboard.writeText(`FincTools — Risk Manager\nModal: ${fmt(modal)}\nRisiko: ${risiko}% (${fmt(r.modalBerisiko)})\nStop Loss: ${stopLoss} pips\nUkuran Posisi: ${r.lotSize} Lot\nfinctools.com/trading/risk-manager`)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-5">
        <div>
          <label className="finc-label">Modal Akun (Rp)</label>
          <input type="number" value={modal} onChange={e => setModal(Number(e.target.value))} className="finc-input font-mono" />
        </div>
        <div>
          <label className="finc-label">Risiko per Trade: {risiko}%</label>
          <input type="range" min={0.1} max={10} step={0.1} value={risiko} onChange={e => setRisiko(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="finc-label">Stop Loss: {stopLoss} pips</label>
          <input type="range" min={1} max={500} step={1} value={stopLoss} onChange={e => setStopLoss(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="finc-label">Pip Value: {pipValue} Rp/pip</label>
          <input type="range" min={1} max={100} step={1} value={pipValue} onChange={e => setPipValue(Number(e.target.value))} className="w-full" />
        </div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Ukuran Posisi</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.lotSize.toFixed(2)}<span className="text-xl ml-1 font-medium">Lot</span></div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.riskLabel}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Modal Akun" value={fmt(modal)} />
          <Row label="Modal Berisiko" value={`${fmt(r.modalBerisiko)} (${risiko}%)`} />
          <Row label="Stop Loss" value={`${stopLoss} pips`} />
          <Row label="Pip Value" value={`${fmt(pipValue)}/pip`} />
        </div>
        <button onClick={copy} className="finc-btn w-full justify-center">
          {copied ? <><Check size={14} />Tersalin!</> : <><Copy size={14} />Salin Hasil</>}
        </button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 2. TRADE ANALYZER
// ══════════════════════════════════════════════════
export function TradeAnalyzer() {
  const [entry,  setEntry]  = useState(1.1000)
  const [sl,     setSl]     = useState(1.0950)
  const [tp,     setTp]     = useState(1.1100)
  const [lot,    setLot]    = useState(0.1)
  const [pip,    setPip]    = useState(10)
  const [copied, setCopied] = useState(false)

  const r = useMemo(() => hitungTradeAnalyzer({ entryPrice: entry, stopLoss: sl, takeProfit: tp, lotSize: lot, pipValue: pip }), [entry, sl, tp, lot, pip])

  const copy = () => { navigator.clipboard.writeText(`FincTools Trade Analyzer\nR/R: 1:${r.rrRatio}\nPotensi Profit: ${fmt(r.potensiProfit)}\nPotensi Loss: ${fmt(r.potensiLoss)}`); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Entry Price</label><input type="number" step={0.0001} value={entry} onChange={e => setEntry(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Stop Loss</label><input type="number" step={0.0001} value={sl} onChange={e => setSl(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Take Profit</label><input type="number" step={0.0001} value={tp} onChange={e => setTp(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Lot Size</label><input type="number" step={0.01} value={lot} onChange={e => setLot(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Pip Value (Rp/pip per 0.01 lot)</label><input type="number" step={1} value={pip} onChange={e => setPip(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Risk/Reward Ratio</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>1 : {r.rrRatio}</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Risk Pips" value={`${r.riskPips} pips`} />
          <Row label="Reward Pips" value={`${r.rewardPips} pips`} />
          <Row label="Potensi Profit" value={fmt(r.potensiProfit)} />
          <Row label="Potensi Loss" value={fmt(r.potensiLoss)} />
        </div>
        <button onClick={copy} className="finc-btn w-full justify-center">{copied ? <><Check size={14} />Tersalin!</> : <><Copy size={14} />Salin Hasil</>}</button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 3. STOP LOSS OPTIMIZER
// ══════════════════════════════════════════════════
export function StopLossOptimizer() {
  const [entry,  setEntry]  = useState(1.1000)
  const [atr,    setAtr]    = useState(20)
  const [mult,   setMult]   = useState(1.5)
  const [modal,  setModal]  = useState(10_000_000)
  const [risiko, setRisiko] = useState(1)
  const [pip,    setPip]    = useState(10)
  const [isLong, setIsLong] = useState(true)

  const r = useMemo(() => hitungStopLoss({ entryPrice: entry, atr, multiplier: mult, modal, risikoPercent: risiko, pipValue: pip, isLong }), [entry, atr, mult, modal, risiko, pip, isLong])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="finc-label">Arah Posisi</label>
          <div className="flex gap-2">
            {['Buy (Long)', 'Sell (Short)'].map((t, i) => (
              <button key={t} onClick={() => setIsLong(i === 0)} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${(i === 0 ? isLong : !isLong) ? 'bg-finc-green text-white border-finc-green' : 'border-[--border] text-[--text-secondary]'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div><label className="finc-label">Entry Price</label><input type="number" step={0.0001} value={entry} onChange={e => setEntry(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">ATR (pips)</label><input type="number" value={atr} onChange={e => setAtr(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div>
          <label className="finc-label">ATR Multiplier: {mult}x</label>
          <input type="range" min={0.5} max={3} step={0.5} value={mult} onChange={e => setMult(Number(e.target.value))} className="w-full" />
        </div>
        <div><label className="finc-label">Modal (Rp)</label><input type="number" value={modal} onChange={e => setModal(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div>
          <label className="finc-label">Risiko per Trade: {risiko}%</label>
          <input type="range" min={0.5} max={5} step={0.5} value={risiko} onChange={e => setRisiko(Number(e.target.value))} className="w-full" />
        </div>
        <div><label className="finc-label">Pip Value (Rp)</label><input type="number" value={pip} onChange={e => setPip(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Harga Stop Loss</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.slPrice.toFixed(5)}</div>
          <p className={`text-sm ${lT[r.riskLevel]}`}>{r.slPips} pips dari entry</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Ukuran Posisi" value={`${r.lotSize} Lot`} />
          <Row label="Modal Berisiko" value={fmt(r.modalBerisiko)} />
          <Row label="ATR × Multiplier" value={`${atr} × ${mult} = ${r.slPips} pips`} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 4. MAX LOSS GUARDIAN
// ══════════════════════════════════════════════════
export function MaxLossGuardian() {
  const [modal,    setModal]    = useState(10_000_000)
  const [harian,   setHarian]   = useState(3)
  const [mingguan, setMingguan] = useState(6)
  const [risiko,   setRisiko]   = useState(1)

  const r = useMemo(() => hitungMaxLoss({ modal, maxLossHarianPersen: harian, maxLossMingguanPersen: mingguan, risikoPerTrade: risiko }), [modal, harian, mingguan, risiko])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Modal Akun (Rp)</label><input type="number" value={modal} onChange={e => setModal(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Maks Loss Harian: {harian}%</label><input type="range" min={1} max={10} step={0.5} value={harian} onChange={e => setHarian(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Maks Loss Mingguan: {mingguan}%</label><input type="range" min={2} max={20} step={1} value={mingguan} onChange={e => setMingguan(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Risiko per Trade: {risiko}%</label><input type="range" min={0.5} max={5} step={0.5} value={risiko} onChange={e => setRisiko(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Status Batas Loss</p>
          <div className={`font-mono font-bold text-3xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.label}</div>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Maks Loss Harian" value={fmt(r.maxLossHarian)} />
          <Row label="Maks Loss Mingguan" value={fmt(r.maxLossMingguan)} />
          <Row label="Maks Trade/Hari" value={`${r.maxTradeHarian} trade`} />
          <Row label="Maks Trade/Minggu" value={`${r.maxTradeMingguan} trade`} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 5. TRADING PERFORMANCE ANALYZER
// ══════════════════════════════════════════════════
export function TradingPerformanceAnalyzer() {
  const [total,   setTotal]   = useState(50)
  const [win,     setWin]     = useState(28)
  const [avgWin,  setAvgWin]  = useState(200_000)
  const [avgLoss, setAvgLoss] = useState(150_000)

  const r = useMemo(() => hitungPerformance({ totalTrade: total, totalWin: win, avgWin, avgLoss }), [total, win, avgWin, avgLoss])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Total Trade</label><input type="number" value={total} onChange={e => setTotal(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Jumlah Win</label><input type="number" value={win} onChange={e => setWin(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Rata-rata Profit per Win (Rp)</label><input type="number" value={avgWin} onChange={e => setAvgWin(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Rata-rata Loss per Loss (Rp)</label><input type="number" value={avgLoss} onChange={e => setAvgLoss(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Profit Factor</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.profitFactor}</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Win Rate" value={`${r.winRate}%`} />
          <Row label="Loss Rate" value={`${r.lossRate}%`} />
          <Row label="Expectancy per Trade" value={fmt(r.expectancy)} />
          <Row label="Total P/L" value={fmt(r.totalProfit)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 6. WIN RATE & EXPECTANCY TRACKER
// ══════════════════════════════════════════════════
export function WinRateExpectancyTracker() {
  const [wr,  setWr]  = useState(55)
  const [aw,  setAw]  = useState(200_000)
  const [al,  setAl]  = useState(150_000)
  const [tpm, setTpm] = useState(20)

  const r = useMemo(() => hitungExpectancy({ winRate: wr, avgWin: aw, avgLoss: al, tradePerBulan: tpm }), [wr, aw, al, tpm])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Win Rate: {wr}%</label><input type="range" min={1} max={99} step={1} value={wr} onChange={e => setWr(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Rata-rata Win (Rp)</label><input type="number" value={aw} onChange={e => setAw(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Rata-rata Loss (Rp)</label><input type="number" value={al} onChange={e => setAl(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Trade per Bulan: {tpm}</label><input type="range" min={1} max={100} step={1} value={tpm} onChange={e => setTpm(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Expectancy per Trade</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{fmt(r.expectancy)}</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="R/R Ratio" value={`1 : ${r.rrRatio}`} />
          <Row label="Break-even Win Rate" value={`${r.breakEvenWinRate}%`} />
          <Row label="Proyeksi per Bulan" value={fmt(r.proyeksiPerBulan)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 7. DRAWDOWN RECOVERY PLANNER
// ══════════════════════════════════════════════════
export function DrawdownRecoveryPlanner() {
  const [awal,   setAwal]   = useState(10_000_000)
  const [skrg,   setSkrg]   = useState(8_000_000)
  const [wr,     setWr]     = useState(55)
  const [rr,     setRr]     = useState(1.5)
  const [risiko, setRisiko] = useState(1)

  const r = useMemo(() => hitungDrawdown({ modalAwal: awal, modalSekarang: skrg, winRate: wr, rrRatio: rr, risikoPerTrade: risiko }), [awal, skrg, wr, rr, risiko])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Modal Awal (Rp)</label><input type="number" value={awal} onChange={e => setAwal(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Modal Sekarang (Rp)</label><input type="number" value={skrg} onChange={e => setSkrg(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Win Rate: {wr}%</label><input type="range" min={1} max={99} step={1} value={wr} onChange={e => setWr(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">R/R Ratio: 1:{rr}</label><input type="range" min={0.5} max={5} step={0.5} value={rr} onChange={e => setRr(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Risiko per Trade: {risiko}%</label><input type="range" min={0.5} max={5} step={0.5} value={risiko} onChange={e => setRisiko(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Drawdown</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.drawdownPersen}%</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Kerugian" value={fmt(r.drawdownAmount)} />
          <Row label="Return Dibutuhkan" value={`${r.returnDibutuhkan}%`} />
          <Row label="Estimasi Trade Recovery" value={r.tradeEstimasi >= 999 ? 'Tidak mungkin — perbaiki strategi' : `~${r.tradeEstimasi} trade`} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 8. PIP & PROFIT ANALYZER
// ══════════════════════════════════════════════════
export function PipProfitAnalyzer() {
  const [lot,  setLot]  = useState(0.1)
  const [pips, setPips] = useState(50)
  const [pip,  setPip]  = useState(10)
  const [isP,  setIsP]  = useState(true)

  const r = useMemo(() => hitungPipProfit({ lotSize: lot, pips, pipValue: pip, isProfit: isP }), [lot, pips, pip, isP])
  const color = isP ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="finc-label">Jenis Posisi</label>
          <div className="flex gap-2">
            {['Profit', 'Loss'].map((t, i) => (
              <button key={t} onClick={() => setIsP(i === 0)} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${(i === 0 ? isP : !isP) ? i === 0 ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-red-500 text-white border-red-500' : 'border-[--border] text-[--text-secondary]'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div><label className="finc-label">Lot Size</label><input type="number" step={0.01} value={lot} onChange={e => setLot(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Pips: {pips}</label><input type="range" min={1} max={500} step={1} value={pips} onChange={e => setPips(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Pip Value (Rp per 0.01 lot)</label><input type="number" value={pip} onChange={e => setPip(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className={isP ? 'finc-result-good' : 'finc-result-danger'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Total {isP ? 'Profit' : 'Loss'}</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${color}`}>{isP ? '+' : '-'}{fmt(Math.abs(r.totalPL))}</div>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Nilai per Pip" value={fmt(r.nilaiPip)} />
          <Row label="P/L per Lot" value={fmt(r.plPerLot)} />
          <Row label="Total Pips" value={`${pips} pips`} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 9. MARGIN & LEVERAGE GUARD
// ══════════════════════════════════════════════════
export function MarginLeverageGuard() {
  const [modal, setModal] = useState(10_000_000)
  const [lev,   setLev]   = useState(100)
  const [lot,   setLot]   = useState(0.1)
  const [harga, setHarga] = useState(15000)
  const [cs,    setCs]    = useState(100000)

  const r = useMemo(() => hitungMargin({ modal, leverage: lev, lotSize: lot, hargaInstrumen: harga, contractSize: cs }), [modal, lev, lot, harga, cs])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Modal Akun (Rp)</label><input type="number" value={modal} onChange={e => setModal(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Leverage: 1:{lev}</label><input type="range" min={1} max={500} step={1} value={lev} onChange={e => setLev(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Lot Size: {lot}</label><input type="range" min={0.01} max={10} step={0.01} value={lot} onChange={e => setLot(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Harga Instrumen (Rp)</label><input type="number" value={harga} onChange={e => setHarga(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Contract Size</label><input type="number" value={cs} onChange={e => setCs(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Margin Level</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.marginLevel}%</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Required Margin" value={fmt(r.requiredMargin)} />
          <Row label="Free Margin" value={fmt(r.freeMargin)} />
          <Row label="Maks Lot" value={`${r.maxLot} Lot`} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 10. SWAP COST ESTIMATOR
// ══════════════════════════════════════════════════
export function SwapCostEstimator() {
  const [lot,   setLot]   = useState(0.1)
  const [rate,  setRate]  = useState(0.5)
  const [malam, setMalam] = useState(5)
  const [pip,   setPip]   = useState(10)

  const r = useMemo(() => hitungSwap({ lotSize: lot, swapRate: rate, jumlahMalam: malam, pipValue: pip }), [lot, rate, malam, pip])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Lot Size: {lot}</label><input type="range" min={0.01} max={10} step={0.01} value={lot} onChange={e => setLot(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Swap Rate (pips/malam): {rate}</label><input type="range" min={0.1} max={5} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Jumlah Malam: {malam}</label><input type="range" min={1} max={30} step={1} value={malam} onChange={e => setMalam(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Pip Value (Rp per 0.01 lot)</label><input type="number" value={pip} onChange={e => setPip(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Total Biaya Swap</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{fmt(Math.abs(r.totalSwap))}</div>
          <p className="text-sm text-[--text-secondary]">selama {malam} malam</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Swap per Malam" value={fmt(r.swapPerMalam)} />
          <Row label={`Total ${malam} Malam`} value={fmt(r.totalSwap)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 11. KELLY CRITERION OPTIMIZER
// ══════════════════════════════════════════════════
export function KellyCriterionOptimizer() {
  const [wr,    setWr]    = useState(55)
  const [rr,    setRr]    = useState(1.5)
  const [modal, setModal] = useState(10_000_000)

  const r = useMemo(() => hitungKelly({ winRate: wr, rrRatio: rr, modal }), [wr, rr, modal])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Win Rate: {wr}%</label><input type="range" min={1} max={99} step={1} value={wr} onChange={e => setWr(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">R/R Ratio: 1:{rr}</label><input type="range" min={0.5} max={5} step={0.5} value={rr} onChange={e => setRr(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Modal Akun (Rp)</label><input type="number" value={modal} onChange={e => setModal(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Half Kelly (Direkomendasikan)</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.halfKellyPersen}%</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Full Kelly" value={`${r.kellyPersen}% = ${fmt(r.kellyAmount)}`} />
          <Row label="Half Kelly" value={`${r.halfKellyPersen}% = ${fmt(r.halfKellyAmount)}`} />
        </div>
        <div className="finc-card bg-[--bg-secondary] text-xs text-[--text-secondary] leading-relaxed">
          Half Kelly menghasilkan 75% pertumbuhan Full Kelly dengan drawdown yang jauh lebih kecil.
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 12. PROBABILITY OF RUIN ANALYZER
// ══════════════════════════════════════════════════
export function ProbabilityOfRuinAnalyzer() {
  const [wr,     setWr]     = useState(55)
  const [rr,     setRr]     = useState(1.5)
  const [risiko, setRisiko] = useState(2)
  const [target, setTarget] = useState(50)

  const r = useMemo(() => hitungProbabilityOfRuin({ winRate: wr, rrRatio: rr, risikoPerTrade: risiko, targetRuin: target }), [wr, rr, risiko, target])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Win Rate: {wr}%</label><input type="range" min={1} max={99} step={1} value={wr} onChange={e => setWr(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">R/R Ratio: 1:{rr}</label><input type="range" min={0.5} max={5} step={0.5} value={rr} onChange={e => setRr(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Risiko per Trade: {risiko}%</label><input type="range" min={0.5} max={10} step={0.5} value={risiko} onChange={e => setRisiko(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Target Drawdown &quot;Ruin&quot;: {target}%</label><input type="range" min={10} max={100} step={10} value={target} onChange={e => setTarget(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Probabilitas Ruin</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.probabilitasRuin}%</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Safety Score" value={`${r.safetyScore}/100`} />
          <Row label="Expected Max Drawdown" value={`${r.expectedDrawdown}%`} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 13. STREAK ANALYZER
// ══════════════════════════════════════════════════
export function StreakAnalyzer() {
  const [wr,     setWr]     = useState(55)
  const [streak, setStreak] = useState(5)
  const [total,  setTotal]  = useState(100)

  const r = useMemo(() => hitungStreak({ winRate: wr, streakLength: streak, totalTrade: total }), [wr, streak, total])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Win Rate: {wr}%</label><input type="range" min={1} max={99} step={1} value={wr} onChange={e => setWr(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Panjang Streak: {streak} beruntun</label><input type="range" min={2} max={15} step={1} value={streak} onChange={e => setStreak(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Total Trade: {total}</label><input type="range" min={10} max={500} step={10} value={total} onChange={e => setTotal(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Probabilitas Loss {streak}x Beruntun</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.probLossStreak}%</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Prob Win Streak" value={`${r.probWinStreak}%`} />
          <Row label="Prob Loss Streak" value={`${r.probLossStreak}%`} />
          <Row label="Expected Loss Streak tiap" value={`~${r.expectedLossStreak} trade`} />
          <Row label="Expected Win Streak tiap" value={`~${r.expectedWinStreak} trade`} />
        </div>
      </div>
    </div>
  )
}
