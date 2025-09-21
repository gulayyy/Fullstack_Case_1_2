import api from './api'

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

interface CreateProductData {
  name: string
  description: string
  price: number
  stock: number
  category: string
}

interface UpdateProductData {
  name?: string
  description?: string
  price?: number
  stock?: number
  category?: string
}

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await api.get('/products')
    return response.data
  },

  async getProductById(id: number): Promise<Product> {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  async createProduct(data: CreateProductData): Promise<Product> {
    const response = await api.post('/products', data)
    return response.data
  },

  async updateProduct(id: number, data: UpdateProductData): Promise<Product> {
    const response = await api.put(`/products/${id}`, data)
    return response.data
  },

  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}`)
  },
}
