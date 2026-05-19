/**
 * FincTools v2 — Master Calculations
 * Semua fungsi kalkulasi untuk 46 tools
 */

// ══════════════════════════════════════════════════
// TRADING (13 tools)
// ══════════════════════════════════════════════════

export function hitungRiskManager(
  modal: number,
  risikoPercent: number,
  hargaEntry: number,
  stopLossPercent: number
) {
  const risikoRp       = modal * (risikoPercent / 100)
  const stopLossHarga  = hargaEntry * (stopLossPercent / 100)
  const lotOptimal     = Math.floor(risikoRp / (stopLossHarga * 100))
  const nilaiPosisi    = lotOptimal * 100 * hargaEntry
  const marginTerpakai = (nilaiPosisi / modal) * 100

  let status: 'aman' | 'perhatian' | 'berbahaya' = 'aman'
  if (risikoPercent > 3)       status = 'berbahaya'
  else if (risikoPercent > 1.5) status = 'perhatian'

  return { risikoRp, lotOptimal, stopLossHarga, nilaiPosisi, marginTerpakai, status }
}

export function hitungTradeAnalyzer(
  hargaEntry: number,
  stopLoss: number,
  targetProfit: number,
  lotSize: number
) {
  const jarak          = Math.abs(hargaEntry - stopLoss)
  const targetJarak    = Math.abs(targetProfit - hargaEntry)
  const rrRatio        = targetJarak / jarak
  const potensiLoss    = jarak * lotSize * 100
  const potensiProfit  = targetJarak * lotSize * 100
  const minWinRate     = 1 / (1 + rrRatio)

  let status: 'layak' | 'minimal' | 'tidak-layak' = 'layak'
  if (rrRatio < 1)       status = 'tidak-layak'
  else if (rrRatio < 2)  status = 'minimal'

  return { rrRatio: parseFloat(rrRatio.toFixed(2)), potensiLoss, potensiProfit, minWinRate: parseFloat((minWinRate * 100).toFixed(1)), status }
}

export function hitungStopLoss(
  hargaEntry: number,
  atr: number,
  multiplier: number,
  arahTrade: 'long' | 'short'
) {
  const stopLoss       = arahTrade === 'long'
    ? hargaEntry - atr * multiplier
    : hargaEntry + atr * multiplier
  const jarakPersen    = (Math.abs(hargaEntry - stopLoss) / hargaEntry) * 100
  const jarakPoin      = Math.abs(hargaEntry - stopLoss)

  let status: 'ketat' | 'ideal' | 'longgar' = 'ideal'
  if (jarakPersen < 1)      status = 'ketat'
  else if (jarakPersen > 5) status = 'longgar'

  return { stopLoss: parseFloat(stopLoss.toFixed(2)), jarakPersen: parseFloat(jarakPersen.toFixed(2)), jarakPoin: parseFloat(jarakPoin.toFixed(2)), status }
}

export function hitungMaxLoss(modal: number, maxLossPercent: number) {
  const maxLossRp      = modal * (maxLossPercent / 100)
  const sisaModal      = modal - maxLossRp
  const tradeCount     = Math.floor(modal / maxLossRp)

  let status: 'konservatif' | 'moderat' | 'agresif' = 'moderat'
  if (maxLossPercent <= 1)        status = 'konservatif'
  else if (maxLossPercent >= 5)   status = 'agresif'

  return { maxLossRp, sisaModal, tradeCount, status }
}

export function hitungTradingPerformance(
  totalTrade: number,
  tradeMenung: number,
  totalProfit: number,
  totalLoss: number
) {
  const winRate        = (tradeMenung / totalTrade) * 100
  const avgProfit      = totalProfit / tradeMenung || 0
  const avgLoss        = totalLoss / (totalTrade - tradeMenung) || 0
  const profitFactor   = totalProfit / totalLoss || 0
  const expectancy     = (winRate / 100 * avgProfit) - ((1 - winRate / 100) * avgLoss)

  let status: 'profitable' | 'breakeven' | 'merugi' = 'breakeven'
  if (expectancy > 0) status = 'profitable'
  else if (expectancy < 0) status = 'merugi'

  return {
    winRate: parseFloat(winRate.toFixed(1)),
    avgProfit: parseFloat(avgProfit.toFixed(0)),
    avgLoss: parseFloat(avgLoss.toFixed(0)),
    profitFactor: parseFloat(profitFactor.toFixed(2)),
    expectancy: parseFloat(expectancy.toFixed(0)),
    status,
  }
}

export function hitungWinRate(
  tradeMenung: number,
  totalTrade: number,
  avgProfit: number,
  avgLoss: number
) {
  const winRate        = (tradeMenung / totalTrade) * 100
  const expectancy     = (winRate / 100 * avgProfit) - ((1 - winRate / 100) * avgLoss)
  const profitFactor   = (winRate / 100 * avgProfit) / ((1 - winRate / 100) * avgLoss) || 0
  const minRR          = avgLoss / avgProfit

  let status: 'layak' | 'perlu-perbaikan' | 'tidak-layak' = 'layak'
  if (expectancy < 0) status = 'tidak-layak'
  else if (expectancy < avgLoss * 0.1) status = 'perlu-perbaikan'

  return {
    winRate: parseFloat(winRate.toFixed(1)),
    expectancy: parseFloat(expectancy.toFixed(0)),
    profitFactor: parseFloat(profitFactor.toFixed(2)),
    minRR: parseFloat(minRR.toFixed(2)),
    status,
  }
}

export function hitungDrawdown(
  drawdownPercent: number,
  modalAwal: number,
  targetReturn: number
) {
  const modalSetelahDD  = modalAwal * (1 - drawdownPercent / 100)
  const returnDibutuhkan = (modalAwal / modalSetelahDD - 1) * 100
  const tradeUntukPulih  = Math.ceil(returnDibutuhkan / targetReturn)

  let level: 'ringan' | 'sedang' | 'berat' | 'parah' = 'ringan'
  if (drawdownPercent > 50)       level = 'parah'
  else if (drawdownPercent > 25)  level = 'berat'
  else if (drawdownPercent > 10)  level = 'sedang'

  return {
    modalSetelahDD: parseFloat(modalSetelahDD.toFixed(0)),
    returnDibutuhkan: parseFloat(returnDibutuhkan.toFixed(1)),
    tradeUntukPulih,
    level,
  }
}

export function hitungPip(lots: number, pip: number, nilaiPipPerLot: number) {
  const nilaiPip   = nilaiPipPerLot * lots
  const nilaiTotal = nilaiPip * pip

  return { nilaiPip, nilaiTotal }
}

export function hitungMargin(modal: number, leverage: number, unitKontrak: number, hargaLot: number) {
  const nilaiPosisi    = unitKontrak * hargaLot
  const marginRequired = nilaiPosisi / leverage
  const marginLevel    = (modal / marginRequired) * 100
  const freeMargin     = modal - marginRequired

  let status: 'aman' | 'perhatian' | 'bahaya' = 'aman'
  if (marginLevel < 150)      status = 'bahaya'
  else if (marginLevel < 300) status = 'perhatian'

  return {
    marginRequired: parseFloat(marginRequired.toFixed(0)),
    marginLevel: parseFloat(marginLevel.toFixed(0)),
    freeMargin: parseFloat(freeMargin.toFixed(0)),
    nilaiPosisi,
    status,
  }
}

