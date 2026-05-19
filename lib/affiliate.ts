/**
 * FincTools v2 — Affiliate Link Management
 * Semua link affiliate dikelola di satu tempat
 *
 * Cara menambah link baru:
 * 1. Tambah objek baru ke array affiliateLinks
 * 2. Set aktif: true
 * 3. Gunakan di komponen dengan getAffiliateByKategori() atau getAffiliateById()
 */

import type { AffiliateLink, KategoriTool } from './types'

export const affiliateLinks: AffiliateLink[] = [
  // ─── Contoh struktur (belum aktif) ───────────────
  // {
  //   id:        'broker-forex-001',
  //   text:      'Broker forex terpercaya OJK',
  //   url:       'https://...',
  //   rel:       'sponsored nofollow',
  //   placement: 'in-content',
  //   kategori:  'trading',
  //   aktif:     false,
  //   catatan:   'CPA Rp 150.000 per signup verified',
  // },
  // {
  //   id:        'platform-reksa-dana-001',
  //   text:      'Platform investasi reksa dana terdaftar OJK',
  //   url:       'https://...',
  //   rel:       'sponsored nofollow',
  //   placement: 'tool-result',
  //   kategori:  'investasi',
  //   aktif:     false,
  //   catatan:   'Revenue share 10%',
  // },
]

// ─── Helper Functions ─────────────────────────────

export function getAffiliateByKategori(
  kategori: KategoriTool,
  placement?: AffiliateLink['placement']
): AffiliateLink[] {
  return affiliateLinks.filter(
    l => l.aktif && l.kategori === kategori && (!placement || l.placement === placement)
  )
}

export function getAffiliateById(id: string): AffiliateLink | undefined {
  return affiliateLinks.find(l => l.id === id && l.aktif)
}

export function getAllActiveAffiliate(): AffiliateLink[] {
  return affiliateLinks.filter(l => l.aktif)
}
