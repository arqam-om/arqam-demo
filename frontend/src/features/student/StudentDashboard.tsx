import { useNavigate } from 'react-router-dom'
import {
  currentStudent, subjects, announcements, assignments, studentTimetable
} from '@/lib/school-data'
import { Clock, AlertCircle, BookOpen, ChevronLeft } from 'lucide-react'

const todayDayIndex = 0 // Sunday for demo

export function StudentDashboard() {
  const navigate = useNavigate()
  const todayPeriods = studentTimetable[todayDayIndex].periods.filter(p => p.subject_id !== null)
  const mySubjects = subjects.filter(s => currentStudent.subject_ids.includes(s.id))
  const pendingAssignments = assignments.filter(a => a.status === 'pending' && currentStudent.subject_ids.includes(a.subject_id))
  const recentAnnouncements = announcements.filter(a => currentStudent.subject_ids.includes(a.subject_id)).slice(0, 3)

  const gradeLabel = currentStudent.grade === 10 ? 'العاشر' : currentStudent.grade === 11 ? 'الحادي عشر' : 'الثاني عشر'

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-l from-[#1b4332] to-[#2d6a4f] rounded-2xl p-6 text-white flex items-center justify-between shadow-md">
        <div>
          <p className="text-[#95d5b2] text-sm">مرحباً بك في منصة أرقم 👋</p>
          <h1 className="text-2xl font-bold mt-1">{currentStudent.name_ar}</h1>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-xs bg-[#0a2416] px-2.5 py-1 rounded-full text-[#95d5b2]">الصف {gradeLabel} {currentStudent.section}</span>
            {currentStudent.math_track && (
              <span className="text-xs bg-[#c9a84c] px-2.5 py-1 rounded-full text-[#1b4332] font-semibold">
                رياضيات {currentStudent.math_track === 'advanced' ? 'متقدمة' : 'أساسية'}
              </span>
            )}
            <span className="text-xs bg-[#0a2416] px-2.5 py-1 rounded-full text-[#95d5b2]">المعدل: {currentStudent.gpa.toFixed(1)}</span>
          </div>
        </div>
        <div className="text-left flex-shrink-0">
          <p className="text-[#c9a84c] text-xs font-medium">الأحد</p>
          <p className="text-white text-sm">٢٨ مارس ٢٠٢٦</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Today's schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#e8e5df]">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#1b4332]" />
              <h2 className="font-bold text-gray-800">حصص اليوم — الأحد</h2>
            </div>
            <button onClick={() => navigate('/student/timetable')} className="text-xs text-[#1b4332] hover:underline flex items-center gap-1">
              الجدول الكامل <ChevronLeft className="w-3 h-3" />
            </button>
          </div>
          <div className="p-4 space-y-2">
            {todayPeriods.map((p, i) => {
              const subj = subjects.find(s => s.id === p.subject_id)
              const isNow = i === 1 // simulate current period
              return (
                <div
                  key={p.period}
                  onClick={() => subj && navigate(`/student/subjects/${subj.id}`)}
                  className={`flex items-center gap-4 p-3 rounded-xl transition cursor-pointer ${
                    isNow
                      ? 'bg-[#1b4332] text-white shadow-md'
                      : 'bg-gray-50 hover:bg-[#f0f7f4]'
                  }`}
                >
                  <div className={`text-xs font-mono w-24 flex-shrink-0 ${isNow ? 'text-[#95d5b2]' : 'text-gray-400'}`}>
                    {p.time}
                  </div>
                  <div
                    className="w-2 h-8 rounded-full flex-shrink-0"
                    style={{ backgroundColor: isNow ? '#c9a84c' : subj?.color ?? '#999' }}
                  />
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${isNow ? 'text-white' : 'text-gray-800'}`}>
                      {subj?.name_ar}
                      {isNow && <span className="ms-2 text-xs bg-[#c9a84c] text-[#1b4332] px-2 py-0.5 rounded-full font-bold">الآن</span>}
                    </p>
                  </div>
                  <div className="text-xl flex-shrink-0">{subj?.icon}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Pending assignments */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df]">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <h2 className="font-bold text-gray-800 text-sm">واجبات معلّقة</h2>
              </div>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">{pendingAssignments.length}</span>
            </div>
            <div className="p-3 space-y-2">
              {pendingAssignments.slice(0, 3).map(a => {
                const subj = subjects.find(s => s.id === a.subject_id)
                return (
                  <div
                    key={a.id}
                    onClick={() => navigate('/student/assignments')}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                  >
                    <span className="text-base mt-0.5">{subj?.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">{a.title_ar}</p>
                      <p className="text-xs text-gray-400 mt-0.5">تسليم: {a.due_date}</p>
                    </div>
                  </div>
                )
              })}
              <button onClick={() => navigate('/student/assignments')} className="w-full text-center text-xs text-[#1b4332] py-1 hover:underline">
                عرض الكل
              </button>
            </div>
          </div>

          {/* Quick subjects */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df]">
            <div className="flex items-center gap-2 p-4 border-b border-gray-100">
              <BookOpen className="w-4 h-4 text-[#1b4332]" />
              <h2 className="font-bold text-gray-800 text-sm">وصول سريع</h2>
            </div>
            <div className="p-3 grid grid-cols-2 gap-2">
              {mySubjects.slice(0, 6).map(s => (
                <button
                  key={s.id}
                  onClick={() => navigate(`/student/subjects/${s.id}`)}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-gray-50 transition text-center"
                >
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-xs text-gray-600 font-medium leading-tight">{s.name_ar.split(' ').slice(0, 2).join(' ')}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df]">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">📢 آخر الإعلانات</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentAnnouncements.map(ann => {
            const subj = subjects.find(s => s.id === ann.subject_id)
            const teacher = ann.teacher_id
            const teacherName = teacher === 1 ? 'الأستاذ خالد الرواحي' : teacher === 2 ? 'الأستاذة عائشة الهنائية' : 'الأستاذ يوسف الكندي'
            return (
              <div key={ann.id} className="flex items-start gap-4 p-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                  style={{ backgroundColor: subj?.color + '20' }}
                >
                  {subj?.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: subj?.color }}>
                      {subj?.name_ar}
                    </span>
                    <span className="text-xs text-gray-400">{ann.date}</span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{ann.title_ar}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{ann.body_ar}</p>
                  <p className="text-xs text-gray-400 mt-1">{teacherName}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
