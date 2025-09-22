import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation';
import ReduxProvider from '@/providers/ReduxProvider'
import AppInitializer from '@/components/AppInitializer'
import Navigation from '@/components/Navigation'
import ErrorBoundary from '@/components/ErrorBoundary'
import I18nProvider from '@/providers/I18nProvider'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

const locales = ['en', 'tr'] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  // Load messages directly
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <I18nProvider locale={locale} messages={messages}>
          <ErrorBoundary>
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
          </ErrorBoundary>
        </I18nProvider>
      </body>
    </html>
  )
}