export function hitungSwap(lots: number, swapRate: number, hari: number) {
  const swapPerHari    = lots * swapRate
  const totalSwap      = swapPerHari * hari
  const swapPerMinggu  = swapPerHari * 7

  return {
    swapPerHari: parseFloat(swapPerHari.toFixed(2)),
    totalSwap: parseFloat(totalSwap.toFixed(2)),
    swapPerMinggu: parseFloat(swapPerMinggu.toFixed(2)),
  }
}

export function hitungKelly(winRate: number, avgProfit: number, avgLoss: number) {
  const wr         = winRate / 100
  const rr         = avgProfit / avgLoss
  const kelly      = wr - (1 - wr) / rr
  const halfKelly  = kelly / 2
  const quarterKelly = kelly / 4

  let rekomendasi: 'full' | 'half' | 'quarter' | 'skip' = 'half'
  if (kelly <= 0)         rekomendasi = 'skip'
  else if (kelly > 0.25)  rekomendasi = 'quarter'
  else if (kelly > 0.15)  rekomendasi = 'half'
  else                    rekomendasi = 'full'

  return {
    kelly: parseFloat((kelly * 100).toFixed(1)),
    halfKelly: parseFloat((halfKelly * 100).toFixed(1)),
    quarterKelly: parseFloat((quarterKelly * 100).toFixed(1)),
    rekomendasi,
  }
}

export function hitungProbabilityRuin(
  winRate: number,
  risikoPerTrade: number,
  rrRatio: number
) {
  const wr         = winRate / 100
  const rr         = rrRatio
  const expectancy = wr * rr - (1 - wr)
  const probRuin   = expectancy <= 0 ? 100 : Math.pow((1 - wr) / (wr * rr), 1 / risikoPerTrade) * 100

  let level: 'sangat-rendah' | 'rendah' | 'sedang' | 'tinggi' | 'pasti-rugi' = 'sedang'
  if (expectancy <= 0)         level = 'pasti-rugi'
  else if (probRuin > 50)      level = 'tinggi'
  else if (probRuin > 20)      level = 'sedang'
  else if (probRuin > 5)       level = 'rendah'
  else                         level = 'sangat-rendah'

  return {
    probRuin: parseFloat(Math.min(probRuin, 100).toFixed(1)),
    expectancy: parseFloat(expectancy.toFixed(3)),
    level,
  }
}

export function hitungStreak(winRate: number, totalTrade: number) {
  const wr                   = winRate / 100
  const expectedWinStreak    = Math.log(0.5) / Math.log(1 - wr)
  const expectedLoseStreak   = Math.log(0.5) / Math.log(wr)
  const maxExpectedWin       = Math.ceil(Math.log(totalTrade) / Math.log(1 / wr))
  const maxExpectedLose      = Math.ceil(Math.log(totalTrade) / Math.log(1 / (1 - wr)))

  return {
    expectedWinStreak:  parseFloat(expectedWinStreak.toFixed(1)),
    expectedLoseStreak: parseFloat(expectedLoseStreak.toFixed(1)),
    maxExpectedWin,
    maxExpectedLose,
  }
}

// ══════════════════════════════════════════════════
// PAJAK (7 tools)
// ══════════════════════════════════════════════════

const PTKP: Record<string, number> = {
  'TK/0': 54_000_000, 'TK/1': 58_500_000, 'TK/2': 63_000_000, 'TK/3': 67_500_000,
  'K/0':  58_500_000, 'K/1':  63_000_000, 'K/2':  67_500_000, 'K/3': 72_000_000,
  'K/I/0': 112_500_000, 'K/I/1': 117_000_000, 'K/I/2': 121_500_000, 'K/I/3': 126_000_000,
}

function hitungPPhProgresif(pkp: number): number {
  let pajak = 0
  if (pkp <= 0) return 0
  if (pkp <= 60_000_000)    return pkp * 0.05
  pajak += 60_000_000 * 0.05
  if (pkp <= 250_000_000)   return pajak + (pkp - 60_000_000) * 0.15
  pajak += 190_000_000 * 0.15
  if (pkp <= 500_000_000)   return pajak + (pkp - 250_000_000) * 0.25
  pajak += 250_000_000 * 0.25
  if (pkp <= 5_000_000_000) return pajak + (pkp - 500_000_000) * 0.30
  pajak += 4_500_000_000 * 0.30
  return pajak + (pkp - 5_000_000_000) * 0.35
}

export function hitungPPh21(
  gajiBruto: number,
  statusPTKP: string,
  punya_npwp: boolean
) {
  const biayaJabatan   = Math.min(gajiBruto * 0.05, 500_000)
  const netoBulanan    = gajiBruto - biayaJabatan
  const netoTahunan    = netoBulanan * 12
  const ptkp           = PTKP[statusPTKP] ?? 54_000_000
  const pkp            = Math.max(netoTahunan - ptkp, 0)
  let pphTahunan       = hitungPPhProgresif(pkp)
  if (!punya_npwp) pphTahunan *= 1.2
  const pphBulanan     = pphTahunan / 12
  const takehome       = gajiBruto - pphBulanan

  return {
    biayaJabatan:    parseFloat(biayaJabatan.toFixed(0)),
    netoTahunan:     parseFloat(netoTahunan.toFixed(0)),
    pkp:             parseFloat(pkp.toFixed(0)),
    pphTahunan:      parseFloat(pphTahunan.toFixed(0)),
    pphBulanan:      parseFloat(pphBulanan.toFixed(0)),
    takehome:        parseFloat(takehome.toFixed(0)),
    efektifRate:     parseFloat(((pphTahunan / netoTahunan) * 100).toFixed(2)),
  }
}

export function hitungTHR(
  nilaiTHR: number,
  gajiBulanan: number,
  statusPTKP: string,
  punya_npwp: boolean
) {
  const biayaJabatan   = Math.min(gajiBulanan * 0.05, 500_000)
  const netoGaji       = (gajiBulanan - biayaJabatan) * 12
  const ptkp           = PTKP[statusPTKP] ?? 54_000_000
  const pkpTanpaTHR    = Math.max(netoGaji - ptkp, 0)
  const pkpDenganTHR   = Math.max(netoGaji + nilaiTHR - ptkp, 0)
  const pphTanpaTHR    = hitungPPhProgresif(pkpTanpaTHR)
  const pphDenganTHR   = hitungPPhProgresif(pkpDenganTHR)
  let pajakTHR         = pphDenganTHR - pphTanpaTHR
  if (!punya_npwp) pajakTHR *= 1.2
  const thrBersih      = nilaiTHR - pajakTHR

  return {
    pajakTHR:  parseFloat(pajakTHR.toFixed(0)),
    thrBersih: parseFloat(thrBersih.toFixed(0)),
    efektifRate: parseFloat(((pajakTHR / nilaiTHR) * 100).toFixed(2)),
  }
}

