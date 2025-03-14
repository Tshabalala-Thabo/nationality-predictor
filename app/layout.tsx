import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nationality Predictor | Name Origin Analyzer',
  description: 'Discover the likely nationalities and origins of any name using our advanced prediction tool. Features real-time analysis with country flags and probability scores.',
  keywords: ['nationality predictor', 'name origin', 'name nationality', 'name ethnicity', 'name analysis'],
  authors: [{ name: 'Thabo Tshabalala' }],
  creator: 'Thabo Tshabalala',
  openGraph: {
    title: 'Nationality Predictor',
    description: 'Discover the likely nationalities and origins of any name',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
