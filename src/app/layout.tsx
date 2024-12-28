import { WebVitals } from '@/components/WebVitals'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Radio Player',
  description: 'All your favorite music, radio and podcasts',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        <WebVitals />
      </body>
    </html>
  )
}
