'use client'

import { useTranslations } from '@/providers/I18nProvider'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { setFilters, clearFilters } from '@/store/slices/productsSlice'
import { Filter, X } from 'lucide-react'

export default function ProductFilters() {
  const t = useTranslations('products')
  const tCommon = useTranslations('common')
  const dispatch = useDispatch()
  const { filters, products } = useSelector((state: RootState) => state.products)

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)))

  const handleFilterChange = (filterName: string, value: string | number) => {
    dispatch(setFilters({ [filterName]: value }))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-800" />
          <h3 className="text-lg font-semibold text-gray-900">{tCommon('filter')}</h3>
        </div>
        <button
          onClick={handleClearFilters}
          className="text-red-600 hover:text-red-700 flex items-center space-x-1 text-sm"
        >
          <X className="h-4 w-4" />
          <span>{tCommon('clear')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t('filterByCategory')}
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t('priceRange')}
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder={t('placeholders.min')}
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{color: '#000000', fontWeight: '900', fontSize: '16px', backgroundColor: '#ffffff'}}
            />
            <input
              type="number"
              placeholder={t('placeholders.max')}
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value) || 10000)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{color: '#000000', fontWeight: '900', fontSize: '16px', backgroundColor: '#ffffff'}}
            />
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t('sortBy')}
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="createdAt">{t('sortByDate')}</option>
            <option value="name">{t('sortByName')}</option>
            <option value="price">{t('sortByPrice')}</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Order
          </label>
          <select
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="desc">{t('descending')}</option>
            <option value="asc">{t('ascending')}</option>
          </select>
        </div>
      </div>
    </div>
  )
}
