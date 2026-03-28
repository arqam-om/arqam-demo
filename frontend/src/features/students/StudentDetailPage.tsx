import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockStudents, mockPrograms, mockEnrollments, mockCourses } from '@/lib/mock-data'
import { delay, formatDate } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { StudentStatusBadge, EnrollmentStatusBadge } from '@/components/StatusBadge'
import { MoodleSyncBadge } from '@/components/MoodleSyncBadge'
import { Skeleton } from '@/components/Skeleton'
import { CheckCircle, AlertTriangle, ArrowRight, Save, X } from 'lucide-react'

export function StudentDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'info' | 'enrollments'>('info')
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const student = mockStudents.find(s => s.id === Number(id))
  const program = mockPrograms.find(p => p.id === student?.program_id)
  const enrollments = mockEnrollments.filter(e => e.student_id === Number(id))

  useEffect(() => {
    delay(600).then(() => setLoading(false))
  }, [])

  async function handleSave() {
    setSaving(true)
    await delay(1000)
    setSaving(false)
    setEditing(false)
  }

  if (!loading && !student) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-400 text-xl mb-4">الطالب غير موجود</p>
        <button onClick={() => navigate('/students')} className="text-[#1b4332] underline text-sm">
          العودة لقائمة الطلاب
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('/students')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1b4332] transition">
          <ArrowRight className="w-4 h-4" />
          الطلاب
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-700 font-medium">
          {loading ? '...' : student?.name_ar}
        </span>
      </div>

      <PageHeader
        title={loading ? '...' : (student?.name_ar ?? '')}
        subtitle={loading ? '' : `رقم الهوية: ${student?.national_id}`}
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
        {[
          { key: 'info', label: 'البيانات الشخصية' },
          { key: 'enrollments', label: 'سجل التسجيلات' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'info' | 'enrollments')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab.key
                ? 'bg-white text-[#1b4332] shadow-sm font-bold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'info' && (
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">البيانات الشخصية</h3>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 text-sm border border-[#1b4332] text-[#1b4332] rounded-lg hover:bg-[#f0f7f4] transition font-medium"
              >
                تعديل
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#1b4332] text-white rounded-lg hover:bg-[#143f27] transition font-medium disabled:opacity-60"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? 'جارٍ الحفظ...' : 'حفظ التعديلات'}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition"
                >
                  <X className="w-3.5 h-3.5" />
                  إلغاء
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-14" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="رقم الهوية الوطنية" value={student?.national_id ?? ''} readOnly />
              <Field label="الاسم بالعربية" value={student?.name_ar ?? ''} editing={editing} />
              <Field label="الاسم بالإنجليزية" value={student?.name_en ?? ''} editing={editing} ltr />
              <Field label="رقم الهاتف" value={student?.phone ?? ''} editing={editing} />
              <Field label="البريد الإلكتروني" value={student?.email ?? ''} editing={editing} />
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">الحالة</label>
                {editing ? (
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1b4332]">
                    <option value="active">نشط</option>
                    <option value="suspended">موقوف</option>
                    <option value="graduated">متخرج</option>
                    <option value="withdrawn">منسحب</option>
                  </select>
                ) : (
                  <div className="mt-1">
                    <StudentStatusBadge status={student!.status} />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">البرنامج</label>
                {editing ? (
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1b4332]">
                    <option value="">بدون برنامج</option>
                    {mockPrograms.map(p => <option key={p.id} value={p.id}>{p.name_ar}</option>)}
                  </select>
                ) : (
                  <p className="text-sm text-gray-800 mt-1">{program?.name_ar ?? <span className="text-gray-400">غير مُعيَّن</span>}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">حساب Moodle</label>
                <div className="mt-1">
                  {student?.moodle_user_id ? (
                    <span className="flex items-center gap-1.5 text-sm text-emerald-700">
                      <CheckCircle className="w-4 h-4" />
                      مرتبط بـ Moodle (ID: {student.moodle_user_id})
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm text-amber-700">
                      <AlertTriangle className="w-4 h-4" />
                      لم يتم إنشاء حساب Moodle بعد
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'enrollments' && (
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">سجل التسجيلات</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f0f7f4] border-b border-[#e8e5df]">
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">المقرر</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الحالة</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">Moodle</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">تاريخ التسجيل</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400">لا توجد تسجيلات لهذا الطالب</td>
                </tr>
              ) : enrollments.map(e => {
                const course = mockCourses.find(c => c.id === e.course_id)
                return (
                  <tr key={e.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{course?.name_ar}</td>
                    <td className="px-4 py-3"><EnrollmentStatusBadge status={e.status} /></td>
                    <td className="px-4 py-3"><MoodleSyncBadge synced={e.moodle_synced} /></td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(e.enrolled_at)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  value,
  editing = false,
  readOnly = false,
  ltr = false,
}: {
  label: string
  value: string
  editing?: boolean
  readOnly?: boolean
  ltr?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      {editing && !readOnly ? (
        <input
          defaultValue={value}
          dir={ltr ? 'ltr' : 'rtl'}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
        />
      ) : (
        <p className={`text-sm text-gray-800 py-1 ${ltr ? 'text-left' : ''}`} dir={ltr ? 'ltr' : undefined}>
          {value || <span className="text-gray-400">—</span>}
        </p>
      )}
    </div>
  )
}
