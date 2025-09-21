'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { loginSuccess, setLoading } from '@/store/slices/authSlice'
import { authService } from '@/services/authService'
import Link from 'next/link'
import { LogIn, Eye, EyeOff } from 'lucide-react'

export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('auth')
  const dispatch = useDispatch()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    dispatch(setLoading(true))

    try {
      const response = await authService.login(formData)
      dispatch(loginSuccess({
        user: response.user,
        token: response.accessToken
      }))
      
      // Redirect to products page
      router.push(`/${locale}/products`)
    } catch (error: any) {
      setError(error.response?.data || t('loginError'))
    } finally {
      setIsLoading(false)
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <LogIn className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">{t('login')}</h1>
        <p className="text-gray-600 mt-2">Welcome back! Please sign in to your account</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700 mb-2">
            {t('usernameOrEmail')}
          </label>
          <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your username or email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            {t('password')}
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              <span>{t('login')}</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link href={`/${locale}/auth/register`} className="text-blue-600 hover:text-blue-700 font-medium">
            {t('register')}
          </Link>
        </p>
      </div>

      <div className="mt-4 text-center">
        <Link href={`/${locale}`} className="text-gray-500 hover:text-gray-700 text-sm">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
