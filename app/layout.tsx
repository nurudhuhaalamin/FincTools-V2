import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

/* ─── Metadata ───────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://finctools.com'),
  title: {
    default: 'FincTools — Tools Keuangan & Investasi Gratis untuk Investor Indonesia',
    template: '%s | FincTools',
  },
  description:
    '46 tools keuangan dan investasi gratis berbasis kalkulasi matematika. Trading, pajak, investasi, personal finance, KPR, saham, kripto. Tanpa akun, tanpa biaya.',
  keywords: [
    'tools keuangan', 'kalkulator investasi', 'tools trading', 'kalkulator pajak',
    'kalkulator KPR', 'tools saham', 'tools kripto', 'financial calculator indonesia',
    'kalkulator keuangan', 'tools personal finance', 'finctools',
  ],
  authors: [{ name: 'FincTools', url: 'https://finctools.com' }],
  creator: 'FincTools',
  publisher: 'FincTools',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://finctools.com',
    siteName: 'FincTools',
    title: 'FincTools — Tools Keuangan & Investasi Gratis',
    description:
      '46 tools keuangan dan investasi gratis. Kalkulasi akurat berbasis matematika untuk investor Indonesia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FincTools — Tools Keuangan & Investasi Gratis',
    description:
      '46 tools keuangan dan investasi gratis untuk investor Indonesia.',
    site: '@finctools',
  },
}

/* ─── JSON-LD Schema ─────────────────────────────── */
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FincTools',
  url: 'https://finctools.com',
  description:
    '46 tools keuangan dan investasi gratis berbasis kalkulasi matematika untuk investor Indonesia.',
  inLanguage: 'id-ID',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://finctools.com/glossary?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FincTools',
  url: 'https://finctools.com',
  description: 'Platform tools keuangan dan investasi gratis untuk komunitas investor Indonesia.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'hello@finctools.com',
    availableLanguage: 'Indonesian',
  },
}

/* ─── Theme Init Script ──────────────────────────── */
const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('finctools-theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`

/* ─── Root Layout ────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakarta.variable}`}
    >
      <head>
        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* ── Google Tag Manager ────────────────────
            Uncomment after GTM setup:

        <script dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');
        `}} />
        ─────────────────────────────────────────── */}

        {/* ── Google Search Console Verification ───
            Uncomment after GSC setup:

        <meta name="google-site-verification" content="XXXXXXXXXXXXXXXX" />
        ─────────────────────────────────────────── */}

        {/* ── Google Analytics 4 (tanpa GTM) ───────
            Uncomment jika tidak pakai GTM:

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}} />
        ─────────────────────────────────────────── */}

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>

      <body className="font-sans antialiased">
        {/* GTM noscript — uncomment setelah GTM setup:
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0" width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        */}

        {/* Theme init — jalankan sebelum render untuk cegah flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {children}
      </body>
    </html>
  )
}
