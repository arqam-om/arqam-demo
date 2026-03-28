import { useNavigate } from 'react-router-dom'
import { students, teachers, subjects, gradeSummary } from '@/lib/school-data'
import { mockAttendance } from '@/lib/mock-data'
import { GraduationCap, Users, BookOpen, CalendarCheck, UserPlus, ClipboardCheck, School } from 'lucide-react'

export function DashboardPage() {
  const navigate = useNavigate()

  const totalStudents = students.length
  const totalTeachers = teachers.length
  const totalSubjects = subjects.length
  const attendanceToday = mockAttendance.filter((a: { session_date: string }) => a.session_date === '2026-03-28').length

  const stats = [
    { label: 'إجمالي الطلاب',    value: totalStudents,   icon: GraduationCap, color: 'text-[#1b4332]', bg: 'bg-[#d8ece4]' },
    { label: 'المعلمون',          value: totalTeachers,   icon: Users,         color: 'text-blue-700',  bg: 'bg-blue-100' },
    { label: 'المواد الدراسية',  value: totalSubjects,   icon: BookOpen,      color: 'text-purple-700',bg: 'bg-purple-100' },
    { label: 'سجلات الحضور اليوم',value: attendanceToday, icon: CalendarCheck, color: 'text-amber-700', bg: 'bg-amber-100' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-l from-[#1b4332] to-[#2d6a4f] rounded-2xl p-5 lg:p-6 text-white flex items-center justify-between gap-4 shadow-md flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">مرحباً، محمد بن سالم 👋</h1>
          <p className="text-[#95d5b2] text-sm mt-1">لوحة التحكم الإدارية — معهد العلوم الإسلامية</p>
        </div>
        <div className="text-left">
          <p className="text-[#c9a84c] text-sm font-medium">الأحد</p>
          <p className="text-white text-sm">٢٨ مارس ٢٠٢٦</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e5df] flex items-center gap-4">
            <div className={`w-13 h-13 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
              <s.icon className={`w-7 h-7 ${s.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{s.label}</p>
              <p className="text-3xl font-black text-gray-900 mt-0.5">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grades summary + Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Grades breakdown */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#e8e5df]">
          <div className="flex items-center gap-2 p-5 border-b border-gray-100">
            <School className="w-5 h-5 text-[#1b4332]" />
            <h2 className="font-bold text-gray-800">الصفوف الدراسية</h2>
          </div>
          <div className="p-4 space-y-3">
            {gradeSummary.map(g => (
              <div key={g.grade} className="flex items-center gap-4 p-4 bg-[#f9fdf9] rounded-xl border border-[#e8e5df]">
                <div className="w-12 h-12 bg-[#1b4332] rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                  {g.grade}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">
                    الصف {g.grade === 10 ? 'العاشر' : g.grade === 11 ? 'الحادي عشر' : 'الثاني عشر'}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    الشعب: {g.sections.join(' — ')} · {g.subject_count} مادة
                  </p>
                </div>
                <div className="text-left">
                  <span className="text-2xl font-black text-[#1b4332]">{g.student_count}</span>
                  <p className="text-xs text-gray-400">طالب</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df]">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">إجراءات سريعة</h2>
          </div>
          <div className="p-4 space-y-3">
            <button
              onClick={() => navigate('/students/new')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#1b4332] text-white rounded-xl text-sm font-semibold hover:bg-[#143f27] transition shadow-sm"
            >
              <UserPlus className="w-4 h-4 flex-shrink-0" />
              إضافة طالب جديد
            </button>
            <button
              onClick={() => navigate('/attendance/new')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white text-[#1b4332] border-2 border-[#1b4332] rounded-xl text-sm font-semibold hover:bg-[#f0f7f4] transition"
            >
              <ClipboardCheck className="w-4 h-4 flex-shrink-0" />
              تسجيل الحضور
            </button>
            <button
              onClick={() => navigate('/enrollments')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
            >
              <Users className="w-4 h-4 flex-shrink-0" />
              قائمة المعلمين
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
            >
              <BookOpen className="w-4 h-4 flex-shrink-0" />
              المواد الدراسية
            </button>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df]">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">آخر النشاطات</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { icon: '✅', text: 'تم تسجيل حضور مادة الرياضيات المتقدمة — الصف ١١أ (٢٨ طالب)', time: 'منذ ساعة' },
            { icon: '👤', text: 'طالب جديد: أحمد بن سالم الحارثي — الصف الحادي عشر أ', time: '٠٩:١٥' },
            { icon: '📋', text: 'الأستاذ خالد الرواحي نشر واجباً في الرياضيات المتقدمة', time: '٠٨:٤٠' },
            { icon: '📢', text: 'إعلان جديد: اختبار الفصل الثاني — الرياضيات — الأسبوع القادم', time: 'أمس ١٦:٠٠' },
            { icon: '📚', text: 'الأستاذة هدى الغافرية رفعت مادة تعليمية في مادة الأحياء', time: 'أمس ١٤:٢٠' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3">
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
