import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.isLoading = false
      
      // Store token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(process.env.NEXT_PUBLIC_AUTH_STORAGE_KEY!, action.payload.token)
      }
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      
      // Remove token from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem(process.env.NEXT_PUBLIC_AUTH_STORAGE_KEY!)
      }
    },
    initializeAuth: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
  },
})

export const { setLoading, loginSuccess, logout, initializeAuth } = authSlice.actions
export default authSlice.reducer
