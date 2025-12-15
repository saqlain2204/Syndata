import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'SynData - Synthetic Data Generator',
  description: 'Generate synthetic question-answer pairs from PDF documents using LLMs',
  icons: {
    icon: '/syndata.png',
    shortcut: '/syndata.png',
    apple: '/syndata.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {/* Tagline is now in header, not below */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
