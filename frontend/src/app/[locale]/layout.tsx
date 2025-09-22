import { Inter } from 'next/font/google'
import ReduxProvider from '@/providers/ReduxProvider'
import AppInitializer from '@/components/AppInitializer'
import Navigation from '@/components/Navigation'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'tr' }]
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
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
  )
}