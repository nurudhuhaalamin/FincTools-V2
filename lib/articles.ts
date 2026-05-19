/**
 * FincTools v2 — Articles Database
 * 21 artikel — 3 per kategori
 */

import type { Artikel, KategoriArtikel, KategoriArtikelConfig } from './types'

export type { KategoriArtikel }

// ─── Kategori Config ──────────────────────────────

export const kategoriArtikelConfig: Record<KategoriArtikel, KategoriArtikelConfig> = {
  investasi: {
    nama: 'Investasi',
    deskripsi: 'Reksa dana, SBN, obligasi, emas, dan instrumen investasi lainnya',
    gradientFrom: 'from-emerald-600',
    gradientTo: 'to-teal-500',
    badge: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30',
    toolHref: '/investasi',
  },
  'saham-bursa': {
    nama: 'Saham & Bursa',
    deskripsi: 'Analisa saham IDX, laporan keuangan, fundamental, dan teknikal',
    gradientFrom: 'from-indigo-600',
    gradientTo: 'to-violet-500',
    badge: 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/30',
    toolHref: '/saham',
  },
  trading: {
    nama: 'Trading',
    deskripsi: 'Strategi trading, risk management, analisa teknikal, dan psikologi trading',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-cyan-500',
    badge: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/30',
    toolHref: '/trading',
  },
  pajak: {
    nama: 'Pajak',
    deskripsi: 'PPh 21, pajak investasi, UMKM, zakat, dan perencanaan pajak',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-pink-500',
    badge: 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/30',
    toolHref: '/pajak',
  },
  'keuangan-pribadi': {
    nama: 'Keuangan Pribadi',
    deskripsi: 'Budgeting, dana darurat, utang, FIRE, KPR, dan asuransi',
    gradientFrom: 'from-sky-600',
    gradientTo: 'to-blue-400',
    badge: 'text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/30',
    toolHref: '/personal-finance',
  },
  kripto: {
    nama: 'Kripto',
    deskripsi: 'Investasi kripto, DCA, staking, manajemen risiko, dan regulasi',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-orange-400',
    badge: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30',
    toolHref: '/kripto',
  },
  'ekonomi-pasar': {
    nama: 'Ekonomi & Pasar',
    deskripsi: 'Makroekonomi, suku bunga BI, inflasi, dan analisa kondisi pasar',
    gradientFrom: 'from-slate-600',
    gradientTo: 'to-slate-400',
    badge: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/40',
  },
}

// ─── Articles Database ────────────────────────────

