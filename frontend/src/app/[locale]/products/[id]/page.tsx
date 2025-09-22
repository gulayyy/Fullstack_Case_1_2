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
        images: [`https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=${encodeURIComponent(product.name)}`],
      },
    }
  } catch (error) {
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
