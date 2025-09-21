import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import ReduxProvider from '@/providers/ReduxProvider'
import AppInitializer from '@/components/AppInitializer'
import Navigation from '@/components/Navigation'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'tr' }]
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return {
    title: 'Case 1 Full Stack - Product Management System',
    description: 'Modern Full Stack Product Management Application with .NET Backend and Next.js Frontend',
    openGraph: {
      title: 'Case 1 Full Stack',
      description: 'Product Management System with Authentication and Shopping Cart',
      locale: locale,
    },
  }
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
            <AppInitializer>
              <div className="min-h-screen bg-gray-50">
                <Navigation />
                <main className="container mx-auto px-4 py-8">
                  {children}
                </main>
              </div>
            </AppInitializer>
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}