import { useState, useEffect } from 'react'
import { subjects, teachers } from '@/lib/school-data'
import { delay } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { Skeleton } from '@/components/Skeleton'

export function CoursesPage() {
  const [loading, setLoading] = useState(true)
  const [gradeFilter, setGradeFilter] = useState<string>('all')

  useEffect(() => {
    delay(700).then(() => setLoading(false))
  }, [])

  const filtered = gradeFilter === 'all'
    ? subjects
    : subjects.filter(s => s.grades.includes(Number(gradeFilter) as 10 | 11 | 12))

  return (
    <div>
      <PageHeader
        title="المواد الدراسية"
        subtitle={`${subjects.length} مادة — الصفوف ١٠ / ١١ / ١٢`}
      />

      {/* Filter */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#e8e5df] flex flex-wrap gap-3 items-center">
        <select
          value={gradeFilter}
          onChange={e => setGradeFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-right bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1b4332] cursor-pointer"
        >
          <option value="all">الصف: الكل</option>
          <option value="10">الصف العاشر</option>
          <option value="11">الصف الحادي عشر</option>
          <option value="12">الصف الثاني عشر</option>
        </select>
        <span className="text-sm text-gray-500">{filtered.length} مادة</span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(subject => {
            const teacher = teachers.find(t => t.id === subject.teacher_id)
            return (
              <div
                key={subject.id}
                className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: subject.color + '18' }}
                  >
                    {subject.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-base truncate">{subject.name_ar}</h3>
                    <p className="text-xs text-gray-400 mt-0.5 truncate" dir="ltr">{subject.name_en}</p>
                    {teacher && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ backgroundColor: subject.color }}
                        >
                          {teacher.avatar_initial}
                        </div>
                        <span className="text-xs text-gray-600 truncate">{teacher.name_ar}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 flex-wrap">
                  {subject.grades.map(g => (
                    <span
                      key={g}
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: subject.color + '15', color: subject.color }}
                    >
                      صف {g}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