export const artikelDatabase: Artikel[] = [

  // ══════════════════════════════════════
  // INVESTASI (3 artikel)
  // ══════════════════════════════════════
  {
    slug: 'cara-dca-reksa-dana-untuk-pemula',
    kategori: 'investasi',
    judul: 'Cara DCA Reksa Dana untuk Pemula: Panduan Lengkap',
    ringkasan: 'Dollar Cost Averaging adalah strategi investasi paling cocok untuk pemula. Pelajari cara kerjanya, berapa yang harus diinvestasikan, dan reksa dana mana yang tepat.',
    tanggal: '2024-11-01',
    waktuBaca: 8,
    tags: ['DCA', 'reksa dana', 'investasi pemula', 'compound interest'],
    konten: [
      { type: 'paragraph', text: 'Dollar Cost Averaging (DCA) adalah strategi investasi dengan cara menyetorkan jumlah uang yang sama secara rutin — tanpa mempertimbangkan kondisi pasar saat itu. Strategi ini menghilangkan kebutuhan market timing yang bahkan sulit dilakukan investor profesional sekalipun.' },
      { type: 'stat-highlight', items: [{ angka: '12–18%', label: 'Return historis reksa dana saham Indonesia', sublabel: 'per tahun jangka panjang, tidak dijamin' }, { angka: 'Rp 100rb', label: 'Minimum DCA di platform modern', sublabel: 'Bibit, Bareksa, IPOT Fund' }, { angka: '3 tahun', label: 'Horizon minimum yang disarankan', sublabel: 'untuk hasil optimal reksa dana saham' }] },
      { type: 'heading', level: 2, text: 'Mengapa DCA Cocok untuk Pemula?' },
      { type: 'paragraph', text: 'Kebanyakan investor pemula gagal karena dua kesalahan: mencoba menebak waktu terbaik masuk pasar (market timing) dan panik menjual saat pasar turun. DCA mengeliminasi kedua masalah ini — kamu beli secara konsisten terlepas apakah pasar sedang naik atau turun.' },
      { type: 'callout', variant: 'tip', judul: 'Efek DCA saat Pasar Turun', text: 'Saat harga turun, jumlah unit reksa dana yang kamu beli lebih banyak. Saat harga naik, lebih sedikit. Hasilnya adalah harga rata-rata beli yang lebih rendah dari rata-rata harga pasar — inilah yang disebut dollar cost averaging effect.' },
      { type: 'heading', level: 2, text: 'Pilih Reksa Dana Sesuai Horizon Waktu' },
      { type: 'table', headers: ['Jenis', 'Return', 'Risiko', 'Cocok untuk'], rows: [['Pasar Uang', '4–6%/thn', 'Sangat Rendah', 'Dana darurat, 1–3 tahun'], ['Pendapatan Tetap', '6–9%/thn', 'Rendah-Sedang', '2–4 tahun'], ['Campuran', '8–12%/thn', 'Sedang', '3–5 tahun'], ['Saham/Indeks', '12–18%/thn', 'Tinggi', '5+ tahun, FIRE']] },
      { type: 'grafik-garis', judul: 'Kekuatan Compound Interest: DCA Rp 1 juta/bulan', labelY: 'Nilai (Rp Juta)', data: [{ label: '1 thn', nilai: 12, nilai2: 13 }, { label: '3 thn', nilai: 36, nilai2: 45 }, { label: '5 thn', nilai: 60, nilai2: 82 }, { label: '10 thn', nilai: 120, nilai2: 230 }, { label: '15 thn', nilai: 180, nilai2: 500 }, { label: '20 thn', nilai: 240, nilai2: 960 }], seri: [{ key: 'nilai', nama: 'Total Setoran', warna: '#94a3b8' }, { key: 'nilai2', nama: 'Nilai Portofolio (12%/thn)', warna: '#10b981' }] },
      { type: 'key-takeaway', points: ['DCA menghilangkan kebutuhan market timing — beli konsisten apapun kondisi pasar', 'Mulai dari nominal kecil — konsistensi lebih penting dari besarnya nominal', 'Jangan berhenti saat pasar turun — ini justru saat DCA paling efektif', 'Horizon minimal 3–5 tahun untuk reksa dana saham agar compound interest bekerja optimal'] },
      { type: 'tool-cta', nama: 'DCA Simulator', href: '/investasi/dca-simulator', desc: 'Simulasikan proyeksi nilai investasi DCA kamu berdasarkan jumlah, durasi, dan estimasi return.' },
    ],
  },
  {
    slug: 'panduan-investasi-sbn-ori-sbr',
    kategori: 'investasi',
    judul: 'Panduan Lengkap Investasi SBN: ORI, SBR, dan Sukuk Ritel',
    ringkasan: 'Surat Berharga Negara adalah investasi paling aman di Indonesia karena dijamin penuh pemerintah. Pelajari perbedaan ORI, SBR, dan Sukuk Ritel, serta cara memilih yang tepat.',
    tanggal: '2024-11-08',
    waktuBaca: 9,
    tags: ['SBN', 'ORI', 'SBR', 'sukuk ritel', 'obligasi negara', 'investasi aman'],
    konten: [
      { type: 'paragraph', text: 'Surat Berharga Negara (SBN) Ritel adalah instrumen investasi yang diterbitkan pemerintah Indonesia dan dijual langsung kepada investor ritel. Dijamin penuh oleh negara tanpa batas nominal — ini yang membedakannya dari deposito yang dijamin LPS hanya hingga Rp 2 miliar.' },
      { type: 'callout', variant: 'info', judul: 'Keunggulan Utama SBN', text: 'SBN dijamin penuh oleh Pemerintah Indonesia berdasarkan UU No. 24 Tahun 2002. Tidak ada batas jumlah jaminan, tidak bergantung kondisi bank, dan tidak bisa default selama Indonesia masih ada.' },
      { type: 'heading', level: 2, text: 'Perbandingan Jenis SBN Ritel' },
      { type: 'table', headers: ['Jenis', 'Kupon', 'Tenor', 'Bisa Dijual?', 'Keunggulan'], rows: [['ORI', 'Fixed', '2–3 tahun', 'Ya (pasar sekunder)', 'Likuid, bisa jual sebelum jatuh tempo'], ['SBR', 'Floating (BI Rate + spread)', '2 tahun', 'Tidak (early redemption)', 'Kupon ikuti suku bunga, aman dari kenaikan BI Rate'], ['SR (Sukuk Ritel)', 'Fixed', '3 tahun', 'Ya (pasar sekunder)', 'Sesuai prinsip syariah, bagi hasil'], ['SBSN ST', 'Floating', '2 tahun', 'Tidak (early redemption)', 'Syariah + kupon floating']] },
      { type: 'heading', level: 2, text: 'Cara Beli SBN Ritel' },
      { type: 'step-list', steps: [{ judul: 'Buka Akun di Mitra Distribusi', desc: 'BCA, Mandiri, BNI, BRI, BSI, atau platform fintech seperti Bibit, Bareksa, Moduit.' }, { judul: 'Siapkan Modal Minimum', desc: 'Minimum pembelian Rp 1 juta. Maksimum Rp 5 miliar per individu per seri.' }, { judul: 'Pantau Jadwal Penerbitan', desc: 'SBN diterbitkan beberapa kali setahun. Pantau di kemenkeu.go.id atau aplikasi mitra distribusi.' }, { judul: 'Beli di Masa Penawaran', desc: 'Pembelian hanya bisa dilakukan selama masa penawaran (biasanya 2–3 minggu).' }] },
      { type: 'key-takeaway', points: ['SBN adalah investasi paling aman di Indonesia — dijamin penuh pemerintah tanpa batas', 'ORI cocok jika ingin likuiditas (bisa jual di pasar sekunder), SBR cocok jika ingin kupon mengikuti suku bunga', 'Pajak kupon SBN hanya 10% — lebih rendah dari pajak deposito 20%', 'Minimum investasi hanya Rp 1 juta — sangat terjangkau untuk investor pemula'] },
      { type: 'tool-cta', nama: 'SBN Maturity Planner', href: '/investasi/sbn-maturity-planner', desc: 'Hitung total imbal hasil bersih SBN yang kamu beli berdasarkan nominal, kupon, dan tenor.' },
    ],
  },
  {
    slug: 'memulai-investasi-reksa-dana-indeks',
    kategori: 'investasi',
    judul: 'Reksa Dana Indeks: Investasi Pasif yang Mengalahkan Mayoritas Fund Manager',
    ringkasan: 'Reksa dana indeks mengikuti pergerakan indeks pasar secara otomatis dengan biaya yang jauh lebih rendah. Data menunjukkan mayoritas fund manager aktif gagal mengalahkan indeks jangka panjang.',
    tanggal: '2024-11-15',
    waktuBaca: 7,
    tags: ['reksa dana indeks', 'index fund', 'investasi pasif', 'IDX30', 'LQ45'],
    konten: [
      { type: 'paragraph', text: 'Reksa dana indeks adalah jenis reksa dana yang portofolionya secara pasif mengikuti komposisi suatu indeks pasar — seperti LQ45 atau IDX30 di Indonesia. Tidak ada manajer investasi yang aktif memilih saham; semuanya otomatis mengikuti indeks.' },
      { type: 'stat-highlight', items: [{ angka: '~80%', label: 'Fund manager aktif yang kalah dari indeks', sublabel: 'dalam periode 10 tahun (data global S&P SPIVA)' }, { angka: '0.1–0.5%', label: 'Expense ratio reksa dana indeks', sublabel: 'vs 1–2.5% untuk reksa dana aktif' }] },
      { type: 'callout', variant: 'tip', judul: 'Filosofi Index Investing', text: 'Jika kamu tidak bisa mengalahkan pasar secara konsisten, mengapa tidak MENJADI pasar itu sendiri? Inilah logika dasar index investing yang dipopulerkan John Bogle, pendiri Vanguard.' },
      { type: 'heading', level: 2, text: 'Indeks yang Bisa Diikuti di Indonesia' },
      { type: 'table', headers: ['Indeks', 'Isi', 'Karakteristik'], rows: [['LQ45', '45 saham paling likuid BEI', 'Paling populer, representatif pasar'], ['IDX30', '30 saham blue chip terbesar', 'Lebih terkonsentrasi, cocok untuk pemula'], ['IDX80', '80 saham terpilih', 'Diversifikasi lebih luas'], ['MSCI Indonesia', 'Saham besar berstandar internasional', 'Cocok untuk eksposur global']] },
      { type: 'key-takeaway', points: ['Reksa dana indeks mengikuti pasar otomatis dengan expense ratio jauh lebih rendah', 'Secara jangka panjang, mayoritas fund aktif kalah dari indeks setelah dikurangi biaya', 'Cocok dikombinasikan dengan strategi DCA untuk investasi jangka panjang', 'Cari reksa dana indeks dengan expense ratio di bawah 1% per tahun'] },
      { type: 'tool-cta', nama: 'DCA Simulator', href: '/investasi/dca-simulator', desc: 'Simulasikan pertumbuhan investasi DCA reksa dana indeks selama 10–30 tahun.' },
    ],
  },

  // ══════════════════════════════════════
  // SAHAM & BURSA (3 artikel)
  // ══════════════════════════════════════
  {
    slug: 'cara-baca-laporan-keuangan-saham',
    kategori: 'saham-bursa',
    judul: 'Cara Membaca Laporan Keuangan Saham: Panduan untuk Investor Pemula',
    ringkasan: 'Laporan keuangan adalah kunci analisa fundamental saham. Pelajari cara membaca neraca, laba rugi, dan arus kas untuk menilai kesehatan finansial perusahaan sebelum berinvestasi.',
    tanggal: '2024-11-05',
    waktuBaca: 10,
    tags: ['laporan keuangan', 'analisa fundamental', 'saham IDX', 'investor saham'],
    konten: [
      { type: 'paragraph', text: 'Sebelum membeli saham, kamu perlu memahami kondisi finansial perusahaan. Laporan keuangan adalah "health check-up" perusahaan yang diterbitkan setiap kuartal dan tahunan — tersedia gratis di idx.co.id.' },
      { type: 'callout', variant: 'info', judul: 'Di Mana Menemukan Laporan Keuangan?', text: 'Semua emiten IDX wajib mempublikasikan laporan keuangan di idx.co.id (menu Perusahaan Tercatat → Laporan Keuangan) dan di website investor relations perusahaan. Gratis dan terbuka untuk publik.' },
      { type: 'heading', level: 2, text: '3 Laporan Utama yang Harus Kamu Baca' },
      { type: 'step-list', steps: [{ judul: 'Neraca (Balance Sheet)', desc: 'Snapshot kondisi keuangan di satu titik waktu. Menunjukkan aset, liabilitas, dan ekuitas perusahaan.' }, { judul: 'Laporan Laba Rugi (Income Statement)', desc: 'Performa perusahaan selama periode tertentu — pendapatan, biaya, dan laba bersih.' }, { judul: 'Laporan Arus Kas (Cash Flow)', desc: 'Aliran uang masuk dan keluar. Lebih susah dimanipulasi dari laba rugi — indikator kesehatan terpenting.' }] },
      { type: 'heading', level: 2, text: 'Rasio Keuangan yang Paling Penting' },
      { type: 'table', headers: ['Rasio', 'Rumus', 'Artinya', 'Ideal'], rows: [['PER', 'Harga / EPS', 'Seberapa mahal saham vs laba', '< rata-rata industri'], ['PBV', 'Harga / Nilai Buku', 'Harga vs aset bersih', 'PBV < 1 = murah'], ['ROE', 'Laba Bersih / Ekuitas', 'Efisiensi hasilkan laba', '> 15%'], ['DER', 'Total Utang / Ekuitas', 'Tingkat leverage', '< 1 lebih aman'], ['Current Ratio', 'Aset Lancar / Utang Lancar', 'Kemampuan bayar utang pendek', '> 1.5']] },
      { type: 'callout', variant: 'warning', judul: 'Red Flag yang Harus Diwaspadai', text: 'Laba bersih positif tapi arus kas operasi negatif. Utang terus naik tapi pendapatan stagnan. Piutang tumbuh jauh lebih cepat dari pendapatan. Margin laba terus menyusut tiap kuartal.' },
      { type: 'key-takeaway', points: ['Fokus pada 3 laporan utama: neraca, laba rugi, dan arus kas', 'Arus kas lebih susah dimanipulasi dari laba bersih — prioritaskan ini', 'Bandingkan rasio dengan kompetitor satu industri, bukan lintas industri', 'Tren 3–5 tahun lebih bermakna daripada angka satu periode'] },
      { type: 'tool-cta', nama: 'Entry Price Optimizer', href: '/saham/entry-price-optimizer', desc: 'Setelah analisa fundamental, tentukan harga entry optimal dengan risk/reward yang layak.' },
    ],
  },
  {
    slug: 'strategi-dividen-saham-indonesia',
    kategori: 'saham-bursa',
    judul: 'Strategi Investasi Dividen di Saham Indonesia: Membangun Passive Income',
    ringkasan: 'Investasi dividen adalah strategi membangun aliran pendapatan pasif dari kepemilikan saham. Pelajari cara memilih saham dividen terbaik di IDX dan proyeksikan passive income kamu.',
    tanggal: '2024-11-12',
    waktuBaca: 8,
    tags: ['dividen saham', 'passive income', 'saham IDX', 'dividend investing'],
    konten: [
      { type: 'paragraph', text: 'Investasi dividen adalah strategi jangka panjang di mana investor fokus pada saham yang rutin membagikan dividen. Tujuannya bukan hanya capital gain dari kenaikan harga, tapi aliran pendapatan pasif yang konsisten dan terus bertumbuh.' },
      { type: 'stat-highlight', items: [{ angka: '3–8%', label: 'Dividend yield wajar saham IDX berkualitas', sublabel: 'tanpa mengorbankan pertumbuhan' }, { angka: '10%', label: 'Pajak dividen saham Indonesia', sublabel: 'PPh final, dipotong langsung oleh emiten' }] },
      { type: 'heading', level: 2, text: 'Kriteria Saham Dividen yang Baik' },
      { type: 'table', headers: ['Kriteria', 'Parameter', 'Alasan'], rows: [['Dividend yield', '3–8%', 'Terlalu rendah = kurang menarik, terlalu tinggi = tidak berkelanjutan'], ['Konsistensi dividen', 'Min. 5 tahun berturut-turut', 'Menunjukkan komitmen manajemen'], ['Payout ratio', '40–70%', 'Cukup membayar dividen tapi tetap ada dana tumbuh'], ['Pertumbuhan dividen', '>0% per tahun', 'Dividen yang tumbuh lindungi dari inflasi'], ['ROE', '>15%', 'Perusahaan efisien menghasilkan laba']] },
      { type: 'key-takeaway', points: ['Fokus pada konsistensi dividen, bukan hanya yield tertinggi saat ini', 'Yield terlalu tinggi (>10%) sering tidak berkelanjutan — investigasi lebih lanjut', 'DRIP (reinvestasi dividen) mengakselerasi pertumbuhan portofolio secara eksponensial', 'Diversifikasi minimal 5–10 saham dividen dari sektor berbeda untuk mengurangi risiko'] },
      { type: 'tool-cta', nama: 'Dividend Income Projector', href: '/investasi/dividend-income-projector', desc: 'Proyeksikan berapa passive income dividen yang bisa kamu hasilkan dalam 5–10 tahun ke depan.' },
    ],
  },
  {
    slug: 'mengenal-analisa-teknikal-saham',
    kategori: 'saham-bursa',
    judul: 'Mengenal Analisa Teknikal Saham: Panduan untuk Trader Pemula',
    ringkasan: 'Analisa teknikal membaca pergerakan harga dan volume untuk memprediksi arah saham ke depan. Pelajari konsep dasar support, resistance, trend, dan indikator yang paling berguna.',
    tanggal: '2024-11-19',
    waktuBaca: 9,
    tags: ['analisa teknikal', 'chart saham', 'support resistance', 'trend saham', 'trading saham'],
    konten: [
      { type: 'paragraph', text: 'Analisa teknikal adalah metode membaca grafik pergerakan harga dan volume untuk mengidentifikasi pola dan memprediksi arah harga ke depan. Berbeda dari analisa fundamental yang fokus pada kondisi bisnis perusahaan, analisa teknikal murni membaca "jejak kaki" para pelaku pasar.' },
      { type: 'callout', variant: 'info', judul: 'Prinsip Dasar Analisa Teknikal', text: 'Tiga asumsi dasar: (1) Harga mencerminkan semua informasi yang tersedia, (2) Harga bergerak dalam tren, (3) Sejarah cenderung berulang. Ketiga asumsi ini adalah fondasi seluruh analisa teknikal.' },
      { type: 'heading', level: 2, text: 'Konsep Dasar yang Wajib Dipahami' },
      { type: 'step-list', steps: [{ judul: 'Support & Resistance', desc: 'Support adalah level harga yang sulit ditembus ke bawah. Resistance adalah level yang sulit ditembus ke atas. Keduanya adalah fondasi analisa teknikal.' }, { judul: 'Trend', desc: 'Uptrend: higher highs dan higher lows. Downtrend: lower highs dan lower lows. Trading mengikuti trend jauh lebih aman dari melawan trend.' }, { judul: 'Volume', desc: 'Volume mengkonfirmasi pergerakan harga. Breakout dengan volume tinggi lebih valid. Volume rendah saat harga naik = sinyal lemah.' }, { judul: 'Moving Average', desc: 'Rata-rata harga dalam periode tertentu. MA20, MA50, MA200 adalah yang paling sering digunakan. Golden cross (MA50 memotong MA200 ke atas) adalah sinyal bullish.' }] },
      { type: 'key-takeaway', points: ['Analisa teknikal paling efektif dikombinasikan dengan analisa fundamental', 'Selalu gunakan stop loss — analisa teknikal terbaik pun bisa salah', 'Konfirmasi sinyal dengan minimal 2 indikator sebelum entry', 'Practice pada chart histori sebelum trading dengan uang nyata'] },
      { type: 'tool-cta', nama: 'Entry Price Optimizer', href: '/saham/entry-price-optimizer', desc: 'Setelah identifikasi setup teknikal, optimalkan harga entry dan lot berdasarkan risk/reward.' },
    ],
  },

  // ══════════════════════════════════════
  // TRADING (3 artikel)
  // ══════════════════════════════════════
  {
    slug: 'panduan-risk-management-trading-pemula',
    kategori: 'trading',
    judul: 'Panduan Risk Management Trading: Cara Tidak Kehilangan Semua Modal',
    ringkasan: 'Risk management adalah perbedaan antara trader yang bertahan dan yang habis modalnya. Pelajari aturan 1%, position sizing, stop loss, dan cara membangun sistem trading yang berkelanjutan.',
    tanggal: '2024-11-10',
    waktuBaca: 9,
    tags: ['risk management', 'position sizing', 'stop loss', 'trading pemula'],
    konten: [
      { type: 'stat-highlight', items: [{ angka: '70–80%', label: 'Trader ritel yang merugi jangka panjang', sublabel: 'Bukan karena analisa salah, tapi MM buruk' }, { angka: '1–2%', label: 'Maksimum risiko per trade yang aman', sublabel: 'Standar trader profesional global' }, { angka: '1:2', label: 'Risk/Reward ratio minimum', sublabel: 'Untuk sistem yang profitable jangka panjang' }] },
      { type: 'paragraph', text: 'Risk management adalah fondasi trading yang profitable. Trader dengan analisa biasa-biasa saja tapi money management disiplin bisa bertahan lama, sementara trader dengan analisa cemerlang tapi money management buruk hampir pasti bangkrut.' },
      { type: 'callout', variant: 'tip', judul: 'Aturan Emas Risk Management', text: 'Jangan pernah mempertaruhkan lebih dari 1–2% modal per trade. Dengan aturan 1%, kamu butuh 100 kali loss berturut-turut untuk kehilangan semua modal — skenario yang hampir mustahil jika strategi memiliki edge positif.' },
      { type: 'heading', level: 2, text: 'Cara Menghitung Position Sizing' },
      { type: 'formula-box', formula: 'Modal Berisiko = Modal Total × % Risiko\nLot Optimal = Modal Berisiko ÷ (Stop Loss Pips × Pip Value)', contoh: 'Modal Rp 10jt | Risiko 2% = Rp 200rb berisiko\nStop Loss: 50 pips | Pip Value: Rp 40.000/pip\nLot = Rp 200.000 ÷ (50 × 40.000) = 0.1 lot' },
      { type: 'key-takeaway', points: ['Risiko per trade maksimal 1–2% dari total modal — tidak ada pengecualian', 'R/R ratio minimal 1:2 sebelum masuk posisi apapun', 'Stop loss harus ditempatkan di level teknikal yang valid, bukan angka acak', 'Tetapkan batas loss harian — jika tercapai, berhenti trading hari itu'] },
      { type: 'tool-cta', nama: 'Risk Manager', href: '/trading/risk-manager', desc: 'Hitung lot optimal dan risk/reward ratio secara otomatis berdasarkan modal dan kondisi trade kamu.' },
    ],
  },
  {
    slug: 'psikologi-trading-yang-harus-dikuasai',
    kategori: 'trading',
    judul: 'Psikologi Trading: Menguasai Emosi untuk Menjadi Trader yang Konsisten',
    ringkasan: 'Mayoritas kegagalan trader bukan disebabkan analisa yang salah, tapi keputusan emosional. Pelajari bias psikologis umum trader dan cara mengatasinya.',
    tanggal: '2024-11-17',
    waktuBaca: 8,
    tags: ['psikologi trading', 'emosi trading', 'trading discipline', 'mental trading'],
    konten: [
      { type: 'paragraph', text: 'Studi menunjukkan bahwa mayoritas kerugian trader ritel bukan disebabkan strategi yang buruk, melainkan keputusan emosional: menahan loss yang seharusnya di-cut, menutup profit terlalu cepat karena takut reversal, atau revenge trading setelah serangkaian loss.' },
      { type: 'heading', level: 2, text: 'Bias Psikologis yang Merusak Trading' },
      { type: 'step-list', steps: [{ judul: 'Loss Aversion', desc: 'Rasa sakit dari kerugian Rp 100rb terasa 2x lebih kuat dari kesenangan profit Rp 100rb. Ini menyebabkan trader menahan loss terlalu lama dan menjual profit terlalu cepat.' }, { judul: 'Overconfidence', desc: 'Setelah beberapa kali menang, trader sering terlalu percaya diri dan mengambil risiko berlebihan. Win streak terbesar sering diikuti loss terbesar.' }, { judul: 'Revenge Trading', desc: 'Langsung masuk posisi baru setelah loss untuk "balas dendam" — hampir selalu berakhir dengan loss lebih besar karena keputusan dibuat dalam kondisi emosional.' }, { judul: 'FOMO (Fear of Missing Out)', desc: 'Masuk posisi karena takut ketinggalan pergerakan, tanpa setup yang valid. Ini adalah cara tercepat kehilangan modal.' }] },
      { type: 'callout', variant: 'warning', judul: 'Tanda Kamu Sedang Trading Secara Emosional', text: 'Kamu menambah ukuran lot setelah loss untuk recovery cepat. Kamu tidak memasang stop loss karena "yakin" harga akan balik. Kamu terus memantau chart setelah memasang posisi. Kamu tidak bisa berhenti trading meski sudah mencapai batas loss harian.' },
      { type: 'key-takeaway', points: ['Buat trading plan sebelum market buka, ikuti rencana saat market berjalan', 'Journal trading adalah investasi terbaik untuk berkembang sebagai trader', 'Batas loss harian adalah non-negotiable — berhenti saat tercapai', 'Konsistensi proses lebih penting dari konsistensi hasil jangka pendek'] },
      { type: 'tool-cta', nama: 'Max Loss Guardian', href: '/trading/max-loss-guardian', desc: 'Tentukan batas loss harian dan mingguan yang harus ditaati untuk melindungi modal dari keputusan emosional.' },
    ],
  },
  {
    slug: 'mengenal-forex-trading-untuk-pemula',
    kategori: 'trading',
    judul: 'Mengenal Forex Trading: Panduan Pemula yang Jujur tentang Risiko dan Peluang',
    ringkasan: 'Forex adalah pasar finansial terbesar di dunia dengan volume $7.5 triliun per hari. Tapi 70-80% trader ritel merugi. Pelajari cara kerja forex, risiko nyatanya, dan cara memulai dengan benar.',
    tanggal: '2024-11-24',
    waktuBaca: 10,
    tags: ['forex', 'trading forex', 'forex pemula', 'pasar valuta asing', 'broker forex'],
    konten: [
      { type: 'paragraph', text: 'Forex (foreign exchange) adalah pasar di mana mata uang diperdagangkan satu sama lain. Dengan volume $7.5 triliun per hari, forex adalah pasar finansial terbesar dan paling likuid di dunia — beroperasi 24 jam per hari, 5 hari seminggu.' },
      { type: 'stat-highlight', items: [{ angka: '$7.5T', label: 'Volume harian pasar forex', sublabel: 'BIS Triennial Survey 2022' }, { angka: '70–80%', label: 'Trader ritel forex yang merugi', sublabel: 'Berdasarkan laporan broker EU' }] },
      { type: 'callout', variant: 'danger', judul: 'Peringatan Penting', text: 'Regulasi EU mewajibkan broker forex melaporkan persentase trader yang merugi. Mayoritas menunjukkan 70–80% trader ritel merugi. Ini bukan untuk menakut-nakuti, tapi agar kamu memulai dengan ekspektasi yang realistis dan persiapan yang tepat.' },
      { type: 'heading', level: 2, text: 'Konsep Dasar Forex yang Harus Dipahami' },
      { type: 'table', headers: ['Istilah', 'Penjelasan'], rows: [['Pip', 'Unit pergerakan harga terkecil. Untuk EUR/USD, 1 pip = 0.0001'], ['Lot', 'Ukuran posisi. Standard lot = 100.000 unit mata uang. Mini lot = 10.000. Micro = 1.000'], ['Leverage', 'Modal pinjaman dari broker. Leverage 1:100 berarti dengan modal Rp 1 juta bisa kontrol posisi Rp 100 juta'], ['Spread', 'Selisih antara harga beli (ask) dan jual (bid). Ini biaya tersembunyi trading forex'], ['Margin', 'Agunan yang dibutuhkan untuk membuka posisi leverage']] },
      { type: 'key-takeaway', points: ['Leverage memperbesar profit DAN loss secara sama — bukan alat gratis', 'Demo trading minimal 3 bulan sebelum trading dengan uang nyata', 'Pilih broker berlisensi resmi OJK (untuk IDR) atau FCA/ASIC/CySEC (internasional)', 'Risk management adalah kunci — bukan strategi trading yang canggih'] },
      { type: 'tool-cta', nama: 'Risk Manager', href: '/trading/risk-manager', desc: 'Hitung ukuran lot yang aman dan modal berisiko sebelum masuk setiap posisi forex.' },
    ],
  },

  // ══════════════════════════════════════
  // PAJAK (3 artikel)
  // ══════════════════════════════════════
  {
    slug: 'cara-menghitung-pph21-karyawan-2024',
    kategori: 'pajak',
    judul: 'Cara Menghitung PPh 21 Karyawan 2024: Panduan dengan Contoh Nyata',
    ringkasan: 'PPh 21 dipotong langsung dari gaji setiap bulan. Pelajari cara menghitungnya berdasarkan UU HPP 2021, tarif progresif terbaru, dan cek apakah potongan di slip gajimu sudah benar.',
    tanggal: '2024-11-15',
    waktuBaca: 8,
    tags: ['PPh 21', 'pajak karyawan', 'PTKP', 'UU HPP 2021', 'slip gaji'],
    konten: [
      { type: 'paragraph', text: 'PPh Pasal 21 adalah pajak penghasilan yang dipotong pemberi kerja dari gaji karyawan setiap bulan. Memahami cara hitungnya bukan hanya untuk HRD — setiap karyawan perlu tahu apakah potongan di slip gaji sudah benar.' },
      { type: 'heading', level: 2, text: 'Tarif Progresif PPh 21 (UU HPP 2021)' },
      { type: 'table', headers: ['Penghasilan Kena Pajak (PKP) per Tahun', 'Tarif'], rows: [['Rp 0 – Rp 60 juta', '5%'], ['Rp 60 – Rp 250 juta', '15%'], ['Rp 250 – Rp 500 juta', '25%'], ['Rp 500 juta – Rp 5 miliar', '30%'], ['Di atas Rp 5 miliar', '35%']] },
      { type: 'heading', level: 2, text: 'PTKP Berdasarkan Status (2024)' },
      { type: 'table', headers: ['Status', 'PTKP per Tahun'], rows: [['TK/0 — Tidak kawin, 0 tanggungan', 'Rp 54.000.000'], ['K/0 — Kawin, 0 tanggungan', 'Rp 58.500.000'], ['K/1 — Kawin, 1 tanggungan', 'Rp 63.000.000'], ['K/2 — Kawin, 2 tanggungan', 'Rp 67.500.000'], ['K/3 — Kawin, 3 tanggungan', 'Rp 72.000.000']] },
      { type: 'step-list', steps: [{ judul: 'Hitung Penghasilan Bruto', desc: 'Gaji pokok + tunjangan tetap + tunjangan tidak tetap per bulan.' }, { judul: 'Kurangi Biaya Jabatan', desc: '5% dari bruto, maksimum Rp 500.000 per bulan.' }, { judul: 'Hitung Neto Tahunan', desc: '(Bruto - Biaya Jabatan) × 12.' }, { judul: 'Kurangi PTKP', desc: 'PKP = Neto Tahunan - PTKP sesuai status.' }, { judul: 'Terapkan Tarif Progresif', desc: 'Hitung PPh per lapisan, bagi 12 untuk PPh bulanan.' }] },
      { type: 'formula-box', formula: 'PKP = (Bruto - Biaya Jabatan) × 12 - PTKP\nPPh Tahunan = Tarif Progresif × PKP\nPPh Bulanan = PPh Tahunan ÷ 12', contoh: 'Gaji Rp 12jt/bln | TK/0 | Punya NPWP\nNeto Tahunan = (12jt - 500rb) × 12 = Rp 138jt\nPKP = 138jt - 54jt = Rp 84jt\nPPh = (5%×60jt) + (15%×24jt) = Rp 6.6jt/thn\nPPh Bulanan = Rp 550.000' },
      { type: 'callout', variant: 'warning', judul: 'Tidak Punya NPWP? Kena 20% Lebih Tinggi', text: 'Karyawan tanpa NPWP dikenakan tarif PPh 21 sebesar 20% lebih tinggi dari tarif normal. Membuat NPWP gratis di ereg.pajak.go.id — tidak ada alasan untuk tidak memilikinya.' },
      { type: 'key-takeaway', points: ['PPh 21 menggunakan tarif progresif berlapis sesuai UU HPP 2021', 'Biaya jabatan 5% (maks Rp 500rb/bln) mengurangi PKP secara signifikan', 'PTKP bergantung pada status pernikahan dan jumlah tanggungan yang sah', 'Tanpa NPWP kena tarif 20% lebih tinggi — segera buat jika belum punya'] },
      { type: 'tool-cta', nama: 'Tax Optimizer PPh 21', href: '/pajak/tax-optimizer-pph21', desc: 'Hitung PPh 21 kamu secara akurat dan cek apakah potongan di slip gaji sudah benar.' },
    ],
  },
  {
    slug: 'panduan-lapor-pajak-investasi',
    kategori: 'pajak',
    judul: 'Panduan Lapor Pajak Investasi: Saham, Reksa Dana, dan Obligasi',
    ringkasan: 'Investor wajib melaporkan penghasilan dari investasi dalam SPT Tahunan. Pelajari jenis pajak investasi, mana yang bersifat final, dan cara melaporkannya dengan benar.',
    tanggal: '2024-11-22',
    waktuBaca: 8,
    tags: ['pajak investasi', 'SPT saham', 'pajak reksa dana', 'pajak dividen', 'laporan pajak'],
    konten: [
      { type: 'paragraph', text: 'Setiap investor yang memperoleh penghasilan dari investasi wajib melaporkan dan membayar pajak yang timbul. Memahami jenis-jenis pajak investasi penting agar kamu tidak kena sanksi keterlambatan atau kurang bayar.' },
      { type: 'table', headers: ['Instrumen', 'Jenis Penghasilan', 'Tarif', 'Sifat'], rows: [['Saham', 'Keuntungan jual (capital gain)', '0.1% dari nilai jual (bukan profit)', 'PPh Final'], ['Saham', 'Dividen dari PT tbk', '10%', 'PPh Final (dipotong emiten)'], ['Reksa Dana', 'Keuntungan penjualan unit', '0% (sementara)', 'Tidak kena pajak*'], ['Obligasi', 'Bunga/kupon', '10%', 'PPh Final (dipotong penerbit)'], ['Deposito', 'Bunga', '20%', 'PPh Final (dipotong bank)']] },
      { type: 'callout', variant: 'info', judul: 'PPh Final vs PPh Tidak Final', text: 'PPh final artinya pajak sudah "selesai" saat dipotong — tidak perlu dilaporkan lagi sebagai penghasilan di SPT. Tapi dokumen bukti potong tetap harus disimpan. PPh tidak final harus digabung dengan penghasilan lain di SPT.' },
      { type: 'key-takeaway', points: ['Pajak saham 0.1% dihitung dari nilai jual, bukan profit — bahkan kalau rugi tetap kena pajak', 'Reksa dana saat ini tidak dikenakan pajak capital gain (kebijakan bisa berubah)', 'Semua PPh final tidak perlu dilaporkan sebagai penghasilan di SPT Tahunan', 'Simpan semua bukti potong pajak dari broker, bank, dan penerbit obligasi'] },
      { type: 'tool-cta', nama: 'Investment Tax Report Generator', href: '/pajak/investment-tax-report-generator', desc: 'Hitung estimasi pajak dari semua instrumen investasi kamu dalam satu tempat.' },
    ],
  },
  {
    slug: 'tips-optimasi-pajak-legal-indonesia',
    kategori: 'pajak',
    judul: 'Tips Optimasi Pajak yang Legal untuk Karyawan dan Investor Indonesia',
    ringkasan: 'Optimasi pajak berbeda dari penggelapan pajak. Ada banyak cara legal untuk mengurangi beban pajak yang sering diabaikan karyawan dan investor Indonesia.',
    tanggal: '2024-11-29',
    waktuBaca: 7,
    tags: ['optimasi pajak', 'tax planning', 'hemat pajak legal', 'perencanaan pajak'],
    konten: [
      { type: 'paragraph', text: 'Tax planning atau perencanaan pajak adalah upaya legal untuk meminimalkan beban pajak dengan memanfaatkan ketentuan perpajakan yang berlaku. Ini berbeda 180 derajat dari penggelapan pajak yang ilegal.' },
      { type: 'heading', level: 2, text: 'Cara Legal Mengurangi PPh 21' },
      { type: 'step-list', steps: [{ judul: 'Manfaatkan Tunjangan Natura', desc: 'Tunjangan dalam bentuk natura (bukan uang) seperti makan siang, fasilitas kesehatan, dan transportan antar jemput tidak masuk objek PPh 21.' }, { judul: 'Iuran BPJS Kesehatan & Ketenagakerjaan', desc: 'Iuran yang dibayar perusahaan tidak termasuk penghasilan kena pajak. Iuran dari karyawan bisa dikurangkan dari PKP.' }, { judul: 'Manfaatkan Zakat sebagai Pengurang PKP', desc: 'Zakat yang dibayar melalui BAZNAS atau LAZ resmi dapat mengurangi PKP — sama efektifnya dengan PTKP tambahan.' }, { judul: 'Optimalkan PTKP', desc: 'Pastikan status PTKP di kantor sudah sesuai — kawin dan jumlah tanggungan yang benar bisa menghemat jutaan rupiah per tahun.' }] },
      { type: 'callout', variant: 'tip', judul: 'Reksa Dana untuk Penangguhan Pajak', text: 'Keuntungan reksa dana saat ini tidak dikenakan PPh. Ini menjadikan reksa dana sebagai instrumen "tax-efficient" yang menarik untuk investasi jangka panjang dibanding deposito yang kena PPh 20%.' },
      { type: 'key-takeaway', points: ['Zakat yang dibayar melalui lembaga resmi bisa mengurangi PPh — manfaatkan ini', 'Reksa dana lebih tax-efficient dari deposito karena tidak kena PPh capital gain', 'Pastikan status PTKP di perusahaan sudah update dengan kondisi terkini', 'Konsultasikan dengan konsultan pajak untuk optimasi yang lebih kompleks'] },
      { type: 'tool-cta', nama: 'Zakat & Tax Planner', href: '/pajak/zakat-tax-planner', desc: 'Hitung kewajiban zakat dan bagaimana pengaruhnya terhadap pajak penghasilan kamu.' },
    ],
  },

  // ══════════════════════════════════════
  // KEUANGAN PRIBADI (3 artikel)
  // ══════════════════════════════════════
  {
    slug: 'panduan-dana-darurat-berapa-yang-harus-disiapkan',
    kategori: 'keuangan-pribadi',
    judul: 'Panduan Dana Darurat: Berapa yang Harus Disiapkan dan Di Mana Menyimpannya',
    ringkasan: 'Dana darurat adalah fondasi keuangan yang sering diabaikan. Pelajari berapa bulan pengeluaran yang ideal, di mana menyimpannya agar tetap menghasilkan, dan cara membangunnya dari nol.',
    tanggal: '2024-11-20',
    waktuBaca: 7,
    tags: ['dana darurat', 'emergency fund', 'keuangan pribadi', 'reksa dana pasar uang'],
    konten: [
      { type: 'callout', variant: 'danger', judul: 'Dana Darurat adalah Keharusan, Bukan Pilihan', text: 'Jangan mulai investasi apapun sebelum memiliki dana darurat. Tanpa buffer ini, kamu akan terpaksa cairkan investasi saat darurat — sering di saat harga aset sedang turun dan kamu harus "jual rugi".' },
      { type: 'table', headers: ['Profil', 'Target', 'Alasan'], rows: [['Karyawan tetap, perusahaan besar', '3 bulan pengeluaran wajib', 'Penghasilan stabil, mudah cari kerja baru'], ['Karyawan kontrak / freelancer', '6 bulan', 'Penghasilan tidak menentu'], ['Menanggung keluarga (pasangan tidak bekerja)', '6 bulan', 'Tanggung jawab lebih besar'], ['Pengusaha / wiraswasta', '9–12 bulan', 'Bisnis bisa stuck berbulan-bulan']] },
      { type: 'heading', level: 2, text: 'Di Mana Menyimpan Dana Darurat?' },
      { type: 'comparison', judul: 'Reksa Dana Pasar Uang vs Tabungan Biasa', items: [{ nama: 'Reksa Dana Pasar Uang — Terbaik', pros: ['Return 4–6% per tahun', 'Bisa dicairkan dalam 1–2 hari kerja', 'Risiko sangat rendah', 'Return jauh di atas tabungan biasa'], cons: ['Tidak bisa tarik tunai langsung', 'Proses pencairan 1–2 hari kerja'] }, { nama: 'Tabungan Bank Terpisah — Cukup', pros: ['Akses instan kapanpun', 'Dijamin LPS hingga Rp 2 miliar'], cons: ['Bunga hanya 1–2% per tahun', 'Terlalu mudah diakses dan habis untuk non-darurat'] }] },
      { type: 'key-takeaway', points: ['Bangun dana darurat sebelum mulai investasi apapun — ini prioritas nomor 1', 'Target 3 bulan untuk karyawan tetap, 6+ bulan untuk freelancer dan pengusaha', 'Reksa dana pasar uang adalah pilihan terbaik: return lebih tinggi, tetap liquid', 'Wajib di rekening/akun terpisah — jangan campur dengan uang sehari-hari'] },
      { type: 'tool-cta', nama: 'Emergency Shield Builder', href: '/personal-finance/emergency-shield-builder', desc: 'Hitung target dana darurat yang tepat dan berapa lama kamu butuh untuk mencapainya.' },
    ],
  },
  {
    slug: 'apa-itu-fire-dan-cara-menghitungnya',
    kategori: 'keuangan-pribadi',
    judul: 'Apa itu FIRE dan Cara Menghitung Berapa yang Kamu Butuhkan untuk Pensiun Dini',
    ringkasan: 'FIRE (Financial Independence, Retire Early) adalah gerakan kebebasan finansial yang memungkinkan pensiun jauh sebelum usia 60. Pelajari cara kerja aturan 4%, hitung FIRE number kamu, dan langkah praktis memulainya.',
    tanggal: '2024-11-27',
    waktuBaca: 9,
    tags: ['FIRE', 'financial independence', 'pensiun dini', 'FIRE number', '4% rule'],
    konten: [
      { type: 'paragraph', text: 'FIRE adalah gerakan keuangan yang bertujuan mencapai kebebasan finansial dan kemampuan pensiun jauh lebih awal dari usia pensiun konvensional. Bukan berarti tidak bekerja sama sekali — lebih tepatnya memiliki pilihan untuk tidak perlu bekerja demi uang.' },
      { type: 'stat-highlight', items: [{ angka: '4%', label: 'Safe Withdrawal Rate yang digunakan', sublabel: 'Aturan 4% dari riset Trinity Study 1998' }, { angka: '25×', label: 'Penghasilan tahunan = FIRE Number', sublabel: 'Karena 1/4% = 25' }] },
      { type: 'formula-box', formula: 'FIRE Number = Pengeluaran Tahunan × 25\nATAU\nFIRE Number = Pengeluaran Tahunan ÷ 4%', contoh: 'Pengeluaran Rp 10 juta/bulan = Rp 120 juta/tahun\nFIRE Number = Rp 120 juta × 25 = Rp 3 MILIAR\n\nPengeluaran Rp 5 juta/bulan = Rp 60 juta/tahun\nFIRE Number = Rp 60 juta × 25 = Rp 1.5 MILIAR' },
      { type: 'heading', level: 2, text: 'Jenis-jenis FIRE' },
      { type: 'table', headers: ['Tipe FIRE', 'Pengeluaran', 'Gaya Hidup'], rows: [['Lean FIRE', '< Rp 5 juta/bulan', 'Hidup sederhana, minimalis'], ['Regular FIRE', 'Rp 5–15 juta/bulan', 'Nyaman, tidak mewah'], ['Fat FIRE', '> Rp 15 juta/bulan', 'Mewah, tidak ada kompromi'], ['Coast FIRE', 'Variabel', 'Sudah ada cukup investasi yang "coast" ke target']] },
      { type: 'key-takeaway', points: ['FIRE Number = pengeluaran tahunan × 25 (berdasarkan 4% safe withdrawal rate)', 'Semakin banyak kamu menabung dan berinvestasi, semakin cepat FIRE tercapai', 'Kurangi pengeluaran sama efektifnya dengan naikkan penghasilan untuk FIRE', 'FIRE bukan tentang tidak bekerja, tapi tentang pilihan — bekerja karena mau, bukan karena harus'] },
      { type: 'tool-cta', nama: 'Wealth Freedom Planner', href: '/personal-finance/wealth-freedom-planner', desc: 'Hitung FIRE number kamu dan simulasikan berapa lama waktu untuk mencapainya.' },
    ],
  },
  {
    slug: 'cara-membuat-anggaran-bulanan-yang-benar',
    kategori: 'keuangan-pribadi',
    judul: 'Cara Membuat Anggaran Bulanan yang Benar: Lebih dari Sekadar 50-30-20',
    ringkasan: 'Anggaran bulanan bukan tentang membatasi hidup — tapi memberi kamu kontrol dan pilihan. Pelajari cara membuat anggaran yang realistis dan bisa bertahan lama.',
    tanggal: '2024-12-04',
    waktuBaca: 7,
    tags: ['anggaran bulanan', 'budgeting', 'keuangan pribadi', '50 30 20', 'manajemen uang'],
    konten: [
      { type: 'paragraph', text: 'Kebanyakan orang gagal membuat anggaran bukan karena kurang disiplin, tapi karena anggaran yang dibuat terlalu ketat, tidak realistis, atau tidak memperhitungkan pengeluaran tidak terduga. Anggaran yang baik memberikan ruang untuk semua aspek kehidupan.' },
      { type: 'heading', level: 2, text: 'Aturan 50-30-20 sebagai Titik Mulai' },
      { type: 'table', headers: ['Kategori', 'Persentase', 'Isi'], rows: [['Kebutuhan', '50%', 'Makan, sewa, cicilan wajib, tagihan, transportasi kerja'], ['Keinginan', '30%', 'Hiburan, makan di luar, liburan, hobi, belanja fashion'], ['Tabungan & Investasi', '20%', 'Dana darurat, investasi, pelunasan utang extra']] },
      { type: 'callout', variant: 'tip', judul: 'Sesuaikan dengan Kondisi Nyata', text: '50-30-20 adalah panduan awal, bukan hukum. Untuk penghasilan rendah di kota besar, 50% mungkin tidak cukup untuk kebutuhan. Untuk penghasilan tinggi, 20% tabungan mungkin terlalu kecil. Sesuaikan selalu dengan kondisi dan tujuan finansial kamu.' },
      { type: 'step-list', steps: [{ judul: 'Catat Semua Pengeluaran 1 Bulan', desc: 'Sebelum membuat anggaran, pahami dulu ke mana uang pergi selama ini. Gunakan aplikasi catatan atau spreadsheet sederhana.' }, { judul: 'Kategorikan Pengeluaran', desc: 'Pisahkan kebutuhan vs keinginan. Jujurlah — banyak "kebutuhan" yang sebenarnya keinginan.' }, { judul: 'Tetapkan Prioritas', desc: 'Bayar diri sendiri dulu (tabungan) sebelum pengeluaran lain. Sisihkan otomatis di awal bulan.' }, { judul: 'Review Setiap Bulan', desc: 'Anggaran yang baik adalah yang di-review dan disesuaikan secara rutin, bukan dokumen statis.' }] },
      { type: 'key-takeaway', points: ['Catat pengeluaran aktual sebelum membuat anggaran — banyak yang kaget melihat hasilnya', 'Bayar diri sendiri (tabungan/investasi) di awal bulan, bukan sisa di akhir', 'Anggaran yang tidak realistis tidak akan bertahan — beri ruang untuk keinginan', 'Review dan sesuaikan anggaran setiap bulan berdasarkan kondisi aktual'] },
      { type: 'tool-cta', nama: 'Budget Architect', href: '/personal-finance/budget-architect', desc: 'Buat anggaran bulanan dengan aturan 50-30-20 dan analisa komposisi pengeluaranmu.' },
    ],
  },

  // ══════════════════════════════════════
  // KRIPTO (3 artikel)
  // ══════════════════════════════════════
  {
    slug: 'panduan-dca-bitcoin-untuk-pemula',
    kategori: 'kripto',
    judul: 'Panduan DCA Bitcoin untuk Pemula: Cara Investasi Kripto yang Lebih Aman',
    ringkasan: 'DCA adalah strategi paling direkomendasikan untuk investor kripto pemula. Pelajari cara kerjanya, platform yang bisa digunakan di Indonesia, dan berapa alokasi kripto yang wajar.',
    tanggal: '2024-11-25',
    waktuBaca: 8,
    tags: ['DCA bitcoin', 'investasi kripto', 'bitcoin pemula', 'Pintu', 'Indodax'],
    konten: [
      { type: 'stat-highlight', items: [{ angka: '93%', label: 'Periode 4 tahun DCA Bitcoin yang profit', sublabel: 'Bahkan jika mulai di puncak harga tertinggi' }, { angka: '5–10%', label: 'Alokasi kripto yang wajar dalam portofolio', sublabel: 'Untuk investor dengan profil moderat' }] },
      { type: 'callout', variant: 'warning', judul: 'Kripto Bukan untuk Semua Orang', text: 'Bitcoin bisa turun 70–80% dalam bear market. Jangan investasikan uang yang dibutuhkan dalam waktu dekat, dan pastikan kamu siap secara mental melihat nilai investasi turun signifikan sebelum naik kembali.' },
      { type: 'table', headers: ['Platform', 'Min. DCA', 'Auto-invest', 'Keunggulan'], rows: [['Pintu', 'Rp 11.000', 'Ya', 'Paling ramah pemula, UI sederhana'], ['Indodax', 'Rp 10.000', 'Ya', 'Volume terbesar Indonesia, pilihan aset terbanyak'], ['Tokocrypto', 'Rp 10.000', 'Ya', 'Ada fitur staking dan copy trading']] },
      { type: 'comparison', judul: 'Bitcoin & ETH vs Altcoin Kecil untuk DCA', items: [{ nama: 'Bitcoin & Ethereum — Direkomendasikan', pros: ['Proyek paling matang dengan track record terpanjang', 'Likuiditas tertinggi — mudah dijual kapanpun', 'Risiko proyek gagal sangat kecil'], cons: ['Potensi return lebih kecil dari altcoin baru yang berhasil'] }, { nama: 'Altcoin Kecil — Tidak untuk Pemula', pros: ['Potensi return sangat besar jika proyek berhasil'], cons: ['Risiko proyek gagal atau rug pull sangat tinggi', 'Likuiditas rendah, spread lebar', 'Rentan manipulasi'] }] },
      { type: 'key-takeaway', points: ['DCA menghilangkan kebutuhan market timing kripto yang sangat volatile', 'Alokasi kripto maksimal 5–10% dari total portofolio untuk investor moderat', 'Mulai dari Bitcoin dan Ethereum sebelum eksplorasi altcoin', 'Gunakan hanya platform terdaftar Bappebti untuk keamanan dana'] },
      { type: 'tool-cta', nama: 'Crypto DCA Simulator', href: '/kripto/crypto-dca-simulator', desc: 'Simulasikan berapa koin terkumpul dan nilai portofolio kripto kamu di berbagai skenario harga.' },
    ],
  },
  {
    slug: 'memahami-risiko-investasi-kripto',
    kategori: 'kripto',
    judul: 'Memahami Risiko Investasi Kripto yang Sering Diabaikan Investor Pemula',
    ringkasan: 'Kripto menawarkan potensi return luar biasa tapi juga risiko yang tidak ditemukan di aset konvensional. Pelajari risiko-risiko utama kripto dan cara mengelolanya dengan bijak.',
    tanggal: '2024-12-02',
    waktuBaca: 8,
    tags: ['risiko kripto', 'kripto Indonesia', 'manajemen risiko kripto', 'keamanan kripto'],
    konten: [
      { type: 'paragraph', text: 'Kripto adalah aset paling volatile yang tersedia untuk investor ritel. Bitcoin pernah turun 83% dari puncaknya pada 2018, dan 77% pada 2022. Memahami risiko secara mendalam — bukan sekadar "volatilitas tinggi" — adalah prasyarat investasi kripto yang bertanggung jawab.' },
      { type: 'heading', level: 2, text: 'Jenis-jenis Risiko Kripto' },
      { type: 'step-list', steps: [{ judul: 'Risiko Pasar (Volatilitas)', desc: 'Harga bisa turun 50–80% dalam hitungan minggu. Berbeda dari saham yang penurunan 30% sudah dianggap ekstrem, penurunan 50% di kripto adalah hal biasa dalam bear market.' }, { judul: 'Risiko Regulasi', desc: 'Regulasi kripto masih berkembang di Indonesia dan global. Kebijakan baru bisa sangat mempengaruhi harga — larangan di satu negara besar bisa memicu penurunan pasar global.' }, { judul: 'Risiko Counterparty (Exchange)', desc: 'Exchange kripto bisa bangkrut atau di-hack. FTX 2022 adalah contoh terbaru — miliaran dolar dana nasabah hilang. Gunakan hanya exchange terdaftar dan pertimbangkan cold wallet untuk jumlah besar.' }, { judul: 'Risiko Proyek (Altcoin)', desc: 'Berbeda dari Bitcoin yang sudah terbukti 15+ tahun, kebanyakan altcoin adalah proyek baru yang bisa gagal, ditinggalkan pengembang, atau ternyata scam (rug pull).' }] },
      { type: 'callout', variant: 'danger', judul: 'Tanda-tanda Scam Kripto yang Harus Dihindari', text: 'Janji return tetap yang "pasti" (tidak ada investasi yang pasti). Token baru dengan whitepaper samar. Tim anonim tanpa track record. Tekanan untuk segera invest sebelum "kehabisan". Skema referral MLM. Tidak ada audit kode smart contract.' },
      { type: 'key-takeaway', points: ['Investasikan hanya uang yang benar-benar siap hilang 100%', 'Diversifikasi di kripto: jangan taruh semua di satu aset', 'Gunakan exchange terdaftar Bappebti dan pertimbangkan hardware wallet', 'DYOR (Do Your Own Research) — jangan ikut influencer atau "sinyal" tanpa riset mandiri'] },
      { type: 'tool-cta', nama: 'Crypto Risk Manager', href: '/kripto/crypto-risk-manager', desc: 'Hitung ukuran posisi kripto yang aman berdasarkan modal dan toleransi risiko kamu.' },
    ],
  },
  {
    slug: 'mengenal-staking-kripto-passive-income',
    kategori: 'kripto',
    judul: 'Mengenal Staking Kripto: Cara Kerja, Risiko, dan Potensi Passive Income',
    ringkasan: 'Staking memungkinkan kamu mendapat reward kripto hanya dengan menyimpan koin tertentu. Pelajari cara kerja proof of stake, APY realistis, dan risiko yang perlu dipahami sebelum staking.',
    tanggal: '2024-12-09',
    waktuBaca: 7,
    tags: ['staking kripto', 'proof of stake', 'passive income kripto', 'APY staking', 'ETH staking'],
    konten: [
      { type: 'paragraph', text: 'Staking adalah proses mengunci koin kripto untuk berpartisipasi dalam validasi transaksi di blockchain Proof of Stake (PoS). Sebagai imbalannya, kamu mendapat reward berupa koin tambahan — mirip bunga deposito tapi dengan risiko yang sangat berbeda.' },
      { type: 'table', headers: ['Koin', 'Mekanisme', 'APY Estimasi', 'Lock-up'], rows: [['Ethereum (ETH)', 'Native staking / liquid staking', '3–5%', 'Tidak ada (liquid staking)'], ['Solana (SOL)', 'Delegated staking', '6–8%', 'Tidak ada (unbonding ~3 hari)'], ['Cardano (ADA)', 'Delegated staking', '3–5%', 'Tidak ada'], ['Cosmos (ATOM)', 'Delegated staking', '15–20%', 'Unbonding 21 hari'], ['Polkadot (DOT)', 'Nominated proof of stake', '12–15%', 'Unbonding 28 hari']] },
      { type: 'callout', variant: 'warning', judul: 'APY Tinggi Bukan Berarti Untung', text: 'APY 20% terdengar menggiurkan, tapi jika harga koin turun 50%, kamu tetap rugi secara keseluruhan meski reward staking tinggi. Selalu hitung return dalam mata uang fiat (Rupiah), bukan hanya dalam unit koin.' },
      { type: 'key-takeaway', points: ['Staking hanya cocok untuk koin yang sudah kamu yakini akan dipegang jangka panjang', 'Hitung return dalam Rupiah, bukan hanya dalam APY koin', 'Liquid staking (seperti Lido untuk ETH) menawarkan fleksibilitas tanpa lock-up', 'Exchange staking lebih mudah tapi ada risiko counterparty exchange bangkrut'] },
      { type: 'tool-cta', nama: 'Staking Reward Projector', href: '/kripto/staking-reward-projector', desc: 'Proyeksikan reward staking kamu dan bandingkan compound vs non-compound dalam berbagai periode.' },
    ],
  },

  // ══════════════════════════════════════
  // EKONOMI & PASAR (3 artikel)
  // ══════════════════════════════════════
  {
    slug: 'memahami-inflasi-dan-dampaknya-ke-investasi',
    kategori: 'ekonomi-pasar',
    judul: 'Memahami Inflasi dan Dampaknya terhadap Investasi di Indonesia',
    ringkasan: 'Inflasi menggerus nilai uang secara diam-diam setiap tahun. Pelajari cara kerja inflasi, sejarah inflasi Indonesia, dan instrumen investasi mana yang bisa melindungi daya beli kamu.',
    tanggal: '2024-11-30',
    waktuBaca: 9,
    tags: ['inflasi', 'Bank Indonesia', 'daya beli', 'instrumen investasi', 'makroekonomi'],
    konten: [
      { type: 'paragraph', text: 'Inflasi adalah kenaikan harga secara umum dan terus-menerus dalam suatu perekonomian. Dalam jangka pendek terasa kecil, tapi dalam 10–20 tahun, inflasi bisa menggerus nilai uang secara dramatis — bahkan uang yang disimpan di tabungan pun tidak aman.' },
      { type: 'stat-highlight', items: [{ angka: '2–4%', label: 'Target inflasi Bank Indonesia', sublabel: 'Rentang sasaran resmi BI' }, { angka: '32%', label: 'Penurunan daya beli dalam 10 tahun', sublabel: 'Asumsi inflasi rata-rata 4% per tahun' }] },
      { type: 'grafik-garis', judul: 'Inflasi Indonesia 2015–2024 (%)', labelY: 'Inflasi (%)', data: [{ label: '2015', nilai: 3.35 }, { label: '2016', nilai: 3.02 }, { label: '2017', nilai: 3.61 }, { label: '2018', nilai: 3.13 }, { label: '2019', nilai: 2.72 }, { label: '2020', nilai: 1.68 }, { label: '2021', nilai: 1.87 }, { label: '2022', nilai: 5.51 }, { label: '2023', nilai: 2.61 }, { label: '2024', nilai: 2.84 }], seri: [{ key: 'nilai', nama: 'Inflasi Aktual', warna: '#10b981' }] },
      { type: 'table', headers: ['Instrumen', 'Return Historis', 'vs Inflasi 4%', 'Catatan'], rows: [['Tabungan bank', '1–2%/thn', '❌ Kalah', 'Daya beli berkurang setiap tahun'], ['Deposito', '4–6%/thn', '⚠️ Impas', 'Setelah pajak 20%, return riil sangat tipis'], ['SBN (ORI/SBR)', '5–7%/thn', '✅ Tipis', 'Aman dan lebih efisien dari deposito'], ['Emas', '8–10%/thn', '✅ Menang', 'Lindung nilai jangka panjang yang terbukti'], ['Reksa Dana Saham', '12–18%/thn', '✅ Besar', 'Potensi terbesar tapi risiko juga tertinggi']] },
      { type: 'callout', variant: 'info', judul: 'Real Return: Yang Benar-benar Kamu Dapatkan', text: 'Return riil = Return nominal - Inflasi. Deposito 5% saat inflasi 4% hanya memberikan return riil 1%. Setelah pajak deposito 20%, return nominal jadi 4% dan return riil hampir 0%. Kamu tidak kehilangan uang, tapi daya belinya stagnan.' },
      { type: 'key-takeaway', points: ['Inflasi adalah musuh diam-diam uang yang tidak diinvestasikan', 'Target inflasi BI 2–4% harus jadi benchmark minimum return investasi kamu', 'Tabungan biasa dan deposito setelah pajak sering tidak mengalahkan inflasi', 'Reksa dana saham dan emas secara historis mengalahkan inflasi jangka panjang di Indonesia'] },
      { type: 'tool-cta', nama: 'Inflation Guard', href: '/personal-finance/inflation-guard', desc: 'Visualisasikan penurunan daya beli uangmu dan temukan instrumen yang melindunginya.' },
    ],
  },
  {
    slug: 'memahami-suku-bunga-bi-rate-dan-investasi',
    kategori: 'ekonomi-pasar',
    judul: 'Memahami BI Rate dan Dampaknya terhadap Investasi Saham, Obligasi, dan Properti',
    ringkasan: 'Suku bunga acuan Bank Indonesia (BI Rate) adalah salah satu variabel terpenting yang mempengaruhi hampir semua kelas aset. Pelajari mekanismenya dan cara menyesuaikan strategi investasi.',
    tanggal: '2024-12-07',
    waktuBaca: 8,
    tags: ['BI Rate', 'suku bunga', 'Bank Indonesia', 'dampak investasi', 'kebijakan moneter'],
    konten: [
      { type: 'paragraph', text: 'BI Rate adalah suku bunga acuan yang ditetapkan Bank Indonesia dalam Rapat Dewan Gubernur (RDG) setiap bulan. Perubahan BI Rate ibarat memutar volume di seluruh perekonomian — naik untuk "mendinginkan", turun untuk "memanaskan".' },
      { type: 'heading', level: 2, text: 'Bagaimana BI Rate Mempengaruhi Setiap Kelas Aset' },
      { type: 'table', headers: ['Kelas Aset', 'Saat BI Rate Naik', 'Saat BI Rate Turun'], rows: [['Saham', 'Cenderung turun (cost of capital naik)', 'Cenderung naik (valuasi lebih menarik)'], ['Obligasi', 'Harga turun, yield naik', 'Harga naik, yield turun'], ['Properti', 'KPR mahal, permintaan turun', 'KPR murah, permintaan naik'], ['Deposito & SBN', 'Return naik (menarik)', 'Return turun (kurang menarik)'], ['Emas', 'Cenderung tertekan', 'Cenderung menguat'], ['Kripto', 'Cenderung turun (risk-off)', 'Cenderung naik (risk-on)']] },
      { type: 'callout', variant: 'tip', judul: 'Strategi Rotasi Aset berdasarkan BI Rate', text: 'Saat BI Rate tinggi: SBN dan deposito menarik karena return kompetitif dengan risiko rendah. Saat BI Rate mulai dipangkas: saham dan properti menjadi lebih menarik karena cost of capital turun dan valuasi mengikuti.' },
      { type: 'key-takeaway', points: ['BI Rate mempengaruhi hampir semua kelas aset — pahami sebelum berinvestasi', 'Kenaikan BI Rate menguntungkan pemegang SBN baru dan deposito', 'Penurunan BI Rate biasanya jadi katalis positif untuk saham dan properti', 'Diversifikasi antar kelas aset membantu menavigasi perubahan siklus suku bunga'] },
      { type: 'tool-cta', nama: 'SBN Maturity Planner', href: '/investasi/sbn-maturity-planner', desc: 'Hitung berapa imbal hasil SBN yang kamu dapatkan berdasarkan kupon dan tenor yang dipilih.' },
    ],
  },
  {
    slug: 'siklus-ekonomi-dan-strategi-investasi',
    kategori: 'ekonomi-pasar',
    judul: 'Mengenal Siklus Ekonomi dan Cara Menyesuaikan Strategi Investasi',
    ringkasan: 'Ekonomi bergerak dalam siklus yang berulang: ekspansi, puncak, kontraksi, dan pemulihan. Memahami posisi kita dalam siklus ini membantu mengambil keputusan investasi yang lebih baik.',
    tanggal: '2024-12-14',
    waktuBaca: 9,
    tags: ['siklus ekonomi', 'business cycle', 'strategi investasi', 'makroekonomi', 'resesi'],
    konten: [
      { type: 'paragraph', text: 'Ekonomi tidak bergerak lurus ke atas — ia bergerak dalam siklus yang berulang. Memahami fase mana yang sedang terjadi membantu investor membuat keputusan alokasi aset yang lebih tepat waktu.' },
      { type: 'step-list', steps: [{ judul: 'Ekspansi', desc: 'GDP tumbuh, pengangguran turun, konsumsi meningkat, perusahaan profitable. Saham pertumbuhan dan properti biasanya outperform.' }, { judul: 'Puncak (Peak)', desc: 'Ekonomi di titik tertinggi. Inflasi mulai naik, bank sentral mulai ketatkan kebijakan. Waktunya mulai defensif.' }, { judul: 'Kontraksi/Resesi', desc: 'GDP turun dua kuartal berturut-turut. Pengangguran naik, kredit ketat. Obligasi pemerintah dan emas relatif aman.' }, { judul: 'Pemulihan (Recovery)', desc: 'Ekonomi mulai tumbuh lagi dari titik terendah. Saham siklikal dan properti biasanya yang pertama bangkit.' }] },
      { type: 'table', headers: ['Fase', 'Aset yang Cenderung Baik', 'Aset yang Perlu Hati-hati'], rows: [['Ekspansi', 'Saham pertumbuhan, properti, kripto', 'Obligasi jangka panjang'], ['Puncak', 'Saham defensif, komoditas, emas', 'Saham pertumbuhan, properti'], ['Kontraksi', 'Obligasi pemerintah, emas, kas', 'Saham siklikal, kripto'], ['Pemulihan', 'Saham siklikal, saham keuangan', 'Obligasi (yield mulai naik)']] },
      { type: 'callout', variant: 'info', judul: 'Tidak Ada yang Bisa Timing Pasar dengan Sempurna', text: 'Bahkan ekonom terbaik sering salah memprediksi siklus ekonomi. Strategi yang lebih bijak: diversifikasi antar kelas aset dan lakukan DCA konsisten — bukan all-in di satu fase siklus.' },
      { type: 'key-takeaway', points: ['Ekonomi bergerak dalam siklus — ekspansi, puncak, kontraksi, pemulihan', 'Diversifikasi aset membantu portofolio lebih resilient di semua fase siklus', 'Indikator utama: GDP growth, inflasi, pengangguran, dan kebijakan bank sentral', 'Jangan coba timing pasar — DCA konsisten tetap strategi terbaik jangka panjang'] },
      { type: 'tool-cta', nama: 'Inflation Guard', href: '/personal-finance/inflation-guard', desc: 'Analisa dampak inflasi terhadap daya beli uangmu dan instrumen yang melindunginya.' },
    ],
  },
]

