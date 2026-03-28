import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockStudents, mockCourses } from '@/lib/mock-data'
import { delay } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { ArrowRight, Loader2, AlertTriangle, CheckCircle } from 'lucide-react'

export function EnrollFormPage() {
  const navigate = useNavigate()
  const [studentId, setStudentId] = useState('')
  const [courseId, setCourseId] = useState('')
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [result, setResult] = useState<'synced' | 'unsynced' | null>(null)

  const activeStudents = mockStudents.filter(s => s.status === 'active')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!studentId) errs.student = 'يرجى اختيار الطالب'
    if (!courseId) errs.course = 'يرجى اختيار المقرر'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSaving(true)
    await delay(1500)
    setSaving(false)
    // Simulate: one of two outcomes
    setResult(Number(courseId) % 2 === 0 ? 'synced' : 'unsynced')
  }

  if (result === 'synced') {
    navigate('/enrollments')
    return null
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('/enrollments')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1b4332] transition">
          <ArrowRight className="w-4 h-4" />
          التسجيلات
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-700 font-medium">تسجيل طالب</span>
      </div>

      <PageHeader title="تسجيل طالب في مقرر" subtitle="سيتم مزامنة التسجيل مع Moodle تلقائياً" />

      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-6 max-w-xl">

        {result === 'unsynced' && (
          <div className="mb-5 bg-amber-50 border border-amber-300 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-800 text-sm">تم التسجيل في أرقام، لكن تعذّرت المزامنة مع Moodle</p>
                <p className="text-amber-700 text-xs mt-1">سيتم إعادة المحاولة يدوياً من قائمة التسجيلات.</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => navigate('/enrollments')}
                className="px-4 py-2 text-xs bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition font-medium"
              >
                عرض التسجيلات
              </button>
              <button
                onClick={() => { setResult(null); setStudentId(''); setCourseId('') }}
                className="px-4 py-2 text-xs border border-amber-400 text-amber-800 rounded-lg hover:bg-amber-100 transition font-medium"
              >
                تسجيل طالب آخر
              </button>
            </div>
          </div>
        )}

        {result === null && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                الطالب <span className="text-red-500">*</span>
              </label>
              <select
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                disabled={saving}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm text-right focus:outline-none focus:ring-2 transition ${errors.student ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-[#1b4332]'}`}
              >
                <option value="">اختر الطالب...</option>
                {activeStudents.map(s => (
                  <option key={s.id} value={s.id}>{s.name_ar} — {s.national_id}</option>
                ))}
              </select>
              {errors.student && <p className="mt-1 text-xs text-red-600">{errors.student}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                المقرر <span className="text-red-500">*</span>
              </label>
              <select
                value={courseId}
                onChange={e => setCourseId(e.target.value)}
                disabled={saving}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm text-right focus:outline-none focus:ring-2 transition ${errors.course ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-[#1b4332]'}`}
              >
                <option value="">اختر المقرر...</option>
                {mockCourses.map(c => (
                  <option key={c.id} value={c.id}>{c.name_ar}</option>
                ))}
              </select>
              {errors.course && <p className="mt-1 text-xs text-red-600">{errors.course}</p>}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#1b4332] text-white rounded-xl text-sm font-bold hover:bg-[#143f27] transition disabled:opacity-60 shadow-sm"
              >
                {saving
                  ? <><Loader2 className="w-4 h-4 animate-spin" />جارٍ التسجيل...</>
                  : <><CheckCircle className="w-4 h-4" />تسجيل</>
                }
              </button>
              <button
                type="button"
                onClick={() => navigate('/enrollments')}
                disabled={saving}
                className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
              >
                إلغاء
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
