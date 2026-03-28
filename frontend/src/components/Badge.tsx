import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'green' | 'amber' | 'red' | 'blue' | 'gray' | 'gold'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'gray', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variant === 'green' && 'bg-emerald-100 text-emerald-800',
        variant === 'amber' && 'bg-amber-100 text-amber-800',
        variant === 'red' && 'bg-red-100 text-red-800',
        variant === 'blue' && 'bg-blue-100 text-blue-800',
        variant === 'gray' && 'bg-gray-100 text-gray-600',
        variant === 'gold' && 'bg-yellow-100 text-yellow-800',
        className,
      )}
    >
      {children}
    </span>
  )
}
