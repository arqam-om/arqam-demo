import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { mockUser } from '@/lib/mock-data'
import logo from '@/assets/logo.jpg'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  CalendarCheck,
  UserCog,
  LogOut,
} from 'lucide-react'

const navItems = [
  { label: 'لوحة التحكم', to: '/dashboard', icon: LayoutDashboard },
  { label: 'الطلاب',       to: '/students',  icon: GraduationCap },
  { label: 'البرامج',      to: '/programs',  icon: BookOpen },
  { label: 'المقررات',     to: '/courses',   icon: ClipboardList },
  { label: 'التسجيلات',   to: '/enrollments', icon: Users },
  { label: 'الحضور',       to: '/attendance', icon: CalendarCheck },
  { label: 'المستخدمون',  to: '/users',     icon: UserCog, adminOnly: true },
]

export function Layout() {
  const navigate = useNavigate()

  function handleLogout() {
    navigate('/login')
  }

  return (
    <div className="flex h-full bg-[#fafaf7]" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col bg-[#1b4332] text-white shadow-xl">
        {/* Logo area */}
        <div className="flex flex-col items-center gap-3 px-4 py-6 border-b border-[#2d6a4f]">
          <img
            src={logo}
            alt="معهد العلوم الإسلامية"
            className="w-16 h-16 object-contain rounded-full bg-white p-1"
          />
          <div className="text-center">
            <div className="text-[#c9a84c] font-bold text-lg leading-tight">أرقم</div>
            <div className="text-[#95d5b2] text-xs mt-0.5 leading-snug">معهد العلوم الإسلامية</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            if (item.adminOnly && mockUser.role !== 'admin') return null
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 w-full text-right',
                    isActive
                      ? 'bg-[#c9a84c] text-[#1b4332] font-bold shadow-md'
                      : 'text-[#d8f3dc] hover:bg-[#2d6a4f] hover:text-white',
                  )
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Bottom user info */}
        <div className="px-3 py-4 border-t border-[#2d6a4f]">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#0a2416]">
            <div className="w-9 h-9 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#1b4332] font-bold text-sm flex-shrink-0">
              {mockUser.full_name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">{mockUser.full_name}</div>
              <div className="text-xs text-[#95d5b2]">{mockUser.role === 'admin' ? 'مدير النظام' : 'معلم'}</div>
            </div>
            <button
              onClick={handleLogout}
              className="text-[#95d5b2] hover:text-white transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-[#e8e5df] flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">معهد العلوم الإسلامية</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-semibold text-[#1b4332]">منصة أرقم الإدارية</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{mockUser.full_name}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#1b4332] text-[#c9a84c]">
              {mockUser.role === 'admin' ? 'مدير' : 'معلم'}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
