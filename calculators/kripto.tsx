'use client'

/**
 * FincTools v2 — Kripto Calculators
 * 5 tools: CryptoDCASimulator, StakingRewardProjector, CryptoRiskManager,
 * LiquidationPriceAnalyzer, FundingRateCostEstimator
 */

import { useState, useMemo } from 'react'
import {
  hitungCryptoDCA, hitungStaking, hitungCryptoRisk,
  hitungLiquidasi, hitungFundingRate,
} from '@/lib/calculations'

const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const lC = { safe: 'finc-result-good', moderate: 'finc-result-warn', danger: 'finc-result-danger' }
const lT = { safe: 'text-emerald-600 dark:text-emerald-400', moderate: 'text-amber-600 dark:text-amber-400', danger: 'text-red-600 dark:text-red-400' }

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
      <span className="text-xs text-[--text-secondary]">{label}</span>
      <span className="text-xs font-mono font-medium text-[--text-primary]">{value}</span>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 1. CRYPTO DCA SIMULATOR
// ══════════════════════════════════════════════════
export function CryptoDCASimulator() {
  const [inv,    setInv]    = useState(500_000)
  const [period, setPeriod] = useState(24)
  const [harga,  setHarga]  = useState(900_000_000)
  const [target, setTarget] = useState(1_500_000_000)

  const r = useMemo(() => hitungCryptoDCA(inv, period, harga, target), [inv, period, harga, target])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Investasi per Bulan (Rp)</label><input type="number" value={inv} onChange={e => setInv(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Durasi: {period} bulan</label><input type="range" min={3} max={60} step={3} value={period} onChange={e => setPeriod(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Harga Saat Ini (Rp)</label><input type="number" value={harga} onChange={e => setHarga(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Target Harga (Rp)</label><input type="number" value={target} onChange={e => setTarget(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Koin Terkumpul</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{r.totalKoin}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Nilai di target: {fmt(r.nilaiTarget)}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Total Investasi" value={fmt(r.totalInvestasi)} />
          <Row label="Nilai Sekarang" value={fmt(r.nilaiSekarang)} />
          <Row label="Nilai di Target" value={fmt(r.nilaiTarget)} />
          <Row label="Return (Target)" value={`${r.returnTarget}%`} />
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Kripto sangat volatil. Target harga adalah skenario, bukan prediksi atau jaminan.</span></div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 2. STAKING REWARD PROJECTOR
// ══════════════════════════════════════════════════
export function StakingRewardProjector() {
  const [koin,     setKoin]     = useState(1)
  const [harga,    setHarga]    = useState(900_000_000)
  const [apy,      setApy]      = useState(5)
  const [hari,     setHari]     = useState(365)
  const [compound, setCompound] = useState(true)

  const r = useMemo(() => hitungStaking(koin, harga, apy, hari, compound), [koin, harga, apy, hari, compound])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Jumlah Koin yang Distake</label><input type="number" step={0.0001} value={koin} onChange={e => setKoin(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Harga per Koin (Rp)</label><input type="number" value={harga} onChange={e => setHarga(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">APY: {apy}%</label><input type="range" min={0.5} max={50} step={0.5} value={apy} onChange={e => setApy(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Periode: {hari} hari</label><input type="range" min={30} max={1825} step={30} value={hari} onChange={e => setHari(Number(e.target.value))} className="w-full" /></div>
        <div className="flex items-center justify-between finc-card py-3">
          <p className="text-sm font-medium text-[--text-primary]">Compound Harian</p>
          <button onClick={() => setCompound(!compound)} className={`w-11 h-6 rounded-full transition-colors ${compound ? 'bg-finc-green' : 'bg-slate-300 dark:bg-slate-600'}`}>
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${compound ? 'translate-x-5' : ''}`} />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Total Reward</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.nilaiReward)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">+{r.rewardKoin} koin ({r.returnPersen}%)</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Nilai Awal" value={fmt(r.nilaiAwal)} />
          <Row label="Reward Koin" value={`${r.rewardKoin} koin`} />
          <Row label="Nilai Reward" value={fmt(r.nilaiReward)} />
          <Row label="Total Nilai Akhir" value={fmt(r.nilaiAkhir)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 3. CRYPTO RISK MANAGER
// ══════════════════════════════════════════════════
export function CryptoRiskManager() {
  const [modal,  setModal]  = useState(10_000_000)
  const [risiko, setRisiko] = useState(2)
  const [entry,  setEntry]  = useState(900_000_000)
  const [sl,     setSl]     = useState(810_000_000)

  const r = useMemo(() => hitungCryptoRisk(modal, risiko, entry, sl), [modal, risiko, entry, sl])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Modal (Rp)</label><input type="number" value={modal} onChange={e => setModal(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Risiko per Trade: {risiko}%</label><input type="range" min={0.5} max={10} step={0.5} value={risiko} onChange={e => setRisiko(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Harga Entry (Rp)</label><input type="number" value={entry} onChange={e => setEntry(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Harga Stop Loss (Rp)</label><input type="number" value={sl} onChange={e => setSl(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel as keyof typeof lC]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Jumlah Koin yang Dibeli</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${lT[r.riskLevel as keyof typeof lT]}`}>{r.jumlahKoin}</div>
          <p className={`text-sm ${lT[r.riskLevel as keyof typeof lT]}`}>Modal berisiko: {fmt(r.modalBerisiko)}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Modal Berisiko" value={fmt(r.modalBerisiko)} />
          <Row label="Jumlah Koin" value={`${r.jumlahKoin}`} />
          <Row label="Nilai Posisi" value={fmt(r.nilaiPosisi)} />
          <Row label="SL Distance" value={`${r.stopLossPersen}%`} />
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Kripto sangat volatil. Pastikan kamu siap kehilangan seluruh modal yang diinvestasikan.</span></div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 4. LIQUIDATION PRICE ANALYZER
// ══════════════════════════════════════════════════
export function LiquidationPriceAnalyzer() {
  const [entry,  setEntry]  = useState(900_000_000)
  const [lev,    setLev]    = useState(10)
  const [mm,     setMm]     = useState(0.5)
  const [isLong, setIsLong] = useState(true)

  const r = useMemo(() => hitungLiquidasi(entry, lev, mm, isLong), [entry, lev, mm, isLong])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="finc-label">Arah Posisi</label>
          <div className="flex gap-2">
            {['Long (Beli)', 'Short (Jual)'].map((t, i) => (
              <button key={t} onClick={() => setIsLong(i === 0)} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${(i === 0 ? isLong : !isLong) ? 'bg-finc-green text-white border-finc-green' : 'border-[--border] text-[--text-secondary]'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div><label className="finc-label">Harga Entry (Rp)</label><input type="number" value={entry} onChange={e => setEntry(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Leverage: {lev}x</label><input type="range" min={1} max={125} step={1} value={lev} onChange={e => setLev(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Maintenance Margin: {mm}%</label><input type="range" min={0.1} max={2} step={0.1} value={mm} onChange={e => setMm(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel as keyof typeof lC]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Harga Likuidasi</p>
          <div className={`font-mono font-bold text-3xl tracking-tight mb-1 ${lT[r.riskLevel as keyof typeof lT]}`}>{'Rp ' + Math.round(r.liquidasiHarga).toLocaleString('id-ID')}</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel as keyof typeof lT]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Harga Entry" value={'Rp ' + entry.toLocaleString('id-ID')} />
          <Row label="Harga Likuidasi" value={'Rp ' + Math.round(r.liquidasiHarga).toLocaleString('id-ID')} />
          <Row label="Jarak Likuidasi" value={`${r.jarakPersen}%`} />
          <Row label="Leverage" value={`${lev}x`} />
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Leverage tinggi = risiko likuidasi sangat besar. Gunakan leverage dengan sangat hati-hati.</span></div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 5. FUNDING RATE COST ESTIMATOR
// ══════════════════════════════════════════════════
export function FundingRateCostEstimator() {
  const [pos,  setPos]  = useState(10_000_000)
  const [rate, setRate] = useState(0.01)
  const [hari, setHari] = useState(7)
  const [fpd,  setFpd]  = useState(3)

  const r = useMemo(() => hitungFundingRate(pos, rate, hari, fpd), [pos, rate, hari, fpd])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Nilai Posisi (Rp)</label><input type="number" value={pos} onChange={e => setPos(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Funding Rate: {rate}% per periode</label><input type="range" min={-0.1} max={0.1} step={0.001} value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Periode Holding: {hari} hari</label><input type="range" min={1} max={30} step={1} value={hari} onChange={e => setHari(Number(e.target.value))} className="w-full" /></div>
        <div>
          <label className="finc-label">Funding per Hari: {fpd}x</label>
          <input type="range" min={1} max={3} step={1} value={fpd} onChange={e => setFpd(Number(e.target.value))} className="w-full" />
          <p className="text-2xs text-[--text-secondary] mt-1">Binance: 3x/hari | Bybit: 3x/hari</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel as keyof typeof lC]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Total Biaya Funding {hari} Hari</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${lT[r.riskLevel as keyof typeof lT]}`}>{r.isPositive ? '-' : '+'}{fmt(Math.abs(r.totalBiaya))}</div>
          <p className="text-sm text-[--text-secondary]">{r.isPositive ? 'Long membayar Short' : 'Short membayar Long'}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Biaya per Funding" value={fmt(r.biayaPerFunding)} />
          <Row label="Biaya per Hari" value={fmt(r.biayaPerHari)} />
          <Row label="Total Biaya" value={fmt(r.totalBiaya)} />
          <Row label="% dari Posisi" value={`${r.persenDariPosisi}%`} />
        </div>
      </div>
    </div>
  )
}
