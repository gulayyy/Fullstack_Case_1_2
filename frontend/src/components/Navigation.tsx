'use client'

import { useTranslations } from 'next-intl'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { logout } from '@/store/slices/authSlice'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, User, LogOut, Home, Package, UserPlus, LogIn } from 'lucide-react'

export default function Navigation() {
  const t = useTranslations('navigation')
  const pathname = usePathname()
  const dispatch = useDispatch()
  
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { totalItems } = useSelector((state: RootState) => state.cart)
  
  // Extract locale from pathname
  const locale = pathname.split('/')[1] || 'en'
  
  const handleLogout = () => {
    dispatch(logout())
  }
  
  const isActive = (path: string) => {
    return pathname === `/${locale}${path}` || pathname === path
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Case 1</span>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={`/${locale}`}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('') || isActive('/')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>{t('home')}</span>
            </Link>
            
            <Link
              href={`/${locale}/products`}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/products')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Package className="h-4 w-4" />
              <span>{t('products')}</span>
            </Link>

            <Link
              href={`/${locale}/cart`}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium relative ${
                isActive('/cart')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{t('cart')}</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Auth Navigation */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <Link
                href={pathname.replace(`/${locale}`, '/en')}
                className={`px-2 py-1 rounded text-sm ${
                  locale === 'en' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                EN
              </Link>
              <Link
                href={pathname.replace(`/${locale}`, '/tr')}
                className={`px-2 py-1 rounded text-sm ${
                  locale === 'tr' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                TR
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={`/${locale}/profile`}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{user?.firstName}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline">{t('logout')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href={`/${locale}/auth/login`}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                >
                  <LogIn className="h-4 w-4" />
                  <span>{t('login')}</span>
                </Link>
                <Link
                  href={`/${locale}/auth/register`}
                  className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>{t('register')}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