export function hitungFreelancer(
  penghasilanBruto: number,
  normaPenghasilan: number,
  statusPTKP: string,
  punya_npwp: boolean
) {
  const penghasilanNeto = penghasilanBruto * (normaPenghasilan / 100)
  const ptkp            = PTKP[statusPTKP] ?? 54_000_000
  const pkp             = Math.max(penghasilanNeto - ptkp, 0)
  let pphTahunan        = hitungPPhProgresif(pkp)
  if (!punya_npwp) pphTahunan *= 1.2
  const pphBulanan      = pphTahunan / 12

  return {
    penghasilanNeto: parseFloat(penghasilanNeto.toFixed(0)),
    pkp:             parseFloat(pkp.toFixed(0)),
    pphTahunan:      parseFloat(pphTahunan.toFixed(0)),
    pphBulanan:      parseFloat(pphBulanan.toFixed(0)),
    efektifRate:     parseFloat(((pphTahunan / penghasilanBruto) * 100).toFixed(2)),
  }
}

export function hitungInvestmentTax(
  dividenLokal: number,
  dividenAsing: number,
  bungaDeposito: number,
  keuntunganSaham: number,
  keuntunganReksadana: number
) {
  const pajakDividenLokal   = dividenLokal * 0.10
  const pajakDividenAsing   = dividenAsing * 0.20
  const pajakBunga          = bungaDeposito * 0.20
  const pajakSaham          = keuntunganSaham * 0.001  // PPh final 0.1% dari nilai jual
  const pajakReksadana      = 0  // Reksa dana saham bebas pajak saat redemption

  const totalPajak = pajakDividenLokal + pajakDividenAsing + pajakBunga + pajakSaham + pajakReksadana

  return {
    pajakDividenLokal:  parseFloat(pajakDividenLokal.toFixed(0)),
    pajakDividenAsing:  parseFloat(pajakDividenAsing.toFixed(0)),
    pajakBunga:         parseFloat(pajakBunga.toFixed(0)),
    pajakSaham:         parseFloat(pajakSaham.toFixed(0)),
    pajakReksadana,
    totalPajak:         parseFloat(totalPajak.toFixed(0)),
  }
}

export function hitungZakat(
  penghasilanBulanan: number,
  totalAset: number,
  totalUtang: number
) {
  const NISAB_EMAS     = 85    // gram emas
  const HARGA_EMAS     = 1_050_000  // per gram (2024, perkiraan)
  const nisabRp        = NISAB_EMAS * HARGA_EMAS

  const zakatPenghasilan    = penghasilanBulanan * 0.025
  const netAset             = totalAset - totalUtang
  const zakatMal            = netAset >= nisabRp ? netAset * 0.025 : 0
  const sudahNisab          = netAset >= nisabRp

  return {
    zakatPenghasilan:   parseFloat(zakatPenghasilan.toFixed(0)),
    zakatMal:           parseFloat(zakatMal.toFixed(0)),
    totalZakat:         parseFloat((zakatPenghasilan + zakatMal).toFixed(0)),
    nisabRp,
    sudahNisab,
  }
}

export function hitungUMKM(omzetTahunan: number) {
  const BATAS_OMZET   = 500_000_000
  const TARIF_PPH     = 0.005

  const sudahKenaPajak = omzetTahunan > 4_800_000_000
  const pphFinal       = omzetTahunan <= BATAS_OMZET ? 0 : omzetTahunan * TARIF_PPH
  const sisaOmzetBebas = Math.max(BATAS_OMZET - omzetTahunan, 0)
  const persenKeBatas  = (omzetTahunan / BATAS_OMZET) * 100

  return {
    pphFinal:         parseFloat(pphFinal.toFixed(0)),
    pphBulanan:       parseFloat((pphFinal / 12).toFixed(0)),
    sudahKenaPajak,
    sisaOmzetBebas:   parseFloat(sisaOmzetBebas.toFixed(0)),
    persenKeBatas:    parseFloat(Math.min(persenKeBatas, 100).toFixed(1)),
  }
}

export function hitungPPN(nilaiDPP: number, tarifPPN: number) {
  const ppn       = nilaiDPP * (tarifPPN / 100)
  const total     = nilaiDPP + ppn
  const dpphitung = total / (1 + tarifPPN / 100)

  return {
    ppn:      parseFloat(ppn.toFixed(0)),
    total:    parseFloat(total.toFixed(0)),
    dpp:      parseFloat(dpphitung.toFixed(0)),
  }
}

// ══════════════════════════════════════════════════
// INVESTASI (8 tools)
// ══════════════════════════════════════════════════

export function simulasiDCA(
  jumlahBulanan: number,
  returnTahunan: number,
  tahun: number
) {
  const returnBulanan = returnTahunan / 12 / 100
  const data: { bulan: number; tahun: number; setoran: number; nilai: number }[] = []
  let nilai = 0

  for (let b = 1; b <= tahun * 12; b++) {
    nilai = (nilai + jumlahBulanan) * (1 + returnBulanan)
    if (b % 12 === 0) {
      data.push({
        bulan:   b,
        tahun:   b / 12,
        setoran: jumlahBulanan * b,
        nilai:   parseFloat(nilai.toFixed(0)),
      })
    }
  }

  const totalSetoran  = jumlahBulanan * tahun * 12
  const nilaiAkhir    = nilai
  const totalReturn   = nilaiAkhir - totalSetoran
  const returnPercent = (totalReturn / totalSetoran) * 100

  return { data, totalSetoran, nilaiAkhir: parseFloat(nilaiAkhir.toFixed(0)), totalReturn: parseFloat(totalReturn.toFixed(0)), returnPercent: parseFloat(returnPercent.toFixed(1)) }
}

export function hitungSBN(
  nilaiInvestasi: number,
  kupTahunan: number,
  tenor: number,
  pajakBunga: number
) {
  const kupBruto      = nilaiInvestasi * (kupTahunan / 100)
  const pajak         = kupBruto * (pajakBunga / 100)
  const kupBersih     = kupBruto - pajak
  const totalBersih   = kupBersih * tenor
  const yieldBersih   = (kupBersih / nilaiInvestasi) * 100

  return {
    kupBruto:    parseFloat(kupBruto.toFixed(0)),
    pajak:       parseFloat(pajak.toFixed(0)),
    kupBersih:   parseFloat(kupBersih.toFixed(0)),
    totalBersih: parseFloat(totalBersih.toFixed(0)),
    yieldBersih: parseFloat(yieldBersih.toFixed(2)),
  }
}

