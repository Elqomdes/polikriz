import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'
import { I18nProvider } from '@/components/i18n-provider'
import { AccessibilityProvider } from '@/components/accessibility/accessibility-provider'
import { AccessibilityPanel } from '@/components/accessibility/accessibility-panel'
import { Navigation } from '@/components/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Polikriz Platform - Çok Boyutlu Kriz Analizi',
  description: 'Ülkelerin çok boyutlu kriz göstergelerini analiz eden etkileşimli platform',
  keywords: 'kriz analizi, ekonomi, enerji, çevre, sağlık, demografi, veri görselleştirme',
  authors: [{ name: 'Polikriz Platform' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <AccessibilityProvider>
              <Navigation />
              {children}
              <AccessibilityPanel />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
            </AccessibilityProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
