import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import ReduxProvider from '@/providers/ReduxProvider'
import Navigation from '@/components/Navigation'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'tr' }]
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
            </div>
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