export function hitungKupon(
  nilaiNominal: number,
  kuponRate: number,
  frekuensi: number,
  tahun: number
) {
  const kuponPerPeriode  = nilaiNominal * (kuponRate / 100) / frekuensi
  const kuponTahunan     = nilaiNominal * (kuponRate / 100)
  const totalKupon       = kuponTahunan * tahun
  const data             = Array.from({ length: tahun }, (_, i) => ({
    tahun: i + 1,
    kupon: parseFloat(kuponTahunan.toFixed(0)),
  }))

  return { kuponPerPeriode: parseFloat(kuponPerPeriode.toFixed(0)), kuponTahunan: parseFloat(kuponTahunan.toFixed(0)), totalKupon: parseFloat(totalKupon.toFixed(0)), data }
}

export function hitungBondYield(
  hargaBeli: number,
  nilaiPar: number,
  kuponRate: number,
  tahunJatuhTempo: number
) {
  const kuponTahunan   = nilaiPar * (kuponRate / 100)
  const currentYield   = (kuponTahunan / hargaBeli) * 100
  // YTM approximation
  const ytm            = (kuponTahunan + (nilaiPar - hargaBeli) / tahunJatuhTempo) / ((nilaiPar + hargaBeli) / 2) * 100
  const premium        = hargaBeli > nilaiPar ? 'premium' : hargaBeli < nilaiPar ? 'diskon' : 'par'

  return {
    kuponTahunan:  parseFloat(kuponTahunan.toFixed(0)),
    currentYield:  parseFloat(currentYield.toFixed(2)),
    ytm:           parseFloat(ytm.toFixed(2)),
    premium,
    selisih:       parseFloat((hargaBeli - nilaiPar).toFixed(0)),
  }
}

export function simulasiGoldDCA(
  jumlahBulanan: number,
  bulan: number,
  hargaEmasSekarang: number,
  targetHarga: number
) {
  const gramPerBulan   = jumlahBulanan / hargaEmasSekarang
  const totalGram      = gramPerBulan * bulan
  const nilaiSekarang  = totalGram * hargaEmasSekarang
  const nilaiTarget    = totalGram * targetHarga
  const totalSetoran   = jumlahBulanan * bulan
  const returnPersen   = ((nilaiTarget - totalSetoran) / totalSetoran) * 100

  return {
    gramPerBulan:    parseFloat(gramPerBulan.toFixed(4)),
    totalGram:       parseFloat(totalGram.toFixed(4)),
    nilaiSekarang:   parseFloat(nilaiSekarang.toFixed(0)),
    nilaiTarget:     parseFloat(nilaiTarget.toFixed(0)),
    totalSetoran,
    returnPersen:    parseFloat(returnPersen.toFixed(1)),
  }
}

export function hitungGoldVsInflasi(
  nilaiAwal: number,
  inflasiTahunan: number,
  returnEmas: number,
  tahun: number
) {
  const data = Array.from({ length: tahun }, (_, i) => {
    const t = i + 1
    return {
      tahun:       t,
      nilaiUang:   parseFloat((nilaiAwal * Math.pow(1 - inflasiTahunan / 100, t)).toFixed(0)),
      nilaiEmas:   parseFloat((nilaiAwal * Math.pow(1 + returnEmas / 100, t)).toFixed(0)),
    }
  })

  const nilaiUangAkhir = data[data.length - 1]?.nilaiUang ?? nilaiAwal
  const nilaiEmasAkhir = data[data.length - 1]?.nilaiEmas ?? nilaiAwal
  const selisih        = nilaiEmasAkhir - nilaiUangAkhir

  return { data, nilaiUangAkhir, nilaiEmasAkhir, selisih: parseFloat(selisih.toFixed(0)) }
}

export function proyeksiDividen(
  jumlahSaham: number,
  dividenPerSaham: number,
  pertumbuhanDividen: number,
  tahun: number
) {
  const data = Array.from({ length: tahun }, (_, i) => {
    const t           = i + 1
    const dividen     = dividenPerSaham * Math.pow(1 + pertumbuhanDividen / 100, t)
    const totalDividen = dividen * jumlahSaham
    return { tahun: t, dividenPerSaham: parseFloat(dividen.toFixed(0)), totalDividen: parseFloat(totalDividen.toFixed(0)) }
  })

  const totalKumulatif = data.reduce((sum, d) => sum + d.totalDividen, 0)
  const dividenTahun1  = data[0]?.totalDividen ?? 0

  return { data, totalKumulatif: parseFloat(totalKumulatif.toFixed(0)), dividenTahun1 }
}

export function simulasiDRIP(
  sahamAwal: number,
  hargaAwal: number,
  dividenYield: number,
  pertumbuhanHarga: number,
  tahun: number
) {
  const dataDengan: { tahun: number; saham: number; nilai: number }[] = []
  const dataTanpa:  { tahun: number; nilai: number }[]                = []

  let sahamDRIP   = sahamAwal
  let harga       = hargaAwal

  for (let t = 1; t <= tahun; t++) {
    harga         = harga * (1 + pertumbuhanHarga / 100)
    const dividen = sahamDRIP * harga * (dividenYield / 100)
    sahamDRIP     += dividen / harga
    dataDengan.push({ tahun: t, saham: parseFloat(sahamDRIP.toFixed(2)), nilai: parseFloat((sahamDRIP * harga).toFixed(0)) })
    dataTanpa.push({ tahun: t, nilai: parseFloat((sahamAwal * harga).toFixed(0)) })
  }

  const nilaiDenganDRIP = dataDengan[tahun - 1]?.nilai ?? 0
  const nilaiTanpaDRIP  = dataTanpa[tahun - 1]?.nilai ?? 0
  const selisih         = nilaiDenganDRIP - nilaiTanpaDRIP

  return { dataDengan, dataTanpa, nilaiDenganDRIP, nilaiTanpaDRIP, selisih: parseFloat(selisih.toFixed(0)) }
}

// ══════════════════════════════════════════════════
// PERSONAL FINANCE (8 tools)
// ══════════════════════════════════════════════════

export function hitungFIRE(
  pengeluaranTahunan: number,
  returnInvestasi: number,
  inflasi: number,
  tabunganAda: number,
  tabunganBulanan: number
) {
  const SAFE_WITHDRAWAL = 4
  const angkaFIRE       = pengeluaranTahunan * (100 / SAFE_WITHDRAWAL)
  const returnRiil      = returnInvestasi - inflasi
  const returnBulanan   = returnRiil / 12 / 100
  const kurang          = Math.max(angkaFIRE - tabunganAda, 0)

  let bulanMencapai = 0
  let nilai         = tabunganAda
  while (nilai < angkaFIRE && bulanMencapai < 600) {
    nilai = nilai * (1 + returnBulanan) + tabunganBulanan
    bulanMencapai++
  }

  const tahunMencapai = Math.ceil(bulanMencapai / 12)

  let status: 'sudah-fire' | 'dekat' | 'sedang' | 'jauh' = 'jauh'
  if (tabunganAda >= angkaFIRE)       status = 'sudah-fire'
  else if (tahunMencapai <= 5)        status = 'dekat'
  else if (tahunMencapai <= 15)       status = 'sedang'

  return { angkaFIRE: parseFloat(angkaFIRE.toFixed(0)), kurang: parseFloat(kurang.toFixed(0)), tahunMencapai, status }
}

