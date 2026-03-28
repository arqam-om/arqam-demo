import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockPrograms } from '@/lib/mock-data'
import { delay } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react'

export function StudentFormPage() {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    national_id: '',
    name_ar: '',
    name_en: '',
    phone: '',
    email: '',
    program_id: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.national_id.trim()) e.national_id = 'رقم الهوية مطلوب'
    if (!form.name_ar.trim()) e.name_ar = 'الاسم بالعربية مطلوب'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'صيغة البريد غير صحيحة'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSaving(true)
    await delay(1200)
    setSaving(false)
    setSuccess(true)
    await delay(800)
    navigate('/students')
  }

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n })
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('/students')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1b4332] transition">
          <ArrowRight className="w-4 h-4" />
          الطلاب
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-700 font-medium">إضافة طالب جديد</span>
      </div>

      <PageHeader title="إضافة طالب جديد" subtitle="تسجيل طالب في سجلات المعهد" />

      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-6 max-w-2xl">
        {success && (
          <div className="mb-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 text-sm font-medium">تم إضافة الطالب بنجاح</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField
            label="رقم الهوية الوطنية"
            required
            error={errors.national_id}
          >
            <input
              type="text"
              value={form.national_id}
              onChange={e => update('national_id', e.target.value)}
              disabled={saving}
              placeholder="مثال: 92847561"
              maxLength={20}
              className={inputClass(!!errors.national_id)}
            />
          </FormField>

          <FormField label="الاسم الكامل بالعربية" required error={errors.name_ar}>
            <input
              type="text"
              value={form.name_ar}
              onChange={e => update('name_ar', e.target.value)}
              disabled={saving}
              placeholder="مثال: عبدالله بن خالد المعمري"
              maxLength={255}
              className={inputClass(!!errors.name_ar)}
            />
          </FormField>

          <FormField label="الاسم بالإنجليزية" error={errors.name_en}>
            <input
              type="text"
              value={form.name_en}
              onChange={e => update('name_en', e.target.value)}
              disabled={saving}
              dir="ltr"
              placeholder="e.g. Abdullah Al-Maamari"
              maxLength={255}
              className={inputClass(false) + ' text-left'}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="رقم الهاتف">
              <input
                type="text"
                value={form.phone}
                onChange={e => update('phone', e.target.value)}
                disabled={saving}
                placeholder="+968 9xxx xxxx"
                className={inputClass(false)}
              />
            </FormField>

            <FormField label="البريد الإلكتروني" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                disabled={saving}
                placeholder="example@email.com"
                dir="ltr"
                className={inputClass(!!errors.email) + ' text-left'}
              />
            </FormField>
          </div>

          <FormField label="البرنامج">
            <select
              value={form.program_id}
              onChange={e => update('program_id', e.target.value)}
              disabled={saving}
              className={inputClass(false)}
            >
              <option value="">بدون برنامج</option>
              {mockPrograms.map(p => (
                <option key={p.id} value={p.id}>{p.name_ar}</option>
              ))}
            </select>
          </FormField>

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
              onClick={() => navigate('/students')}
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

function inputClass(hasError: boolean) {
  return `w-full px-3 py-2.5 border rounded-lg text-sm text-right focus:outline-none focus:ring-2 transition ${
    hasError
      ? 'border-red-400 focus:ring-red-300 bg-red-50'
      : 'border-gray-300 focus:ring-[#1b4332] bg-white'
  }`
}

function FormField({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ms-1">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
