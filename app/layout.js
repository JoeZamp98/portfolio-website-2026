import localFont from 'next/font/local'
import { Cormorant_Garamond, Urbanist, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SWATCHES } from '@/lib/tokens'
import Nav from '@/components/Nav'

const abolition_base = localFont({
  src: './fonts/Abolition-Round.otf',
  variable: '--font-abolition',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const body = Urbanist({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  title: 'Joe Zampitella — Full-Stack Engineer',
  description: 'Full-Stack Engineer and Chicago Booth MBA candidate. Four years building data platforms, cloud infrastructure, and client-facing products at Veris Insights.',
  openGraph: {
    title: 'Joe Zampitella',
    description: 'Full-Stack Engineer · Chicago Booth MBA',
    url: 'https://joezampitella.com',
    siteName: 'Joe Zampitella',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joe Zampitella',
    description: 'Full-Stack Engineer · Chicago Booth MBA',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${abolition_base.variable} ${cormorant.variable} ${body.variable} ${mono.variable}`}>
      <body style={{ background: SWATCHES.cream, color: SWATCHES.charcoal, fontFamily: 'var(--font-body)', fontWeight: 300 }}>
        <Nav />
        {children}
      </body>
    </html>
  )
}