export function hitungDanaDarurat(pengeluaranBulanan: number, bulanTarget: number) {
  const target         = pengeluaranBulanan * bulanTarget
  const rekomendasiMin = pengeluaranBulanan * 3
  const rekomendasiMax = pengeluaranBulanan * 12

  let status: 'minimal' | 'aman' | 'ideal' | 'berlebih' = 'aman'
  if (bulanTarget < 3)       status = 'minimal'
  else if (bulanTarget <= 6) status = 'aman'
  else if (bulanTarget <= 9) status = 'ideal'
  else                       status = 'berlebih'

  return { target: parseFloat(target.toFixed(0)), rekomendasiMin: parseFloat(rekomendasiMin.toFixed(0)), rekomendasiMax: parseFloat(rekomendasiMax.toFixed(0)), status }
}

export function proyeksiInflasi(nilaiSekarang: number, inflasi: number, tahun: number) {
  const data = Array.from({ length: tahun }, (_, i) => {
    const t = i + 1
    return {
      tahun:      t,
      nilaiRiil:  parseFloat((nilaiSekarang / Math.pow(1 + inflasi / 100, t)).toFixed(0)),
      dibutuhkan: parseFloat((nilaiSekarang * Math.pow(1 + inflasi / 100, t)).toFixed(0)),
    }
  })

  const nilaiRiilAkhir   = data[tahun - 1]?.nilaiRiil ?? nilaiSekarang
  const dibutuhkanAkhir  = data[tahun - 1]?.dibutuhkan ?? nilaiSekarang
  const daya_beli_turun  = ((nilaiSekarang - nilaiRiilAkhir) / nilaiSekarang) * 100

  return { data, nilaiRiilAkhir, dibutuhkanAkhir, dayaBeliTurun: parseFloat(daya_beli_turun.toFixed(1)) }
}

export function hitungBudget(
  penghasilan: number,
  kebutuhan: number,
  keinginan: number,
  tabungan: number
) {
  const total        = kebutuhan + keinginan + tabungan
  const sisa         = penghasilan - total
  const pctKebutuhan = (kebutuhan / penghasilan) * 100
  const pctKeinginan = (keinginan / penghasilan) * 100
  const pctTabungan  = (tabungan / penghasilan) * 100

  let status: 'ideal' | 'oke' | 'perlu-perbaikan' | 'defisit' = 'oke'
  if (sisa < 0)                  status = 'defisit'
  else if (pctTabungan >= 20 && pctKebutuhan <= 50) status = 'ideal'
  else if (pctTabungan < 10)     status = 'perlu-perbaikan'

  return {
    sisa:          parseFloat(sisa.toFixed(0)),
    pctKebutuhan:  parseFloat(pctKebutuhan.toFixed(1)),
    pctKeinginan:  parseFloat(pctKeinginan.toFixed(1)),
    pctTabungan:   parseFloat(pctTabungan.toFixed(1)),
    status,
  }
}

export function hitungDebtDestroyer(
  utangList: { nama: string; saldo: number; bunga: number; cicilan: number }[],
  metode: 'avalanche' | 'snowball'
) {
  const sorted = [...utangList].sort((a, b) =>
    metode === 'avalanche'
      ? b.bunga - a.bunga
      : a.saldo - b.saldo
  )

  let totalBunga  = 0
  let bulanTotal  = 0

  const hasil = sorted.map((u, idx) => {
    const bungaBulanan = u.bunga / 100 / 12
    const bulan        = idx === 0
      ? Math.ceil(Math.log(u.cicilan / (u.cicilan - u.saldo * bungaBulanan)) / Math.log(1 + bungaBulanan))
      : Math.ceil(Math.log(u.cicilan / (u.cicilan - u.saldo * bungaBulanan)) / Math.log(1 + bungaBulanan))
    const bungaTotal   = u.cicilan * bulan - u.saldo
    totalBunga         += bungaTotal
    bulanTotal          = Math.max(bulanTotal, bulan)
    return { ...u, urutan: idx + 1, bulanLunas: bulan, bungaTotal: parseFloat(bungaTotal.toFixed(0)) }
  })

  return { hasil, totalBunga: parseFloat(totalBunga.toFixed(0)), estimasiBulan: bulanTotal }
}

export function hitungNetWorth(
  asetLancar: number,
  asetInvestasi: number,
  asetTetap: number,
  utangJangkaPendek: number,
  utangJangkaPanjang: number
) {
  const totalAset        = asetLancar + asetInvestasi + asetTetap
  const totalLiabilitas  = utangJangkaPendek + utangJangkaPanjang
  const netWorth         = totalAset - totalLiabilitas
  const rasioUtang       = (totalLiabilitas / totalAset) * 100
  const rasioLikuiditas  = asetLancar / utangJangkaPendek

  let status: 'sangat-sehat' | 'sehat' | 'perhatian' | 'kritis' = 'sehat'
  if (rasioUtang > 70)           status = 'kritis'
  else if (rasioUtang > 50)      status = 'perhatian'
  else if (rasioUtang <= 30)     status = 'sangat-sehat'

  return {
    totalAset:        parseFloat(totalAset.toFixed(0)),
    totalLiabilitas:  parseFloat(totalLiabilitas.toFixed(0)),
    netWorth:         parseFloat(netWorth.toFixed(0)),
    rasioUtang:       parseFloat(rasioUtang.toFixed(1)),
    rasioLikuiditas:  parseFloat(rasioLikuiditas.toFixed(2)),
    status,
  }
}

export function simulasiTabungan(
  modalAwal: number,
  tabunganBulanan: number,
  returnTahunan: number,
  tahun: number
) {
  const returnBulanan = returnTahunan / 12 / 100
  const data: { tahun: number; setoran: number; nilai: number; bunga: number }[] = []
  let nilai = modalAwal

  for (let t = 1; t <= tahun; t++) {
    for (let b = 0; b < 12; b++) {
      nilai = (nilai + tabunganBulanan) * (1 + returnBulanan)
    }
    const setoran = modalAwal + tabunganBulanan * 12 * t
    data.push({ tahun: t, setoran: parseFloat(setoran.toFixed(0)), nilai: parseFloat(nilai.toFixed(0)), bunga: parseFloat((nilai - setoran).toFixed(0)) })
  }

  return { data, nilaiAkhir: data[tahun - 1]?.nilai ?? modalAwal }
}

export function hitungGoal(
  targetTabungan: number,
  tabunganAda: number,
  returnTahunan: number,
  bulanTarget: number
) {
  const returnBulanan  = returnTahunan / 12 / 100
  const kurang         = Math.max(targetTabungan - tabunganAda, 0)
  const tabunganBulanan = returnBulanan === 0
    ? kurang / bulanTarget
    : (kurang * returnBulanan) / (Math.pow(1 + returnBulanan, bulanTarget) - 1)

  const realistis = tabunganBulanan > 0 && isFinite(tabunganBulanan)

  return {
    tabunganBulanan: parseFloat(tabunganBulanan.toFixed(0)),
    kurang:          parseFloat(kurang.toFixed(0)),
    realistis,
  }
}

