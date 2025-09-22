import { Suspense } from 'react'
import { Metadata } from 'next'
import ProductsClient from './ProductsClient'
import { ProductListSkeleton } from '@/components/LoadingSkeleton'

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params
  const messages = (await import(`../../../../messages/${locale}.json`)).default
  const title = messages.products?.title || 'Products'
  
  return {
    title: `${title} - Case 1 Full Stack`,
    description: 'Browse and manage products in our full stack application',
    openGraph: {
      title,
      description: 'Browse and manage products in our full stack application',
    },
  }
}

// Enable ISR with revalidation every 60 seconds
export const revalidate = 60

async function fetchProducts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      next: { revalidate: 60 } // ISR with 60 seconds revalidation
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function ProductsPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params
  
  // Fetch products on server-side
  const initialProducts = await fetchProducts()

  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductsClient 
        initialProducts={initialProducts} 
        locale={locale} 
      />
    </Suspense>
  )
}
