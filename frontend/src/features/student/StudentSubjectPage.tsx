import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { subjects, teachers, announcements, assignments, materials } from '@/lib/school-data'
import { ArrowRight, FileText, Video, Link, File, Download, CheckCircle, Clock } from 'lucide-react'

type Tab = 'materials' | 'announcements' | 'assignments'

const typeIcon = { pdf: FileText, video: Video, link: Link, doc: File }
const typeLabel = { pdf: 'PDF', video: 'فيديو', link: 'رابط', doc: 'مستند' }
const typeColor = { pdf: 'text-red-600 bg-red-50', video: 'text-blue-600 bg-blue-50', link: 'text-purple-600 bg-purple-50', doc: 'text-orange-600 bg-orange-50' }

export function StudentSubjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('materials')

  const subj = subjects.find(s => s.id === Number(id))
  const teacher = teachers.find(t => t.id === subj?.teacher_id)
  const subjAnnouncements = announcements.filter(a => a.subject_id === Number(id))
  const subjAssignments = assignments.filter(a => a.subject_id === Number(id))
  const subjMaterials = materials.filter(m => m.subject_id === Number(id))

  if (!subj) return <div className="text-center py-20 text-gray-400">المادة غير موجودة</div>

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'materials',     label: 'المواد التعليمية', count: subjMaterials.length },
    { key: 'announcements', label: 'الإعلانات',        count: subjAnnouncements.length },
    { key: 'assignments',   label: 'الواجبات',          count: subjAssignments.length },
  ]

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm">
        <button onClick={() => navigate('/student/subjects')} className="flex items-center gap-1 text-gray-500 hover:text-[#1b4332] transition">
          <ArrowRight className="w-4 h-4" /> موادي
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-medium">{subj.name_ar}</span>
      </div>

      {/* Subject header */}
      <div
        className="rounded-2xl p-5 lg:p-6 mb-6 text-white shadow-md flex items-center gap-4 flex-wrap"
        style={{ background: `linear-gradient(135deg, ${subj.color}ee, ${subj.color}99)` }}
      >
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
          {subj.icon}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{subj.name_ar}</h1>
          <p className="text-white/80 text-sm mt-0.5" dir="ltr">{subj.name_en}</p>
          {teacher && (
            <div className="flex items-center gap-2 mt-3">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                {teacher.avatar_initial}
              </div>
              <span className="text-sm text-white/90">{teacher.name_ar}</span>
            </div>
          )}
        </div>
        <div className="text-left flex-shrink-0">
          <div className="text-white/70 text-xs mb-1">التقدم في المنهج</div>
          <div className="text-3xl font-black">٦٥٪</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-gray-100 rounded-xl p-1 w-fit max-w-full overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
              tab === t.key ? 'bg-white text-[#1b4332] shadow-sm font-bold' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-[#1b4332] text-white' : 'bg-gray-200 text-gray-600'}`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Materials */}
      {tab === 'materials' && (
        <div className="space-y-3">
          {subjMaterials.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center text-gray-400 border border-[#e8e5df]">لا توجد مواد تعليمية بعد</div>
          ) : subjMaterials.map(m => {
            const Icon = typeIcon[m.type]
            return (
              <div key={m.id} className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-4 flex items-center gap-4 hover:shadow-md transition cursor-pointer">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColor[m.type]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{m.title_ar}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor[m.type]}`}>{typeLabel[m.type]}</span>
                    {m.size && <span className="text-xs text-gray-400">{m.size}</span>}
                    {m.duration && <span className="text-xs text-gray-400">⏱ {m.duration}</span>}
                    <span className="text-xs text-gray-400">{m.date}</span>
                  </div>
                </div>
                <button className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition text-gray-400 hover:text-[#1b4332]">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Announcements */}
      {tab === 'announcements' && (
        <div className="space-y-4">
          {subjAnnouncements.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center text-gray-400 border border-[#e8e5df]">لا توجد إعلانات</div>
          ) : subjAnnouncements.map(ann => {
            const t = teachers.find(t => t.id === ann.teacher_id)
            return (
              <div key={ann.id} className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{ann.title_ar}</h3>
                  <span className="text-xs text-gray-400">{ann.date}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{ann.body_ar}</p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                  <div className="w-6 h-6 rounded-full bg-[#1b4332] flex items-center justify-center text-white text-xs font-bold">
                    {t?.avatar_initial}
                  </div>
                  <span className="text-xs text-gray-500">{t?.name_ar}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Assignments */}
      {tab === 'assignments' && (
        <div className="space-y-3">
          {subjAssignments.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center text-gray-400 border border-[#e8e5df]">لا توجد واجبات</div>
          ) : subjAssignments.map(a => (
            <div key={a.id} className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{a.title_ar}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{a.description_ar}</p>
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" /> تسليم: {a.due_date}
                    </span>
                    <span className="text-xs text-gray-500">الدرجة: {a.max_grade}</span>
                    {a.grade !== undefined && (
                      <span className="text-xs font-bold text-emerald-600">✓ تم التصحيح: {a.grade}/{a.max_grade}</span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {a.status === 'submitted' && (
                    <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-medium">
                      <CheckCircle className="w-3.5 h-3.5" /> تم التسليم
                    </span>
                  )}
                  {a.status === 'graded' && (
                    <span className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full font-medium">
                      <CheckCircle className="w-3.5 h-3.5" /> تم التصحيح
                    </span>
                  )}
                  {a.status === 'pending' && (
                    <button className="text-xs bg-[#1b4332] text-white px-4 py-1.5 rounded-full font-medium hover:bg-[#143f27] transition">
                      تسليم الواجب
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