// ══════════════════════════════════════════════════
// KREDIT & PROPERTI (6 tools)
// ══════════════════════════════════════════════════

export function hitungLoanTrueCost(
  pinjaman: number,
  bungaTahunan: number,
  tenor: number,
  biayaAwal: number
) {
  const bungaBulanan      = bungaTahunan / 12 / 100
  const n                 = tenor * 12
  const cicilanAnuitas    = pinjaman * (bungaBulanan * Math.pow(1 + bungaBulanan, n)) / (Math.pow(1 + bungaBulanan, n) - 1)
  const totalBayarAnuitas = cicilanAnuitas * n + biayaAwal
  const totalBungaAnuitas = totalBayarAnuitas - pinjaman - biayaAwal
  const cicilanFlat       = pinjaman / n + pinjaman * bungaBulanan
  const totalBayarFlat    = cicilanFlat * n + biayaAwal
  const totalBungaFlat    = totalBayarFlat - pinjaman - biayaAwal

  return {
    cicilanAnuitas:     parseFloat(cicilanAnuitas.toFixed(0)),
    totalBayarAnuitas:  parseFloat(totalBayarAnuitas.toFixed(0)),
    totalBungaAnuitas:  parseFloat(totalBungaAnuitas.toFixed(0)),
    cicilanFlat:        parseFloat(cicilanFlat.toFixed(0)),
    totalBayarFlat:     parseFloat(totalBayarFlat.toFixed(0)),
    totalBungaFlat:     parseFloat(totalBungaFlat.toFixed(0)),
    selisih:            parseFloat((totalBungaFlat - totalBungaAnuitas).toFixed(0)),
  }
}

export function hitungRefinancing(
  sisaPokok: number,
  bungaLama: number,
  bungaBaru: number,
  biayaRefinancing: number,
  sisaTenorBulan: number
) {
  const bungaBulananLama = bungaLama / 12 / 100
  const bungaBulananBaru = bungaBaru / 12 / 100
  const n                = sisaTenorBulan

  const cicilanLama = sisaPokok * (bungaBulananLama * Math.pow(1 + bungaBulananLama, n)) / (Math.pow(1 + bungaBulananLama, n) - 1)
  const cicilanBaru = sisaPokok * (bungaBulananBaru * Math.pow(1 + bungaBulananBaru, n)) / (Math.pow(1 + bungaBulananBaru, n) - 1)
  const penghematan  = (cicilanLama - cicilanBaru) * n
  const netPenghematan = penghematan - biayaRefinancing
  const breakevenBulan = biayaRefinancing / (cicilanLama - cicilanBaru)

  const worthIt = netPenghematan > 0 && breakevenBulan < sisaTenorBulan

  return {
    cicilanLama:      parseFloat(cicilanLama.toFixed(0)),
    cicilanBaru:      parseFloat(cicilanBaru.toFixed(0)),
    hematPerBulan:    parseFloat((cicilanLama - cicilanBaru).toFixed(0)),
    netPenghematan:   parseFloat(netPenghematan.toFixed(0)),
    breakevenBulan:   parseFloat(breakevenBulan.toFixed(1)),
    worthIt,
  }
}

export function hitungBuyVsRent(
  hargaRumah: number,
  dpPersen: number,
  bungaKPR: number,
  tenorKPR: number,
  sewaBulanan: number,
  kenaikanSewa: number,
  kenaikanProperti: number,
  tahun: number
) {
  const dp              = hargaRumah * (dpPersen / 100)
  const pinjaman        = hargaRumah - dp
  const bungaBulanan    = bungaKPR / 12 / 100
  const n               = tenorKPR * 12
  const cicilan         = pinjaman * (bungaBulanan * Math.pow(1 + bungaBulanan, n)) / (Math.pow(1 + bungaBulanan, n) - 1)
  const totalKPR        = cicilan * n + dp
  const nilaiProperti   = hargaRumah * Math.pow(1 + kenaikanProperti / 100, tahun)

  let totalSewa = 0
  let sewa = sewaBulanan
  for (let t = 0; t < tahun; t++) {
    totalSewa += sewa * 12
    sewa *= (1 + kenaikanSewa / 100)
  }

  const keuntunganBeli = nilaiProperti - totalKPR
  const keuntunganSewa = 0  // sewa tidak ada ekuitas
  const rekomendasi    = keuntunganBeli > totalSewa ? 'beli' : 'sewa'

  return {
    cicilan:           parseFloat(cicilan.toFixed(0)),
    totalKPR:          parseFloat(totalKPR.toFixed(0)),
    totalSewa:         parseFloat(totalSewa.toFixed(0)),
    nilaiProperti:     parseFloat(nilaiProperti.toFixed(0)),
    keuntunganBeli:    parseFloat(keuntunganBeli.toFixed(0)),
    rekomendasi,
  }
}

export function hitungKPR(
  penghasilan: number,
  cicilanLain: number,
  bungaKPR: number,
  tenor: number,
  dpPersen: number
) {
  const MAX_DTI          = 0.35
  const maxCicilan       = penghasilan * MAX_DTI - cicilanLain
  const bungaBulanan     = bungaKPR / 12 / 100
  const n                = tenor * 12
  const maxPinjaman      = maxCicilan * (Math.pow(1 + bungaBulanan, n) - 1) / (bungaBulanan * Math.pow(1 + bungaBulanan, n))
  const maxHargaProperti = maxPinjaman / (1 - dpPersen / 100)
  const dpDibutuhkan     = maxHargaProperti * (dpPersen / 100)
  const dtiRatio         = parseFloat(((cicilanLain + maxCicilan) / penghasilan * 100).toFixed(1))

  let status: 'sehat' | 'perhatian' | 'berat' = 'sehat'
  if (dtiRatio > 40)       status = 'berat'
  else if (dtiRatio > 35)  status = 'perhatian'

  return {
    maxCicilanKPR:   parseFloat(maxCicilan.toFixed(0)),
    maxPinjaman:     parseFloat(maxPinjaman.toFixed(0)),
    maxHargaProperti: parseFloat(maxHargaProperti.toFixed(0)),
    dpDibutuhkan:    parseFloat(dpDibutuhkan.toFixed(0)),
    dtiRatio,
    status,
  }
}

export function hitungRentalYield(
  hargaProperti: number,
  sewaBulanan: number,
  biayaOperasionalTahunan: number
) {
  const sewaTahunan    = sewaBulanan * 12
  const grossYield     = (sewaTahunan / hargaProperti) * 100
  const netYield       = ((sewaTahunan - biayaOperasionalTahunan) / hargaProperti) * 100
  const paybackTahun   = hargaProperti / (sewaTahunan - biayaOperasionalTahunan)

  let status: 'sangat-baik' | 'baik' | 'cukup' | 'kurang' = 'cukup'
  if (netYield >= 8)       status = 'sangat-baik'
  else if (netYield >= 5)  status = 'baik'
  else if (netYield < 3)   status = 'kurang'

  return {
    sewaTahunan:  parseFloat(sewaTahunan.toFixed(0)),
    grossYield:   parseFloat(grossYield.toFixed(2)),
    netYield:     parseFloat(netYield.toFixed(2)),
    paybackTahun: parseFloat(paybackTahun.toFixed(1)),
    status,
  }
}

