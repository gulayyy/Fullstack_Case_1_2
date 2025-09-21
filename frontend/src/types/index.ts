export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  category: string
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  expiresAt: string
  user: User
}
