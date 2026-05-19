'use client'

/**
 * FincTools v2 — Investasi Calculators
 * 8 tools: DCASimulator, SBNMaturityPlanner, CouponIncomePlanner, BondYieldAnalyzer,
 * GoldDCASimulator, GoldVsInflationAnalyzer, DividendIncomeProjector, DRIPSimulator
 */

import { useState, useMemo } from 'react'
import {
  hitungDCA, hitungSBN, hitungCoupon, hitungBondYield,
  hitungGoldDCA, hitungGoldVsInflasi, hitungDividend, hitungDRIP,
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
// 1. DCA SIMULATOR
// ══════════════════════════════════════════════════
export function DCASimulator() {
  const [inv,  setInv]  = useState(1_000_000)
  const [bln,  setBln]  = useState(36)
  const [ret,  setRet]  = useState(15)
  const [freq, setFreq] = useState<'bulanan' | 'mingguan' | 'tahunan'>('bulanan')

  const r = useMemo(() => hitungDCA({ investasiPerPeriode: inv, jumlahPeriode: bln, returnTahunan: ret, frekuensi: freq }), [inv, bln, ret, freq])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="finc-label">Frekuensi Investasi</label>
          <div className="flex gap-2">
            {(['bulanan', 'mingguan', 'tahunan'] as const).map(f => (
              <button key={f} onClick={() => setFreq(f)} className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all capitalize ${freq === f ? 'bg-finc-green text-white border-finc-green' : 'border-[--border] text-[--text-secondary]'}`}>{f}</button>
            ))}
          </div>
        </div>
        <div><label className="finc-label">Investasi per {freq === 'mingguan' ? 'Minggu' : freq === 'tahunan' ? 'Tahun' : 'Bulan'} (Rp)</label><input type="number" value={inv} onChange={e => setInv(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div>
          <label className="finc-label">Durasi: {bln} bulan ({(bln / 12).toFixed(1)} tahun)</label>
          <input type="range" min={6} max={360} step={6} value={bln} onChange={e => setBln(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="finc-label">Estimasi Return Tahunan: {ret}%</label>
          <input type="range" min={1} max={30} step={1} value={ret} onChange={e => setRet(Number(e.target.value))} className="w-full" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Nilai Akhir Portofolio</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.nilaiAkhir)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Keuntungan: {fmt(r.totalKeuntungan)} (+{r.returnTotal}%)</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Total Investasi" value={fmt(r.totalInvestasi)} />
          <Row label="Total Keuntungan" value={fmt(r.totalKeuntungan)} />
          <Row label="CAGR" value={`${r.cagr}% per tahun`} />
          <Row label="Return Total" value={`${r.returnTotal}%`} />
        </div>
        {r.rincianTahunan.length > 0 && (
          <div className="finc-card overflow-x-auto">
            <p className="text-xs font-semibold text-[--text-secondary] mb-2">Proyeksi per Tahun</p>
            <table className="w-full text-xs">
              <thead><tr className="border-b border-[--border]"><th className="text-left py-1 pr-3 text-[--text-secondary]">Tahun</th><th className="text-right py-1 pr-3 text-[--text-secondary]">Investasi</th><th className="text-right py-1 text-[--text-secondary]">Nilai</th></tr></thead>
              <tbody>{r.rincianTahunan.map(t => <tr key={t.tahun} className="border-b border-[--border] last:border-0"><td className="py-1.5 pr-3 font-mono text-[--text-secondary]">{t.tahun}</td><td className="py-1.5 pr-3 text-right font-mono text-[--text-secondary]">{fmt(t.totalInvestasi)}</td><td className="py-1.5 text-right font-mono font-medium text-emerald-600 dark:text-emerald-400">{fmt(t.nilaiPortofolio)}</td></tr>)}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 2. SBN MATURITY PLANNER
// ══════════════════════════════════════════════════
export function SBNMaturityPlanner() {
  const [nominal, setNominal] = useState(10_000_000)
  const [kupon,   setKupon]   = useState(6.5)
  const [tenor,   setTenor]   = useState(2)
  const [pajak,   setPajak]   = useState(10)

  const r = useMemo(() => hitungSBN({ nominal, kuponPersen: kupon, tenorTahun: tenor, pajakKupon: pajak }), [nominal, kupon, tenor, pajak])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Nominal Investasi (Rp)</label><input type="number" value={nominal} onChange={e => setNominal(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Kupon: {kupon}% per tahun</label><input type="range" min={1} max={15} step={0.25} value={kupon} onChange={e => setKupon(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Tenor: {tenor} tahun</label><input type="range" min={1} max={30} step={1} value={tenor} onChange={e => setTenor(Number(e.target.value))} className="w-full" /></div>
        <div>
          <label className="finc-label">Pajak Kupon: {pajak}%</label>
          <input type="range" min={0} max={20} step={5} value={pajak} onChange={e => setPajak(Number(e.target.value))} className="w-full" />
          <p className="text-2xs text-[--text-secondary] mt-1">SBR/ORI: 10% | Institusi: bervariasi</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Total Diterima saat Jatuh Tempo</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.totalTerima)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Yield bersih: {r.yieldBersih}% per tahun</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Kupon/tahun (kotor)" value={fmt(r.kuponPerTahun)} />
          <Row label="Kupon/tahun (bersih)" value={fmt(r.kuponBersihPerTahun)} />
          <Row label="Kupon/bulan (bersih)" value={fmt(r.kuponBersihPerBulan)} />
          <Row label="Total kupon bersih" value={fmt(r.totalKuponBersih)} />
          <Row label="Nominal kembali" value={fmt(nominal)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 3. COUPON INCOME PLANNER
// ══════════════════════════════════════════════════
export function CouponIncomePlanner() {
  const [nominal, setNominal] = useState(10_000_000)
  const [kupon,   setKupon]   = useState(8)
  const [freq,    setFreq]    = useState(2)
  const [pajak,   setPajak]   = useState(10)
  const [tenor,   setTenor]   = useState(5)

  const r = useMemo(() => hitungCoupon({ nominal, kuponPersen: kupon, frekuensiPerTahun: freq, pajakPersen: pajak, tenorTahun: tenor }), [nominal, kupon, freq, pajak, tenor])
  const freqLabel: Record<number, string> = { 1: 'Tahunan', 2: 'Semi-tahunan', 4: 'Kuartalan', 12: 'Bulanan' }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Nominal Obligasi (Rp)</label><input type="number" value={nominal} onChange={e => setNominal(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Kupon Rate: {kupon}%</label><input type="range" min={1} max={15} step={0.5} value={kupon} onChange={e => setKupon(Number(e.target.value))} className="w-full" /></div>
        <div>
          <label className="finc-label">Frekuensi Pembayaran</label>
          <div className="grid grid-cols-4 gap-1">
            {[1, 2, 4, 12].map(f => (
              <button key={f} onClick={() => setFreq(f)} className={`py-2 rounded-lg text-xs font-medium border transition-all ${freq === f ? 'bg-finc-green text-white border-finc-green' : 'border-[--border] text-[--text-secondary]'}`}>{freqLabel[f]}</button>
            ))}
          </div>
        </div>
        <div><label className="finc-label">Pajak Kupon: {pajak}%</label><input type="range" min={0} max={20} step={5} value={pajak} onChange={e => setPajak(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Tenor: {tenor} tahun</label><input type="range" min={1} max={30} step={1} value={tenor} onChange={e => setTenor(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Kupon Bersih per Pembayaran</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.kuponBersihPerPembayaran)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Efektif yield: {r.efektifYield}% per tahun</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Kupon/tahun (kotor)" value={fmt(r.kuponPerTahun)} />
          <Row label="Kupon/tahun (bersih)" value={fmt(r.kuponBersihPerTahun)} />
          <Row label="Total kupon bersih" value={fmt(r.totalKuponBersih)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 4. BOND YIELD ANALYZER
// ══════════════════════════════════════════════════
export function BondYieldAnalyzer() {
  const [harga,   setHarga]   = useState(10_200_000)
  const [nominal, setNominal] = useState(10_000_000)
  const [kupon,   setKupon]   = useState(8)
  const [tenor,   setTenor]   = useState(3)
  const [pajak,   setPajak]   = useState(10)

  const r = useMemo(() => hitungBondYield({ hargaBeli: harga, nominal, kuponPersen: kupon, sisaTenor: tenor, pajakPersen: pajak }), [harga, nominal, kupon, tenor, pajak])
  const statusColor = r.label === 'diskon' ? 'finc-result-good' : r.label === 'par' ? 'finc-result-warn' : 'finc-result-danger'
  const statusText  = r.label === 'diskon' ? 'text-emerald-600 dark:text-emerald-400' : r.label === 'par' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Harga Beli (Rp per lembar)</label><input type="number" value={harga} onChange={e => setHarga(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Nominal/Face Value (Rp)</label><input type="number" value={nominal} onChange={e => setNominal(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Kupon Rate: {kupon}%</label><input type="range" min={1} max={15} step={0.25} value={kupon} onChange={e => setKupon(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Sisa Tenor: {tenor} tahun</label><input type="range" min={0.5} max={30} step={0.5} value={tenor} onChange={e => setTenor(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Pajak Kupon: {pajak}%</label><input type="range" min={0} max={20} step={5} value={pajak} onChange={e => setPajak(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className={statusColor}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">YTM Bersih</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${statusText}`}>{r.ytmBersih}%</div>
          <p className={`text-sm font-medium capitalize ${statusText}`}>Obligasi {r.label} — {r.premiumDiskonPersen > 0 ? '+' : ''}{r.premiumDiskonPersen}%</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Current Yield (kotor)" value={`${r.currentYield}%`} />
          <Row label="Current Yield (bersih)" value={`${r.currentYieldBersih}%`} />
          <Row label="YTM (kotor)" value={`${r.ytm}%`} />
          <Row label="YTM (bersih)" value={`${r.ytmBersih}%`} />
          <Row label="Premium/Diskon" value={`${fmt(r.premiumDiskon)} (${r.premiumDiskonPersen}%)`} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 5. GOLD DCA SIMULATOR
// ══════════════════════════════════════════════════
export function GoldDCASimulator() {
  const [inv,    setInv]    = useState(1_000_000)
  const [bulan,  setBulan]  = useState(24)
  const [harga,  setHarga]  = useState(1_100_000)
  const [target, setTarget] = useState(1_400_000)

  const r = useMemo(() => hitungGoldDCA({ investasiPerBulan: inv, jumlahBulan: bulan, hargaEmasSekarang: harga, targetHarga: target }), [inv, bulan, harga, target])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Investasi per Bulan (Rp)</label><input type="number" value={inv} onChange={e => setInv(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Durasi: {bulan} bulan</label><input type="range" min={3} max={120} step={3} value={bulan} onChange={e => setBulan(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Harga Emas Sekarang (Rp/gram)</label><input type="number" value={harga} onChange={e => setHarga(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Target Harga Emas (Rp/gram)</label><input type="number" value={target} onChange={e => setTarget(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Emas Terkumpul</p>
          <div className="font-mono font-bold text-5xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{r.gramTerkumpul}<span className="text-xl ml-1 font-medium">gram</span></div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Nilai di target harga: {fmt(r.nilaiTarget)}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Total Investasi" value={fmt(r.totalInvestasi)} />
          <Row label="Nilai sekarang" value={fmt(r.nilaiSekarang)} />
          <Row label="Nilai di target" value={fmt(r.nilaiTarget)} />
          <Row label="Keuntungan (target)" value={fmt(r.keuntunganTarget)} />
          <Row label="Return (target)" value={`${r.returnTarget}%`} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 6. GOLD VS INFLATION ANALYZER
// ══════════════════════════════════════════════════
export function GoldVsInflationAnalyzer() {
  const [inv,   setInv]   = useState(10_000_000)
  const [tahun, setTahun] = useState(10)
  const [emas,  setEmas]  = useState(8)
  const [infl,  setInfl]  = useState(4)

  const r = useMemo(() => hitungGoldVsInflasi({ jumlahInvestasi: inv, periodeTahun: tahun, returnEmasTahunan: emas, inflasiTahunan: infl }), [inv, tahun, emas, infl])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Jumlah Investasi (Rp)</label><input type="number" value={inv} onChange={e => setInv(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Periode: {tahun} tahun</label><input type="range" min={1} max={30} step={1} value={tahun} onChange={e => setTahun(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Estimasi Return Emas: {emas}% per tahun</label><input type="range" min={1} max={20} step={0.5} value={emas} onChange={e => setEmas(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Inflasi: {infl}% per tahun</label><input type="range" min={1} max={15} step={0.5} value={infl} onChange={e => setInfl(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className={r.emasBeats ? 'finc-result-good' : 'finc-result-warn'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Emas {r.emasBeats ? 'Mengalahkan' : 'Kalah dari'} Inflasi</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${r.emasBeats ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>{fmt(r.nilaiEmasNominal)}</div>
          <p className={`text-sm ${r.emasBeats ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>Return riil: {r.returnRiil}%</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Nilai emas nominal" value={fmt(r.nilaiEmasNominal)} />
          <Row label="Nilai emas riil (inflasi adj.)" value={fmt(r.nilaiRiilEmas)} />
          <Row label="Daya beli uang tunai" value={fmt(r.dayaBeli)} />
          <Row label="Return nominal" value={`${r.returnNominal}%`} />
          <Row label="Return riil" value={`${r.returnRiil}%`} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 7. DIVIDEND INCOME PROJECTOR
// ══════════════════════════════════════════════════
export function DividendIncomeProjector() {
  const [saham,   setSaham]   = useState(10000)
  const [harga,   setHarga]   = useState(5000)
  const [yield_,  setYield_]  = useState(4)
  const [growth,  setGrowth]  = useState(5)
  const [tahun,   setTahun]   = useState(5)

  const r = useMemo(() => hitungDividend({ jumlahSaham: saham, hargaSaham: harga, dividenYield: yield_, pertumbuhanDividen: growth, periodeTahun: tahun }), [saham, harga, yield_, growth, tahun])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Jumlah Saham (lembar)</label><input type="number" value={saham} onChange={e => setSaham(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Harga per Lembar (Rp)</label><input type="number" value={harga} onChange={e => setHarga(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Dividend Yield: {yield_}%</label><input type="range" min={0.5} max={15} step={0.5} value={yield_} onChange={e => setYield_(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Pertumbuhan Dividen: {growth}% per tahun</label><input type="range" min={0} max={20} step={1} value={growth} onChange={e => setGrowth(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Proyeksi: {tahun} tahun</label><input type="range" min={1} max={10} step={1} value={tahun} onChange={e => setTahun(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Dividen Tahun Ini</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.dividenTahunIni)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">{fmt(r.dividenBulanIni)}/bulan · Portofolio {fmt(r.nilaiPortofolio)}</p>
        </div>
        <div className="finc-card overflow-x-auto">
          <p className="text-xs font-semibold text-[--text-secondary] mb-2">Proyeksi Dividen per Tahun</p>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-[--border]"><th className="text-left py-1 pr-3 text-[--text-secondary]">Tahun</th><th className="text-right py-1 pr-3 text-[--text-secondary]">Dividen</th><th className="text-right py-1 text-[--text-secondary]">Kumulatif</th></tr></thead>
            <tbody>{r.proyeksi.map(p => <tr key={p.tahun} className="border-b border-[--border] last:border-0"><td className="py-1.5 pr-3 font-mono text-[--text-secondary]">{p.tahun}</td><td className="py-1.5 pr-3 text-right font-mono text-[--text-primary]">{fmt(p.dividen)}</td><td className="py-1.5 text-right font-mono font-medium text-emerald-600 dark:text-emerald-400">{fmt(p.totalKumulatif)}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 8. DRIP SIMULATOR
// ══════════════════════════════════════════════════
export function DRIPSimulator() {
  const [saham,  setSaham]  = useState(10000)
  const [harga,  setHarga]  = useState(5000)
  const [yield_, setYield_] = useState(4)
  const [growth, setGrowth] = useState(8)
  const [tahun,  setTahun]  = useState(10)

  const r = useMemo(() => hitungDRIP({ sahamAwal: saham, hargaSaham: harga, dividenYield: yield_, pertumbuhanHarga: growth, periodeTahun: tahun }), [saham, harga, yield_, growth, tahun])
  const diff = r.returnTotal - r.returnTanpaDRIP

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Jumlah Saham Awal (lembar)</label><input type="number" value={saham} onChange={e => setSaham(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Harga per Lembar (Rp)</label><input type="number" value={harga} onChange={e => setHarga(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Dividend Yield: {yield_}%</label><input type="range" min={0.5} max={15} step={0.5} value={yield_} onChange={e => setYield_(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Pertumbuhan Harga: {growth}% per tahun</label><input type="range" min={1} max={25} step={1} value={growth} onChange={e => setGrowth(Number(e.target.value))} className="w-full" /></div>
        <div><label className="finc-label">Periode: {tahun} tahun</label><input type="range" min={1} max={10} step={1} value={tahun} onChange={e => setTahun(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Nilai Akhir dengan DRIP</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.nilaiAkhir)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">+{diff.toFixed(1)}% lebih baik dari tanpa DRIP</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Saham awal" value={`${saham} lembar`} />
          <Row label="Saham akhir (DRIP)" value={`${r.sahamAkhir} lembar`} />
          <Row label="Nilai awal" value={fmt(r.nilaiAwal)} />
          <Row label="Dividen direinvestasi" value={fmt(r.totalDividenDireinvestasi)} />
          <Row label="Return dengan DRIP" value={`${r.returnTotal}%`} />
          <Row label="Return tanpa DRIP" value={`${r.returnTanpaDRIP}%`} />
        </div>
      </div>
    </div>
  )
}
