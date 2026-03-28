import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { students } from '@/lib/school-data'
import { PageHeader } from '@/components/PageHeader'
import { UserPlus, Eye, Search } from 'lucide-react'


export function StudentsPage() {
  const navigate = useNavigate()
  const [gradeFilter, setGradeFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  const filtered = students.filter(s => {
    if (gradeFilter !== 'all' && String(s.grade) !== gradeFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return s.name_ar.includes(q) || s.name_en.toLowerCase().includes(q) || s.national_id.includes(q)
    }
    return true
  })

  return (
    <div>
      <PageHeader
        title="الطلاب"
        subtitle={`إجمالي: ${students.length} طالب — الصفوف ١٠ / ١١ / ١٢`}
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
          value={gradeFilter}
          onChange={e => setGradeFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-right bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1b4332] cursor-pointer"
        >
          <option value="all">الصف: الكل</option>
          <option value="10">الصف العاشر</option>
          <option value="11">الصف الحادي عشر</option>
          <option value="12">الصف الثاني عشر</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="bg-[#f0f7f4] border-b border-[#e8e5df]">
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">رقم الهوية</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الاسم</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الصف</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الشعبة</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">المسار</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">عدد المواد</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">المعدل</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">👤</span>
                      <span>لا يوجد طلاب</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.map(student => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-[#f9fdf9] transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-600 text-xs">{student.national_id}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/students/${student.id}`)}
                      className="font-semibold text-[#1b4332] hover:underline text-right block"
                    >
                      {student.name_ar}
                    </button>
                    <span className="text-xs text-gray-400" dir="ltr">{student.name_en}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1b4332] text-white">
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 font-bold">{student.section}</td>
                  <td className="px-4 py-3">
                    {student.math_track ? (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        student.math_track === 'advanced'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        رياضيات {student.math_track === 'advanced' ? 'متقدمة' : 'أساسية'}
                      </span>
                    ) : <span className="text-gray-300 text-xs">—</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{student.subject_ids.length}</td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-[#1b4332]">{student.gpa.toFixed(1)}</span>
                    <span className="text-xs text-gray-400">/4.0</span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/students/${student.id}`)}
                      className="p-1.5 rounded-lg text-gray-500 hover:bg-[#d8ece4] hover:text-[#1b4332] transition"
                      title="عرض"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50">
            <span>يعرض {filtered.length} من {students.length} طالب</span>
          </div>
        )}
      </div>
    </div>
  )
}
