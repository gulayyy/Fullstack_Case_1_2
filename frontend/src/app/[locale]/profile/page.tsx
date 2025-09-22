'use client'

import { useEffect, useState } from 'react'
// Removed i18n
import { useSelector, useDispatch } from 'react-redux'
import { useRouter, useParams } from 'next/navigation'
import { RootState } from '@/store/store'
import { logout } from '@/store/slices/authSlice'
import { authService } from '@/services/authService'
import { User, Mail, Calendar, LogOut, Edit } from 'lucide-react'

interface UserProfile {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
}

export default function ProfilePage() {
  const params = useParams()
  const locale = params.locale as string
  // Removed i18n
  const dispatch = useDispatch()
  const router = useRouter()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/auth/login`)
      return
    }
    
    fetchProfile()
  }, [isAuthenticated, locale, router])

  const fetchProfile = async () => {
    try {
      setIsLoading(true)
      const profileData = await authService.getProfile()
      setProfile(profileData)
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: string } }).response?.data || 'Failed to load profile'
        : 'Failed to load profile'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      dispatch(logout())
      router.push(`/${locale}`)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!isAuthenticated) {
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error || 'Failed to load profile'}</div>
        <button
          onClick={fetchProfile}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
          <div className="flex items-center space-x-6">
            <div className="bg-white rounded-full p-4">
              <User className="h-16 w-16 text-blue-600" />
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-blue-100 text-lg">@{profile.username}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">
                      {profile.firstName} {profile.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium text-gray-900">@{profile.username}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-900">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-900">{formatDate(profile.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Actions</h2>
              
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-3 rounded-md hover:bg-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="bg-gray-50 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">#{profile.id}</p>
                    <p className="text-sm text-gray-500">User ID</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">Active</p>
                    <p className="text-sm text-gray-500">Status</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
