import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockEnrollments, mockStudents, mockCourses } from '@/lib/mock-data'
import { delay, formatDate } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { EnrollmentStatusBadge } from '@/components/StatusBadge'
import { MoodleSyncBadge } from '@/components/MoodleSyncBadge'
import { TableSkeleton } from '@/components/Skeleton'
import { UserPlus, RefreshCw, Loader2, AlertTriangle } from 'lucide-react'

export function EnrollmentsPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [unsyncedOnly, setUnsyncedOnly] = useState(false)
  const [dropTarget, setDropTarget] = useState<number | null>(null)
  const [dropping, setDropping] = useState(false)
  const [retryingId, setRetryingId] = useState<number | null>(null)

  useEffect(() => {
    delay(700).then(() => setLoading(false))
  }, [])

  const filtered = mockEnrollments.filter(e => {
    if (statusFilter !== 'all' && e.status !== statusFilter) return false
    if (unsyncedOnly && e.moodle_synced) return false
    return true
  })

  async function handleDrop() {
    setDropping(true)
    await delay(900)
    setDropping(false)
    setDropTarget(null)
  }

  async function handleRetrySync(id: number) {
    setRetryingId(id)
    await delay(1500)
    setRetryingId(null)
  }

  return (
    <div>
      <PageHeader
        title="التسجيلات"
        subtitle={`${mockEnrollments.length} تسجيل`}
        action={
          <button
            onClick={() => navigate('/enrollments/new')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1b4332] text-white rounded-xl text-sm font-semibold hover:bg-[#143f27] transition shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            تسجيل طالب
          </button>
        }
      />

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#e8e5df] flex flex-wrap gap-3 items-center">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-right bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
        >
          <option value="all">الحالة: الكل</option>
          <option value="active">نشط</option>
          <option value="dropped">متوقف</option>
          <option value="completed">مكتمل</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={unsyncedOnly}
            onChange={e => setUnsyncedOnly(e.target.checked)}
            className="w-4 h-4 accent-[#1b4332] cursor-pointer"
          />
          بانتظار المزامنة فقط
        </label>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f0f7f4] border-b border-[#e8e5df]">
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الطالب</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">المقرر</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الحالة</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">Moodle</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">تاريخ التسجيل</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableSkeleton rows={5} cols={6} />
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400">
                  لا توجد تسجيلات تطابق الفلاتر المحددة
                </td>
              </tr>
            ) : (
              filtered.map(e => {
                const student = mockStudents.find(s => s.id === e.student_id)
                const course = mockCourses.find(c => c.id === e.course_id)
                const isUnsynced = !e.moodle_synced
                return (
                  <tr
                    key={e.id}
                    className={`border-b border-gray-100 hover:bg-[#f9fdf9] transition-colors ${isUnsynced ? 'border-e-2 border-e-amber-400' : ''}`}
                  >
                    <td className="px-4 py-3 font-medium text-[#1b4332]">
                      {student?.name_ar}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{course?.name_ar}</td>
                    <td className="px-4 py-3"><EnrollmentStatusBadge status={e.status} /></td>
                    <td className="px-4 py-3"><MoodleSyncBadge synced={e.moodle_synced} /></td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(e.enrolled_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {isUnsynced && (
                          <button
                            onClick={() => handleRetrySync(e.id)}
                            disabled={retryingId === e.id}
                            className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-100 transition"
                            title="إعادة مزامنة"
                          >
                            {retryingId === e.id
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : <RefreshCw className="w-4 h-4" />
                            }
                          </button>
                        )}
                        {e.status === 'active' && (
                          <button
                            onClick={() => setDropTarget(e.id)}
                            className="px-2 py-1 text-xs rounded-lg text-red-600 hover:bg-red-100 transition font-medium"
                            title="إسقاط التسجيل"
                          >
                            إسقاط
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Drop Dialog */}
      {dropTarget !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" dir="rtl">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">إسقاط التسجيل</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    هل تريد إسقاط هذا التسجيل؟ سيتم إلغاء تسجيل الطالب في Moodle.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={handleDrop}
                disabled={dropping}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition disabled:opacity-60"
              >
                {dropping ? 'جارٍ الإسقاط...' : 'إسقاط'}
              </button>
              <button
                onClick={() => setDropTarget(null)}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
