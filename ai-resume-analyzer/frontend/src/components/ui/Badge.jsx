import { cn } from '@utils/cn'

const colors = {
  indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  green: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  yellow: 'bg-amber-100 text-amber-700 border-amber-200',
  red: 'bg-rose-100 text-rose-700 border-rose-200',
  purple: 'bg-violet-100 text-violet-700 border-violet-200',
  gray: 'bg-dark-100 text-dark-600 border-dark-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  pink: 'bg-pink-100 text-pink-700 border-pink-200',
  teal: 'bg-teal-100 text-teal-700 border-teal-200',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
}

export default function Badge({
  children,
  color = 'indigo',
  size = 'md',
  className,
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border font-medium',
        colors[color],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
