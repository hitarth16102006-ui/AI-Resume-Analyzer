import { cn } from '@utils/cn'

export default function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-dark-100',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
        className
      )}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-dark-100 bg-white p-6 shadow-soft">
      <div className="mb-4 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="mb-2 h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="mb-2 h-3 w-full" />
      <Skeleton className="mb-2 h-3 w-5/6" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}

export function ScoreSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Skeleton className="h-32 w-32 rounded-full" />
      <Skeleton className="h-4 w-24" />
    </div>
  )
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-xl bg-white p-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="mb-1.5 h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      ))}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-dark-100 bg-white p-5 shadow-soft">
            <Skeleton className="mb-3 h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
        <div className="lg:col-span-2">
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
