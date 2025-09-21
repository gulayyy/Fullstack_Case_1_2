import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react'

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Modern Full Stack Product Management Application
        </p>
        <div className="space-x-4">
          <Link
            href={`/${locale}/products`}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {t('navigation.products')}
          </Link>
          <Link
            href={`/${locale}/auth/register`}
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            {t('navigation.register')}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Product Management</h3>
            <p className="text-gray-600">
              Complete CRUD operations for products with real-time updates
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <ShoppingCart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Shopping Cart</h3>
            <p className="text-gray-600">
              Advanced cart management with Redux state management
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Authentication</h3>
            <p className="text-gray-600">
              Secure JWT-based authentication and authorization
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Performance</h3>
            <p className="text-gray-600">
              Redis cache, SSR/ISR, and optimized for speed
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-white rounded-lg p-8 shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Tech Stack
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Backend</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• .NET 8.0 Web API</li>
              <li>• Onion Architecture + CQRS</li>
              <li>• PostgreSQL Database</li>
              <li>• Redis Cache</li>
              <li>• JWT Authentication</li>
              <li>• Entity Framework Core</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-600">Frontend</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Next.js 14+ (App Router)</li>
              <li>• TypeScript</li>
              <li>• TailwindCSS</li>
              <li>• Redux Toolkit (RTK)</li>
              <li>• Next-intl (i18n)</li>
              <li>• SSR/ISR Support</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
