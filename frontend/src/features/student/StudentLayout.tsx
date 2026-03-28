import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { currentStudent } from '@/lib/school-data'
import logo from '@/assets/logo.jpg'
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  ClipboardList,
  UserCircle,
  LogOut,
} from 'lucide-react'

const navItems = [
  { label: 'الرئيسية',    to: '/student/dashboard',    icon: LayoutDashboard },
  { label: 'موادي',        to: '/student/subjects',      icon: BookOpen },
  { label: 'جدولي الدراسي',to: '/student/timetable',    icon: Calendar },
  { label: 'الواجبات',    to: '/student/assignments',   icon: ClipboardList },
  { label: 'ملفي الشخصي', to: '/student/profile',       icon: UserCircle },
]

export function StudentLayout() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full bg-[#fafaf7]" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col bg-[#1b4332] text-white shadow-xl">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 px-4 py-6 border-b border-[#2d6a4f]">
          <img src={logo} alt="معهد العلوم الإسلامية" className="w-14 h-14 object-contain rounded-full bg-white p-1" />
          <div className="text-center">
            <div className="text-[#c9a84c] font-bold text-lg leading-tight">أرقم</div>
            <div className="text-[#95d5b2] text-xs mt-0.5">بوابة الطالب</div>
          </div>
        </div>

        {/* Student info pill */}
        <div className="mx-3 my-3 bg-[#0a2416] rounded-xl px-3 py-2.5">
          <p className="text-white text-xs font-semibold truncate">{currentStudent.name_ar}</p>
          <p className="text-[#95d5b2] text-xs mt-0.5">
            الصف {currentStudent.grade === 10 ? 'العاشر' : currentStudent.grade === 11 ? 'الحادي عشر' : 'الثاني عشر'} {currentStudent.section}
            {currentStudent.math_track && (
              <span className="ms-1 text-[#c9a84c]">• {currentStudent.math_track === 'advanced' ? 'رياضيات متقدمة' : 'رياضيات أساسية'}</span>
            )}
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full text-right',
                  isActive
                    ? 'bg-[#c9a84c] text-[#1b4332] font-bold shadow-md'
                    : 'text-[#d8f3dc] hover:bg-[#2d6a4f]',
                )
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-[#2d6a4f]">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 px-3 py-2 w-full text-[#95d5b2] hover:text-white hover:bg-[#2d6a4f] rounded-lg transition text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 bg-white border-b border-[#e8e5df] flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">معهد العلوم الإسلامية</span>
            <span className="text-gray-300">|</span>
            <span className="font-semibold text-[#1b4332]">بوابة الطالب</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{currentStudent.name_ar}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#d8ece4] text-[#1b4332]">
              صف {currentStudent.grade}
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
