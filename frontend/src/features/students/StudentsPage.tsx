import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockStudents, mockPrograms, type StudentStatus } from '@/lib/mock-data'
import { delay } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { StudentStatusBadge } from '@/components/StatusBadge'
import { MoodleSyncBadge } from '@/components/MoodleSyncBadge'
import { TableSkeleton } from '@/components/Skeleton'
import { UserPlus, Eye, Pencil, Search } from 'lucide-react'

export function StudentsPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [programFilter, setProgramFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    delay(700).then(() => setLoading(false))
  }, [])

  const filtered = mockStudents.filter(s => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false
    if (programFilter !== 'all' && String(s.program_id) !== programFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return s.name_ar.includes(q) || s.national_id.includes(q)
    }
    return true
  })

  return (
    <div>
      <PageHeader
        title="الطلاب"
        subtitle={`إجمالي: ${mockStudents.length} طالب`}
        action={
          <button
            onClick={() => navigate('/students/new')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1b4332] text-white rounded-xl text-sm font-semibold hover:bg-[#143f27] transition shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            إضافة طالب
          </button>
        }
      />

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#e8e5df] flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <input
            type="text"
            placeholder="بحث بالاسم أو رقم الهوية..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pe-4 ps-9 py-2 border border-gray-200 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1b4332] bg-gray-50"
          />
          <Search className="absolute start-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-right bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1b4332] cursor-pointer"
        >
          <option value="all">الحالة: الكل</option>
          <option value="active">نشط</option>
          <option value="suspended">موقوف</option>
          <option value="graduated">متخرج</option>
          <option value="withdrawn">منسحب</option>
        </select>

        <select
          value={programFilter}
          onChange={e => setProgramFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-right bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1b4332] cursor-pointer"
        >
          <option value="all">البرنامج: الكل</option>
          {mockPrograms.map(p => (
            <option key={p.id} value={String(p.id)}>{p.name_ar}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f0f7f4] border-b border-[#e8e5df]">
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">رقم الهوية</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الاسم بالعربية</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">البرنامج</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الحالة</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">حساب Moodle</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton rows={5} cols={6} />
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">👤</span>
                      <span>لا يوجد طلاب مسجَّلون</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map(student => {
                  const program = mockPrograms.find(p => p.id === student.program_id)
                  return (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-[#f9fdf9] transition-colors">
                      <td className="px-4 py-3 font-mono text-gray-600">{student.national_id}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => navigate(`/students/${student.id}`)}
                          className="font-semibold text-[#1b4332] hover:underline text-right"
                        >
                          {student.name_ar}
                        </button>
                        {student.name_en && (
                          <div className="text-xs text-gray-400 mt-0.5" dir="ltr">{student.name_en}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {program ? program.name_ar : <span className="text-gray-400">غير مُعيَّن</span>}
                      </td>
                      <td className="px-4 py-3">
                        <StudentStatusBadge status={student.status as StudentStatus} />
                      </td>
                      <td className="px-4 py-3">
                        <MoodleSyncBadge synced={student.moodle_user_id !== null} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => navigate(`/students/${student.id}`)}
                            className="p-1.5 rounded-lg text-gray-500 hover:bg-[#d8ece4] hover:text-[#1b4332] transition"
                            title="عرض"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/students/${student.id}`)}
                            className="p-1.5 rounded-lg text-gray-500 hover:bg-[#d8ece4] hover:text-[#1b4332] transition"
                            title="تعديل"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination bar */}
        {!loading && filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50">
            <span>إجمالي الطلاب: {filtered.length}</span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 rounded border border-gray-200 hover:bg-white transition text-xs">السابق</button>
              <button className="px-3 py-1 rounded bg-[#1b4332] text-white text-xs">١</button>
              <button className="px-3 py-1 rounded border border-gray-200 hover:bg-white transition text-xs">التالي</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
