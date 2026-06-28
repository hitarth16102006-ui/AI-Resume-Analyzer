import { useState } from 'react'
import { cn } from '@utils/cn'

export default function Input({
  label,
  error,
  icon: Icon,
  className,
  ...props
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="space-y-1.5">
      {label && (
        <label className={cn(
          'block text-sm font-medium transition-colors duration-200',
          error ? 'text-rose-600' : focused ? 'text-indigo-600' : 'text-dark-700'
        )}>
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Icon className={cn(
              'h-4 w-4 transition-colors duration-200',
              error ? 'text-rose-400' : focused ? 'text-indigo-500' : 'text-dark-400'
            )} />
          </div>
        )}
        <input
          className={cn(
            'block w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-dark-900 placeholder-dark-400 transition-all duration-200',
            'focus:outline-none focus:ring-2',
            Icon && 'pl-10',
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
              : focused
                ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                : 'border-dark-200 hover:border-dark-300',
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-rose-500 animate-fade-in-fast">{error}</p>
      )}
    </div>
  )
}
