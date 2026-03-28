import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  teacherClasses, subjects, students, announcements as initialAnnouncements,
  assignments as initialAssignments, materials as initialMaterials,
  currentTeacher, type Announcement, type Assignment, type Material
} from '@/lib/school-data'
import { ArrowRight, Plus, X, Send, Upload, FileText, Megaphone, ClipboardList } from 'lucide-react'

type Tab = 'announcements' | 'assignments' | 'materials' | 'students'

// ─── Class List ───────────────────────────────────────────────────────────────
export function TeacherClassesList() {
  const navigate = useNavigate()
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">صفوفي</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teacherClasses.map(cls => {
          const subj = subjects.find(s => s.id === cls.subject_id)
          return (
            <button
              key={cls.id}
              onClick={() => navigate(`/teacher/classes/${cls.id}`)}
              className="group bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-6 text-right hover:shadow-md hover:border-[#c9a84c] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: subj?.color + '18' }}>
                  {subj?.icon}
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                  {cls.student_count} طالب
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-base">{subj?.name_ar}</h3>
              <p className="text-sm text-gray-500 mt-0.5">الصف {cls.grade}{cls.section}</p>
              <div className="mt-4 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: '60%', backgroundColor: subj?.color }} />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">تقدم المنهج: ٦٠٪</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Class Detail / Workspace ─────────────────────────────────────────────────
export function TeacherClassWorkspace() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('announcements')

  const cls = teacherClasses.find(c => c.id === Number(id))
  const subj = subjects.find(s => s.id === cls?.subject_id)

  // Local state for live interactions
  const [announcements, setAnnouncements] = useState<Announcement[]>(
    initialAnnouncements.filter(a => a.subject_id === cls?.subject_id)
  )
  const [assignments, setAssignments] = useState<Assignment[]>(
    initialAssignments.filter(a => a.subject_id === cls?.subject_id)
  )
  const [mats, setMats] = useState<Material[]>(
    initialMaterials.filter(m => m.subject_id === cls?.subject_id)
  )

  // Modal states
  const [showAnnModal, setShowAnnModal] = useState(false)
  const [showAssModal, setShowAssModal] = useState(false)
  const [showMatModal, setShowMatModal] = useState(false)
  const [newAnn, setNewAnn] = useState({ title_ar: '', body_ar: '' })
  const [newAss, setNewAss] = useState({ title_ar: '', description_ar: '', due_date: '', max_grade: '10' })
  const [newMat, setNewMat] = useState({ title_ar: '', type: 'pdf' as Material['type'] })

  const classStudents = students.filter(st => st.grade === cls?.grade && st.subject_ids.includes(cls?.subject_id ?? 0))

  if (!cls || !subj) return <div className="text-center py-20 text-gray-400">الصف غير موجود</div>

  function postAnnouncement() {
    if (!newAnn.title_ar.trim()) return
    const ann: Announcement = {
      id: Date.now(), subject_id: subj!.id,
      title_ar: newAnn.title_ar, body_ar: newAnn.body_ar,
      teacher_id: currentTeacher.id, date: new Date().toISOString().split('T')[0],
    }
    setAnnouncements(prev => [ann, ...prev])
    setNewAnn({ title_ar: '', body_ar: '' })
    setShowAnnModal(false)
  }

  function createAssignment() {
    if (!newAss.title_ar.trim() || !newAss.due_date) return
    const ass: Assignment = {
      id: Date.now(), subject_id: subj!.id,
      title_ar: newAss.title_ar, description_ar: newAss.description_ar,
      teacher_id: currentTeacher.id, due_date: newAss.due_date,
      max_grade: Number(newAss.max_grade), status: 'pending',
    }
    setAssignments(prev => [ass, ...prev])
    setNewAss({ title_ar: '', description_ar: '', due_date: '', max_grade: '10' })
    setShowAssModal(false)
  }

  function uploadMaterial() {
    if (!newMat.title_ar.trim()) return
    const mat: Material = {
      id: Date.now(), subject_id: subj!.id,
      title_ar: newMat.title_ar, type: newMat.type,
      date: new Date().toISOString().split('T')[0], size: '1.2 MB',
    }
    setMats(prev => [mat, ...prev])
    setNewMat({ title_ar: '', type: 'pdf' })
    setShowMatModal(false)
  }

  const tabs: { key: Tab; label: string; icon: React.ElementType; count: number }[] = [
    { key: 'announcements', label: 'الإعلانات',      icon: Megaphone,    count: announcements.length },
    { key: 'assignments',   label: 'الواجبات',        icon: ClipboardList,count: assignments.length },
    { key: 'materials',     label: 'المواد',           icon: FileText,     count: mats.length },
    { key: 'students',      label: 'الطلاب',           icon: FileText,     count: classStudents.length },
  ]

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm">
        <button onClick={() => navigate('/teacher/classes')} className="flex items-center gap-1 text-gray-500 hover:text-[#1a2e44] transition">
          <ArrowRight className="w-4 h-4" /> صفوفي
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-medium">{subj.name_ar} — الصف {cls.grade}{cls.section}</span>
      </div>

      {/* Header */}
      <div className="rounded-2xl p-6 mb-6 text-white shadow-md flex items-center gap-4"
        style={{ background: `linear-gradient(135deg, ${subj.color}ee, ${subj.color}88)` }}>
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">{subj.icon}</div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{subj.name_ar}</h1>
          <p className="text-white/80 text-sm mt-1">الصف {cls.grade}{cls.section} — {cls.student_count} طالب</p>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={() => setShowAnnModal(true)} className="flex items-center gap-1.5 text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition font-medium">
            <Megaphone className="w-3.5 h-3.5" /> إعلان
          </button>
          <button onClick={() => setShowAssModal(true)} className="flex items-center gap-1.5 text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition font-medium">
            <ClipboardList className="w-3.5 h-3.5" /> واجب
          </button>
          <button onClick={() => setShowMatModal(true)} className="flex items-center gap-1.5 text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition font-medium">
            <Upload className="w-3.5 h-3.5" /> مادة
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-gray-100 rounded-xl p-1 w-fit overflow-x-auto">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 whitespace-nowrap ${tab === t.key ? 'bg-white text-[#1a2e44] shadow-sm font-bold' : 'text-gray-500'}`}>
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-[#1a2e44] text-white' : 'bg-gray-200 text-gray-600'}`}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Announcements tab */}
      {tab === 'announcements' && (
        <div className="space-y-3">
          <button onClick={() => setShowAnnModal(true)}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[#c9a84c] rounded-2xl text-[#1a2e44] hover:bg-[#c9a84c]/5 transition text-sm font-medium">
            <Plus className="w-4 h-4" /> نشر إعلان جديد
          </button>
          {announcements.map(ann => (
            <div key={ann.id} className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900">{ann.title_ar}</h3>
                <span className="text-xs text-gray-400">{ann.date}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{ann.body_ar}</p>
            </div>
          ))}
        </div>
      )}

      {/* Assignments tab */}
      {tab === 'assignments' && (
        <div className="space-y-3">
          <button onClick={() => setShowAssModal(true)}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[#c9a84c] rounded-2xl text-[#1a2e44] hover:bg-[#c9a84c]/5 transition text-sm font-medium">
            <Plus className="w-4 h-4" /> إنشاء واجب جديد
          </button>
          {assignments.map(a => (
            <div key={a.id} className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{a.title_ar}</h3>
                  <p className="text-sm text-gray-500 mt-1">{a.description_ar}</p>
                </div>
                <div className="text-left flex-shrink-0 ms-4">
                  <div className="text-xs text-gray-400">التسليم</div>
                  <div className="text-sm font-bold text-gray-700">{a.due_date}</div>
                  <div className="text-xs text-gray-400 mt-1">الدرجة: {a.max_grade}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Materials tab */}
      {tab === 'materials' && (
        <div className="space-y-3">
          <button onClick={() => setShowMatModal(true)}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[#c9a84c] rounded-2xl text-[#1a2e44] hover:bg-[#c9a84c]/5 transition text-sm font-medium">
            <Upload className="w-4 h-4" /> رفع مادة تعليمية
          </button>
          {mats.map(m => (
            <div key={m.id} className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{m.title_ar}</p>
                <p className="text-xs text-gray-400 mt-0.5">{m.type.toUpperCase()} {m.size ? `— ${m.size}` : ''} — {m.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Students tab */}
      {tab === 'students' && (
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-right font-semibold text-gray-600">#</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">اسم الطالب</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">رقم الهوية</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">المعدل</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">لا يوجد طلاب</td></tr>
              ) : classStudents.map((st, i) => (
                <tr key={st.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{st.name_ar}</td>
                  <td className="px-4 py-3 font-mono text-gray-500 text-xs">{st.national_id}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold text-[#1a2e44]">{st.gpa.toFixed(1)}</span>
                    <span className="text-xs text-gray-400">/4.0</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── Announcement Modal ─── */}
      {showAnnModal && (
        <Modal title="نشر إعلان جديد" onClose={() => setShowAnnModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الإعلان *</label>
              <input value={newAnn.title_ar} onChange={e => setNewAnn(p => ({ ...p, title_ar: e.target.value }))}
                placeholder="مثال: اختبار الأسبوع القادم"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1a2e44]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تفاصيل الإعلان</label>
              <textarea value={newAnn.body_ar} onChange={e => setNewAnn(p => ({ ...p, body_ar: e.target.value }))}
                rows={3} placeholder="اكتب تفاصيل الإعلان هنا..."
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1a2e44] resize-none" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={postAnnouncement}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#1a2e44] text-white rounded-xl text-sm font-bold hover:bg-[#0f1f30] transition">
                <Send className="w-4 h-4" /> نشر
              </button>
              <button onClick={() => setShowAnnModal(false)} className="px-5 py-2.5 border border-gray-300 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition">إلغاء</button>
            </div>
          </div>
        </Modal>
      )}

      {/* ─── Assignment Modal ─── */}
      {showAssModal && (
        <Modal title="إنشاء واجب جديد" onClose={() => setShowAssModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الواجب *</label>
              <input value={newAss.title_ar} onChange={e => setNewAss(p => ({ ...p, title_ar: e.target.value }))}
                placeholder="مثال: حل تمارين الوحدة الخامسة"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1a2e44]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
              <textarea value={newAss.description_ar} onChange={e => setNewAss(p => ({ ...p, description_ar: e.target.value }))}
                rows={2} placeholder="تفاصيل الواجب..."
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1a2e44] resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">موعد التسليم *</label>
                <input type="date" value={newAss.due_date} onChange={e => setNewAss(p => ({ ...p, due_date: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e44]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الدرجة الكاملة</label>
                <input type="number" value={newAss.max_grade} onChange={e => setNewAss(p => ({ ...p, max_grade: e.target.value }))}
                  min="1" max="100"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e44]" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={createAssignment}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#1a2e44] text-white rounded-xl text-sm font-bold hover:bg-[#0f1f30] transition">
                <ClipboardList className="w-4 h-4" /> إنشاء
              </button>
              <button onClick={() => setShowAssModal(false)} className="px-5 py-2.5 border border-gray-300 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition">إلغاء</button>
            </div>
          </div>
        </Modal>
      )}

      {/* ─── Material Modal ─── */}
      {showMatModal && (
        <Modal title="رفع مادة تعليمية" onClose={() => setShowMatModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم المادة *</label>
              <input value={newMat.title_ar} onChange={e => setNewMat(p => ({ ...p, title_ar: e.target.value }))}
                placeholder="مثال: ملخص الوحدة الخامسة"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1a2e44]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نوع الملف</label>
              <select value={newMat.type} onChange={e => setNewMat(p => ({ ...p, type: e.target.value as Material['type'] }))}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1a2e44]">
                <option value="pdf">PDF</option>
                <option value="video">فيديو</option>
                <option value="doc">مستند</option>
                <option value="link">رابط</option>
              </select>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400 hover:border-[#1a2e44] transition cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">اسحب الملف هنا أو انقر للاختيار</p>
              <p className="text-xs mt-1">(محاكاة — لا يوجد رفع فعلي)</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={uploadMaterial}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#1a2e44] text-white rounded-xl text-sm font-bold hover:bg-[#0f1f30] transition">
                <Upload className="w-4 h-4" /> رفع
              </button>
              <button onClick={() => setShowMatModal(false)} className="px-5 py-2.5 border border-gray-300 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition">إلغاء</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── Modal component ──────────────────────────────────────────────────────────
function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-lg">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
