import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockDashboardStats } from '@/lib/mock-data'
import { delay } from '@/lib/utils'
import { Skeleton } from '@/components/Skeleton'
import {
  GraduationCap,
  BookOpen,
  AlertTriangle,
  CalendarCheck,
  UserPlus,
  ClipboardCheck,
  ListChecks,
} from 'lucide-react'

interface StatCardProps {
  label: string
  value: number | string
  icon: React.ElementType
  color: string
  bgColor: string
  loading: boolean
}

function StatCard({ label, value, icon: Icon, color, bgColor, loading }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e5df] flex items-center gap-4">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${bgColor}`}>
        <Icon className={`w-7 h-7 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        {loading ? (
          <Skeleton className="h-8 w-16 mt-1" />
        ) : (
          <p className="text-3xl font-black text-gray-900 mt-0.5">{value}</p>
        )}
      </div>
    </div>
  )
}

export function DashboardPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(mockDashboardStats)

  useEffect(() => {
    delay(800).then(() => {
      setStats(mockDashboardStats)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      {/* Welcome banner */}
      <div className="bg-gradient-to-l from-[#1b4332] to-[#2d6a4f] rounded-2xl p-6 mb-6 text-white flex items-center justify-between shadow-md">
        <div>
          <h1 className="text-2xl font-bold">مرحباً، محمد بن سالم 👋</h1>
          <p className="text-[#95d5b2] text-sm mt-1">لوحة التحكم — معهد العلوم الإسلامية</p>
        </div>
        <div className="text-left">
          <p className="text-[#c9a84c] text-sm font-medium">اليوم</p>
          <p className="text-white text-sm">السبت، ٢٨ مارس ٢٠٢٦</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="إجمالي الطلاب النشطين"
          value={stats.totalActiveStudents}
          icon={GraduationCap}
          color="text-[#1b4332]"
          bgColor="bg-[#d8ece4]"
          loading={loading}
        />
        <StatCard
          label="إجمالي المقررات"
          value={stats.totalCourses}
          icon={BookOpen}
          color="text-blue-700"
          bgColor="bg-blue-100"
          loading={loading}
        />
        <StatCard
          label="بانتظار المزامنة مع Moodle"
          value={stats.pendingMoodleSync}
          icon={AlertTriangle}
          color="text-amber-700"
          bgColor="bg-amber-100"
          loading={loading}
        />
        <StatCard
          label="جلسات الحضور اليوم"
          value={stats.attendanceSessToday}
          icon={CalendarCheck}
          color="text-purple-700"
          bgColor="bg-purple-100"
          loading={loading}
        />
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e5df] mb-6">
        <h2 className="text-base font-bold text-gray-800 mb-4">إجراءات سريعة</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/students/new')}
            className="flex items-center gap-2 px-5 py-3 bg-[#1b4332] text-white rounded-xl text-sm font-semibold hover:bg-[#143f27] transition shadow-sm hover:shadow-md"
          >
            <UserPlus className="w-4 h-4" />
            إضافة طالب
          </button>
          <button
            onClick={() => navigate('/attendance/new')}
            className="flex items-center gap-2 px-5 py-3 bg-white text-[#1b4332] border-2 border-[#1b4332] rounded-xl text-sm font-semibold hover:bg-[#f0f7f4] transition"
          >
            <ClipboardCheck className="w-4 h-4" />
            تسجيل الحضور
          </button>
          <button
            onClick={() => navigate('/enrollments')}
            className="flex items-center gap-2 px-5 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
          >
            <ListChecks className="w-4 h-4" />
            عرض التسجيلات
          </button>
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e5df]">
        <h2 className="text-base font-bold text-gray-800 mb-4">آخر النشاطات</h2>
        <div className="space-y-3">
          {[
            { text: 'تم تسجيل حضور مقرر العقيدة الإسلامية — ٣ طلاب', time: 'منذ ساعة', icon: '✅' },
            { text: 'طالب جديد: أحمد بن يوسف البلوشي', time: 'اليوم ١٠:٣٠', icon: '👤' },
            { text: 'فشلت مزامنة Moodle لـ ٣ تسجيلات', time: 'أمس ١٦:٠٠', icon: '⚠️' },
            { text: 'تمت إضافة مقرر: السيرة النبوية', time: 'أمس ١٤:٢٠', icon: '📚' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-gray-700">{item.text}</span>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0 ms-4">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
