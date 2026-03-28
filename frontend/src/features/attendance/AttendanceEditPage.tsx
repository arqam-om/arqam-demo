import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockAttendance, mockStudents, mockCourses, type AttendanceStatus } from '@/lib/mock-data'
import { delay, formatDate } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { Skeleton } from '@/components/Skeleton'
import { ArrowRight, Loader2 } from 'lucide-react'

export function AttendanceEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<AttendanceStatus>('present')
  const [note, setNote] = useState('')

  const att = mockAttendance.find(a => a.id === Number(id))
  const student = mockStudents.find(s => s.id === att?.student_id)
  const course = mockCourses.find(c => c.id === att?.course_id)

  useEffect(() => {
    delay(500).then(() => {
      if (att) { setStatus(att.status); setNote(att.note ?? '') }
      setLoading(false)
    })
  }, [att])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await delay(1000)
    setSaving(false)
    navigate('/attendance')
  }

  if (!loading && !att) {
    return <div className="text-center py-24 text-gray-400">السجل غير موجود</div>
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('/attendance')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1b4332] transition">
          <ArrowRight className="w-4 h-4" />
          الحضور
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-700 font-medium">تعديل سجل الحضور</span>
      </div>

      <PageHeader title="تعديل سجل الحضور" />

      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-6 max-w-lg">
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10" />)}
          </div>
        ) : (
          <>
            {/* Context (read-only) */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
              <Row label="المقرر" value={course?.name_ar ?? '—'} />
              <Row label="الطالب" value={student?.name_ar ?? '—'} />
              <Row label="التاريخ" value={formatDate(att?.session_date ?? '')} />
              <Row label="سُجِّل بواسطة" value={`${att?.marked_by} — ${att?.created_at}`} />
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">الحالة الجديدة</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as AttendanceStatus)}
                  disabled={saving}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
                >
                  <option value="present">حاضر</option>
                  <option value="absent">غائب</option>
                  <option value="late">متأخر</option>
                  <option value="excused">بعذر</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">ملاحظة</label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  disabled={saving}
                  rows={3}
                  placeholder="ملاحظة اختيارية..."
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1b4332] resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#1b4332] text-white rounded-xl text-sm font-bold hover:bg-[#143f27] transition disabled:opacity-60 shadow-sm"
                >
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" />جارٍ الحفظ...</> : 'حفظ التعديل'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/attendance')}
                  className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}:</span>
      <span className="text-gray-800 font-medium">{value}</span>
    </div>
  )
}
