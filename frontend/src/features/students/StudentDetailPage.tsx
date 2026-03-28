import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { students, subjects, teachers, assignments } from '@/lib/school-data'
import { delay } from '@/lib/utils'
import { Skeleton } from '@/components/Skeleton'
import { ArrowRight, Save, X } from 'lucide-react'

const gradeLabel = (g: number) => g === 10 ? 'العاشر' : g === 11 ? 'الحادي عشر' : 'الثاني عشر'

export function StudentDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'info' | 'subjects' | 'assignments'>('info')
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const student = students.find(s => s.id === Number(id))
  const mySubjects = subjects.filter(s => student?.subject_ids.includes(s.id))
  const myAssignments = assignments.filter(a => student?.subject_ids.includes(a.subject_id))

  useEffect(() => {
    delay(500).then(() => setLoading(false))
  }, [])

  async function handleSave() {
    setSaving(true)
    await delay(900)
    setSaving(false)
    setEditing(false)
  }

  if (!loading && !student) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-400 text-xl mb-4">الطالب غير موجود</p>
        <button onClick={() => navigate('/students')} className="text-[#1b4332] underline text-sm">العودة لقائمة الطلاب</button>
      </div>
    )
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm">
        <button onClick={() => navigate('/students')} className="flex items-center gap-1 text-gray-500 hover:text-[#1b4332] transition">
          <ArrowRight className="w-4 h-4" /> الطلاب
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-medium">{loading ? '...' : student?.name_ar}</span>
      </div>

      {/* Header card */}
      {!loading && student && (
        <div className="bg-gradient-to-l from-[#1b4332] to-[#2d6a4f] rounded-2xl p-6 mb-6 text-white flex items-center gap-5 shadow-md">
          <div className="w-16 h-16 rounded-2xl bg-[#c9a84c] flex items-center justify-center text-2xl font-black text-[#1b4332] flex-shrink-0">
            {student.name_ar.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{student.name_ar}</h1>
            <p className="text-[#95d5b2] text-sm mt-0.5" dir="ltr">{student.name_en}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-xs bg-[#0a2416] px-2.5 py-1 rounded-full text-[#95d5b2]">
                الصف {gradeLabel(student.grade)} {student.section}
              </span>
              <span className="text-xs bg-[#0a2416] px-2.5 py-1 rounded-full text-[#95d5b2]">
                رقم الهوية: {student.national_id}
              </span>
              {student.math_track && (
                <span className="text-xs bg-[#c9a84c] px-2.5 py-1 rounded-full text-[#1b4332] font-semibold">
                  رياضيات {student.math_track === 'advanced' ? 'متقدمة' : 'أساسية'}
                </span>
              )}
            </div>
          </div>
          <div className="text-left">
            <div className="text-[#95d5b2] text-xs mb-1">المعدل التراكمي</div>
            <div className="text-4xl font-black text-[#c9a84c]">{student.gpa.toFixed(1)}</div>
            <div className="text-[#95d5b2] text-xs mt-0.5">من ٤.٠</div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
        {[
          { key: 'info',        label: 'البيانات الشخصية' },
          { key: 'subjects',    label: `المواد (${mySubjects.length})` },
          { key: 'assignments', label: `الواجبات (${myAssignments.length})` },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${activeTab === tab.key ? 'bg-white text-[#1b4332] shadow-sm font-bold' : 'text-gray-500 hover:text-gray-700'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Info tab */}
      {activeTab === 'info' && (
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-6 max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">البيانات الشخصية</h3>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="px-4 py-2 text-sm border border-[#1b4332] text-[#1b4332] rounded-lg hover:bg-[#f0f7f4] transition font-medium">
                تعديل
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSave} disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#1b4332] text-white rounded-lg hover:bg-[#143f27] transition font-medium disabled:opacity-60">
                  <Save className="w-3.5 h-3.5" />
                  {saving ? 'جارٍ الحفظ...' : 'حفظ التعديلات'}
                </button>
                <button onClick={() => setEditing(false)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">
                  <X className="w-3.5 h-3.5" /> إلغاء
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-14" />)}
            </div>
          ) : student && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoField label="الاسم بالعربية"     value={student.name_ar}     editing={editing} />
              <InfoField label="الاسم بالإنجليزية"  value={student.name_en}     editing={editing} ltr />
              <InfoField label="رقم الهوية الوطنية" value={student.national_id} readOnly />
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">الصف</label>
                {editing ? (
                  <select defaultValue={student.grade} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1b4332]">
                    <option value={10}>الصف العاشر</option>
                    <option value={11}>الصف الحادي عشر</option>
                    <option value={12}>الصف الثاني عشر</option>
                  </select>
                ) : (
                  <p className="text-sm text-gray-800 py-1">
                    الصف {gradeLabel(student.grade)} — شعبة {student.section}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">مسار الرياضيات</label>
                {editing ? (
                  <select defaultValue={student.math_track ?? ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1b4332]">
                    <option value="">غير محدد (صف عاشر)</option>
                    <option value="advanced">رياضيات متقدمة</option>
                    <option value="basic">رياضيات أساسية</option>
                  </select>
                ) : (
                  <p className="text-sm text-gray-800 py-1">
                    {student.math_track
                      ? `رياضيات ${student.math_track === 'advanced' ? 'متقدمة' : 'أساسية'}`
                      : <span className="text-gray-400">—</span>}
                  </p>
                )}
              </div>
              <InfoField label="المعدل التراكمي" value={`${student.gpa.toFixed(1)} / 4.0`} readOnly />
            </div>
          )}
        </div>
      )}

      {/* Subjects tab */}
      {activeTab === 'subjects' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mySubjects.map(s => {
            const teacher = teachers.find(t => t.id === s.teacher_id)
            return (
              <div key={s.id} className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: s.color + '18' }}>
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{s.name_ar}</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{teacher?.name_ar}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Assignments tab */}
      {activeTab === 'assignments' && (
        <div className="space-y-3">
          {myAssignments.map(a => {
            const subj = subjects.find(s => s.id === a.subject_id)
            const statusMap = {
              pending:   { label: 'معلّق',      color: 'bg-amber-100 text-amber-700' },
              submitted: { label: 'مُسلَّم',     color: 'bg-blue-100 text-blue-700' },
              graded:    { label: 'تم التصحيح', color: 'bg-emerald-100 text-emerald-700' },
            }
            const cfg = statusMap[a.status]
            return (
              <div key={a.id} className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: subj?.color + '18' }}>
                  {subj?.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-gray-900 text-sm">{a.title_ar}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${cfg.color}`}>{cfg.label}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{subj?.name_ar} · تسليم: {a.due_date} · الدرجة: {a.max_grade}</p>
                  {a.grade !== undefined && (
                    <p className="text-xs text-emerald-600 font-bold mt-1">درجة الطالب: {a.grade}/{a.max_grade}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function InfoField({ label, value, editing = false, readOnly = false, ltr = false }: {
  label: string; value: string; editing?: boolean; readOnly?: boolean; ltr?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      {editing && !readOnly ? (
        <input defaultValue={value} dir={ltr ? 'ltr' : 'rtl'}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4332]" />
      ) : (
        <p className={`text-sm text-gray-800 py-1 ${ltr ? 'text-left' : ''}`} dir={ltr ? 'ltr' : undefined}>
          {value || <span className="text-gray-400">—</span>}
        </p>
      )}
    </div>
  )
}
