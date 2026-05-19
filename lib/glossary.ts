/**
 * FincTools v2 — Glossary Database
 * Kamus istilah keuangan & investasi Indonesia
 */

import type { GlossaryItem } from './types'

export const glossaryDatabase: GlossaryItem[] = [
  // A
  { term: 'ATR (Average True Range)', slug: 'atr', kategori: 'Trading', definisi: 'Indikator volatilitas yang mengukur rata-rata pergerakan harga dalam periode tertentu.', penjelasan: 'ATR dihitung sebagai rata-rata dari True Range selama N periode (biasanya 14). True Range adalah nilai terbesar dari: (High - Low), |High - Close sebelumnya|, atau |Low - Close sebelumnya|. ATR digunakan untuk menentukan stop loss berbasis volatilitas.', relatedTools: ['trading/stop-loss-optimizer'] },

  // B
  { term: 'Bear Market', slug: 'bear-market', kategori: 'Pasar Modal', definisi: 'Kondisi pasar di mana harga aset turun 20% atau lebih dari puncak tertingginya.', penjelasan: 'Bear market ditandai dengan sentimen negatif, penurunan harga berkepanjangan, dan volume jual yang tinggi. Berlawanan dengan bull market. Di bursa saham Indonesia, bear market sering dipicu oleh sentimen global, perlambatan ekonomi, atau krisis keuangan.', relatedTools: ['trading/drawdown-recovery-planner'] },

  { term: 'Break-Even Point', slug: 'break-even-point', kategori: 'Trading & Investasi', definisi: 'Titik di mana total biaya sama dengan total pendapatan — tidak ada keuntungan maupun kerugian.', penjelasan: 'Dalam konteks saham, break-even point adalah harga jual minimum agar tidak rugi setelah memperhitungkan harga beli dan semua biaya transaksi (fee beli + fee jual + pajak). Penting untuk diketahui sebelum menetapkan target take profit.', relatedTools: ['saham/break-even-analyzer'] },

  { term: 'Bull Market', slug: 'bull-market', kategori: 'Pasar Modal', definisi: 'Kondisi pasar di mana harga aset naik 20% atau lebih dari titik terendahnya.', penjelasan: 'Bull market ditandai dengan optimisme investor, pertumbuhan ekonomi, dan tren harga yang meningkat. Di pasar modal Indonesia, bull market sering dipicu oleh pertumbuhan ekonomi yang kuat, penurunan suku bunga, atau aliran modal asing masuk.', relatedTools: [] },

  // C
  { term: 'Cap Rate (Capitalization Rate)', slug: 'cap-rate', kategori: 'Properti', definisi: 'Rasio pendapatan operasi bersih terhadap nilai properti, digunakan untuk menilai kelayakan investasi properti.', penjelasan: 'Cap Rate = Net Operating Income / Nilai Properti × 100%. Cap rate 7% berarti properti menghasilkan 7% dari nilainya dalam pendapatan bersih per tahun. Semakin tinggi cap rate, semakin cepat balik modal dari properti tersebut.', relatedTools: ['kredit-properti/property-investment-analyzer', 'kredit-properti/rental-yield-analyzer'] },

  { term: 'Compound Interest (Bunga Majemuk)', slug: 'compound-interest', kategori: 'Investasi', definisi: 'Bunga yang dihitung atas pokok plus bunga yang telah terakumulasi sebelumnya.', penjelasan: 'Bunga majemuk adalah "bunga atas bunga" — keuntungan yang sudah diperoleh ikut menghasilkan keuntungan baru. Ini adalah mekanisme di balik pertumbuhan eksponensial investasi jangka panjang. Albert Einstein (menurut legenda) menyebutnya sebagai keajaiban dunia ke-8.', relatedTools: ['investasi/dca-simulator', 'personal-finance/savings-growth-simulator'] },

  { term: 'Current Yield', slug: 'current-yield', kategori: 'Obligasi', definisi: 'Perbandingan kupon tahunan obligasi dengan harga pasarnya saat ini.', penjelasan: 'Current Yield = (Kupon Tahunan / Harga Pasar) × 100%. Berbeda dari YTM yang memperhitungkan juga selisih harga beli dan nilai nominal saat jatuh tempo. Current yield lebih sederhana tapi kurang akurat untuk perbandingan antar obligasi.', relatedTools: ['investasi/bond-yield-analyzer'] },

  // D
  { term: 'DCA (Dollar Cost Averaging)', slug: 'dca', kategori: 'Strategi Investasi', definisi: 'Strategi investasi dengan menyetorkan jumlah uang yang sama secara rutin terlepas kondisi pasar.', penjelasan: 'DCA mengeliminasi kebutuhan market timing. Saat harga turun, investor membeli lebih banyak unit dengan uang yang sama. Saat harga naik, membeli lebih sedikit. Hasilnya adalah harga rata-rata beli yang lebih rendah dari rata-rata harga pasar dalam jangka panjang.', relatedTools: ['investasi/dca-simulator', 'kripto/crypto-dca-simulator', 'investasi/gold-dca-simulator'] },

  { term: 'Debt-to-Equity Ratio (DER)', slug: 'der', kategori: 'Analisa Saham', definisi: 'Rasio yang membandingkan total utang perusahaan dengan ekuitas pemegang saham.', penjelasan: 'DER = Total Utang / Total Ekuitas. DER tinggi menunjukkan perusahaan banyak menggunakan utang (leverage). Ideal: DER < 1 untuk industri umum. Beberapa industri seperti perbankan secara alami memiliki DER yang tinggi dan perlu dibandingkan dengan rata-rata industri.', relatedTools: [] },

  { term: 'Dividen', slug: 'dividen', kategori: 'Saham', definisi: 'Bagian dari keuntungan perusahaan yang dibagikan kepada pemegang saham.', penjelasan: 'Dividen dibayarkan secara berkala (biasanya tahunan atau semester) berdasarkan keputusan RUPS. Di Indonesia, dividen saham dikenakan PPh final 10%. Dividend yield adalah persentase dividen terhadap harga saham — semakin tinggi yield, semakin menarik sebagai sumber passive income.', relatedTools: ['investasi/dividend-income-projector', 'investasi/drip-simulator'] },

  { term: 'Drawdown', slug: 'drawdown', kategori: 'Trading & Investasi', definisi: 'Penurunan nilai portofolio atau akun dari titik tertinggi ke titik terendah dalam periode tertentu.', penjelasan: 'Drawdown dihitung sebagai persentase: (Peak Value - Trough Value) / Peak Value × 100%. Contoh: portofolio puncak Rp 100 juta turun ke Rp 75 juta = drawdown 25%. Semakin besar drawdown, semakin besar return yang dibutuhkan untuk recovery (drawdown 50% butuh return 100% untuk balik modal).', relatedTools: ['trading/drawdown-recovery-planner', 'trading/max-loss-guardian'] },

  { term: 'DRIP (Dividend Reinvestment Plan)', slug: 'drip', kategori: 'Strategi Investasi', definisi: 'Strategi menginvestasikan kembali seluruh dividen yang diterima untuk membeli saham tambahan.', penjelasan: 'DRIP memanfaatkan compound interest secara maksimal. Dividen yang direinvestasikan menghasilkan saham lebih banyak, yang menghasilkan dividen lebih banyak, dan seterusnya. Dalam 20–30 tahun, efeknya bisa sangat dramatis dibanding tidak reinvestasi.', relatedTools: ['investasi/drip-simulator'] },

  { term: 'DTI (Debt-to-Income Ratio)', slug: 'dti', kategori: 'Kredit & KPR', definisi: 'Perbandingan total cicilan bulanan dengan penghasilan bersih bulanan.', penjelasan: 'DTI = Total Cicilan Bulanan / Penghasilan Bersih × 100%. Bank Indonesia dan perbankan umumnya menggunakan DTI maksimal 35% sebagai batas aman pengajuan KPR. DTI di atas 40% biasanya membuat bank menolak pengajuan kredit.', relatedTools: ['kredit-properti/kpr-affordability-checker', 'kredit-properti/loan-true-cost-analyzer'] },

  // E
  { term: 'Expectancy (Trading)', slug: 'expectancy', kategori: 'Trading', definisi: 'Rata-rata keuntungan atau kerugian yang diharapkan per trade berdasarkan histori trading.', penjelasan: 'Expectancy = (Win Rate × Avg Win) - (Loss Rate × Avg Loss). Expectancy positif berarti sistem trading profitable jangka panjang. Ini adalah metrik terpenting untuk mengevaluasi strategi trading — lebih bermakna dari win rate saja.', relatedTools: ['trading/win-rate-expectancy-tracker', 'trading/trading-performance-analyzer'] },

  // F
  { term: 'FIRE (Financial Independence, Retire Early)', slug: 'fire', kategori: 'Personal Finance', definisi: 'Gerakan keuangan yang bertujuan mencapai kebebasan finansial dan kemampuan pensiun jauh sebelum usia konvensional.', penjelasan: 'FIRE Number dihitung dengan aturan 4%: total investasi yang dibutuhkan = pengeluaran tahunan / 4%. Dengan portofolio sebesar ini, kamu bisa menarik 4% per tahun selamanya berdasarkan data historis 30 tahun (Trinity Study 1998).', relatedTools: ['personal-finance/wealth-freedom-planner'] },

  { term: 'Funding Rate', slug: 'funding-rate', kategori: 'Kripto', definisi: 'Biaya berkala yang dibayarkan antara posisi long dan short dalam perpetual futures kripto.', penjelasan: 'Funding rate menjaga harga perpetual futures mendekati harga spot. Saat bullish (lebih banyak long), funding positif — long membayar short. Saat bearish, funding negatif — short membayar long. Dikumpulkan setiap 8 jam di sebagian besar exchange.', relatedTools: ['kripto/funding-rate-cost-estimator'] },

  // G
  { term: 'Gross Yield', slug: 'gross-yield', kategori: 'Properti', definisi: 'Persentase pendapatan sewa tahunan terhadap harga properti sebelum dikurangi biaya.', penjelasan: 'Gross Yield = (Sewa Tahunan / Harga Properti) × 100%. Berbeda dari Net Yield yang sudah dikurangi biaya operasional. Gross yield 8% ke atas dianggap sangat baik untuk properti di Indonesia. Properti dengan gross yield di bawah 3–4% perlu pertimbangan ulang.', relatedTools: ['kredit-properti/rental-yield-analyzer'] },

  // I
  { term: 'Inflasi', slug: 'inflasi', kategori: 'Ekonomi', definisi: 'Kenaikan harga barang dan jasa secara umum dan berkelanjutan dalam suatu perekonomian.', penjelasan: 'Bank Indonesia menargetkan inflasi 2–4% per tahun. Inflasi rendah dan stabil mendukung pertumbuhan ekonomi. Inflasi terlalu tinggi menggerus daya beli dan nilai tabungan. Inflasi terlalu rendah bisa menandakan deflasi yang juga berbahaya.', relatedTools: ['personal-finance/inflation-guard', 'investasi/gold-vs-inflation-analyzer'] },

  // K
  { term: 'Kelly Criterion', slug: 'kelly-criterion', kategori: 'Trading', definisi: 'Formula matematis untuk menghitung persentase modal optimal yang dipertaruhkan per trade.', penjelasan: 'Kelly % = (W × b - (1-W)) / b, di mana W = win rate, b = R/R ratio. Dalam praktiknya, trader menggunakan Half Kelly (50% dari Kelly penuh) untuk mengurangi drawdown. Full Kelly optimal secara matematis tapi menghasilkan drawdown yang sangat parah.', relatedTools: ['trading/kelly-criterion-optimizer'] },

  { term: 'KPR (Kredit Pemilikan Rumah)', slug: 'kpr', kategori: 'Kredit', definisi: 'Produk pinjaman dari bank untuk membiayai pembelian rumah atau properti residensial.', penjelasan: 'KPR di Indonesia umumnya menggunakan bunga fixed 1–5 tahun pertama kemudian floating mengikuti suku bunga pasar. DTI maksimal 35% adalah syarat umum. Program KPR subsidi FLPP menawarkan bunga 5% per tahun untuk MBR.', relatedTools: ['kredit-properti/kpr-affordability-checker', 'kredit-properti/refinancing-decision-tool'] },

  // L
  { term: 'Leverage', slug: 'leverage', kategori: 'Trading', definisi: 'Penggunaan modal pinjaman untuk memperbesar ukuran posisi trading melebihi modal yang dimiliki.', penjelasan: 'Leverage 1:100 berarti dengan modal Rp 1 juta, kamu bisa membuka posisi senilai Rp 100 juta. Leverage memperbesar profit DAN loss secara proporsional. Leverage tinggi dalam kripto sangat berbahaya karena volatilitas yang ekstrem.', relatedTools: ['trading/margin-leverage-guard', 'kripto/liquidation-price-analyzer'] },

  { term: 'Liquidasi (Kripto)', slug: 'liquidasi', kategori: 'Kripto', definisi: 'Penutupan paksa posisi leverage oleh exchange saat nilai posisi mendekati batas maintenance margin.', penjelasan: 'Liquidasi terjadi saat dana di akun tidak cukup lagi untuk menanggung kerugian posisi leverage yang sedang berjalan. Exchange menutup posisi secara paksa untuk mencegah saldo negatif. Leverage 10x berarti harga hanya perlu bergerak 10% melawan posisi untuk likuidasi.', relatedTools: ['kripto/liquidation-price-analyzer', 'kripto/crypto-risk-manager'] },

  { term: 'LTV (Loan-to-Value)', slug: 'ltv', kategori: 'KPR', definisi: 'Rasio antara jumlah pinjaman dan nilai properti yang dijaminkan.', penjelasan: 'LTV 80% berarti pinjaman maksimal 80% dari nilai properti, dan minimum DP 20%. Bank Indonesia mengatur batas maksimum LTV untuk KPR guna menjaga stabilitas sistem keuangan. LTV lebih rendah berarti risiko kredit lebih rendah bagi bank.', relatedTools: ['kredit-properti/kpr-affordability-checker'] },

  // M
  { term: 'Margin Call', slug: 'margin-call', kategori: 'Trading', definisi: 'Permintaan dari broker kepada trader untuk menambah dana karena margin level telah jatuh di bawah batas minimum.', penjelasan: 'Margin call terjadi saat equity akun trading mendekati atau menyentuh level minimum yang ditentukan broker (biasanya 100% dari required margin). Jika tidak segera ditambahi, broker akan menutup posisi secara paksa (stop out).', relatedTools: ['trading/margin-leverage-guard'] },

  // N
  { term: 'Net Worth (Kekayaan Bersih)', slug: 'net-worth', kategori: 'Personal Finance', definisi: 'Total nilai semua aset yang dimiliki dikurangi total liabilitas (utang) yang dimiliki.', penjelasan: 'Net Worth = Total Aset - Total Liabilitas. Metrik ini memberikan gambaran utuh kondisi finansial seseorang. Net worth positif berarti aset lebih besar dari utang. Net worth negatif berarti utang melebihi aset — situasi yang perlu segera diperbaiki.', relatedTools: ['personal-finance/net-worth-tracker'] },

  { term: 'Nisab', slug: 'nisab', kategori: 'Pajak & Zakat', definisi: 'Batas minimum harta yang wajib dizakati dalam Islam.', penjelasan: 'Nisab zakat mal setara 85 gram emas. Jika total harta (tabungan, investasi, emas) bersih setelah utang mencapai nisab dan sudah dimiliki selama 1 tahun (haul), wajib mengeluarkan zakat 2.5%. Nisab zakat penghasilan setara 520 kg beras atau 85 gram emas per tahun.', relatedTools: ['pajak/zakat-tax-planner'] },

  // P
  { term: 'Payout Ratio', slug: 'payout-ratio', kategori: 'Saham', definisi: 'Persentase laba bersih perusahaan yang dibagikan sebagai dividen kepada pemegang saham.', penjelasan: 'Payout Ratio = Dividen per Saham / EPS × 100%. Payout ratio 40–70% dianggap sehat — cukup untuk memberikan dividen menarik sekaligus menyisakan dana untuk pertumbuhan bisnis. Payout ratio di atas 100% tidak berkelanjutan karena membayar dividen dari selain laba.', relatedTools: ['investasi/dividend-income-projector'] },

  { term: 'PBV (Price-to-Book Value)', slug: 'pbv', kategori: 'Analisa Saham', definisi: 'Rasio harga saham terhadap nilai buku per saham (total ekuitas / jumlah saham beredar).', penjelasan: 'PBV = Harga Saham / Nilai Buku per Saham. PBV < 1 menunjukkan saham diperdagangkan di bawah nilai aset bersihnya — bisa menjadi sinyal undervalued. Namun PBV rendah juga bisa berarti masalah fundamental. Selalu analisa bersama rasio lain.', relatedTools: [] },

  { term: 'PER (Price-to-Earnings Ratio)', slug: 'per', kategori: 'Analisa Saham', definisi: 'Rasio harga saham terhadap laba per saham (EPS) — ukuran seberapa mahal saham relatif terhadap labanya.', penjelasan: 'PER = Harga Saham / EPS. PER tinggi bisa berarti saham mahal atau investor optimis terhadap pertumbuhan masa depan. PER rendah bisa berarti murah atau ada masalah fundamental. Selalu bandingkan dengan rata-rata industri dan historis perusahaan.', relatedTools: [] },

  { term: 'Pip', slug: 'pip', kategori: 'Trading Forex', definisi: 'Unit pergerakan harga terkecil dalam pasangan mata uang forex.', penjelasan: 'Untuk pasangan dengan 4 desimal (EUR/USD), 1 pip = 0.0001. Untuk JPY (2 desimal), 1 pip = 0.01. Nilai pip dalam Rupiah bergantung pada ukuran lot dan pasangan mata uang yang diperdagangkan.', relatedTools: ['trading/pip-profit-analyzer', 'trading/risk-manager'] },

  { term: 'PKP (Penghasilan Kena Pajak)', slug: 'pkp', kategori: 'Pajak', definisi: 'Penghasilan yang menjadi dasar penghitungan PPh 21, yaitu penghasilan neto dikurangi PTKP.', penjelasan: 'PKP = Penghasilan Neto Tahunan - PTKP. Semakin kecil PKP, semakin kecil pajak yang harus dibayar. Itulah mengapa PTKP yang lebih tinggi (dari status kawin dan tanggungan) mengurangi beban pajak secara signifikan.', relatedTools: ['pajak/tax-optimizer-pph21'] },

  { term: 'Position Sizing', slug: 'position-sizing', kategori: 'Trading', definisi: 'Penentuan ukuran posisi (jumlah lot/saham) yang tepat berdasarkan modal dan risiko yang ditoleransi.', penjelasan: 'Position sizing yang benar memastikan bahwa satu trade yang rugi tidak menghancurkan keseluruhan portofolio. Formula dasar: Modal Berisiko = Modal × % Risiko. Lot = Modal Berisiko / (Stop Loss × Pip Value). Ini adalah inti dari money management profesional.', relatedTools: ['trading/risk-manager', 'saham/entry-price-optimizer'] },

  { term: 'PPh 21', slug: 'pph-21', kategori: 'Pajak', definisi: 'Pajak penghasilan atas gaji, upah, honorarium, dan penghasilan sejenisnya yang dipotong pemberi kerja.', penjelasan: 'PPh 21 dihitung menggunakan tarif progresif berdasarkan UU HPP 2021: 5% hingga 35%. Dipotong langsung oleh pemberi kerja setiap bulan dan disetorkan ke kas negara. Karyawan menerima bukti potong 1721-A1 setiap tahun untuk SPT.', relatedTools: ['pajak/tax-optimizer-pph21', 'pajak/thr-tax-planner'] },

  { term: 'PTKP (Penghasilan Tidak Kena Pajak)', slug: 'ptkp', kategori: 'Pajak', definisi: 'Batas penghasilan yang dibebaskan dari PPh 21, bergantung pada status pernikahan dan tanggungan.', penjelasan: 'PTKP 2024: TK/0 = Rp 54 juta, K/0 = Rp 58,5 juta, K/1 = Rp 63 juta, K/2 = Rp 67,5 juta, K/3 = Rp 72 juta per tahun. Semakin tinggi PTKP, semakin kecil PKP dan pajak yang harus dibayar.', relatedTools: ['pajak/tax-optimizer-pph21'] },

  // R
  { term: 'R/R Ratio (Risk/Reward)', slug: 'rr-ratio', kategori: 'Trading', definisi: 'Perbandingan antara potensi keuntungan dan potensi kerugian dalam satu trade.', penjelasan: 'R/R 1:2 berarti untuk setiap Rp 1 yang dirisikoan, potensi keuntungannya Rp 2. Standar minimum yang disarankan adalah 1:2. Dengan R/R 1:2, sistem bisa profitable meski win rate hanya 34%. R/R di bawah 1:1 tidak ekonomis secara jangka panjang.', relatedTools: ['trading/trade-analyzer', 'trading/risk-manager'] },

  { term: 'Return on Equity (ROE)', slug: 'roe', kategori: 'Analisa Saham', definisi: 'Persentase laba bersih perusahaan relatif terhadap total ekuitas pemegang saham.', penjelasan: 'ROE = Laba Bersih / Total Ekuitas × 100%. ROE > 15% dianggap baik untuk sebagian besar industri. ROE yang tinggi dan konsisten menunjukkan manajemen efisien dalam menggunakan modal pemegang saham. ROE sangat bervariasi antar industri.', relatedTools: [] },

  { term: 'Reksa Dana', slug: 'reksa-dana', kategori: 'Investasi', definisi: 'Wadah investasi kolektif di mana dana dari banyak investor dikelola bersama oleh Manajer Investasi.', penjelasan: 'Reksa dana memungkinkan investor kecil mengakses portofolio yang terdiversifikasi dengan modal minimal. Jenis utama: pasar uang (risiko rendah), pendapatan tetap, campuran, dan saham (risiko tinggi). Diawasi OJK dan NAB dilaporkan harian.', relatedTools: ['investasi/dca-simulator'] },

  // S
  { term: 'SBN (Surat Berharga Negara)', slug: 'sbn', kategori: 'Investasi', definisi: 'Surat utang yang diterbitkan pemerintah Indonesia untuk membiayai anggaran negara.', penjelasan: 'SBN ritel tersedia untuk investor individu: ORI (Obligasi Ritel Indonesia), SBR (Savings Bond Ritel), SR (Sukuk Ritel), dan ST (Sukuk Tabungan). Dijamin penuh oleh pemerintah Indonesia tanpa batas nominal. Minimum investasi Rp 1 juta.', relatedTools: ['investasi/sbn-maturity-planner', 'investasi/bond-yield-analyzer'] },

  { term: 'Staking', slug: 'staking', kategori: 'Kripto', definisi: 'Proses mengunci koin kripto dalam jaringan blockchain Proof of Stake untuk membantu validasi transaksi dan mendapat reward.', penjelasan: 'Staking adalah cara mendapat passive income dari kripto. APY bervariasi dari 3–20%+ tergantung koin dan platform. Risiko utama: harga koin bisa turun lebih cepat dari reward yang terkumpul.', relatedTools: ['kripto/staking-reward-projector'] },

  { term: 'Stop Loss', slug: 'stop-loss', kategori: 'Trading', definisi: 'Order otomatis untuk menutup posisi saat harga mencapai level kerugian yang telah ditentukan.', penjelasan: 'Stop loss adalah mekanisme perlindungan modal yang wajib digunakan setiap kali membuka posisi. Ditempatkan di level teknikal yang valid (di bawah support untuk posisi buy), bukan angka acak berdasarkan persentase yang "terasa nyaman".', relatedTools: ['trading/stop-loss-optimizer', 'trading/risk-manager'] },

  { term: 'Swap (Overnight Fee)', slug: 'swap', kategori: 'Trading Forex', definisi: 'Biaya atau kredit yang dikenakan pada posisi forex yang ditahan melewati tengah malam.', penjelasan: 'Swap merefleksikan perbedaan suku bunga antara dua mata uang dalam pasangan. Posisi buy pada pair dengan suku bunga tinggi bisa mendapat swap positif (dibayar). Posisi yang ditahan lama bisa terkena biaya swap signifikan yang menggerus profit.', relatedTools: ['trading/swap-cost-estimator'] },

  // T
  { term: 'Take Profit', slug: 'take-profit', kategori: 'Trading', definisi: 'Order otomatis untuk menutup posisi dan mengambil keuntungan saat harga mencapai target yang ditentukan.', penjelasan: 'Take profit ditetapkan bersamaan dengan stop loss sebelum entry untuk memastikan R/R ratio yang layak. Menutup profit secara disiplin berdasarkan rencana adalah salah satu tantangan psikologis terbesar dalam trading.', relatedTools: ['trading/trade-analyzer'] },

  // W
  { term: 'Win Rate', slug: 'win-rate', kategori: 'Trading', definisi: 'Persentase trade yang menghasilkan profit dari total trade yang dilakukan.', penjelasan: 'Win rate saja tidak menentukan profitabilitas sistem trading. Win rate 70% dengan R/R 1:0.3 masih bisa merugi. Win rate 40% dengan R/R 1:2 bisa sangat profitable. Yang penting adalah kombinasi win rate dan R/R yang menghasilkan expectancy positif.', relatedTools: ['trading/win-rate-expectancy-tracker', 'trading/trading-performance-analyzer'] },

  // Y
  { term: 'Yield to Maturity (YTM)', slug: 'ytm', kategori: 'Obligasi', definisi: 'Total return yang diharapkan dari obligasi jika dipegang hingga jatuh tempo, memperhitungkan kupon dan selisih harga beli vs nilai nominal.', penjelasan: 'YTM adalah ukuran return obligasi yang paling komprehensif karena memperhitungkan semua arus kas: kupon periodik dan pokok saat jatuh tempo. YTM obligasi yang diperdagangkan di atas nominal (premium) akan lebih rendah dari kupon nominalnya.', relatedTools: ['investasi/bond-yield-analyzer', 'investasi/sbn-maturity-planner'] },

  // Z
  { term: 'Zakat Mal', slug: 'zakat-mal', kategori: 'Pajak & Zakat', definisi: 'Zakat atas harta yang telah mencapai nisab dan sudah dimiliki selama satu tahun (haul).', penjelasan: 'Besaran zakat mal adalah 2.5% dari total harta bersih (setelah dikurangi utang) yang telah mencapai nisab. Nisab zakat mal setara 85 gram emas. Zakat yang dibayar melalui BAZNAS atau LAZ resmi dapat dikurangkan dari PKP PPh.', relatedTools: ['pajak/zakat-tax-planner'] },
]

// ─── Helper Functions ─────────────────────────────

export function getGlossaryByLetter(letter: string): GlossaryItem[] {
  return glossaryDatabase.filter(g =>
    g.term.toUpperCase().startsWith(letter.toUpperCase())
  )
}

export function getGlossaryBySlug(slug: string): GlossaryItem | undefined {
  return glossaryDatabase.find(g => g.slug === slug)
}

export function getAllLetters(): string[] {
  const letters = new Set(
    glossaryDatabase.map(g => g.term[0].toUpperCase())
  )
  return Array.from(letters).sort()
}

export function searchGlossary(query: string): GlossaryItem[] {
  const q = query.toLowerCase()
  return glossaryDatabase.filter(g =>
    g.term.toLowerCase().includes(q) ||
    g.definisi.toLowerCase().includes(q) ||
    g.kategori.toLowerCase().includes(q)
  )
}
