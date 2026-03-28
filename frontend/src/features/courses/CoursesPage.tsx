import { useState, useEffect } from 'react'
import { mockCourses, mockPrograms } from '@/lib/mock-data'
import { delay, formatDateTime } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { TableSkeleton } from '@/components/Skeleton'
import { RefreshCw, Loader2 } from 'lucide-react'

export function CoursesPage() {
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [programFilter, setProgramFilter] = useState('all')
  const [syncSuccess, setSyncSuccess] = useState(false)

  useEffect(() => {
    delay(700).then(() => setLoading(false))
  }, [])

  async function handleSync() {
    setSyncing(true)
    setSyncSuccess(false)
    await delay(2000)
    setSyncing(false)
    setSyncSuccess(true)
    setTimeout(() => setSyncSuccess(false), 4000)
  }

  const filtered = programFilter === 'all'
    ? mockCourses
    : mockCourses.filter(c => String(c.program_id) === programFilter)

  return (
    <div>
      <PageHeader
        title="المقررات"
        subtitle={`${mockCourses.length} مقررات — مزامنة من Moodle`}
        action={
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1b4332] text-white rounded-xl text-sm font-semibold hover:bg-[#143f27] transition shadow-sm disabled:opacity-70"
          >
            {syncing ? (
              <><Loader2 className="w-4 h-4 animate-spin" />جارٍ المزامنة...</>
            ) : (
              <><RefreshCw className="w-4 h-4" />مزامنة المقررات</>
            )}
          </button>
        }
      />

      {syncSuccess && (
        <div className="mb-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700">
          ✅ تمت المزامنة: ٣ مقررات جديدة، ٤٢ مقرراً محدَّثاً
        </div>
      )}

      {syncing && (
        <div className="mb-4 flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
          <Loader2 className="w-4 h-4 animate-spin" />
          جارٍ المزامنة مع Moodle...
        </div>
      )}

      {/* Filter */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#e8e5df]">
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

      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f0f7f4] border-b border-[#e8e5df]">
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الاسم بالعربية</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الاسم بالإنجليزية</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">معرّف Moodle</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">البرنامج</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">آخر مزامنة</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableSkeleton rows={5} cols={6} />
            ) : filtered.map(course => {
              const program = mockPrograms.find(p => p.id === course.program_id)
              return (
                <tr key={course.id} className="border-b border-gray-100 hover:bg-[#f9fdf9] transition-colors">
                  <td className="px-4 py-3 font-semibold text-gray-900">{course.name_ar}</td>
                  <td className="px-4 py-3 text-gray-500" dir="ltr">{course.name_en}</td>
                  <td className="px-4 py-3 font-mono text-gray-600">{course.moodle_course_id}</td>
                  <td className="px-4 py-3">
                    {program ? (
                      <span className="text-gray-700">{program.name_ar}</span>
                    ) : (
                      <span className="text-amber-600 font-medium">غير مُعيَّن</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{formatDateTime(course.synced_at)}</td>
                  <td className="px-4 py-3">
                    <select className="text-xs px-2 py-1 border border-gray-200 rounded-lg text-right bg-white focus:outline-none focus:ring-1 focus:ring-[#1b4332] cursor-pointer">
                      <option value="">تعيين برنامج</option>
                      {mockPrograms.map(p => (
                        <option key={p.id} value={p.id} selected={p.id === course.program_id}>{p.name_ar}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
