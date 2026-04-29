import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cliniz | Odontologia de excelência',
  description:
    'Tecnologia avançada e atendimento humanizado. Agende sua avaliação gratuita e dê o primeiro passo para um sorriso de outro nível.',
  keywords: [
    'dentista',
    'odontologia',
    'clínica odontológica',
    'implantes',
    'clareamento',
    'lentes de contato dental',
    'ortodontia',
  ],
  icons: {
    icon: '/clinizlogo.png',
    shortcut: '/clinizlogo.png',
    apple: '/clinizlogo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#faf8f3',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
