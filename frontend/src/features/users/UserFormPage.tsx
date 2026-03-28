import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockUsers } from '@/lib/mock-data'
import { delay } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { ArrowRight, Loader2, AlertTriangle } from 'lucide-react'

export function UserFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const existing = isEdit ? mockUsers.find(u => u.id === Number(id)) : null

  const [form, setForm] = useState({
    username: existing?.username ?? '',
    full_name: existing?.full_name ?? '',
    email: existing?.email ?? '',
    password: '',
    role: existing?.role ?? 'teacher',
  })
  const [saving, setSaving] = useState(false)
  const [deactivating, setDeactivating] = useState(false)
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await delay(1000)
    setSaving(false)
    navigate('/users')
  }

  async function handleDeactivate() {
    setDeactivating(true)
    await delay(900)
    setDeactivating(false)
    setShowDeactivateDialog(false)
    navigate('/users')
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate('/users')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1b4332] transition">
          <ArrowRight className="w-4 h-4" />
          المستخدمون
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-700 font-medium">{isEdit ? 'تعديل مستخدم' : 'إضافة مستخدم'}</span>
      </div>

      <PageHeader title={isEdit ? 'تعديل بيانات المستخدم' : 'إنشاء حساب جديد'} />

      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] p-6 max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {isEdit ? (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">اسم المستخدم</label>
              <p className="font-mono text-gray-800 bg-gray-50 px-3 py-2.5 rounded-lg border border-gray-200 text-sm">{form.username}</p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">اسم المستخدم <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.username}
                onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                disabled={saving}
                dir="ltr"
                placeholder="e.g. teacher.ahmed"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم الكامل</label>
            <input
              type="text"
              value={form.full_name}
              onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))}
              disabled={saving}
              placeholder="مثال: أحمد بن ناصر المسكري"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">البريد الإلكتروني</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              disabled={saving}
              dir="ltr"
              placeholder="user@institute.edu.om"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {isEdit ? 'كلمة المرور الجديدة' : 'كلمة المرور'} {!isEdit && <span className="text-red-500">*</span>}
            </label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              disabled={saving}
              dir="ltr"
              placeholder="••••••••"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
            />
            {isEdit && <p className="mt-1 text-xs text-gray-400">اتركه فارغاً إذا لم ترد تغيير كلمة المرور</p>}
          </div>

          {!isEdit && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">الدور <span className="text-red-500">*</span></label>
              <select
                value={form.role}
                onChange={e => setForm(p => ({ ...p, role: e.target.value as 'admin' | 'teacher' }))}
                disabled={saving}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
              >
                <option value="admin">مدير</option>
                <option value="teacher">معلم</option>
              </select>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1b4332] text-white rounded-xl text-sm font-bold hover:bg-[#143f27] transition disabled:opacity-60 shadow-sm"
            >
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" />جارٍ الحفظ...</> : (isEdit ? 'حفظ التعديلات' : 'إنشاء حساب')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/users')}
              disabled={saving}
              className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
            >
              إلغاء
            </button>
          </div>
        </form>

        {isEdit && (
          <>
            <hr className="my-6 border-gray-200" />
            <div>
              <p className="text-xs text-gray-500 mb-3">منطقة خطرة</p>
              <button
                onClick={() => setShowDeactivateDialog(true)}
                className="px-5 py-2 border border-red-300 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition"
              >
                تعطيل الحساب
              </button>
            </div>
          </>
        )}
      </div>

      {/* Deactivate Dialog */}
      {showDeactivateDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" dir="rtl">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">تعطيل الحساب</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    هل أنت متأكد من تعطيل حساب <strong>{existing?.username}</strong>؟ لن يتمكن هذا المستخدم من تسجيل الدخول. يمكن التراجع عن ذلك لاحقاً.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={handleDeactivate}
                disabled={deactivating}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition disabled:opacity-60"
              >
                {deactivating ? 'جارٍ التعطيل...' : 'تعطيل'}
              </button>
              <button
                onClick={() => setShowDeactivateDialog(false)}
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
