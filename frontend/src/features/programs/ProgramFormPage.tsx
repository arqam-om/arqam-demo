import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockPrograms } from '@/lib/mock-data'
import { delay } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { ArrowRight, Loader2 } from 'lucide-react'

export function ProgramFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const existing = isEdit ? mockPrograms.find(p => p.id === Number(id)) : null

  const [form, setForm] = useState({
    name_ar: existing?.name_ar ?? '',
    name_en: existing?.name_en ?? '',
    description: existing?.description ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name_ar.trim()) { setErrors({ name_ar: 'الاسم بالعربية مطلوب' }); return }
    setErrors({})
    setSaving(true)
    await delay(1000)
    setSaving(false)
    navigate('/programs')
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('/programs')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1b4332] transition">
          <ArrowRight className="w-4 h-4" />
          البرامج
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-700 font-medium">{isEdit ? 'تعديل البرنامج' : 'إضافة برنامج'}</span>
      </div>

      <PageHeader title={isEdit ? 'تعديل البرنامج' : 'إضافة برنامج جديد'} />

      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-6 max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              الاسم بالعربية <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name_ar}
              onChange={e => setForm(p => ({ ...p, name_ar: e.target.value }))}
              disabled={saving}
              placeholder="مثال: الدراسات الإسلامية"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm text-right focus:outline-none focus:ring-2 transition ${errors.name_ar ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-[#1b4332]'}`}
            />
            {errors.name_ar && <p className="mt-1 text-xs text-red-600">{errors.name_ar}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم بالإنجليزية</label>
            <input
              type="text"
              value={form.name_en}
              onChange={e => setForm(p => ({ ...p, name_en: e.target.value }))}
              disabled={saving}
              dir="ltr"
              placeholder="e.g. Islamic Studies"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-[#1b4332] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">الوصف</label>
            <textarea
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              disabled={saving}
              rows={3}
              placeholder="وصف مختصر للبرنامج..."
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1b4332] transition resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1b4332] text-white rounded-xl text-sm font-bold hover:bg-[#143f27] transition disabled:opacity-60 shadow-sm"
            >
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" />جارٍ الحفظ...</> : 'حفظ'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/programs')}
              disabled={saving}
              className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
