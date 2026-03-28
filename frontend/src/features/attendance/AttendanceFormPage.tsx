import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { subjects, students } from '@/lib/school-data'
import { type AttendanceStatus } from '@/lib/mock-data'
import { delay } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { ArrowRight, Loader2, CheckCircle, Users } from 'lucide-react'

const STATUS_OPTIONS: { value: AttendanceStatus; label: string }[] = [
  { value: 'present', label: 'حاضر' },
  { value: 'absent', label: 'غائب' },
  { value: 'late', label: 'متأخر' },
  { value: 'excused', label: 'بعذر' },
]

const statusColors: Record<AttendanceStatus, string> = {
  present: 'text-emerald-700 bg-emerald-100',
  absent: 'text-red-700 bg-red-100',
  late: 'text-amber-700 bg-amber-100',
  excused: 'text-blue-700 bg-blue-100',
}

export function AttendanceFormPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<1 | 2>(1)
  const [subjectId, setSubjectId] = useState('')
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0])
  const [saving, setSaving] = useState(false)

  const subject = subjects.find(s => s.id === Number(subjectId))

  // Students enrolled in this subject
  const subjectStudents = subjectId
    ? students.filter(s => s.subject_ids.includes(Number(subjectId)))
    : students

  const [records, setRecords] = useState<Record<number, { status: AttendanceStatus; note: string }>>(
    Object.fromEntries(students.map(s => [s.id, { status: 'present', note: '' }]))
  )

  function markAllPresent() {
    setRecords(prev => {
      const next = { ...prev }
      subjectStudents.forEach(s => { next[s.id] = { status: 'present', note: '' } })
      return next
    })
  }

  function updateRecord(studentId: number, field: 'status' | 'note', value: string) {
    setRecords(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], [field]: value },
    }))
  }

  async function handleSubmit() {
    setSaving(true)
    await delay(1400)
    setSaving(false)
    navigate('/attendance')
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('/attendance')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1b4332] transition">
          <ArrowRight className="w-4 h-4" />
          الحضور
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-700 font-medium">تسجيل الحضور</span>
      </div>

      <PageHeader title="تسجيل الحضور" subtitle={step === 1 ? 'الخطوة ١ من ٢ — اختيار المادة والتاريخ' : `الخطوة ٢ من ٢ — ورقة الحضور`} />

      {step === 1 && (
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-6 max-w-md">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                المادة الدراسية <span className="text-red-500">*</span>
              </label>
              <select
                value={subjectId}
                onChange={e => setSubjectId(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
              >
                <option value="">اختر المادة...</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.icon} {s.name_ar}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                تاريخ الجلسة <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={sessionDate}
                onChange={e => setSessionDate(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!subjectId || !sessionDate}
              className="w-full py-3 bg-[#1b4332] text-white rounded-xl text-sm font-bold hover:bg-[#143f27] transition disabled:opacity-50 shadow-sm"
            >
              متابعة
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          {/* Sheet header */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{subject?.icon}</span>
              <div>
                <span className="font-bold text-gray-900 text-lg">{subject?.name_ar}</span>
                <span className="text-gray-400 mx-2">—</span>
                <span className="text-gray-600 text-sm">{sessionDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={markAllPresent}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-medium hover:bg-emerald-100 transition"
              >
                <Users className="w-4 h-4" />
                تحديد الكل حاضر
              </button>
              <button
                onClick={() => setStep(1)}
                className="text-sm text-gray-500 hover:text-[#1b4332] transition"
              >
                رجوع
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f0f7f4] border-b border-[#e8e5df]">
                  <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الاسم</th>
                  <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">رقم الهوية</th>
                  <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الصف</th>
                  <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الحالة</th>
                  <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">ملاحظة</th>
                </tr>
              </thead>
              <tbody>
                {subjectStudents.map(student => (
                  <tr key={student.id} className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">{student.name_ar}</td>
                    <td className="px-4 py-3 font-mono text-gray-500 text-xs">{student.national_id}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{student.grade}{student.section}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {STATUS_OPTIONS.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => updateRecord(student.id, 'status', opt.value)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                              records[student.id]?.status === opt.value
                                ? statusColors[opt.value] + ' border-transparent shadow-sm'
                                : 'text-gray-500 border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={records[student.id]?.note ?? ''}
                        onChange={e => updateRecord(student.id, 'note', e.target.value)}
                        placeholder="ملاحظة..."
                        className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-right focus:outline-none focus:ring-1 focus:ring-[#1b4332]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sticky footer */}
          <div className="bg-white rounded-2xl shadow-md border border-[#e8e5df] p-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">{subjectStudents.length} طالب</span>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 border border-gray-300 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
              >
                رجوع
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#1b4332] text-white rounded-xl text-sm font-bold hover:bg-[#143f27] transition disabled:opacity-60 shadow-sm"
              >
                {saving
                  ? <><Loader2 className="w-4 h-4 animate-spin" />جارٍ الحفظ...</>
                  : <><CheckCircle className="w-4 h-4" />حفظ الحضور</>
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
