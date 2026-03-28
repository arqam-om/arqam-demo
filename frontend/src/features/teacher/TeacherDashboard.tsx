import { useNavigate } from 'react-router-dom'
import { currentTeacher, teacherClasses, subjects, announcements, assignments, teacherTimetable } from '@/lib/school-data'
import { Users, BookOpen, ClipboardList, Clock } from 'lucide-react'

export function TeacherDashboard() {
  const navigate = useNavigate()
  const todayPeriods = teacherTimetable[0].periods.filter(p => p.subject_id !== null && p.label !== 'استراحة')
  const mySubjectIds = currentTeacher.subject_ids
  const totalStudents = teacherClasses.reduce((s, c) => s + c.student_count, 0)
  const pendingAssignments = assignments.filter(a => mySubjectIds.includes(a.subject_id) && a.status === 'pending')
  const recentAnnouncements = announcements.filter(a => mySubjectIds.includes(a.subject_id)).slice(0, 2)

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-l from-[#1a2e44] to-[#2a4a6a] rounded-2xl p-5 lg:p-6 text-white flex items-center justify-between gap-4 shadow-md flex-wrap">
        <div>
          <p className="text-blue-300 text-sm">مرحباً بك 👋</p>
          <h1 className="text-xl lg:text-2xl font-bold mt-1">{currentTeacher.name_ar}</h1>
          <p className="text-blue-200 text-sm mt-1">الرياضيات — {teacherClasses.length} صفوف</p>
        </div>
        <div className="text-left flex-shrink-0">
          <p className="text-[#c9a84c] text-xs font-medium">الأحد</p>
          <p className="text-white text-sm">٢٨ مارس ٢٠٢٦</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users,       label: 'إجمالي الطلاب',   value: totalStudents, color: 'text-[#1a2e44]', bg: 'bg-blue-100' },
          { icon: BookOpen,    label: 'الصفوف',            value: teacherClasses.length, color: 'text-purple-700', bg: 'bg-purple-100' },
          { icon: ClipboardList, label: 'واجبات معلّقة',  value: pendingAssignments.length, color: 'text-amber-700', bg: 'bg-amber-100' },
          { icon: Clock,       label: 'حصص اليوم',        value: todayPeriods.length, color: 'text-emerald-700', bg: 'bg-emerald-100' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-[#e8e5df] flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
              <s.icon className={`w-6 h-6 ${s.color}`} />
            </div>
            <div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's schedule */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df]">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#1a2e44]" />
              <h2 className="font-bold text-gray-800">جدول اليوم</h2>
            </div>
            <button onClick={() => navigate('/teacher/timetable')} className="text-xs text-[#1a2e44] hover:underline">الجدول الكامل</button>
          </div>
          <div className="p-4 space-y-2">
            {todayPeriods.map((p, i) => {
              const subj = subjects.find(s => s.id === p.subject_id)
              const isNow = i === 0
              return (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${isNow ? 'bg-[#1a2e44] text-white' : 'bg-gray-50'}`}>
                  <div className={`text-xs font-mono w-24 flex-shrink-0 ${isNow ? 'text-blue-300' : 'text-gray-400'}`}>{p.time}</div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${isNow ? 'text-white' : 'text-gray-800'}`}>
                      {p.label}
                      {isNow && <span className="ms-2 text-xs bg-[#c9a84c] text-[#1a2e44] px-2 py-0.5 rounded-full">الآن</span>}
                    </p>
                  </div>
                  <span className="text-xl">{subj?.icon}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* My classes quick access */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df]">
          <div className="flex items-center gap-2 p-5 border-b border-gray-100">
            <Users className="w-5 h-5 text-[#1a2e44]" />
            <h2 className="font-bold text-gray-800">صفوفي</h2>
          </div>
          <div className="p-4 space-y-2">
            {teacherClasses.map(cls => {
              const subj = subjects.find(s => s.id === cls.subject_id)
              return (
                <button
                  key={cls.id}
                  onClick={() => navigate(`/teacher/classes/${cls.id}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-transparent transition text-right"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: subj?.color + '20' }}>
                    {subj?.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{subj?.name_ar}</p>
                    <p className="text-xs text-gray-500">الصف {cls.grade}{cls.section} — {cls.student_count} طالب</p>
                  </div>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{cls.student_count} طالب</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent announcements */}
      {recentAnnouncements.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df]">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">📢 آخر إعلاناتي</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentAnnouncements.map(ann => {
              const subj = subjects.find(s => s.id === ann.subject_id)
              return (
                <div key={ann.id} className="flex items-start gap-4 p-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: subj?.color + '20' }}>
                    {subj?.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{ann.title_ar}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{subj?.name_ar} — {ann.date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
