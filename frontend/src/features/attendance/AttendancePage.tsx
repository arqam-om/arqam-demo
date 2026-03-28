import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockAttendance, mockStudents } from '@/lib/mock-data'
import { subjects } from '@/lib/school-data'
import { delay, formatDate } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { AttendanceStatusBadge } from '@/components/StatusBadge'
import { TableSkeleton } from '@/components/Skeleton'
import { ClipboardCheck, Pencil } from 'lucide-react'

export function AttendancePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [subjectFilter, setSubjectFilter] = useState('all')

  useEffect(() => {
    delay(600).then(() => setLoading(false))
  }, [])

  const filtered = subjectFilter === 'all'
    ? mockAttendance
    : mockAttendance.filter(a => String(a.course_id) === subjectFilter)

  return (
    <div>
      <PageHeader
        title="الحضور"
        subtitle="سجلات الحضور والغياب"
        action={
          <button
            onClick={() => navigate('/attendance/new')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1b4332] text-white rounded-xl text-sm font-semibold hover:bg-[#143f27] transition shadow-sm"
          >
            <ClipboardCheck className="w-4 h-4" />
            تسجيل الحضور
          </button>
        }
      />

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#e8e5df] flex flex-wrap gap-3">
        <select
          value={subjectFilter}
          onChange={e => setSubjectFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-right bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
        >
          <option value="all">المادة: الكل</option>
          {subjects.map(s => (
            <option key={s.id} value={String(s.id)}>{s.name_ar}</option>
          ))}
        </select>
        <input
          type="date"
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
          defaultValue="2026-03-28"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="bg-[#f0f7f4] border-b border-[#e8e5df]">
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">المادة</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الطالب</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">تاريخ الجلسة</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الحالة</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">ملاحظة</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">سُجِّل بواسطة</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableSkeleton rows={5} cols={7} />
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">
                  لا توجد سجلات حضور تطابق الفلاتر المحددة
                </td>
              </tr>
            ) : (
              filtered.map(att => {
                const student = mockStudents.find(s => s.id === att.student_id)
                const subject = subjects.find(s => s.id === att.course_id)
                return (
                  <tr key={att.id} className="border-b border-gray-100 hover:bg-[#f9fdf9] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {subject ? (
                          <>
                            <span className="text-base">{subject.icon}</span>
                            <span className="font-medium text-gray-800">{subject.name_ar}</span>
                          </>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{student?.name_ar ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(att.session_date)}</td>
                    <td className="px-4 py-3"><AttendanceStatusBadge status={att.status} /></td>
                    <td className="px-4 py-3 text-gray-500">{att.note ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{att.marked_by}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/attendance/${att.id}/edit`)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-[#d8ece4] hover:text-[#1b4332] transition"
                        title="تعديل"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
