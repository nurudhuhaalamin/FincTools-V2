'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart2, Menu, X, ChevronDown, Sun, Moon,
  TrendingUp, FileText, Wallet, Activity, Bitcoin, Globe, Home, BookOpen, Info,
} from 'lucide-react'
import { kategoriToolConfig, getAllKategoriTools, getToolsByKategori } from '@/lib/tools'
import { kategoriArtikelConfig, getAllKategoriArtikel } from '@/lib/articles'
import type { KategoriTool } from '@/lib/types'

// ─── Icon map per tool category ──────────────────
const toolIcons: Record<KategoriTool, React.ElementType> = {
  trading:           Activity,
  pajak:             FileText,
  investasi:         TrendingUp,
  'personal-finance': Wallet,
  'kredit-properti': Home,
  saham:             BarChart2,
  kripto:            Bitcoin,
}

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen]     = useState(false)
  const [toolsOpen, setToolsOpen]   = useState(false)
  const [artikelOpen, setArtikelOpen] = useState(false)
  const [dark, setDark]             = useState(false)

  const toolsRef   = useRef<HTMLDivElement>(null)
  const artikelRef = useRef<HTMLDivElement>(null)

  // ── Sync dark state from DOM ─────────────────
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  // ── Close dropdowns on outside click ─────────
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) setToolsOpen(false)
      if (artikelRef.current && !artikelRef.current.contains(e.target as Node)) setArtikelOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // ── Close mobile menu on route change ────────
  useEffect(() => { setMenuOpen(false) }, [pathname])

  function toggleDark() {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('finctools-theme', isDark ? 'dark' : 'light')
    setDark(isDark)
  }

  const kategoriTools   = getAllKategoriTools()
  const kategoriArtikel = getAllKategoriArtikel()

  return (
    <header className="sticky top-0 z-50 bg-[--bg-primary]/95 backdrop-blur-sm border-b border-[--border]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center h-14 gap-2">

          {/* ── Logo ─────────────────────────── */}
          <Link href="/" className="flex items-center gap-2 font-heading font-bold text-lg text-[--text-primary] mr-4 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-finc-green flex items-center justify-center">
              <BarChart2 size={14} className="text-white" />
            </div>
            FincTools
          </Link>

          {/* ── Desktop Nav ──────────────────── */}
          <nav className="hidden md:flex items-center gap-1 flex-1">

            {/* Tools dropdown */}
            <div ref={toolsRef} className="relative">
              <button
                onClick={() => { setToolsOpen(o => !o); setArtikelOpen(false) }}
                className={`finc-btn-ghost flex items-center gap-1 ${toolsOpen ? 'text-finc-green' : ''}`}
              >
                Tools
                <ChevronDown size={13} className={`transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 finc-card shadow-xl py-1 z-50">
                  <Link
                    href="/tools"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold
                               text-finc-green hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
                    onClick={() => setToolsOpen(false)}
                  >
                    🔧 Semua Tools
                  </Link>
                  <div className="border-t border-[--border] my-1" />
                  {kategoriTools.map(k => {
                    const cfg  = kategoriToolConfig[k]
                    const Icon = toolIcons[k]
                    const cnt  = getToolsByKategori(k).length
                    return (
                      <Link
                        key={k}
                        href={`/${k}`}
                        className="flex items-center justify-between px-4 py-2 text-sm
                                   text-[--text-primary] hover:bg-[--bg-secondary] transition-colors"
                        onClick={() => setToolsOpen(false)}
                      >
                        <span className="flex items-center gap-2">
                          <Icon size={13} className="text-[--text-secondary]" />
                          {cfg.nama}
                        </span>
                        <span className="text-xs text-[--text-secondary]">{cnt} tools</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Artikel dropdown */}
            <div ref={artikelRef} className="relative">
              <button
                onClick={() => { setArtikelOpen(o => !o); setToolsOpen(false) }}
                className={`finc-btn-ghost flex items-center gap-1 ${artikelOpen ? 'text-finc-green' : ''}`}
              >
                Artikel
                <ChevronDown size={13} className={`transition-transform ${artikelOpen ? 'rotate-180' : ''}`} />
              </button>

              {artikelOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 finc-card shadow-xl py-1 z-50">
                  <Link
                    href="/artikel"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold
                               text-finc-green hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
                    onClick={() => setArtikelOpen(false)}
                  >
                    📰 Semua Artikel
                  </Link>
                  <div className="border-t border-[--border] my-1" />
                  {kategoriArtikel.map(k => {
                    const cfg = kategoriArtikelConfig[k]
                    return (
                      <Link
                        key={k}
                        href={`/artikel/${k}`}
                        className="block px-4 py-2 text-sm text-[--text-primary]
                                   hover:bg-[--bg-secondary] transition-colors"
                        onClick={() => setArtikelOpen(false)}
                      >
                        {cfg.nama}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Glossary */}
            <Link href="/glossary" className="finc-btn-ghost">Glossary</Link>

            {/* Tentang */}
            <Link href="/about" className="finc-btn-ghost">Tentang</Link>
          </nav>

          {/* ── Right: dark mode + hamburger ─── */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={toggleDark}
              className="finc-btn-ghost p-2"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden finc-btn-ghost p-2"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden border-t border-[--border] bg-[--bg-primary] pb-4 overflow-y-auto max-h-[80vh]">

          {/* TOOLS */}
          <div className="px-4 pt-4 pb-2">
            <p className="text-2xs font-bold tracking-widest text-[--text-secondary] uppercase mb-2">Tools</p>
            <div className="space-y-0.5">
              {kategoriTools.map(k => {
                const cfg  = kategoriToolConfig[k]
                const Icon = toolIcons[k]
                const cnt  = getToolsByKategori(k).length
                return (
                  <Link
                    key={k}
                    href={`/${k}`}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg
                               text-sm text-[--text-primary] hover:bg-[--bg-secondary] transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon size={14} className="text-[--text-secondary]" />
                      {cfg.nama}
                    </span>
                    <span className="text-xs text-[--text-secondary]">{cnt}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="border-t border-[--border] mx-4 my-2" />

          {/* ARTIKEL */}
          <div className="px-4 pb-2">
            <p className="text-2xs font-bold tracking-widest text-[--text-secondary] uppercase mb-2">Artikel</p>
            <div className="space-y-0.5">
              {kategoriArtikel.map(k => {
                const cfg = kategoriArtikelConfig[k]
                return (
                  <Link
                    key={k}
                    href={`/artikel/${k}`}
                    className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg
                               text-sm text-[--text-primary] hover:bg-[--bg-secondary] transition-colors"
                  >
                    <BookOpen size={14} className="text-[--text-secondary]" />
                    {cfg.nama}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="border-t border-[--border] mx-4 my-2" />

          {/* LAINNYA */}
          <div className="px-4 space-y-0.5">
            <Link href="/glossary" className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-sm text-[--text-primary] hover:bg-[--bg-secondary] transition-colors">
              <BookOpen size={14} className="text-[--text-secondary]" /> Glossary
            </Link>
            <Link href="/about" className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-sm text-[--text-primary] hover:bg-[--bg-secondary] transition-colors">
              <Info size={14} className="text-[--text-secondary]" /> Tentang
            </Link>
            <Link href="/contact" className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-sm text-[--text-primary] hover:bg-[--bg-secondary] transition-colors">
              <Globe size={14} className="text-[--text-secondary]" /> Kontak
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
