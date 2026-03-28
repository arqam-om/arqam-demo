import { useNavigate } from 'react-router-dom'
import { currentStudent, subjects, teachers } from '@/lib/school-data'
import { ChevronLeft } from 'lucide-react'

export function StudentSubjects() {
  const navigate = useNavigate()
  const mySubjects = subjects.filter(s => currentStudent.subject_ids.includes(s.id))
  const coreSubjects = mySubjects.filter(s => ![12].includes(s.id))
  const electiveSubjects = mySubjects.filter(s => [12].includes(s.id))

  function SubjectCard({ subj }: { subj: typeof subjects[0] }) {
    const teacher = teachers.find(t => t.id === subj.teacher_id)
    return (
      <button
        onClick={() => navigate(`/student/subjects/${subj.id}`)}
        className="group bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-5 text-right hover:shadow-md hover:border-[#c9a84c] transition-all duration-200 flex flex-col gap-3"
      >
        <div className="flex items-start justify-between">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ backgroundColor: subj.color + '18' }}
          >
            {subj.icon}
          </div>
          <ChevronLeft className="w-4 h-4 text-gray-300 group-hover:text-[#c9a84c] transition-colors mt-1" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{subj.name_ar}</h3>
          <p className="text-xs text-gray-500 mt-0.5" dir="ltr">{subj.name_en}</p>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: subj.color }}
          >
            {teacher?.avatar_initial}
          </div>
          <p className="text-xs text-gray-500 truncate">{teacher?.name_ar}</p>
        </div>
        <div className="h-1 rounded-full" style={{ backgroundColor: subj.color + '40' }}>
          <div className="h-full rounded-full" style={{ width: '65%', backgroundColor: subj.color }} />
        </div>
        <p className="text-xs text-gray-400">التقدم في المنهج: ٦٥٪</p>
      </button>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">موادي الدراسية</h1>
        <p className="text-sm text-gray-500 mt-1">
          {mySubjects.length} مادة — الصف الحادي عشر أ
          {currentStudent.math_track && ` — رياضيات ${currentStudent.math_track === 'advanced' ? 'متقدمة' : 'أساسية'}`}
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-base font-bold text-gray-700 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#1b4332] rounded-full inline-block" />
          المواد الإلزامية
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {coreSubjects.map(s => <SubjectCard key={s.id} subj={s} />)}
        </div>
      </section>

      {electiveSubjects.length > 0 && (
        <section>
          <h2 className="text-base font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#c9a84c] rounded-full inline-block" />
            المواد الاختيارية
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {electiveSubjects.map(s => <SubjectCard key={s.id} subj={s} />)}
          </div>
        </section>
      )}
    </div>
  )
}
