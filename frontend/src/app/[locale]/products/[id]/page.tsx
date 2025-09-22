import { Metadata } from 'next'
import ProductDetail from './ProductDetail'
import { productService } from '@/services/productService'

// Generate metadata for SEO (2nd stage requirement)
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string; locale: string }> 
}): Promise<Metadata> {
  try {
    const { id } = await params
    const product = await productService.getProductById(parseInt(id))
    
    return {
      title: `${product.name} - Case 1 Full Stack`,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [`data:image/svg+xml;base64,${btoa(`<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="400" fill="#3B82F6"/><text x="300" y="200" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="24" fill="white">${product.name}</text></svg>`)}`],
      },
    }
  } catch {
    return {
      title: 'Product Not Found - Case 1 Full Stack',
      description: 'The requested product could not be found.',
    }
  }
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string; locale: string }> 
}) {
  const resolvedParams = await params
  return <ProductDetail params={resolvedParams} />
}
