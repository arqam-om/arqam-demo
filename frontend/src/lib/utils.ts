import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—'
  const [y, m, d] = dateStr.split('T')[0].split('-')
  return `${d}/${m}/${y}`
}

export function formatDateTime(dateStr: string | null | undefined): string {
  if (!dateStr) return 'لم تتم المزامنة'
  const [date, time] = dateStr.split(' ')
  const [y, m, d] = date.split('-')
  return `${d}/${m}/${y} ${time ?? ''}`
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
