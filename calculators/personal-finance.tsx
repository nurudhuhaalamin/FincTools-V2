'use client'

/**
 * FincTools v2 — Personal Finance Calculators
 * 8 tools: WealthFreedomPlanner, EmergencyShieldBuilder, InflationGuard,
 * BudgetArchitect, DebtDestroyer, NetWorthTracker, SavingsGrowthSimulator, GoalAchieverPlanner
 */

import { useState, useMemo } from 'react'
import {
  hitungFIRE, hitungWealthFreedom, hitungDanaDarurat, hitungInflasi,
  hitungBudget, hitungNetWorth, hitungSavingsGrowth, hitungGoal,
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
// 1. WEALTH FREEDOM PLANNER (FIRE)
// ══════════════════════════════════════════════════
export function WealthFreedomPlanner() {
  const [pengeluaran, setPengeluaran] = useState(10_000_000)
  const [tabungan,    setTabungan]    = useState(100_000_000)
  const [investasi,   setInvestasi]   = useState(5_000_000)
  const [returnRate,  setReturnRate]  = useState(12)
  const [inflasi,     setInflasi]     = useState(4)

  const fire   = useMemo(() => hitungFIRE(pengeluaran, returnRate, inflasi), [pengeluaran, returnRate, inflasi])
  const wealth = useMemo(() => hitungWealthFreedom(tabungan, investasi, fire.fireNumber, returnRate), [tabungan, investasi, fire.fireNumber, returnRate])
  const sudahFIRE = tabungan >= fire.fireNumber

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Pengeluaran Bulanan (Rp)</label><input type="number" value={pengeluaran} onChange={e => setPengeluaran(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Tabungan & Investasi Saat Ini (Rp)</label><input type="number" value={tabungan} onChange={e => setTabungan(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Investasi Bulanan (Rp)</label><input type="number" value={investasi} onChange={e => setInvestasi(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Estimasi Return: {returnRate}%/tahun</label><input type="range" min={4} max={25} step={0.5} value={returnRate} onChange={e => setReturnRate(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Inflasi: {inflasi}%/tahun</label><input type="range" min={1} max={10} step={0.5} value={inflasi} onChange={e => setInflasi(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className={sudahFIRE ? 'finc-result-good' : 'finc-result-warn'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">FIRE Number (4% Rule)</p>
          <div className={`font-mono font-bold text-3xl tracking-tight mb-1 ${sudahFIRE ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>{fmt(fire.fireNumber)}</div>
          <p className={`text-sm font-medium ${sudahFIRE ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>{sudahFIRE ? '🎉 Kamu sudah mencapai FIRE!' : `Kurang ${fmt(fire.fireNumber - tabungan)}`}</p>
        </div>
        {!sudahFIRE && (
          <div className="finc-result-good">
            <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Estimasi Mencapai FIRE</p>
            <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400">{wealth.tahunMencapai}<span className="text-xl ml-1">tahun</span> {wealth.bulanMencapai}<span className="text-xl ml-1">bulan</span></div>
          </div>
        )}
        <div className="finc-card space-y-3">
          <Row label="Pengeluaran Tahunan" value={fmt(fire.pengeluaranTahunan)} />
          <Row label="FIRE Number" value={fmt(fire.fireNumber)} />
          <Row label="Return Riil" value={`${fire.realReturn}%/tahun`} />
          <Row label="Safe Withdrawal Rate" value="4%" />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 2. EMERGENCY SHIELD BUILDER
// ══════════════════════════════════════════════════
export function EmergencyShieldBuilder() {
  const [peng, setPeng] = useState(10_000_000)
  const [bln,  setBln]  = useState(6)
  const [tab,  setTab]  = useState(20_000_000)
  const [per,  setPer]  = useState(2_000_000)

  const r = useMemo(() => hitungDanaDarurat(peng, bln, tab, per), [peng, bln, tab, per])

  const statusCls = { tercapai: 'finc-result-good', setengah: 'finc-result-warn', kurang: 'finc-result-danger' }
  const statusTxt = { tercapai: 'text-emerald-600 dark:text-emerald-400', setengah: 'text-amber-600 dark:text-amber-400', kurang: 'text-red-600 dark:text-red-400' }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Pengeluaran Bulanan (Rp)</label><input type="number" value={peng} onChange={e => setPeng(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div>
          <label className="finc-label">Target Dana Darurat: {bln} bulan</label>
          <input type="range" min={3} max={12} step={1} value={bln} onChange={e => setBln(Number(e.target.value))} className="w-full" />
          <div className="flex justify-between text-2xs text-[--text-secondary] mt-1"><span>3 bln (min)</span><span>6 bln (ideal)</span><span>12 bln (max)</span></div>
        </div>
        <div><label className="finc-label">Dana yang Sudah Tersimpan (Rp)</label><input type="number" value={tab} onChange={e => setTab(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Tabungan per Bulan (Rp)</label><input type="number" value={per} onChange={e => setPer(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className={statusCls[r.status as keyof typeof statusCls]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Status Dana Darurat</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${statusTxt[r.status as keyof typeof statusTxt]}`}>{r.persenTercapai}%</div>
          <p className={`text-sm ${statusTxt[r.status as keyof typeof statusTxt]}`}>{r.status === 'tercapai' ? 'Dana darurat sudah cukup!' : r.status === 'setengah' ? 'Setengah jalan, lanjutkan!' : 'Perlu ditingkatkan segera'}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Target Dana Darurat" value={fmt(r.targetDana)} />
          <Row label="Sudah Tersimpan" value={fmt(tab)} />
          <Row label="Kekurangan" value={fmt(r.kekurangan)} />
          <Row label="Estimasi Tercapai" value={r.bulanMencapai < 999 ? `${r.bulanMencapai} bulan lagi` : 'Tambah tabungan bulanan'} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 3. INFLATION GUARD
// ══════════════════════════════════════════════════
export function InflationGuard() {
  const [jml, setJml] = useState(100_000_000)
  const [inf, setInf] = useState(4)
  const [thn, setThn] = useState(10)

  const r = useMemo(() => hitungInflasi(jml, inf, thn), [jml, inf, thn])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Jumlah Uang Saat Ini (Rp)</label><input type="number" value={jml} onChange={e => setJml(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Inflasi: {inf}% per tahun</label><input type="range" min={1} max={15} step={0.5} value={inf} onChange={e => setInf(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Periode: {thn} tahun</label><input type="range" min={1} max={30} step={1} value={thn} onChange={e => setThn(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-danger">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Daya Beli Setelah {thn} Tahun</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-red-600 dark:text-red-400 mb-1">{fmt(r.dayaBeli)}</div>
          <p className="text-sm text-red-600 dark:text-red-400">Turun {r.penurunanPersen}% dari nilai awal</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Nilai Awal" value={fmt(jml)} />
          <Row label="Nilai Nominal di Masa Depan" value={fmt(r.nilaiMasaDepan)} />
          <Row label="Daya Beli Riil" value={fmt(r.dayaBeli)} />
          <Row label="Kehilangan Daya Beli" value={fmt(r.kehilanganDayaBeli)} />
          <Row label="Faktor Inflasi" value={`${r.faktorInflasi}x`} />
        </div>
        <div className="finc-disclaimer"><span>💡</span><span>Untuk mempertahankan daya beli, investasi kamu harus menghasilkan return minimal {inf}% per tahun.</span></div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 4. BUDGET ARCHITECT
// ══════════════════════════════════════════════════
export function BudgetArchitect() {
  const [ph, setPh] = useState(15_000_000)
  const [k,  setK]  = useState(50)
  const [ki, setKi] = useState(30)
  const [t,  setT]  = useState(20)

  const r = useMemo(() => hitungBudget(ph, k, ki, t), [ph, k, ki, t])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Penghasilan Bersih/Bulan (Rp)</label><input type="number" value={ph} onChange={e => setPh(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div>
          <label className="finc-label">Kebutuhan: {k}%</label>
          <input type="range" min={0} max={80} step={5} value={k} onChange={e => { setK(Number(e.target.value)); setKi(Math.min(ki, 100 - Number(e.target.value))); setT(100 - Number(e.target.value) - Math.min(ki, 100 - Number(e.target.value))) }} className="w-full" />
        </div>
        <div>
          <label className="finc-label">Keinginan: {ki}%</label>
          <input type="range" min={0} max={80} step={5} value={ki} onChange={e => { setKi(Number(e.target.value)); setT(100 - k - Number(e.target.value)) }} className="w-full" />
        </div>
        <div>
          <label className="finc-label">Tabungan & Investasi: {t}%</label>
          <div className={`finc-input font-mono ${t < 0 ? 'border-red-400 text-red-500' : 'text-[--text-primary]'}`}>{t}% {t < 0 ? '⚠️ Melebihi 100%' : ''}</div>
        </div>
      </div>
      <div className="space-y-4">
        {[
          { l: 'Kebutuhan', v: r.kebutuhan, c: 'bg-blue-500', p: k },
          { l: 'Keinginan', v: r.keinginan, c: 'bg-purple-500', p: ki },
          { l: 'Tabungan & Investasi', v: r.tabungan, c: 'bg-emerald-500', p: t },
        ].map(item => (
          <div key={item.l} className="finc-card">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-[--text-primary]">{item.l}</span>
              <span className="font-mono font-bold text-[--text-primary]">{fmt(item.v)}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className={`h-full ${item.c} rounded-full transition-all`} style={{ width: `${Math.max(0, item.p)}%` }} />
            </div>
            <div className="text-xs text-[--text-secondary] mt-1">{item.p}% dari penghasilan</div>
          </div>
        ))}
        <div className="finc-disclaimer"><span>💡</span><span>Aturan 50-30-20 adalah panduan umum. Sesuaikan dengan kondisi dan prioritas finansialmu.</span></div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 5. DEBT DESTROYER
// ══════════════════════════════════════════════════
export function DebtDestroyer() {
  const [utang, setUtang] = useState([
    { nama: 'KPR',           saldo: 500_000_000, bunga: 8,  cicilan: 4_500_000 },
    { nama: 'Kredit Mobil',  saldo: 150_000_000, bunga: 12, cicilan: 3_200_000 },
    { nama: 'Kartu Kredit',  saldo: 15_000_000,  bunga: 24, cicilan: 500_000   },
  ])
  const [tambahan, setTambahan] = useState(1_000_000)

  const totalSaldo   = utang.reduce((s, d) => s + d.saldo, 0)
  const totalCicilan = utang.reduce((s, d) => s + d.cicilan, 0)
  const avalanche    = [...utang].sort((a, b) => b.bunga - a.bunga)
  const snowball     = [...utang].sort((a, b) => a.saldo - b.saldo)

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="finc-card">
          <p className="text-xs font-semibold text-[--text-secondary] mb-2">Total Utang</p>
          <div className="font-mono font-bold text-2xl text-red-500">{fmt(totalSaldo)}</div>
        </div>
        <div className="finc-card">
          <p className="text-xs font-semibold text-[--text-secondary] mb-2">Total Cicilan/Bulan</p>
          <div className="font-mono font-bold text-2xl text-[--text-primary]">{fmt(totalCicilan)}</div>
        </div>
      </div>
      <div>
        <label className="finc-label">Tambahan Pembayaran/Bulan (Rp)</label>
        <input type="number" value={tambahan} onChange={e => setTambahan(Number(e.target.value))} className="finc-input font-mono" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="finc-card border-red-100 dark:border-red-900">
          <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-3">🔥 Metode Avalanche (Hemat Bunga)</p>
          <p className="text-xs text-[--text-secondary] mb-3">Lunasi bunga tertinggi duluan</p>
          {avalanche.map((d, i) => (
            <div key={d.nama} className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-[--text-primary]">{d.nama}</p>
                <p className="text-2xs text-[--text-secondary]">{d.bunga}% bunga · {fmt(d.saldo)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="finc-card border-blue-100 dark:border-blue-900">
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">⛄ Metode Snowball (Motivasi)</p>
          <p className="text-xs text-[--text-secondary] mb-3">Lunasi saldo terkecil duluan</p>
          {snowball.map((d, i) => (
            <div key={d.nama} className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-[--text-primary]">{d.nama}</p>
                <p className="text-2xs text-[--text-secondary]">{fmt(d.saldo)} saldo · {d.bunga}% bunga</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 6. NET WORTH TRACKER
// ══════════════════════════════════════════════════
export function NetWorthTracker() {
  const [kas,    setKas]    = useState(50_000_000)
  const [inv,    setInv]    = useState(100_000_000)
  const [prop,   setProp]   = useState(500_000_000)
  const [kend,   setKend]   = useState(150_000_000)
  const [lainA,  setLainA]  = useState(0)
  const [kpr,    setKpr]    = useState(400_000_000)
  const [krendL, setKrendL] = useState(50_000_000)
  const [cc,     setCc]     = useState(5_000_000)
  const [pinj,   setPinj]   = useState(0)
  const [lainL,  setLainL]  = useState(0)

  const r = useMemo(() => hitungNetWorth(
    { kas, investasi: inv, properti: prop, kendaraan: kend, lainnya: lainA },
    { kpr, kendaraan: krendL, kartuKredit: cc, pinjaman: pinj, lainnya: lainL }
  ), [kas, inv, prop, kend, lainA, kpr, krendL, cc, pinj, lainL])

  const statusColor = r.status === 'sehat' ? 'finc-result-good' : r.status === 'perhatian' ? 'finc-result-warn' : 'finc-result-danger'
  const statusTxt   = r.status === 'sehat' ? 'text-emerald-600 dark:text-emerald-400' : r.status === 'perhatian' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wider">ASET</p>
        {[['Kas & Tabungan', kas, setKas], ['Investasi', inv, setInv], ['Properti', prop, setProp], ['Kendaraan', kend, setKend], ['Lainnya', lainA, setLainA]].map(([l, v, fn]) => (
          <div key={l as string}><label className="finc-label">{l as string} (Rp)</label><input type="number" value={v as number} onChange={e => (fn as Function)(Number(e.target.value))} className="finc-input font-mono" /></div>
        ))}
        <p className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wider pt-2">LIABILITAS</p>
        {[['KPR', kpr, setKpr], ['Kredit Kendaraan', krendL, setKrendL], ['Kartu Kredit', cc, setCc], ['Pinjaman Lain', pinj, setPinj], ['Liabilitas Lain', lainL, setLainL]].map(([l, v, fn]) => (
          <div key={l as string}><label className="finc-label">{l as string} (Rp)</label><input type="number" value={v as number} onChange={e => (fn as Function)(Number(e.target.value))} className="finc-input font-mono" /></div>
        ))}
      </div>
      <div className="space-y-4">
        <div className={statusColor}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Net Worth</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${statusTxt}`}>{fmt(r.netWorth)}</div>
          <p className={`text-sm ${statusTxt}`}>Debt Ratio: {r.debtRatio}% — {r.status === 'sehat' ? 'Kondisi Sehat' : r.status === 'perhatian' ? 'Perlu Perhatian' : 'Kondisi Kritis'}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Total Aset" value={fmt(r.totalAset)} />
          <Row label="Total Liabilitas" value={fmt(r.totalLiabilitas)} />
          <Row label="Net Worth" value={fmt(r.netWorth)} />
          <Row label="Debt-to-Asset Ratio" value={`${r.debtRatio}%`} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 7. SAVINGS GROWTH SIMULATOR
// ══════════════════════════════════════════════════
export function SavingsGrowthSimulator() {
  const [awal, setAwal] = useState(10_000_000)
  const [bln,  setBln]  = useState(1_000_000)
  const [rate, setRate] = useState(5)
  const [thn,  setThn]  = useState(5)

  const r = useMemo(() => hitungSavingsGrowth(awal, bln, rate, thn), [awal, bln, rate, thn])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Tabungan Awal (Rp)</label><input type="number" value={awal} onChange={e => setAwal(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Tabungan per Bulan (Rp)</label><input type="number" value={bln} onChange={e => setBln(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Bunga/Return: {rate}% per tahun</label><input type="range" min={0} max={20} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Periode: {thn} tahun</label><input type="range" min={1} max={30} step={1} value={thn} onChange={e => setThn(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Nilai Akhir</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.nilaiAkhir)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Bunga terkumpul: {fmt(r.totalBunga)} (+{r.returnPersen}%)</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Total Setor" value={fmt(r.totalSetor)} />
          <Row label="Total Bunga" value={fmt(r.totalBunga)} />
          <Row label="Nilai Akhir" value={fmt(r.nilaiAkhir)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 8. GOAL ACHIEVER PLANNER
// ══════════════════════════════════════════════════
export function GoalAchieverPlanner() {
  const [target, setTarget] = useState(100_000_000)
  const [ada,    setAda]    = useState(10_000_000)
  const [bln,    setBln]    = useState(24)
  const [rate,   setRate]   = useState(6)

  const r = useMemo(() => hitungGoal(target, ada, bln, rate), [target, ada, bln, rate])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Target Jumlah (Rp)</label><input type="number" value={target} onChange={e => setTarget(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Dana yang Sudah Ada (Rp)</label><input type="number" value={ada} onChange={e => setAda(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Waktu Mencapai: {bln} bulan ({(bln / 12).toFixed(1)} tahun)</label><input type="range" min={1} max={120} step={1} value={bln} onChange={e => setBln(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Return/Bunga: {rate}% per tahun</label><input type="range" min={0} max={20} step={0.5} value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Tabungan yang Dibutuhkan</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.tabunganPerBulan)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">per bulan selama {bln} bulan</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Target" value={fmt(target)} />
          <Row label="Dana Awal (sudah berkembang)" value={fmt(r.nilaiSaatIniDiTarget)} />
          <Row label="Kontribusi Dibutuhkan" value={fmt(r.kekurangan)} />
          <Row label="Tabungan/bulan" value={fmt(r.tabunganPerBulan)} />
        </div>
      </div>
    </div>
  )
}
