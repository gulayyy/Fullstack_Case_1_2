import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  isLoading: boolean
  error: string | null
  filters: {
    category: string
    minPrice: number
    maxPrice: number
    sortBy: 'name' | 'price' | 'createdAt'
    sortOrder: 'asc' | 'desc'
  }
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  isLoading: false,
  error: null,
  filters: {
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
      state.filteredProducts = action.payload
      state.isLoading = false
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
      
      // Apply filters
      let filtered = [...state.products]
      
      // Category filter
      if (state.filters.category) {
        filtered = filtered.filter(product => 
          product.category.toLowerCase().includes(state.filters.category.toLowerCase())
        )
      }
      
      // Price range filter
      filtered = filtered.filter(product => 
        product.price >= state.filters.minPrice && product.price <= state.filters.maxPrice
      )
      
      // Sort
      filtered.sort((a, b) => {
        const aValue = a[state.filters.sortBy]
        const bValue = b[state.filters.sortBy]
        
        if (state.filters.sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
      
      state.filteredProducts = filtered
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        minPrice: 0,
        maxPrice: 10000,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }
      state.filteredProducts = state.products
    },
  },
})

export const { setLoading, setProducts, setError, setFilters, clearFilters } = productsSlice.actions
export default productsSlice.reducer
