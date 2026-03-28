import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.jpg'
import { GraduationCap, BookOpen, ShieldCheck, ArrowLeft } from 'lucide-react'

interface RoleCardProps {
  icon: React.ElementType
  label: string
  sublabel: string
  name: string
  color: string
  bg: string
  onClick: () => void
}

function RoleCard({ icon: Icon, label, sublabel, name, color, bg, onClick }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl p-6 shadow-sm border-2 border-transparent hover:border-[#c9a84c] hover:shadow-xl transition-all duration-200 text-right w-full flex items-center gap-4"
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${bg} group-hover:scale-110 transition-transform`}>
        <Icon className={`w-7 h-7 ${color}`} />
      </div>
      <div className="flex-1">
        <p className="font-bold text-gray-900 text-base">{label}</p>
        <p className="text-sm text-gray-500 mt-0.5">{sublabel}</p>
        <p className="text-xs text-gray-400 mt-1">{name}</p>
      </div>
      <ArrowLeft className="w-4 h-4 text-gray-300 group-hover:text-[#c9a84c] transition-colors flex-shrink-0" />
    </button>
  )
}

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a2416] via-[#1b4332] to-[#2d6a4f] flex items-center justify-center p-4" dir="rtl">

      {/* Geometric background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[#c9a84c]"
            style={{
              width: `${(i + 1) * 120}px`,
              height: `${(i + 1) * 120}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-lg relative">

        {/* Institution header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <div className="w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center p-2 ring-4 ring-[#c9a84c]/40">
              <img src={logo} alt="معهد العلوم الإسلامية" className="w-full h-full object-contain" />
            </div>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-wide">معهد العلوم الإسلامية</h1>
          <p className="text-[#95d5b2] text-sm mt-1">سلطنة عُمان — المنصة التعليمية الرقمية</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-[#0a2416]/60 backdrop-blur-sm rounded-full px-5 py-2 border border-[#c9a84c]/30">
            <span className="text-[#c9a84c] text-2xl font-black">أرقم</span>
            <span className="text-[#95d5b2] text-xs">المنصة الإدارية والتعليمية</span>
          </div>
        </div>

        {/* Role selector card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-l from-[#c9a84c] via-[#e8cc7a] to-[#c9a84c]" />

          <div className="px-8 py-7">
            <p className="text-center text-sm text-gray-500 mb-6 font-medium">اختر نوع الحساب للدخول</p>

            <div className="space-y-3">
              <RoleCard
                icon={GraduationCap}
                label="طالب"
                sublabel="الوصول إلى موادك وجدولك وواجباتك"
                name="أحمد الحارثي — الصف الحادي عشر أ"
                color="text-[#1b4332]"
                bg="bg-[#d8ece4]"
                onClick={() => navigate('/student/dashboard')}
              />
              <RoleCard
                icon={BookOpen}
                label="معلم"
                sublabel="إدارة صفوفك والمواد والواجبات"
                name="الأستاذ خالد الرواحي — الرياضيات"
                color="text-blue-700"
                bg="bg-blue-100"
                onClick={() => navigate('/teacher/dashboard')}
              />
              <RoleCard
                icon={ShieldCheck}
                label="مدير النظام"
                sublabel="إدارة الطلاب والمعلمين والبرامج"
                name="محمد الحارثي — مدير النظام"
                color="text-purple-700"
                bg="bg-purple-100"
                onClick={() => navigate('/dashboard')}
              />
            </div>

            <p className="text-center text-xs text-gray-400 mt-6">
              هذا نظام تجريبي — لا يتطلب كلمة مرور
            </p>
          </div>
        </div>

        <p className="text-center text-[#95d5b2] text-xs mt-6 opacity-60">
          أرقم © {new Date().getFullYear()} — جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  )
}
