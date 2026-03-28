import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { delay } from '@/lib/utils'
import { Lock, User, Loader2, AlertCircle } from 'lucide-react'
import logo from '@/assets/logo.jpg'

export function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !password) return
    setLoading(true)
    setError(null)
    await delay(1200)
    if (username === 'admin' && password === 'admin') {
      navigate('/dashboard')
    } else {
      setError('بيانات الدخول غير صحيحة')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#1b4332] flex items-center justify-center p-4" dir="rtl">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="w-full max-w-md relative">
        {/* Institution header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center p-2">
              <img src={logo} alt="معهد العلوم الإسلامية" className="w-full h-full object-contain" />
            </div>
          </div>
          <h1 className="text-white text-2xl font-bold">معهد العلوم الإسلامية</h1>
          <p className="text-[#95d5b2] text-sm mt-1">سلطنة عُمان</p>
          <div className="mt-3 inline-block">
            <span className="text-[#c9a84c] text-3xl font-black tracking-wide">أرقام</span>
            <span className="text-[#95d5b2] text-sm ms-2">— المنصة الإدارية</span>
          </div>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Gold top border */}
          <div className="h-1.5 bg-gradient-to-l from-[#c9a84c] to-[#e8cc7a]" />

          <div className="px-8 py-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">تسجيل الدخول</h2>

            {error && (
              <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 text-right">
                  اسم المستخدم
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    disabled={loading}
                    placeholder="أدخل اسم المستخدم"
                    className="w-full pe-4 ps-10 py-3 border border-gray-300 rounded-xl text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:border-transparent disabled:bg-gray-50 transition"
                  />
                  <User className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 text-right">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                    placeholder="••••••••"
                    className="w-full pe-4 ps-10 py-3 border border-gray-300 rounded-xl text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:border-transparent disabled:bg-gray-50 transition"
                  />
                  <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !username || !password}
                className="w-full py-3 bg-[#1b4332] hover:bg-[#143f27] text-white rounded-xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جارٍ الدخول...</span>
                  </>
                ) : (
                  'دخول'
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              للمساعدة، تواصل مع مدير النظام
            </p>
          </div>
        </div>

        <p className="text-center text-[#95d5b2] text-xs mt-6 opacity-70">
          أرقام © {new Date().getFullYear()} — جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  )
}
