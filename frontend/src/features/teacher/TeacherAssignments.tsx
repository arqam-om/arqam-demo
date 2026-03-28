import { assignments, subjects, currentTeacher } from '@/lib/school-data'
import { Clock, CheckCircle, Award } from 'lucide-react'

export function TeacherAssignments() {
  const myAssignments = assignments.filter(a => a.teacher_id === currentTeacher.id)

  const counts = {
    pending:   myAssignments.filter(a => a.status === 'pending').length,
    submitted: myAssignments.filter(a => a.status === 'submitted').length,
    graded:    myAssignments.filter(a => a.status === 'graded').length,
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">الواجبات</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'معلّقة',      count: counts.pending,   icon: Clock,       color: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200' },
          { label: 'تم التسليم',  count: counts.submitted, icon: CheckCircle, color: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-200' },
          { label: 'تم التصحيح', count: counts.graded,    icon: Award,       color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border ${s.border} rounded-2xl p-5`}>
            <s.icon className={`w-5 h-5 mb-2 ${s.color}`} />
            <div className={`text-3xl font-black ${s.color}`}>{s.count}</div>
            <div className={`text-xs ${s.color} mt-0.5`}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {myAssignments.map(a => {
          const subj = subjects.find(s => s.id === a.subject_id)
          return (
            <div key={a.id} className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: subj?.color + '18' }}>
                  {subj?.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{a.title_ar}</h3>
                      <p className="text-xs font-medium mt-0.5" style={{ color: subj?.color }}>{subj?.name_ar}</p>
                    </div>
                    <div className="text-left flex-shrink-0">
                      <div className="text-xs text-gray-400">تسليم</div>
                      <div className="text-sm font-bold text-gray-700">{a.due_date}</div>
                      <div className="text-xs text-gray-400">/{a.max_grade} درجة</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{a.description_ar}</p>
                  <div className="mt-3 flex items-center gap-2">
                    {a.status === 'submitted' && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> مُسلَّم
                      </span>
                    )}
                    {a.status === 'graded' && (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> تم التصحيح — {a.grade}/{a.max_grade}
                      </span>
                    )}
                    {a.status === 'pending' && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> بانتظار التسليم
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
