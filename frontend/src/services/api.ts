import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_STORAGE_KEY!)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data on 401
      if (typeof window !== 'undefined') {
        localStorage.removeItem(process.env.NEXT_PUBLIC_AUTH_STORAGE_KEY!)
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
