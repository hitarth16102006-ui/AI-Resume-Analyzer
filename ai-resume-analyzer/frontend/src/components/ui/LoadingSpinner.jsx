import { cn } from '@utils/cn'

export default function LoadingSpinner({ size = 'md', className }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-indigo-100 border-t-indigo-600',
          sizes[size]
        )}
        role="status"
        aria-label="Loading"
      />
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
        <p className="text-sm text-dark-400">Loading...</p>
      </div>
    </div>
  )
}
