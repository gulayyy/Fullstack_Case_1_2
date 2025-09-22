'use client'

import { useTranslations } from '@/providers/I18nProvider'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('home')
  const tNav = useTranslations('navigation')
  const tAuth = useTranslations('auth')

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <div className="space-x-4">
          <Link
            href={`/${locale}/products`}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {tNav('products')}
          </Link>
          <Link
            href={`/${locale}/auth/register`}
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            {tAuth('register')}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12" style={{color: '#000000'}}>
          {t('features.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2" style={{color: '#000000'}}>{t('features.productManagement.title')}</h3>
            <p style={{color: '#000000', fontWeight: '600'}}>
              {t('features.productManagement.description')}
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <ShoppingCart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2" style={{color: '#000000'}}>{t('features.shoppingCart.title')}</h3>
            <p style={{color: '#000000', fontWeight: '600'}}>
              {t('features.shoppingCart.description')}
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2" style={{color: '#000000'}}>{t('features.userAuthentication.title')}</h3>
            <p style={{color: '#000000', fontWeight: '600'}}>
              {t('features.userAuthentication.description')}
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2" style={{color: '#000000'}}>{t('features.performance.title')}</h3>
            <p style={{color: '#000000', fontWeight: '600'}}>
              {t('features.performance.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-white rounded-lg p-8 shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8" style={{color: '#000000'}}>
          {t('techStack.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-600">{t('techStack.backend')}</h3>
            <ul className="space-y-2" style={{color: '#000000', fontWeight: '600'}}>
              <li>• .NET 8.0 Web API</li>
              <li>• Onion Architecture + CQRS</li>
              <li>• PostgreSQL Database</li>
              <li>• Redis Cache</li>
              <li>• JWT Authentication</li>
              <li>• Entity Framework Core</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-600">{t('techStack.frontend')}</h3>
            <ul className="space-y-2" style={{color: '#000000', fontWeight: '600'}}>
              <li>• Next.js 15+ (App Router)</li>
              <li>• TypeScript</li>
              <li>• TailwindCSS</li>
              <li>• Redux Toolkit (RTK)</li>
              <li>• Custom i18n</li>
              <li>• SSR/ISR Support</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
