'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAuth } from '@/store/slices/authSlice'
import { initializeCart } from '@/store/slices/cartSlice'
import { authService } from '@/services/authService'

export const useAuthInit = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const initializeApp = async () => {
      // Initialize auth from localStorage
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_STORAGE_KEY!)
        
        if (token) {
          try {
            // Verify token by getting user profile
            const user = await authService.getProfile()
            dispatch(initializeAuth({ user, token }))
          } catch (error) {
            // Token is invalid, remove it
            localStorage.removeItem(process.env.NEXT_PUBLIC_AUTH_STORAGE_KEY!)
          }
        }

        // Initialize cart from localStorage
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          try {
            const cartItems = JSON.parse(savedCart)
            dispatch(initializeCart(cartItems))
          } catch (error) {
            // Invalid cart data, ignore
            localStorage.removeItem('cart')
          }
        }
      }
    }

    initializeApp()
  }, [dispatch])
}
