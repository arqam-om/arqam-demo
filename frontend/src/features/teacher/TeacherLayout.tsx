import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { currentTeacher } from '@/lib/school-data'
import logo from '@/assets/logo.jpg'
import { LayoutDashboard, Calendar, ClipboardList, Users, LogOut } from 'lucide-react'

const navItems = [
  { label: 'الرئيسية',     to: '/teacher/dashboard', icon: LayoutDashboard },
  { label: 'صفوفي',         to: '/teacher/classes',   icon: Users },
  { label: 'جدولي الدراسي', to: '/teacher/timetable', icon: Calendar },
  { label: 'الواجبات',     to: '/teacher/assignments',icon: ClipboardList },
]

export function TeacherLayout() {
  const navigate = useNavigate()
  return (
    <div className="flex h-full bg-[#fafaf7]" dir="rtl">
      <aside className="w-64 flex-shrink-0 flex flex-col bg-[#1a2e44] text-white shadow-xl">
        <div className="flex flex-col items-center gap-3 px-4 py-6 border-b border-[#2a4a6a]">
          <img src={logo} alt="معهد العلوم الإسلامية" className="w-14 h-14 object-contain rounded-full bg-white p-1" />
          <div className="text-center">
            <div className="text-[#c9a84c] font-bold text-lg">أرقم</div>
            <div className="text-blue-300 text-xs mt-0.5">بوابة المعلم</div>
          </div>
        </div>

        <div className="mx-3 my-3 bg-[#0f1f30] rounded-xl px-3 py-2.5">
          <p className="text-white text-xs font-semibold truncate">{currentTeacher.name_ar}</p>
          <p className="text-blue-300 text-xs mt-0.5">الرياضيات</p>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full text-right',
                  isActive
                    ? 'bg-[#c9a84c] text-[#1a2e44] font-bold shadow-md'
                    : 'text-blue-100 hover:bg-[#2a4a6a]',
                )
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-[#2a4a6a]">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 px-3 py-2 w-full text-blue-300 hover:text-white hover:bg-[#2a4a6a] rounded-lg transition text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 bg-white border-b border-[#e8e5df] flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">معهد العلوم الإسلامية</span>
            <span className="text-gray-300">|</span>
            <span className="font-semibold text-[#1a2e44]">بوابة المعلم</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{currentTeacher.name_ar}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              معلم
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6"><Outlet /></main>
      </div>
    </div>
  )
}
