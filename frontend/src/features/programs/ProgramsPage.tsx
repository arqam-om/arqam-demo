import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gradeSummary, subjects, students } from '@/lib/school-data'
import { delay } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { Skeleton } from '@/components/Skeleton'
import { Users, BookOpen, GraduationCap } from 'lucide-react'

const gradeLabel = (g: number) => g === 10 ? 'العاشر' : g === 11 ? 'الحادي عشر' : 'الثاني عشر'

export function ProgramsPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    delay(600).then(() => setLoading(false))
  }, [])

  return (
    <div>
      <PageHeader
        title="الصفوف الدراسية"
        subtitle={`${gradeSummary.length} صفوف — ${students.length} طالب إجمالاً`}
      />

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
        </div>
      ) : (
        <div className="space-y-6">
          {gradeSummary.map(g => {
            const gradeSubjects = subjects.filter(s => s.grades.includes(g.grade as 10 | 11 | 12))
            return (
              <div key={g.grade} className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] overflow-hidden">
                {/* Grade header */}
                <div className="bg-gradient-to-l from-[#1b4332] to-[#2d6a4f] px-5 py-4 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#c9a84c] flex items-center justify-center text-[#1b4332] font-black text-xl flex-shrink-0">
                      {g.grade}
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-lg">الصف {gradeLabel(g.grade)}</h2>
                      <p className="text-[#95d5b2] text-sm mt-0.5">
                        الشعب: {g.sections.join(' — ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 lg:gap-6 text-center flex-shrink-0">
                    <div>
                      <div className="text-2xl font-black text-[#c9a84c]">{g.student_count}</div>
                      <div className="text-xs text-[#95d5b2]">طالب</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-[#c9a84c]">{g.sections.length}</div>
                      <div className="text-xs text-[#95d5b2]">شعبة</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-[#c9a84c]">{gradeSubjects.length}</div>
                      <div className="text-xs text-[#95d5b2]">مادة</div>
                    </div>
                  </div>
                </div>

                {/* Sections grid */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-4 h-4 text-[#1b4332]" />
                    <span className="text-sm font-semibold text-gray-700">الشعب</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">
                    {g.sections.map(section => {
                      const count = Math.round(g.student_count / g.sections.length)
                      return (
                        <button
                          key={section}
                          onClick={() => navigate(`/students?grade=${g.grade}&section=${section}`)}
                          className="flex items-center justify-between p-3 rounded-xl bg-[#f0f7f4] border border-[#d8ece4] hover:bg-[#d8ece4] transition group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-[#1b4332] text-white flex items-center justify-center font-bold text-sm">{section}</span>
                            <span className="text-sm text-gray-700 font-medium">شعبة {section}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 text-xs">
                            <Users className="w-3.5 h-3.5" />
                            {count}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Subjects for this grade */}
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-[#1b4332]" />
                    <span className="text-sm font-semibold text-gray-700">المواد الدراسية</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {gradeSubjects.map(s => (
                      <button
                        key={s.id}
                        onClick={() => navigate('/courses')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border hover:shadow-sm transition"
                        style={{ backgroundColor: s.color + '12', borderColor: s.color + '40', color: s.color }}
                      >
                        <span>{s.icon}</span>
                        {s.name_ar}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
