import { CheckCircle, AlertTriangle } from 'lucide-react'

interface MoodleSyncBadgeProps {
  synced: boolean
}

export function MoodleSyncBadge({ synced }: MoodleSyncBadgeProps) {
  if (synced) {
    return (
      <span className="inline-flex items-center gap-1 text-emerald-600 text-sm">
        <CheckCircle className="w-4 h-4" />
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-medium">
      <AlertTriangle className="w-4 h-4" />
      <span>غير متزامن</span>
    </span>
  )
}
