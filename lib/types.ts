/**
 * FincTools v2 — Master Types
 * Semua TypeScript types untuk seluruh project
 */

// ─── Tool Types ───────────────────────────────────

export type KategoriTool =
  | 'trading'
  | 'pajak'
  | 'investasi'
  | 'personal-finance'
  | 'kredit-properti'
  | 'saham'
  | 'kripto'

export type TipeTool =
  | 'K'      // Pure Kalkulator
  | 'A'      // Pure Analisa
  | 'K+A'    // Kalkulator + Analisa
  | 'S+G'    // Simulasi + Grafik
  | 'K+G'    // Kalkulator + Grafik
  | 'A+G'    // Analisa + Grafik
  | 'K+A+G'  // Kalkulator + Analisa + Grafik
  | 'S+A+G'  // Simulasi + Analisa + Grafik

export interface ToolStep {
  title: string
  desc:  string
}

export interface ToolFAQ {
  q: string
  a: string
}

export interface ToolVariable {
  name: string
  desc: string
}

export interface ToolInterpretation {
  range: string
  label: string
  desc:  string
}

export interface RelatedTool {
  name: string
  href: string
  desc: string
}

export interface ToolData {
  slug:               string
  kategori:           KategoriTool
  name:               string
  description:        string
  tipe:               TipeTool
  tombol:             string
  keywords:           string[]
  steps:              ToolStep[]
  formula:            string
  formulaExample?:    string
  variables:          ToolVariable[]
  history:            string
  interpretation?:    ToolInterpretation[]
  interpretationTitle?: string
  faqs:               ToolFAQ[]
  related:            RelatedTool[]
  references:         string[]
  dateVerified:       string
}

// ─── Kategori Config ──────────────────────────────

export interface KategoriToolConfig {
  nama:        string
  slug:        KategoriTool
  deskripsi:   string
  warna:       string      // Tailwind color name
  iconBg:      string      // CSS class
  badge:       string      // CSS class
  jumlah:      number
  featured:    string[]    // tool slugs
}

// ─── Hasil Analisa ────────────────────────────────

export type AnalisisLevel = 'baik' | 'perhatian' | 'buruk'

export interface HasilAnalisis {
  level:       AnalisisLevel
  diagnosa:    string
  penjelasan:  string
  rekomendasi: string[]
}

// ─── Article Types ────────────────────────────────

export type KategoriArtikel =
  | 'investasi'
  | 'saham-bursa'
  | 'trading'
  | 'pajak'
  | 'keuangan-pribadi'
  | 'kripto'
  | 'ekonomi-pasar'

export interface KategoriArtikelConfig {
  nama:         string
  slug:         KategoriArtikel
  deskripsi:    string
  gradientFrom: string
  gradientTo:   string
  badge:        string
  toolHref?:    string
}

// Article content block types
export type KontenParagraf    = { type: 'paragraph';      text: string }
export type KontenHeading     = { type: 'heading';        level: 2 | 3; text: string }
export type KontenCallout     = { type: 'callout';        variant: 'info' | 'tip' | 'warning' | 'danger'; judul?: string; text: string }
export type KontenTable       = { type: 'table';          headers: string[]; rows: string[][] }
export type KontenStepList    = { type: 'step-list';      steps: { judul: string; desc: string }[] }
export type KontenFormulaBox  = { type: 'formula-box';    formula: string; contoh?: string }
export type KontenStatHL      = { type: 'stat-highlight'; items: { angka: string; label: string; sublabel?: string }[] }
export type KontenComparison  = { type: 'comparison';     judul?: string; items: { nama: string; pros: string[]; cons: string[] }[] }
export type KontenKeyTakeaway = { type: 'key-takeaway';   points: string[] }
export type KontenToolCTA     = { type: 'tool-cta';       nama: string; href: string; desc: string }
export type KontenGrafikGaris = { type: 'grafik-garis';   judul: string; data: { label: string; nilai: number; nilai2?: number }[]; labelY?: string; seri?: { key: 'nilai' | 'nilai2'; nama: string; warna: string }[] }
export type KontenGrafikBatang= { type: 'grafik-batang';  judul: string; data: { label: string; nilai: number }[]; labelY?: string; warna?: string }

export type KontenBlock =
  | KontenParagraf
  | KontenHeading
  | KontenCallout
  | KontenTable
  | KontenStepList
  | KontenFormulaBox
  | KontenStatHL
  | KontenComparison
  | KontenKeyTakeaway
  | KontenToolCTA
  | KontenGrafikGaris
  | KontenGrafikBatang

export interface Artikel {
  slug:       string
  kategori:   KategoriArtikel
  judul:      string
  ringkasan:  string
  tanggal:    string
  waktuBaca:  number
  tags:       string[]
  konten:     KontenBlock[]
}

// ─── Glossary Types ───────────────────────────────

export interface GlossaryTerm {
  term:        string          // Istilah
  slug:        string          // URL-friendly
  singkatan?:  string          // Opsional: DTI, KPR, dll
  kategori:    KategoriTool | KategoriArtikel | 'umum'
  definisi:    string          // 1 kalimat singkat
  penjelasan:  string          // Paragraf panjang
  toolTerkait?: { nama: string; href: string }[]
  artikelTerkait?: { judul: string; href: string }[]
}

// ─── Affiliate Types ──────────────────────────────

export type PlacementAffiliate = 'in-content' | 'sidebar' | 'footer' | 'tool-result'

export interface AffiliateLink {
  id:        string
  text:      string
  url:       string
  rel:       string
  placement: PlacementAffiliate
  kategori?: KategoriTool
  aktif:     boolean
  catatan?:  string
}

// ─── Navigation Types ─────────────────────────────

export interface NavItem {
  name: string
  href: string
  desc?: string
}

export interface NavDropdown {
  label:  string
  items:  NavItem[]
}

// ─── Favorite Types (localStorage) ───────────────

export interface FavoriteTool {
  slug:      string
  name:      string
  kategori:  KategoriTool
  href:      string
  savedAt:   string
}

// ─── Share Types ──────────────────────────────────

export interface ShareParams {
  [key: string]: string | number | boolean
}

// Alias untuk backward compatibility
export type GlossaryItem = GlossaryTerm
