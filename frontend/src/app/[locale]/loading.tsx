import LoadingSpinner from '@/components/LoadingSpinner'

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-64">
      <LoadingSpinner size="lg" text="Loading..." />
    </div>
  )
}
