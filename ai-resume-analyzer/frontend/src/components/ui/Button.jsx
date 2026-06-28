import { cn } from '@utils/cn'

const variants = {
  primary:
    'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg active:scale-[0.98] transition-all',
  secondary:
    'bg-white text-dark-700 border border-dark-200 hover:bg-dark-50 hover:border-dark-300 active:scale-[0.98] transition-all',
  ghost:
    'text-dark-600 hover:bg-dark-100 hover:text-dark-900 active:scale-[0.98] transition-all',
  danger:
    'bg-rose-600 text-white hover:bg-rose-700 shadow-sm active:scale-[0.98] transition-all',
  outline:
    'bg-transparent text-indigo-600 border-2 border-indigo-500 hover:bg-indigo-50 active:scale-[0.98] transition-all',
  gradient:
    'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg active:scale-[0.98] transition-all',
  glass:
    'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 active:scale-[0.98] transition-all',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
  xl: 'px-10 py-4 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}
