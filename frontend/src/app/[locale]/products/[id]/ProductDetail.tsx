'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslations } from '@/providers/I18nProvider'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { addToCart } from '@/store/slices/cartSlice'
import { productService } from '@/services/productService'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Calendar, Package, Tag, Edit, Trash2 } from 'lucide-react'

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

export default function ProductDetail({ params }: { params: { id: string; locale: string } }) {
  const t = useTranslations('products')
  const tCommon = useTranslations('common')
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchProduct = useCallback(async () => {
    try {
      setIsLoading(true)
      const productData = await productService.getProductById(parseInt(params.id))
      setProduct(productData)
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: string } }).response?.data || 'Product not found'
        : 'Product not found'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product))
    }
  }

  const handleDelete = async () => {
    if (!product || !confirm('Are you sure you want to delete this product?')) return

    try {
      setIsDeleting(true)
      await productService.deleteProduct(product.id)
      
      // Temiz cache ile products sayfasına redirect
      window.location.href = `/${params.locale}/products?refresh=${Date.now()}`
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: string } }).response?.data || 'Failed to delete product'
        : 'Failed to delete product'
      alert('Failed to delete product: ' + errorMessage)
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(params.locale === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(params.locale === 'tr' ? 'tr-TR' : 'en-US', {
      style: 'currency',
      currency: params.locale === 'tr' ? 'TRY' : 'USD',
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error || 'Product not found'}</div>
        <Link
          href={`/${params.locale}/products`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link
          href={`/${params.locale}/products`}
          className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {tCommon('backToProducts')}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={`data:image/svg+xml;base64,${btoa(`<svg width="600" height="600" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="600" fill="#3B82F6"/><text x="300" y="300" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="24" fill="white">${product.name}</text></svg>`)}`}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <Tag className="h-3 w-3 mr-1" />
                {product.category}
              </span>
              {isAuthenticated && (
                <div className="flex space-x-2">
                  <Link
                    href={`/${params.locale}/products/${product.id}/edit`}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-4xl font-bold text-blue-600 mb-4">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Package className="h-4 w-4 mr-1" />
              <span>{tCommon('stock')}: {product.stock}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(product.createdAt)}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{tCommon('description')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description || 'No description available.'}
            </p>
          </div>

          <div className="border-t pt-6">
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{product.stock === 0 ? 'Out of Stock' : t('addToCart')}</span>
              </button>
              
              {isAuthenticated && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {isDeleting ? (
                    <span>Deleting...</span>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>{t('deleteProduct')}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Product ID:</span>
                <span className="text-gray-900 font-semibold">#{product.id}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Category:</span>
                <span className="text-gray-900 font-semibold">{product.category}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Stock:</span>
                <span className="text-gray-900 font-semibold">{product.stock} units</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">Last Updated:</span>
                <span className="text-gray-900 font-semibold">{formatDate(product.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