export function hitungPropertyInvestment(
  hargaBeli: number,
  dpPersen: number,
  sewaBulanan: number,
  kenaikanSewa: number,
  kenaikanProperti: number,
  biayaTahunan: number,
  tahun: number
) {
  const dp           = hargaBeli * (dpPersen / 100)
  const nilaiAkhir   = hargaBeli * Math.pow(1 + kenaikanProperti / 100, tahun)
  const kapitalGain  = nilaiAkhir - hargaBeli

  let totalCashflow = 0
  let sewa = sewaBulanan
  for (let t = 0; t < tahun; t++) {
    totalCashflow += sewa * 12 - biayaTahunan
    sewa *= (1 + kenaikanSewa / 100)
  }

  const totalReturn = kapitalGain + totalCashflow
  const roi         = (totalReturn / dp) * 100

  let status: 'sangat-baik' | 'baik' | 'cukup' | 'kurang' = 'cukup'
  if (roi >= 100)      status = 'sangat-baik'
  else if (roi >= 50)  status = 'baik'
  else if (roi < 20)   status = 'kurang'

  return {
    nilaiAkhir:    parseFloat(nilaiAkhir.toFixed(0)),
    kapitalGain:   parseFloat(kapitalGain.toFixed(0)),
    totalCashflow: parseFloat(totalCashflow.toFixed(0)),
    totalReturn:   parseFloat(totalReturn.toFixed(0)),
    roi:           parseFloat(roi.toFixed(1)),
    status,
  }
}

// ══════════════════════════════════════════════════
// SAHAM (3 tools)
// ══════════════════════════════════════════════════

export function hitungAveraging(
  pembelianList: { harga: number; lot: number }[]
) {
  const totalLot       = pembelianList.reduce((s, p) => s + p.lot, 0)
  const totalInvestasi = pembelianList.reduce((s, p) => s + p.harga * p.lot * 100, 0)
  const hargaRataRata  = totalInvestasi / (totalLot * 100)

  return {
    hargaRataRata: parseFloat(hargaRataRata.toFixed(0)),
    totalLot,
    totalInvestasi: parseFloat(totalInvestasi.toFixed(0)),
  }
}

export function hitungEntryPrice(
  hargaEntry: number,
  slPersen: number,
  tpPersen: number,
  modal: number,
  risikoPercent: number
) {
  const risikoRp     = modal * (risikoPercent / 100)
  const hargaSL      = hargaEntry * (1 - slPersen / 100)
  const hargaTP      = hargaEntry * (1 + tpPersen / 100)
  const selisihSL    = hargaEntry - hargaSL
  const lotOptimal   = Math.floor(risikoRp / (selisihSL * 100))
  const rrRatio      = tpPersen / slPersen

  let status: 'sangat-baik' | 'baik' | 'minimal' | 'buruk' = 'baik'
  if (rrRatio >= 3)       status = 'sangat-baik'
  else if (rrRatio >= 2)  status = 'baik'
  else if (rrRatio >= 1)  status = 'minimal'
  else                    status = 'buruk'

  return {
    hargaSL:    parseFloat(hargaSL.toFixed(0)),
    hargaTP:    parseFloat(hargaTP.toFixed(0)),
    lotOptimal,
    risikoRp:   parseFloat(risikoRp.toFixed(0)),
    rrRatio:    parseFloat(rrRatio.toFixed(2)),
    status,
  }
}

export function hitungBreakEven(
  hargaBeli: number,
  lot: number,
  feeBeliPersen: number,
  feeJualPersen: number
) {
  const lembar         = lot * 100
  const totalBeli      = hargaBeli * lembar
  const feeBeli        = totalBeli * (feeBeliPersen / 100)
  const totalModal     = totalBeli + feeBeli
  const hargaJualMin   = totalModal / lembar / (1 - feeJualPersen / 100)
  const kenaikanPersen = ((hargaJualMin - hargaBeli) / hargaBeli) * 100

  return {
    hargaJualMin:    parseFloat(hargaJualMin.toFixed(0)),
    kenaikanPersen:  parseFloat(kenaikanPersen.toFixed(2)),
    feeBeli:         parseFloat(feeBeli.toFixed(0)),
    totalModal:      parseFloat(totalModal.toFixed(0)),
  }
}

// ══════════════════════════════════════════════════
// KRIPTO (5 tools)
// ══════════════════════════════════════════════════

export function simulasiCryptoDCA(
  jumlahFiat: number,
  bulan: number,
  hargaSekarang: number,
  targetHarga: number
) {
  const koinPerBulan   = jumlahFiat / hargaSekarang
  const totalKoin      = koinPerBulan * bulan
  const totalFiat      = jumlahFiat * bulan
  const nilaiSekarang  = totalKoin * hargaSekarang
  const nilaiTarget    = totalKoin * targetHarga
  const returnPersen   = ((nilaiTarget - totalFiat) / totalFiat) * 100

  return {
    koinPerBulan:    parseFloat(koinPerBulan.toFixed(8)),
    totalKoin:       parseFloat(totalKoin.toFixed(8)),
    totalFiat,
    nilaiSekarang:   parseFloat(nilaiSekarang.toFixed(0)),
    nilaiTarget:     parseFloat(nilaiTarget.toFixed(0)),
    returnPersen:    parseFloat(returnPersen.toFixed(1)),
  }
}

export function proyeksiStaking(
  jumlahKoin: number,
  aprPersen: number,
  compound: boolean,
  bulan: number
) {
  const aprBulanan = aprPersen / 12 / 100
  let koinAkhir    = jumlahKoin

  if (compound) {
    koinAkhir = jumlahKoin * Math.pow(1 + aprBulanan, bulan)
  } else {
    koinAkhir = jumlahKoin + jumlahKoin * aprBulanan * bulan
  }

  const reward     = koinAkhir - jumlahKoin
  const aprEfektif = compound ? (Math.pow(1 + aprPersen / 100 / 12, 12) - 1) * 100 : aprPersen

  return {
    koinAkhir:   parseFloat(koinAkhir.toFixed(8)),
    reward:      parseFloat(reward.toFixed(8)),
    aprEfektif:  parseFloat(aprEfektif.toFixed(2)),
  }
}

export function hitungCryptoRisk(
  modal: number,
  risikoPercent: number,
  hargaEntry: number,
  slPersen: number
) {
  const risikoRp      = modal * (risikoPercent / 100)
  const hargaSL       = hargaEntry * (1 - slPersen / 100)
  const selisih       = hargaEntry - hargaSL
  const ukuranPosisi  = risikoRp / selisih
  const nilaiPosisi   = ukuranPosisi * hargaEntry

  let status: 'konservatif' | 'moderat' | 'agresif' | 'berbahaya' = 'moderat'
  if (risikoPercent <= 1)       status = 'konservatif'
  else if (risikoPercent <= 2)  status = 'moderat'
  else if (risikoPercent <= 5)  status = 'agresif'
  else                          status = 'berbahaya'

  return {
    risikoRp:     parseFloat(risikoRp.toFixed(0)),
    hargaSL:      parseFloat(hargaSL.toFixed(2)),
    ukuranPosisi: parseFloat(ukuranPosisi.toFixed(8)),
    nilaiPosisi:  parseFloat(nilaiPosisi.toFixed(0)),
    status,
  }
}

