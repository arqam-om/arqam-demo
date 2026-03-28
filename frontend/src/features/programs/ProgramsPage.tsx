import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockPrograms } from '@/lib/mock-data'
import { delay, formatDate } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { TableSkeleton } from '@/components/Skeleton'
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react'

export function ProgramsPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<typeof mockPrograms[0] | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    delay(600).then(() => setLoading(false))
  }, [])

  async function handleDelete() {
    setDeleting(true)
    await delay(900)
    setDeleting(false)
    setDeleteTarget(null)
  }

  return (
    <div>
      <PageHeader
        title="البرامج الأكاديمية"
        subtitle={`${mockPrograms.length} برامج مُعرَّفة`}
        action={
          <button
            onClick={() => navigate('/programs/new')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1b4332] text-white rounded-xl text-sm font-semibold hover:bg-[#143f27] transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            إضافة برنامج
          </button>
        }
      />

      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f0f7f4] border-b border-[#e8e5df]">
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الاسم بالعربية</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الاسم بالإنجليزية</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الوصف</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">تاريخ الإنشاء</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableSkeleton rows={4} cols={5} />
            ) : mockPrograms.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">📚</span>
                    <span>لا توجد برامج مُعرَّفة بعد</span>
                  </div>
                </td>
              </tr>
            ) : (
              mockPrograms.map(program => (
                <tr key={program.id} className="border-b border-gray-100 hover:bg-[#f9fdf9] transition-colors">
                  <td className="px-4 py-3 font-semibold text-gray-900">{program.name_ar}</td>
                  <td className="px-4 py-3 text-gray-500" dir="ltr">{program.name_en ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate" title={program.description ?? ''}>
                    {program.description ? program.description.slice(0, 60) + (program.description.length > 60 ? '...' : '') : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(program.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => navigate(`/programs/${program.id}/edit`)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-[#d8ece4] hover:text-[#1b4332] transition"
                        title="تعديل"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(program)}
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-red-100 hover:text-red-600 transition"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" dir="rtl">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">حذف البرنامج</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    هل أنت متأكد من حذف برنامج <strong>{deleteTarget.name_ar}</strong>؟ لا يمكن التراجع عن هذا الإجراء.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition disabled:opacity-60"
              >
                {deleting ? 'جارٍ الحذف...' : 'حذف'}
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
