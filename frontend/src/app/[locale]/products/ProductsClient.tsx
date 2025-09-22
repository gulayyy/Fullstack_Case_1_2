'use client'

import { useEffect } from 'react'
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

  useEffect(() => {
    // Set initial products from SSR
    if (initialProducts.length > 0) {
      dispatch(setProducts(initialProducts))
    }
  }, [initialProducts, dispatch])

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  const refetchProducts = () => {
    window.location.reload()
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
        <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
        {isAuthenticated && (
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