export function hitungLikuidasi(
  hargaEntry: number,
  leverage: number,
  jenis: 'long' | 'short',
  maintenanceMargin: number
) {
  const mmRate = maintenanceMargin / 100
  const hargaLikuidasi = jenis === 'long'
    ? hargaEntry * (1 - 1 / leverage + mmRate)
    : hargaEntry * (1 + 1 / leverage - mmRate)

  const jarakPersen = Math.abs((hargaLikuidasi - hargaEntry) / hargaEntry) * 100

  let risiko: 'rendah' | 'sedang' | 'tinggi' | 'sangat-tinggi' = 'rendah'
  if (jarakPersen < 5)       risiko = 'sangat-tinggi'
  else if (jarakPersen < 10) risiko = 'tinggi'
  else if (jarakPersen < 20) risiko = 'sedang'

  return {
    hargaLikuidasi: parseFloat(hargaLikuidasi.toFixed(2)),
    jarakPersen:    parseFloat(jarakPersen.toFixed(2)),
    risiko,
  }
}

export function hitungFundingRate(
  ukuranPosisi: number,
  fundingRatePersen: number,
  periode: number
) {
  const biayaPerPeriode = ukuranPosisi * (fundingRatePersen / 100)
  const biayaHarian     = biayaPerPeriode * 3   // 3x per hari (8 jam sekali)
  const biayaBulanan    = biayaHarian * 30
  const biayaTahunan    = biayaBulanan * 12
  const breakEvenHari   = ukuranPosisi / biayaHarian

  let status: 'murah' | 'wajar' | 'mahal' | 'sangat-mahal' = 'wajar'
  if (Math.abs(fundingRatePersen) <= 0.01)      status = 'murah'
  else if (Math.abs(fundingRatePersen) <= 0.05) status = 'wajar'
  else if (Math.abs(fundingRatePersen) <= 0.1)  status = 'mahal'
  else                                          status = 'sangat-mahal'

  return {
    biayaPerPeriode: parseFloat(biayaPerPeriode.toFixed(2)),
    biayaHarian:     parseFloat(biayaHarian.toFixed(2)),
    biayaBulanan:    parseFloat(biayaBulanan.toFixed(2)),
    biayaTahunan:    parseFloat(biayaTahunan.toFixed(2)),
    breakEvenHari:   parseFloat(breakEvenHari.toFixed(1)),
    status,
  }
}

// ══════════════════════════════════════════════════
// HASIL ANALISA — Logika Interpretasi
// ══════════════════════════════════════════════════

import type { HasilAnalisis } from './types'

export function analisaKPR(
  penghasilan: number,
  cicilanLain: number,
  bunga: number,
  tenor: number,
  dp: number,
  dti: number,
  maxHarga: number
): HasilAnalisis {
  const cicilanRatio = (cicilanLain / penghasilan) * 100
  const dpRendah     = dp < 15
  const bungaTinggi  = bunga > 11
  const tenorPanjang = tenor >= 25

  if (dti > 40 && cicilanRatio > 20) return {
    level: 'buruk',
    diagnosa: 'Kapasitas KPR sangat terbatas — beban utang yang ada sudah terlalu besar.',
    penjelasan: `Total cicilan yang sudah ada memakan ${cicilanRatio.toFixed(0)}% dari penghasilan. Bank akan sangat ketat dengan kondisi ini karena DTI sudah melebihi 40%.`,
    rekomendasi: ['Lunasi sebagian utang yang ada sebelum mengajukan KPR', 'Target DTI total di bawah 35% terlebih dahulu', 'Pertimbangkan menambah penghasilan untuk meningkatkan kapasitas cicilan'],
  }

  if (dti > 40) return {
    level: 'buruk',
    diagnosa: 'Penghasilan saat ini belum cukup untuk properti di kisaran harga ini.',
    penjelasan: `Kemampuan cicilan KPR maksimalmu sudah terlampaui. DTI di atas 40% akan membuat bank menolak atau memberikan plafon lebih kecil.`,
    rekomendasi: [`Pertimbangkan properti dengan harga lebih rendah — maksimum Rp ${(maxHarga / 1_000_000).toFixed(0)} juta`, 'Tambah down payment untuk mengurangi pokok pinjaman', 'Cari KPR subsidi FLPP jika memenuhi syarat — bunga hanya 5%/tahun'],
  }

  if (dti > 35) {
    const rek = ['Pastikan ada dana darurat minimal 6 bulan sebelum ambil KPR', 'Hindari utang baru apapun selama cicilan KPR aktif']
    if (dpRendah) rek.push('Tambah DP untuk mengurangi cicilan — setiap 5% tambahan sangat signifikan')
    if (bungaTinggi) rek.push(`Negosiasi bunga atau bandingkan penawaran lain — bunga ${bunga}% tergolong tinggi`)
    if (tenorPanjang) rek.push('Pertimbangkan tenor lebih pendek jika cicilan masih terjangkau')
    return { level: 'perhatian', diagnosa: 'Masih bisa mengajukan KPR, tapi ruangnya tipis — perlu perencanaan ketat.', penjelasan: `DTI ${dti.toFixed(0)}% berarti cicilan mengambil porsi besar dari penghasilan. Tidak ada ruang untuk pengeluaran tak terduga.`, rekomendasi: rek }
  }

  if (dti < 25) return {
    level: 'baik',
    diagnosa: 'Posisi finansial sangat kuat untuk mengajukan KPR.',
    penjelasan: `DTI hanya ${dti.toFixed(0)}% menunjukkan kemampuan bayar jauh di atas rata-rata. Bank akan welcome dengan profil ini.`,
    rekomendasi: ['Gunakan posisi kuat ini untuk negosiasi bunga dengan bank', 'Pertimbangkan tenor lebih pendek untuk menghemat total bunga', 'Bandingkan penawaran 3–5 bank untuk kondisi terbaik'],
  }

  return {
    level: 'baik',
    diagnosa: 'Kondisi finansial sehat — pengajuan KPR bisa dilanjutkan dengan percaya diri.',
    penjelasan: `DTI ${dti.toFixed(0)}% masih dalam batas aman yang direkomendasikan. Bank kemungkinan besar akan menyetujui.`,
    rekomendasi: ['Siapkan dokumen KPR: KTP, KK, slip gaji 3 bulan, rekening koran, NPWP', 'Bandingkan minimal 3 bank untuk penawaran terbaik', 'Perhatikan bunga fixed vs floating dan siapkan skenario kenaikan bunga'],
  }
}
