import { Badge } from './Badge'
import type { StudentStatus, EnrollmentStatus, AttendanceStatus } from '@/lib/mock-data'

export function StudentStatusBadge({ status }: { status: StudentStatus }) {
  const map: Record<StudentStatus, { label: string; variant: 'green' | 'amber' | 'blue' | 'gray' }> = {
    active:    { label: 'نشط',    variant: 'green' },
    suspended: { label: 'موقوف', variant: 'amber' },
    graduated: { label: 'متخرج', variant: 'blue' },
    withdrawn: { label: 'منسحب', variant: 'gray' },
  }
  const { label, variant } = map[status]
  return <Badge variant={variant}>{label}</Badge>
}

export function EnrollmentStatusBadge({ status }: { status: EnrollmentStatus }) {
  const map: Record<EnrollmentStatus, { label: string; variant: 'green' | 'gray' | 'blue' }> = {
    active:    { label: 'نشط',    variant: 'green' },
    dropped:   { label: 'متوقف', variant: 'gray' },
    completed: { label: 'مكتمل', variant: 'blue' },
  }
  const { label, variant } = map[status]
  return <Badge variant={variant}>{label}</Badge>
}

export function AttendanceStatusBadge({ status }: { status: AttendanceStatus }) {
  const map: Record<AttendanceStatus, { label: string; variant: 'green' | 'red' | 'amber' | 'blue' }> = {
    present: { label: 'حاضر',  variant: 'green' },
    absent:  { label: 'غائب',  variant: 'red' },
    late:    { label: 'متأخر', variant: 'amber' },
    excused: { label: 'بعذر', variant: 'blue' },
  }
  const { label, variant } = map[status]
  return <Badge variant={variant}>{label}</Badge>
}
