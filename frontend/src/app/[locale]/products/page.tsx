'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { setProducts, setLoading, setError, setFilters } from '@/store/slices/productsSlice'
import { addToCart } from '@/store/slices/cartSlice'
import { productService } from '@/services/productService'
import ProductCard from '@/components/ProductCard'
import ProductFilters from '@/components/ProductFilters'
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

export default function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('products')
  const dispatch = useDispatch()
  const { filteredProducts, isLoading, error } = useSelector((state: RootState) => state.products)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      dispatch(setLoading(true))
      const products = await productService.getAllProducts()
      dispatch(setProducts(products))
    } catch (error: any) {
      dispatch(setError(error.message || 'Failed to fetch products'))
    }
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={fetchProducts}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Try Again
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
          <p className="text-gray-500 text-lg">{t('noProducts')}</p>
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
