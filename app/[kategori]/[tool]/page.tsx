import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllTools, getToolBySlug } from '@/lib/tools'
import type { KategoriTool } from '@/lib/types'
import ToolClientWrapper from './ToolClientWrapper'

interface Props {
  params: Promise<{ kategori: string; tool: string }>
}

// Pre-render semua 46 tool pages saat build
export async function generateStaticParams() {
  return getAllTools().map(t => ({ kategori: t.kategori, tool: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori, tool: toolSlug } = await params
  const tool = getToolBySlug(kategori as KategoriTool, toolSlug)
  if (!tool) return {}

  return {
    title: `${tool.nama} — ${tool.deskripsi.slice(0, 60)}... | FincTools`,
    description: tool.deskripsi,
    keywords: tool.keywords,
    openGraph: {
      title: tool.nama + ' | FincTools',
      description: tool.deskripsi,
      url: `https://finctools.com/${kategori}/${toolSlug}`,
      type: 'website',
    },
    alternates: { canonical: `https://finctools.com/${kategori}/${toolSlug}` },
  }
}

export default async function ToolPage({ params }: Props) {
  const { kategori, tool: toolSlug } = await params
  const tool = getToolBySlug(kategori as KategoriTool, toolSlug)
  if (!tool) notFound()

  return <ToolClientWrapper tool={tool} />
}
