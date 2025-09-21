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

interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ product: action.payload, quantity: 1 })
      }
      
      // Recalculate totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items))
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload)
      
      // Recalculate totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items))
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.product.id === action.payload.id)
      
      if (item) {
        item.quantity = action.payload.quantity
        
        // Remove item if quantity is 0
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.product.id !== action.payload.id)
        }
      }
      
      // Recalculate totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items))
      }
    },
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart')
      }
    },
    initializeCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, initializeCart } = cartSlice.actions
export default cartSlice.reducer
