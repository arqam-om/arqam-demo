import { currentStudent, subjects, teachers, assignments } from '@/lib/school-data'
import { Mail, Phone, Award, BookOpen, TrendingUp } from 'lucide-react'

export function StudentProfile() {
  const mySubjects = subjects.filter(s => currentStudent.subject_ids.includes(s.id))
  const myAssignments = assignments.filter(a => currentStudent.subject_ids.includes(a.subject_id))
  const submitted = myAssignments.filter(a => a.status === 'submitted' || a.status === 'graded').length
  const gradeLabel = currentStudent.grade === 10 ? 'العاشر' : currentStudent.grade === 11 ? 'الحادي عشر' : 'الثاني عشر'

  const grades = [
    { subject_id: 4, score: 92, max: 100 },
    { subject_id: 3, score: 78, max: 100 },
    { subject_id: 1, score: 88, max: 100 },
    { subject_id: 6, score: 85, max: 100 },
    { subject_id: 8, score: 80, max: 100 },
    { subject_id: 2, score: 75, max: 100 },
  ]

  return (
    <div className="max-w-3xl">
      {/* Profile card */}
      <div className="bg-gradient-to-l from-[#1b4332] to-[#2d6a4f] rounded-2xl p-6 mb-6 text-white shadow-md">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#c9a84c] flex items-center justify-center text-3xl font-black text-[#1b4332] flex-shrink-0 shadow-lg">
            {currentStudent.name_ar.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{currentStudent.name_ar}</h1>
            <p className="text-[#95d5b2] text-sm mt-0.5" dir="ltr">{currentStudent.name_en}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs bg-[#0a2416] px-3 py-1 rounded-full text-[#95d5b2]">
                الصف {gradeLabel} {currentStudent.section}
              </span>
              <span className="text-xs bg-[#0a2416] px-3 py-1 rounded-full text-[#95d5b2]">
                رقم الهوية: {currentStudent.national_id}
              </span>
              {currentStudent.math_track && (
                <span className="text-xs bg-[#c9a84c] px-3 py-1 rounded-full text-[#1b4332] font-semibold">
                  رياضيات {currentStudent.math_track === 'advanced' ? 'متقدمة' : 'أساسية'}
                </span>
              )}
            </div>
          </div>
          <div className="text-left flex-shrink-0">
            <div className="text-[#95d5b2] text-xs mb-1">المعدل التراكمي</div>
            <div className="text-4xl font-black text-[#c9a84c]">{currentStudent.gpa.toFixed(1)}</div>
            <div className="text-[#95d5b2] text-xs mt-0.5">من ٤.٠</div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: BookOpen, label: 'عدد المواد', value: mySubjects.length, color: 'text-[#1b4332]', bg: 'bg-[#d8ece4]' },
          { icon: Award,    label: 'واجبات مُسلَّمة', value: `${submitted}/${myAssignments.length}`, color: 'text-blue-700', bg: 'bg-blue-100' },
          { icon: TrendingUp, label: 'الترتيب في الصف', value: '٣ / ٢٨', color: 'text-amber-700', bg: 'bg-amber-100' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-[#e8e5df] flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grades */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">الدرجات الحالية</h2>
          </div>
          <div className="p-4 space-y-3">
            {grades.map(g => {
              const subj = subjects.find(s => s.id === g.subject_id)
              const pct = (g.score / g.max) * 100
              return (
                <div key={g.subject_id}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{subj?.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{subj?.name_ar}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: subj?.color }}>{g.score}٪</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: subj?.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact info + subjects list */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-5">
            <h2 className="font-bold text-gray-800 mb-4">معلومات التواصل</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-gray-600" dir="ltr">a.harthi@students.school.edu.om</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-gray-600" dir="ltr">+968 9111 2233</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-5">
            <h2 className="font-bold text-gray-800 mb-3">معلمو المواد</h2>
            <div className="space-y-2">
              {mySubjects.slice(0, 5).map(s => {
                const t = teachers.find(te => te.id === s.teacher_id)
                return (
                  <div key={s.id} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: s.color }}>
                      {t?.avatar_initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 truncate">{t?.name_ar}</p>
                      <p className="text-xs text-gray-400">{s.name_ar}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
