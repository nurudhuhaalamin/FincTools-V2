'use client'

/**
 * FincTools v2 — Pajak Calculators
 * 7 tools: TaxOptimizerPPh21, THRTaxPlanner, FreelancerTaxEstimator,
 * InvestmentTaxReportGenerator, ZakatTaxPlanner, UMKMTaxEstimator, PPNTracker
 */

import { useState, useMemo } from 'react'
import { Copy, Check } from 'lucide-react'
import {
  hitungPPh21, hitungTHR, hitungFreelancerTax, hitungInvestmentTax,
  hitungZakat, hitungUMKMTax, hitungPPN, PTKP,
} from '@/lib/calculations'

const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const statusList = Object.keys(PTKP)

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
      <span className="text-xs text-[--text-secondary]">{label}</span>
      <span className="text-xs font-mono font-medium text-[--text-primary]">{value}</span>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 1. TAX OPTIMIZER PPH 21
// ══════════════════════════════════════════════════
export function TaxOptimizerPPh21() {
  const [gaji,    setGaji]    = useState(10_000_000)
  const [tunjTt,  setTunjTt]  = useState(2_000_000)
  const [tunjTdk, setTunjTdk] = useState(0)
  const [status,  setStatus]  = useState('TK/0')
  const [npwp,    setNpwp]    = useState(true)
  const [copied,  setCopied]  = useState(false)

  const r = useMemo(() => hitungPPh21({ gajiPokok: gaji, tunjanganTetap: tunjTt, tunjanganTidakTetap: tunjTdk, statusPTKP: status, iburNPWP: !npwp }), [gaji, tunjTt, tunjTdk, status, npwp])

  const copy = () => {
    navigator.clipboard.writeText(`FincTools PPh 21\nPenghasilan Bruto: ${fmt(r.penghasilanBruto)}/bln\nPPh 21/bulan: ${fmt(r.pphBulananFinal)}\nTake Home Pay: ${fmt(r.takehomePay)}`)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Gaji Pokok (Rp/bulan)</label><input type="number" value={gaji} onChange={e => setGaji(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Tunjangan Tetap (Rp/bulan)</label><input type="number" value={tunjTt} onChange={e => setTunjTt(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Tunjangan Tidak Tetap (Rp/bulan)</label><input type="number" value={tunjTdk} onChange={e => setTunjTdk(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div>
          <label className="finc-label">Status PTKP</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="finc-input">
            {statusList.map(s => <option key={s} value={s}>{s} — {fmt(PTKP[s as keyof typeof PTKP])}/tahun</option>)}
          </select>
        </div>
        <div className="flex items-center justify-between finc-card py-3">
          <div>
            <p className="text-sm font-medium text-[--text-primary]">Punya NPWP</p>
            <p className="text-xs text-[--text-secondary]">Tanpa NPWP kena tarif 20% lebih tinggi</p>
          </div>
          <button onClick={() => setNpwp(!npwp)} className={`w-11 h-6 rounded-full transition-colors ${npwp ? 'bg-finc-green' : 'bg-slate-300 dark:bg-slate-600'}`}>
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${npwp ? 'translate-x-5' : ''}`} />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">PPh 21 per Bulan</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.pphBulananFinal)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Take Home Pay: {fmt(r.takehomePay)}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Penghasilan Bruto/bln" value={fmt(r.penghasilanBruto)} />
          <Row label="Biaya Jabatan/bln" value={`(${fmt(r.biayaJabatan)})`} />
          <Row label="PTKP Setahun" value={fmt(r.ptkp)} />
          <Row label="PKP Setahun" value={fmt(r.pkp)} />
          <Row label="PPh 21 Setahun" value={fmt(r.pphTahunan)} />
        </div>
        {r.rincianTarif.length > 0 && (
          <div className="finc-card">
            <p className="text-xs font-semibold text-[--text-secondary] mb-2">Rincian Tarif Progresif</p>
            {r.rincianTarif.map(t => (
              <div key={t.layer} className="flex justify-between text-xs py-1">
                <span className="text-[--text-secondary]">Layer {t.layer} × {t.tarif}</span>
                <span className="font-mono text-[--text-primary]">{fmt(t.pajak)}</span>
              </div>
            ))}
          </div>
        )}
        <button onClick={copy} className="finc-btn w-full justify-center">{copied ? <><Check size={14} />Tersalin!</> : <><Copy size={14} />Salin Hasil</>}</button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 2. THR TAX PLANNER
// ══════════════════════════════════════════════════
export function THRTaxPlanner() {
  const [gaji,   setGaji]   = useState(10_000_000)
  const [tunj,   setTunj]   = useState(2_000_000)
  const [thr,    setThr]    = useState(12_000_000)
  const [status, setStatus] = useState('TK/0')

  const r = useMemo(() => hitungTHR({ gajiPokok: gaji, tunjanganTetap: tunj, thrAmount: thr, statusPTKP: status }), [gaji, tunj, thr, status])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Gaji Pokok (Rp/bulan)</label><input type="number" value={gaji} onChange={e => setGaji(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Tunjangan Tetap (Rp/bulan)</label><input type="number" value={tunj} onChange={e => setTunj(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Jumlah THR (Rp)</label><input type="number" value={thr} onChange={e => setThr(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div>
          <label className="finc-label">Status PTKP</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="finc-input">
            {statusList.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">THR Bersih Diterima</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.thrBersih)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Pajak THR: {fmt(r.pphTHR)} ({r.efektifTarifTHR}%)</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="THR Bruto" value={fmt(thr)} />
          <Row label="Pajak atas THR" value={fmt(r.pphTHR)} />
          <Row label="THR Bersih" value={fmt(r.thrBersih)} />
          <Row label="Tarif Efektif THR" value={`${r.efektifTarifTHR}%`} />
          <Row label="PKP tanpa THR" value={fmt(r.pkpTanpaTHR)} />
          <Row label="PKP dengan THR" value={fmt(r.pkpDenganTHR)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 3. FREELANCER TAX ESTIMATOR
// ══════════════════════════════════════════════════
export function FreelancerTaxEstimator() {
  const [penghasilan, setPenghasilan] = useState(15_000_000)
  const [norma,       setNorma]       = useState(50)
  const [status,      setStatus]      = useState('TK/0')
  const [bulan,       setBulan]       = useState(12)

  const r = useMemo(() => hitungFreelancerTax({ penghasilanBrutoPerBulan: penghasilan, normaPersenase: norma, statusPTKP: status, bulanKerja: bulan }), [penghasilan, norma, status, bulan])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Rata-rata Penghasilan Bruto/Bulan (Rp)</label><input type="number" value={penghasilan} onChange={e => setPenghasilan(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div>
          <label className="finc-label">Norma Penghitungan: {norma}%</label>
          <input type="range" min={20} max={80} step={5} value={norma} onChange={e => setNorma(Number(e.target.value))} className="w-full" />
          <p className="text-2xs text-[--text-secondary] mt-1">Dokter/Pengacara ~50%, Pedagang ~20–30%</p>
        </div>
        <div>
          <label className="finc-label">Status PTKP</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="finc-input">
            {statusList.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="finc-label">Bulan Bekerja: {bulan} bulan</label>
          <input type="range" min={1} max={12} step={1} value={bulan} onChange={e => setBulan(Number(e.target.value))} className="w-full" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Estimasi PPh per Bulan</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.pphBulanan)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Tarif efektif: {r.efektifTarif}%</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Penghasilan Bruto/tahun" value={fmt(r.penghasilanBrutoTahunan)} />
          <Row label="Penghasilan Neto (Norma)" value={fmt(r.penghasilanNeto)} />
          <Row label="PTKP" value={fmt(r.ptkp)} />
          <Row label="PKP" value={fmt(r.pkp)} />
          <Row label="PPh Tahunan" value={fmt(r.pphTahunan)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 4. INVESTMENT TAX REPORT GENERATOR
// ══════════════════════════════════════════════════
export function InvestmentTaxReportGenerator() {
  const [saham,   setSaham]   = useState(50_000_000)
  const [depo,    setDepo]    = useState(5_000_000)
  const [oblig,   setOblig]   = useState(2_000_000)
  const [divLok,  setDivLok]  = useState(3_000_000)
  const [divLuar, setDivLuar] = useState(0)
  const [copied,  setCopied]  = useState(false)

  const r = useMemo(() => hitungInvestmentTax({ nilaiJualSaham: saham, bungaDeposito: depo, bungaObligasi: oblig, dividenLokal: divLok, dividenLuar: divLuar }), [saham, depo, oblig, divLok, divLuar])

  const copy = () => {
    const txt = r.rincian.map(x => `${x.instrumen}: ${fmt(x.pajak)}`).join('\n') + `\nTotal PPh: ${fmt(r.totalPph)}`
    navigator.clipboard.writeText(txt); setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <p className="text-xs text-[--text-secondary]">Isi hanya instrumen yang kamu miliki. Kosongkan yang tidak ada.</p>
        <div><label className="finc-label">Nilai Jual Saham (Rp) — tarif 0.1%</label><input type="number" value={saham} onChange={e => setSaham(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Bunga Deposito Diterima (Rp) — tarif 20%</label><input type="number" value={depo} onChange={e => setDepo(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Bunga Obligasi (Rp) — tarif 10%</label><input type="number" value={oblig} onChange={e => setOblig(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Dividen Saham Lokal (Rp) — tarif 10%</label><input type="number" value={divLok} onChange={e => setDivLok(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Dividen Luar Negeri (Rp) — tarif 20%</label><input type="number" value={divLuar} onChange={e => setDivLuar(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Total PPh Investasi</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400">{fmt(r.totalPph)}</div>
        </div>
        <div className="finc-card space-y-3">
          {r.rincian.map(x => (
            <div key={x.instrumen} className="border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <div className="flex justify-between mb-0.5">
                <span className="text-xs font-medium text-[--text-primary]">{x.instrumen}</span>
                <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">{fmt(x.pajak)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-2xs text-[--text-secondary]">Penghasilan: {fmt(x.penghasilan)}</span>
                <span className="text-2xs text-[--text-secondary]">{x.tarif}</span>
              </div>
            </div>
          ))}
        </div>
        <button onClick={copy} className="finc-btn w-full justify-center">{copied ? <><Check size={14} />Tersalin!</> : <><Copy size={14} />Salin Laporan</>}</button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 5. ZAKAT & TAX PLANNER
// ══════════════════════════════════════════════════
export function ZakatTaxPlanner() {
  const [penghasilan, setPenghasilan] = useState(10_000_000)
  const [tabungan,    setTabungan]    = useState(50_000_000)
  const [investasi,   setInvestasi]   = useState(20_000_000)
  const [emas,        setEmas]        = useState(10)
  const [hargaEmas,   setHargaEmas]   = useState(1_100_000)
  const [hutang,      setHutang]      = useState(0)

  const r = useMemo(() => hitungZakat({ penghasilanBulanan: penghasilan, tabungan, investasi, emas, hargaEmasPerGram: hargaEmas, hutang }), [penghasilan, tabungan, investasi, emas, hargaEmas, hutang])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Penghasilan Bersih/Bulan (Rp)</label><input type="number" value={penghasilan} onChange={e => setPenghasilan(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Tabungan & Kas (Rp)</label><input type="number" value={tabungan} onChange={e => setTabungan(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Nilai Investasi (Rp)</label><input type="number" value={investasi} onChange={e => setInvestasi(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Kepemilikan Emas (gram)</label><input type="number" value={emas} onChange={e => setEmas(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Harga Emas/gram (Rp)</label><input type="number" value={hargaEmas} onChange={e => setHargaEmas(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">Total Hutang (Rp)</label><input type="number" value={hutang} onChange={e => setHutang(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className={r.wajibZakatMal ? 'finc-result-good' : 'finc-result-warn'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Zakat Mal</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${r.wajibZakatMal ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>{r.wajibZakatMal ? fmt(r.zakatMal) : 'Belum Wajib'}</div>
          <p className="text-sm text-[--text-secondary]">Nisab: {fmt(r.nisabRupiah)} (85 gram emas)</p>
        </div>
        <div className={r.wajibZakatPenghasilan ? 'finc-result-good' : 'finc-result-warn'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Zakat Penghasilan/Bulan</p>
          <div className={`font-mono font-bold text-3xl tracking-tight ${r.wajibZakatPenghasilan ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>{r.wajibZakatPenghasilan ? fmt(r.zakatPenghasilan) : 'Belum Wajib'}</div>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Total Harta" value={fmt(r.totalHarta)} />
          <Row label="Total Hutang" value={fmt(hutang)} />
          <Row label="Harta Bersih" value={fmt(r.hartaBersih)} />
          <Row label="Nisab (85g emas)" value={fmt(r.nisabRupiah)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 6. UMKM TAX ESTIMATOR
// ══════════════════════════════════════════════════
export function UMKMTaxEstimator() {
  const [omzet, setOmzet] = useState(20_000_000)
  const [bulan, setBulan] = useState(12)

  const r = useMemo(() => hitungUMKMTax({ omzetPerBulan: omzet, bulanBerjalan: bulan }), [omzet, bulan])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Rata-rata Omzet per Bulan (Rp)</label><input type="number" value={omzet} onChange={e => setOmzet(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div>
          <label className="finc-label">Bulan Berjalan: {bulan} bulan</label>
          <input type="range" min={1} max={12} step={1} value={bulan} onChange={e => setBulan(Number(e.target.value))} className="w-full" />
        </div>
        <div className="finc-card bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1">Ketentuan WP OP UMKM</p>
          <p className="text-xs text-purple-600 dark:text-purple-400 leading-relaxed">Omzet s.d. Rp 500 juta/tahun BEBAS PPh. Di atas Rp 500 juta kena PPh Final 0.5% dari selisihnya.</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className={r.melebihiBatas ? 'finc-result-warn' : 'finc-result-good'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">PPh Final per Bulan</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${r.melebihiBatas ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{fmt(r.pphFinalPerBulan)}</div>
          <p className={`text-sm font-medium ${r.melebihiBatas ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{r.catatanPajak}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="Omzet Tahunan (proyeksi)" value={fmt(r.omzetTahunan)} />
          <Row label="PPh Final/bulan" value={fmt(r.pphFinalPerBulan)} />
          <Row label="PPh Final/tahun" value={fmt(r.pphFinalTahunan)} />
          <Row label="Sisa batas bebas" value={r.melebihiBatas ? 'Sudah melewati' : fmt(r.omzetSisaBebas)} />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
// 7. PPN TRACKER
// ══════════════════════════════════════════════════
export function PPNTracker() {
  const [harga, setHarga] = useState(1_000_000)
  const [inkl,  setInkl]  = useState(false)
  const [tarif, setTarif] = useState(11)

  const r = useMemo(() => hitungPPN({ harga, isInklusive: inkl, tarifPPN: tarif }), [harga, inkl, tarif])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Harga (Rp)</label><input type="number" value={harga} onChange={e => setHarga(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div>
          <label className="finc-label">Status Harga</label>
          <div className="flex gap-2">
            {['Belum termasuk PPN', 'Sudah termasuk PPN'].map((t, i) => (
              <button key={t} onClick={() => setInkl(i === 1)} className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${(i === 1 ? inkl : !inkl) ? 'bg-purple-600 text-white border-purple-600' : 'border-[--border] text-[--text-secondary]'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="finc-label">Tarif PPN: {tarif}%</label>
          <input type="range" min={1} max={12} step={1} value={tarif} onChange={e => setTarif(Number(e.target.value))} className="w-full" />
          <p className="text-2xs text-[--text-secondary] mt-1">Tarif standar PPN Indonesia: 11% (berlaku sejak April 2022)</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Nilai PPN</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.ppn)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Harga Total: {fmt(r.hargaTotal)}</p>
        </div>
        <div className="finc-card space-y-3">
          <Row label="DPP (Dasar Pengenaan Pajak)" value={fmt(r.dpp)} />
          <Row label={`PPN (${tarif}%)`} value={fmt(r.ppn)} />
          <Row label="Harga Total" value={fmt(r.hargaTotal)} />
          <Row label="Tarif Efektif" value={`${r.tarifEfektif}%`} />
        </div>
      </div>
    </div>
  )
}
