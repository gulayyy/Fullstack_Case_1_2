'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from '@/providers/I18nProvider'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { setProducts } from '@/store/slices/productsSlice'
import { addToCart } from '@/store/slices/cartSlice'
import ProductCard from '@/components/ProductCard'
import ProductFilters from '@/components/ProductFilters'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Plus } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  category: string
  createdAt: string
  updatedAt: string
}

interface ProductsClientProps {
  initialProducts: Product[]
  locale: string
}

export default function ProductsClient({ initialProducts, locale }: ProductsClientProps) {
  const t = useTranslations('products')
  const tCommon = useTranslations('common')
  const dispatch = useDispatch()
  const { filteredProducts, isLoading, error } = useSelector((state: RootState) => state.products)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [isClient, setIsClient] = useState(false)

  // Client-side hydration check
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Bu effect her render'da çalışacak ve taze data çekecek
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?_t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const freshProducts = await response.json();
        dispatch(setProducts(freshProducts));
      } catch (error) {
        console.error('Error fetching fresh products:', error);
        // SSR data'yı fallback olarak kullan
        if (initialProducts.length > 0) {
          dispatch(setProducts(initialProducts));
        }
      }
    };
    
    // Sayfa yüklendiğinde hemen taze veri çek
    fetchLatestProducts();
    
    // 10 saniyede bir otomatik refresh
    const intervalId = setInterval(fetchLatestProducts, 10000);
    
    return () => clearInterval(intervalId);
  }, [dispatch, initialProducts])

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  const refetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      const products = await response.json()
      dispatch(setProducts(products))
    } catch (error) {
      console.error('Failed to refetch products:', error)
      // Fallback: reload page
      window.location.reload()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <LoadingSpinner size="lg" text={tCommon('loading')} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={refetchProducts}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {tCommon('tryAgain')}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <button 
            onClick={refetchProducts} 
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            title={tCommon('refresh')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        {isClient && isAuthenticated && (
          <Link
            href={`/${locale}/products/add`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>{t('addProduct')}</span>
          </Link>
        )}
      </div>

      {/* Filters */}
      <ProductFilters />

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-800 text-lg">{t('noProducts')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  )
}
