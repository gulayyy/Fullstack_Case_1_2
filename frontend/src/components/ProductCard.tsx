'use client'

// Removed i18n
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Eye, Calendar } from 'lucide-react'

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

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  locale: string
}

export default function ProductCard({ product, onAddToCart, locale }: ProductCardProps) {
  // Removed i18n
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
      style: 'currency',
      currency: locale === 'tr' ? 'TRY' : 'USD',
    }).format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={`data:image/svg+xml;base64,${btoa(`<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#3B82F6"/><text x="200" y="150" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="20" fill="white">${product.name}</text></svg>`)}`}
          alt={product.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm">
          {product.category}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>

        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="h-3 w-3 mr-1" />
          {formatDate(product.createdAt)}
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Link
            href={`/${locale}/products/${product.id}`}
            className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
          >
            <Eye className="h-4 w-4" />
            <span className="text-sm">View Details</span>
          </Link>
          
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-1"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}
