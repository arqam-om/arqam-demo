import { useState, useEffect } from 'react'
import { teachers, subjects } from '@/lib/school-data'
import { delay } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { Skeleton } from '@/components/Skeleton'
import { Mail, Phone } from 'lucide-react'

export function EnrollmentsPage() {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    delay(700).then(() => setLoading(false))
  }, [])

  const filtered = teachers.filter(t => {
    if (!search) return true
    const q = search.toLowerCase()
    return t.name_ar.includes(q) || t.name_en.toLowerCase().includes(q)
  })

  return (
    <div>
      <PageHeader
        title="المعلمون"
        subtitle={`${teachers.length} معلماً في المعهد`}
      />

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#e8e5df]">
        <input
          type="text"
          placeholder="بحث باسم المعلم..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-xs px-3 py-2 border border-gray-200 rounded-lg text-sm text-right bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-36 rounded-2xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-2">👤</div>
          <p>لا يوجد معلمون مطابقون</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(teacher => {
            const teacherSubjects = subjects.filter(s => teacher.subject_ids.includes(s.id))
            return (
              <div key={teacher.id} className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1b4332] flex items-center justify-center text-[#c9a84c] font-black text-xl flex-shrink-0">
                    {teacher.avatar_initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{teacher.name_ar}</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate" dir="ltr">{teacher.name_en}</p>
                  </div>
                </div>

                {/* Subjects */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {teacherSubjects.map(s => (
                    <span
                      key={s.id}
                      className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: s.color + '15', color: s.color }}
                    >
                      {s.icon} {s.name_ar}
                    </span>
                  ))}
                </div>

                {/* Contact */}
                <div className="space-y-1.5 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                    <span dir="ltr" className="truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                    <span dir="ltr">{teacher.phone}</span>
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