// ─── Helper Functions ─────────────────────────────

export function getArtikelByKategori(kategori: KategoriArtikel): Artikel[] {
  return artikelDatabase.filter(a => a.kategori === kategori)
}

export function getArtikelBySlug(kategoriOrSlug: string, slug?: string): Artikel | undefined {
  if (slug) return artikelDatabase.find(a => a.kategori === kategoriOrSlug && a.slug === slug)
  return artikelDatabase.find(a => a.slug === kategoriOrSlug)
}

export function getAllKategoriArtikel(): KategoriArtikel[] {
  return ['investasi', 'saham-bursa', 'trading', 'pajak', 'keuangan-pribadi', 'kripto', 'ekonomi-pasar']
}

export function getArtikelTerbaru(limit = 3): Artikel[] {
  return [...artikelDatabase]
    .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
    .slice(0, limit)
}

export function getAllArtikel(): Artikel[] {
  return artikelDatabase
}

export function getArtikelTerkait(artikel: Artikel, limit = 3): Artikel[] {
  return artikelDatabase
    .filter(a => a.kategori === artikel.kategori && a.slug !== artikel.slug)
    .slice(0, limit)
}

// Overload untuk support (kategori, slug) dari Part 5 pages
export function getArtikelByKategoriSlug(kategori: string, slug: string): Artikel | undefined {
  return artikelDatabase.find(a => a.kategori === kategori && a.slug === slug)
}
