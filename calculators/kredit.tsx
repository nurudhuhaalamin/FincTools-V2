'use client'

/**
 * FincTools v2 — Kredit & Properti Calculators
 * 6 tools: LoanTrueCostAnalyzer, RefinancingDecisionTool, BuyVsRentAnalyzer,
 * KPRAffordabilityChecker, RentalYieldAnalyzer, PropertyInvestmentAnalyzer
 */

import { useState, useMemo } from 'react'
import { CheckCircle, AlertTriangle, XCircle, ChevronRight } from 'lucide-react'
import {
  hitungLoanTrueCost, hitungRefinancing, hitungBuyVsRent,
  hitungKPR, analisaKPR, hitungRentalYield, hitungPropertyInvestment,
} from '@/lib/calculations'

const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
      <span className="text-xs text-[--text-secondary]">{label}</span>
      <span className="text-xs font-mono font-medium text-[--text-primary]">{value}</span>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 1. LOAN TRUE COST ANALYZER
// ══════════════════════════════════════════════════
export function LoanTrueCostAnalyzer() {
  const [pokok, setPokok] = useState(200_000_000)
  const [bunga, setBunga] = useState(10)
  const [tenor, setTenor] = useState(60)
  const [jenis, setJenis] = useState<'flat' | 'efektif' | 'anuitas'>('anuitas')

  const r = useMemo(() => hitungLoanTrueCost(pokok, bunga, tenor, jenis), [pokok, bunga, tenor, jenis])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Pokok Pinjaman (Rp)</label><input type="number" value={pokok} onChange={e => setPokok(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Bunga: {bunga}% per tahun</label><input type="range" min={1} max={30} step={0.5} value={bunga} onChange={e => setBunga(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Tenor: {tenor} bulan ({(tenor / 12).toFixed(1)} tahun)</label><input type="range" min={12} max={360} step={12} value={tenor} onChange={e => setTenor(Number(e.target.value))} className="w-full" /></div>
        <div>
          <label className="finc-label">Jenis Bunga</label>
          <div className="flex gap-2">
            {(['flat', 'efektif', 'anuitas'] as const).map(j => (
              <button key={j} onClick={() => setJenis(j)} className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all capitalize ${jenis === j ? 'bg-finc-green text-white border-finc-green' : 'border-[--border] text-[--text-secondary]'}`}>{j}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-warn">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Cicilan per Bulan</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-amber-600 dark:text-amber-400 mb-1">{fmt(r.cicilan)}</div>
          <p className="text-sm text-amber-600 dark:text-amber-400">Bunga efektif: {r.efektifRate}%/tahun</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Pokok Pinjaman" value={fmt(pokok)} />
          <Row label="Total Bunga" value={fmt(r.totalBunga)} />
          <Row label="Total Bayar" value={fmt(r.totalBayar)} />
          <Row label="% dari Pokok" value={`+${r.persenBunga}%`} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 2. REFINANCING DECISION TOOL
// ══════════════════════════════════════════════════
export function RefinancingDecisionTool() {
  const [sisa,  setSisa]  = useState(300_000_000)
  const [bLama, setBLama] = useState(12)
  const [bBaru, setBBaru] = useState(9)
  const [tenor, setTenor] = useState(180)
  const [biaya, setBiaya] = useState(10_000_000)

  const r = useMemo(() => hitungRefinancing(sisa, bLama, bBaru, tenor, biaya), [sisa, bLama, bBaru, tenor, biaya])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Sisa Pokok Pinjaman (Rp)</label><input type="number" value={sisa} onChange={e => setSisa(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Bunga Lama: {bLama}%</label><input type="range" min={5} max={25} step={0.5} value={bLama} onChange={e => setBLama(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Bunga Baru: {bBaru}%</label><input type="range" min={5} max={25} step={0.5} value={bBaru} onChange={e => setBBaru(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Sisa Tenor: {tenor} bulan</label><input type="range" min={12} max={360} step={12} value={tenor} onChange={e => setTenor(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Biaya Refinancing (Rp)</label><input type="number" value={biaya} onChange={e => setBiaya(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className={r.worthIt ? 'finc-result-good' : 'finc-result-danger'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Keputusan Refinancing</p>
          <div className={`font-mono font-bold text-3xl tracking-tight mb-1 ${r.worthIt ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>{r.label}</div>
          <p className={`text-sm ${r.worthIt ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>Break-even: {r.breakEvenBulan} bulan</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Cicilan Lama" value={fmt(r.cicilanLama)} />
          <Row label="Cicilan Baru" value={fmt(r.cicilanBaru)} />
          <Row label="Hemat/Bulan" value={fmt(r.hematPerBulan)} />
          <Row label="Hemat Total" value={fmt(r.hematTotal)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 3. BUY VS RENT ANALYZER
// ══════════════════════════════════════════════════
export function BuyVsRentAnalyzer() {
  const [hp,  setHp]  = useState(800_000_000)
  const [dp,  setDp]  = useState(20)
  const [rate,setRate]= useState(10)
  const [tnr, setTnr] = useState(20)
  const [sw,  setSw]  = useState(5_000_000)
  const [ks,  setKs]  = useState(5)
  const [ap,  setAp]  = useState(6)
  const [thn, setThn] = useState(10)

  const r = useMemo(() => hitungBuyVsRent(hp, dp, rate, tnr, sw, ks, ap, thn), [hp, dp, rate, tnr, sw, ks, ap, thn])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wider">BELI</p>
        <div><label className="finc-label">Harga Properti (Rp)</label><input type="number" value={hp} onChange={e => setHp(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">DP: {dp}%</label><input type="range" min={10} max={50} step={5} value={dp} onChange={e => setDp(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Bunga KPR: {rate}%</label><input type="range" min={5} max={20} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Apresiasi: {ap}%/tahun</label><input type="range" min={0} max={15} step={1} value={ap} onChange={e => setAp(Number(e.target.value))} className="w-full" /></div>
        <p className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wider pt-2">SEWA</p>
        <div><label className="finc-label">Sewa Bulanan (Rp)</label><input type="number" value={sw} onChange={e => setSw(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Kenaikan Sewa: {ks}%/tahun</label><input type="range" min={0} max={15} step={1} value={ks} onChange={e => setKs(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Periode Analisis: {thn} tahun</label><input type="range" min={3} max={20} step={1} value={thn} onChange={e => setThn(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className={r.rekomendasiBeli ? 'finc-result-good' : 'finc-result-warn'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Setelah {thn} Tahun</p>
          <div className={`font-mono font-bold text-3xl tracking-tight mb-1 ${r.rekomendasiBeli ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>{r.rekomendasiBeli ? 'Beli Lebih Menguntungkan' : 'Sewa Lebih Menguntungkan'}</div>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Cicilan KPR/bln" value={fmt(r.cicilanBulanan)} />
          <Row label="Nilai Properti (proyeksi)" value={fmt(r.nilaiPropertiFuture)} />
          <Row label="Keuntungan Apresiasi" value={fmt(r.keuntunganApresiasi)} />
          <Row label="Total Sewa Dibayar" value={fmt(r.totalSewaBayar)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 4. KPR AFFORDABILITY CHECKER
// ══════════════════════════════════════════════════

type AnalisisLevel = 'baik' | 'perhatian' | 'buruk'
type AnalisaResult = {
  level: AnalisisLevel
  diagnosa: string
  penjelasan: string
  rekomendasi: string[]
}

function HasilAnalisaKPR({ hasil }: { hasil: AnalisaResult }) {
  const config = {
    baik:     { wrap: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800', icon: CheckCircle, iconCls: 'text-emerald-500', diagCls: 'text-emerald-800 dark:text-emerald-300', badge: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300', label: 'Kondisi Baik' },
    perhatian:{ wrap: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',     icon: AlertTriangle, iconCls: 'text-amber-500', diagCls: 'text-amber-800 dark:text-amber-300',     badge: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',     label: 'Perlu Perhatian' },
    buruk:    { wrap: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',             icon: XCircle,      iconCls: 'text-red-500',   diagCls: 'text-red-800 dark:text-red-300',           badge: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',           label: 'Perlu Tindakan' },
  }
  const c    = config[hasil.level]
  const Icon = c.icon

  return (
    <div className={`rounded-xl border-2 ${c.wrap} overflow-hidden`}>
      <div className={`flex items-center justify-between px-4 py-3 border-b border-current/20`}>
        <div className="flex items-center gap-2"><Icon size={18} className={c.iconCls} /><span className="text-sm font-bold text-[--text-primary]">Hasil Analisa</span></div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge}`}>{c.label}</span>
      </div>
      <div className="px-4 py-4 space-y-4">
        <p className={`text-sm font-semibold leading-snug ${c.diagCls}`}>{hasil.diagnosa}</p>
        <p className="text-sm text-[--text-secondary] leading-relaxed">{hasil.penjelasan}</p>
        <div>
          <p className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wider mb-2">Yang Bisa Kamu Lakukan</p>
          <ul className="space-y-2">
            {hasil.rekomendasi.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <ChevronRight size={14} className={`${c.iconCls} shrink-0 mt-0.5`} />
                <span className="text-sm text-[--text-secondary] leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function KPRAffordabilityChecker() {
  const [ph,    setPh]    = useState(15_000_000)
  const [lain,  setLain]  = useState(2_000_000)
  const [rate,  setRate]  = useState(10)
  const [tenor, setTenor] = useState(20)
  const [dp,    setDp]    = useState(20)
  const [hasil,   setHasil]   = useState<ReturnType<typeof hitungKPR> | null>(null)
  const [analisa, setAnalisa] = useState<AnalisaResult | null>(null)

  const handleHitung = () => {
    const r = hitungKPR(ph, lain, rate, tenor, dp)
    const a = analisaKPR(ph, lain, rate, tenor, dp, r.dtiRatio, r.maxHargaProperti)
    setHasil(r)
    setAnalisa(a as AnalisaResult)
    setTimeout(() => document.getElementById('kpr-hasil')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const handleReset = () => { setHasil(null); setAnalisa(null) }

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-4">
        <div><label className="finc-label">Penghasilan Bersih/Bulan (Rp)</label><input type="number" value={ph} onChange={e => { setPh(Number(e.target.value)); handleReset() }} className="finc-input font-mono" /></div>
        <div>
          <label className="finc-label">Total Cicilan Lain/Bulan (Rp)</label>
          <input type="number" value={lain} onChange={e => { setLain(Number(e.target.value)); handleReset() }} className="finc-input font-mono" />
          <p className="text-xs text-[--text-secondary] mt-1">Cicilan motor, kartu kredit, KTA, dll</p>
        </div>
        <div><label className="finc-label">Bunga KPR: {rate}% per tahun</label><input type="range" min={5} max={20} step={0.5} value={rate} onChange={e => { setRate(Number(e.target.value)); handleReset() }} className="w-full" /></div>
        <div><label className="finc-label">Tenor: {tenor} tahun</label><input type="range" min={5} max={30} step={5} value={tenor} onChange={e => { setTenor(Number(e.target.value)); handleReset() }} className="w-full" /></div>
        <div className="md:col-span-2"><label className="finc-label">Down Payment: {dp}%</label><input type="range" min={10} max={50} step={5} value={dp} onChange={e => { setDp(Number(e.target.value)); handleReset() }} className="w-full" /></div>
      </div>

      <button onClick={handleHitung} className="w-full py-3.5 rounded-xl bg-finc-green hover:bg-emerald-600 text-white font-semibold text-sm transition-all active:scale-[0.99]">
        Hitung &amp; Analisa
      </button>

      {hasil && analisa && (
        <div id="kpr-hasil" className="space-y-4 pt-1">
          <div className="flex items-center gap-3"><div className="flex-1 h-px bg-[--border]" /><span className="text-xs text-[--text-secondary] font-medium">Hasil Kalkulasi</span><div className="flex-1 h-px bg-[--border]" /></div>

          <div className={hasil.status === 'sehat' ? 'finc-result-good' : hasil.status === 'perhatian' ? 'finc-result-warn' : 'finc-result-danger'}>
            <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Harga Properti Maksimum</p>
            <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${hasil.status === 'sehat' ? 'text-emerald-600 dark:text-emerald-400' : hasil.status === 'perhatian' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>{fmt(hasil.maxHargaProperti)}</div>
            <p className={`text-sm ${hasil.status === 'sehat' ? 'text-emerald-600 dark:text-emerald-400' : hasil.status === 'perhatian' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>DTI: {hasil.dtiRatio}% dari penghasilan</p>
          </div>

          <div className="finc-card space-y-3">
            <Row label="Max Cicilan KPR/bulan" value={fmt(hasil.maxCicilanKPR)} />
            <Row label="Max Pinjaman" value={fmt(hasil.maxPinjaman)} />
            <Row label="DP yang Dibutuhkan" value={fmt(hasil.dpDibutuhkan)} />
            <Row label="Debt-to-Income Ratio" value={`${hasil.dtiRatio}%`} />
          </div>

          <div className="flex items-center gap-3"><div className="flex-1 h-px bg-[--border]" /><span className="text-xs text-[--text-secondary] font-medium">Hasil Analisa</span><div className="flex-1 h-px bg-[--border]" /></div>

          <HasilAnalisaKPR hasil={analisa} />

          <button onClick={handleReset} className="w-full py-2.5 rounded-xl border border-[--border] text-[--text-secondary] text-sm font-medium hover:border-finc-green hover:text-finc-green transition-all">
            Ubah Input &amp; Hitung Ulang
          </button>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════
// 5. RENTAL YIELD ANALYZER
// ══════════════════════════════════════════════════
export function RentalYieldAnalyzer() {
  const [hp,  setHp]  = useState(500_000_000)
  const [sw,  setSw]  = useState(4_000_000)
  const [by,  setBy]  = useState(6_000_000)
  const [ap,  setAp]  = useState(5)
  const [thn, setThn] = useState(5)

  const r = useMemo(() => hitungRentalYield(hp, sw, by, ap, thn), [hp, sw, by, ap, thn])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Harga Properti (Rp)</label><input type="number" value={hp} onChange={e => setHp(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Sewa per Bulan (Rp)</label><input type="number" value={sw} onChange={e => setSw(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Biaya Operasional/Tahun (Rp)</label><input type="number" value={by} onChange={e => setBy(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Apresiasi: {ap}%/tahun</label><input type="range" min={0} max={15} step={1} value={ap} onChange={e => setAp(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Periode: {thn} tahun</label><input type="range" min={1} max={20} step={1} value={thn} onChange={e => setThn(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className={r.grossYield >= 5 ? 'finc-result-good' : r.grossYield >= 3 ? 'finc-result-warn' : 'finc-result-danger'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Gross Rental Yield</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${r.grossYield >= 5 ? 'text-emerald-600 dark:text-emerald-400' : r.grossYield >= 3 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>{r.grossYield}%</div>
          <p className={`text-sm ${r.grossYield >= 5 ? 'text-emerald-600 dark:text-emerald-400' : r.grossYield >= 3 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Net Yield" value={`${r.netYield}%`} />
          <Row label="Total Return/tahun" value={`${r.totalReturnTahunan}%`} />
          <Row label="Sewa Bersih/tahun" value={fmt(r.netSewa)} />
          <Row label="Nilai Properti Proyeksi" value={fmt(r.nilaiPropertiFuture)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 6. PROPERTY INVESTMENT ANALYZER
// ══════════════════════════════════════════════════
export function PropertyInvestmentAnalyzer() {
  const [hp,  setHp]  = useState(600_000_000)
  const [dp,  setDp]  = useState(20)
  const [rate,setRate]= useState(10)
  const [tnr, setTnr] = useState(20)
  const [sw,  setSw]  = useState(4_500_000)
  const [op,  setOp]  = useState(500_000)
  const [ap,  setAp]  = useState(6)
  const [thn, setThn] = useState(10)

  const r = useMemo(() => hitungPropertyInvestment(hp, dp, rate, tnr, sw, op, ap, thn), [hp, dp, rate, tnr, sw, op, ap, thn])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div><label className="finc-label">Harga Beli (Rp)</label><input type="number" value={hp} onChange={e => setHp(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">DP: {dp}%</label><input type="range" min={10} max={50} step={5} value={dp} onChange={e => setDp(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Bunga KPR: {rate}%</label><input type="range" min={5} max={20} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Sewa/Bulan (Rp)</label><input type="number" value={sw} onChange={e => setSw(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Biaya Operasional/Bulan (Rp)</label><input type="number" value={op} onChange={e => setOp(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Apresiasi: {ap}%/tahun</label><input type="range" min={0} max={15} step={1} value={ap} onChange={e => setAp(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className={r.positifCashFlow ? 'finc-result-good' : 'finc-result-danger'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Cash Flow Bulanan</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${r.positifCashFlow ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>{r.cashFlowBulanan >= 0 ? '+' : ''}{fmt(r.cashFlowBulanan)}</div>
          <p className={`text-sm font-medium ${r.positifCashFlow ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="DP" value={fmt(r.dp)} />
          <Row label="Cicilan KPR" value={fmt(r.cicilan)} />
          <Row label="Cap Rate" value={`${r.capRate}%`} />
          <Row label="Cash on Cash Return" value={`${r.cocReturn}%`} />
          <Row label="Nilai Properti Proyeksi" value={fmt(r.nilaiPropertiFuture)} />
        </div>
      </div>
    </div>
  )
}
