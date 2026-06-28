import { cn, getScoreColor, getScoreRing } from '@utils/cn'

export default function ScoreMeter({ score = 0, label, size = 'md', className }) {
  const normalizedScore = Math.min(100, Math.max(0, score))
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (normalizedScore / 100) * circumference

  const sizes = {
    sm: 'h-24 w-24',
    md: 'h-32 w-32',
    lg: 'h-40 w-40',
    xl: 'h-48 w-48',
  }
  const textSizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
  }
  const strokeWidth = size === 'sm' ? 6 : size === 'xl' ? 10 : 8

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className={cn('relative', sizes[size])}>
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-dark-100"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={getScoreRing(normalizedScore)}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn('font-bold', getScoreColor(normalizedScore), textSizes[size])}>
            {normalizedScore}
          </span>
        </div>
      </div>
      {label && (
        <span className="text-xs font-medium text-dark-500">{label}</span>
      )}
    </div>
  )
}
