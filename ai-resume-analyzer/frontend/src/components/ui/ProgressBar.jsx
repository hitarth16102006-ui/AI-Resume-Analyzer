import { cn, getScoreBg } from '@utils/cn'

export default function ProgressBar({
  value = 0,
  label,
  showValue = true,
  size = 'md',
  color,
  className,
}) {
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' }

  return (
    <div className={cn('space-y-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium text-dark-700">{label}</span>}
          {showValue && (
            <span className={cn('text-sm font-semibold', color || getScoreBg(value).replace('bg-', 'text-'))}>
              {value}%
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full overflow-hidden rounded-full bg-dark-100', heights[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000 ease-out',
            color || getScoreBg(value)
          )}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  )
}
