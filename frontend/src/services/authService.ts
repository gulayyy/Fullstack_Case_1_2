import api from './api'

interface RegisterData {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

interface LoginData {
  usernameOrEmail: string
  password: string
}

interface AuthResponse {
  accessToken: string
  refreshToken: string
  expiresAt: string
  user: {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    createdAt: string
  }
}

interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
}

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile')
    return response.data
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(process.env.NEXT_PUBLIC_AUTH_STORAGE_KEY!)
    }
  },
}
