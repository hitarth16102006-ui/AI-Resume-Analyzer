export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getScoreColor(score) {
  if (score >= 80) return 'text-emerald-500'
  if (score >= 60) return 'text-amber-500'
  return 'text-rose-500'
}

export function getScoreBg(score) {
  if (score >= 80) return 'bg-emerald-500'
  if (score >= 60) return 'bg-amber-500'
  return 'bg-rose-500'
}

export function getScoreRing(score) {
  if (score >= 80) return '#10b981'
  if (score >= 60) return '#f59e0b'
  return '#ef4444'
}
