'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from '@/providers/I18nProvider'
import { useSelector } from 'react-redux'
import { useRouter, useParams } from 'next/navigation'
import { RootState } from '@/store/store'
import { productService } from '@/services/productService'
import Link from 'next/link'
import { Save, ArrowLeft, Loader2 } from 'lucide-react'

interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  category: string
}

export default function EditProductPage() {
  const params = useParams()
  const locale = params.locale as string
  const productId = params.id as string
  const t = useTranslations('products')
  const router = useRouter()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/auth/login`)
    }
  }, [isAuthenticated, router, locale])

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsFetching(true)
        const productData = await productService.getProductById(parseInt(productId))
        
        setFormData({
          name: productData.name,
          description: productData.description || '',
          price: productData.price.toString(),
          stock: productData.stock.toString(),
          category: productData.category
        })
      } catch (error) {
        console.error('Error fetching product:', error)
        setError('Failed to load product data')
      } finally {
        setIsFetching(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category
      }

      await productService.updateProduct(parseInt(productId), productData)
      setSuccess('Product updated successfully!')
      
      // Redirect to product details page with cache busting
      setTimeout(() => {
        router.push(`/${locale}/products/${productId}?refresh=${Date.now()}`)
      }, 1500)
    } catch (error: unknown) {
      console.error('Product update error:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const responseError = error as { response?: { data?: { errors?: Record<string, string[]> } | string } }
        if (responseError.response?.data && typeof responseError.response.data === 'object' && 'errors' in responseError.response.data) {
          const errors = responseError.response.data.errors
          const errorMessages = Object.values(errors || {}).flat()
          setError((errorMessages as string[]).join(', '))
        } else {
          setError(typeof responseError.response?.data === 'string' ? responseError.response.data : 'Failed to update product')
        }
      } else {
        setError('Failed to update product')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Toys',
    'Health & Beauty',
    'Automotive',
    'Food & Beverages',
    'Technology'
  ]

  if (!isAuthenticated) {
    return null
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link
          href={`/${locale}/products/${productId}`}
          className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Product
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
              {t('productName')} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('placeholders.enterProductName')}
              style={{color: '#000000', fontWeight: '900', fontSize: '16px', backgroundColor: '#ffffff'}}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
              {t('description')}
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('placeholders.enterProductDescription')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-900 mb-2">
                {t('price')} * ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-semibold text-gray-900 mb-2">
                {t('stock')} *
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
              {t('category')} *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Update Product</span>
                </>
              )}
            </button>
            
            <Link
              href={`/${locale}/products/${productId}`}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}