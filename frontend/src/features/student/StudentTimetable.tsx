import { useNavigate } from 'react-router-dom'
import { studentTimetable, subjects } from '@/lib/school-data'

export function StudentTimetable() {
  const navigate = useNavigate()
  const todayIndex = 0 // Sunday

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">الجدول الدراسي</h1>
        <p className="text-sm text-gray-500 mt-1">الصف الحادي عشر أ — الفصل الثاني ٢٠٢٥/٢٠٢٦</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mb-5">
        {subjects.slice(0, 8).map(s => (
          <div key={s.id} className="flex items-center gap-1.5 text-xs">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-gray-600">{s.name_ar}</span>
          </div>
        ))}
      </div>

      {/* Timetable grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-[#1b4332] text-white">
                <th className="px-4 py-3 text-right font-semibold w-28">الوقت</th>
                {studentTimetable.map((day, i) => (
                  <th
                    key={i}
                    className={`px-4 py-3 text-center font-semibold ${i === todayIndex ? 'bg-[#c9a84c] text-[#1b4332]' : ''}`}
                  >
                    {day.day_ar}
                    {i === todayIndex && <div className="text-xs font-normal opacity-80">اليوم</div>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4, 5, 6].map(periodIdx => {
                const isBreak = periodIdx === 3
                return (
                  <tr
                    key={periodIdx}
                    className={`border-b border-gray-100 ${isBreak ? 'bg-gray-50' : ''}`}
                  >
                    <td className="px-4 py-2 text-right">
                      <div className="text-xs text-gray-500 font-mono">
                        {studentTimetable[0].periods[periodIdx].time}
                      </div>
                      {isBreak && <div className="text-xs text-gray-400">استراحة</div>}
                    </td>
                    {studentTimetable.map((day, dayIdx) => {
                      const period = day.periods[periodIdx]
                      const subj = period.subject_id ? subjects.find(s => s.id === period.subject_id) : null
                      const isToday = dayIdx === todayIndex
                      const isCurrentPeriod = isToday && periodIdx === 1

                      if (isBreak) {
                        return (
                          <td key={dayIdx} className="px-2 py-2 text-center">
                            <div className="text-xs text-gray-400">☕</div>
                          </td>
                        )
                      }

                      return (
                        <td key={dayIdx} className="px-2 py-1.5">
                          {subj ? (
                            <button
                              onClick={() => navigate(`/student/subjects/${subj.id}`)}
                              className={`w-full text-center rounded-xl p-2 transition text-xs font-medium leading-tight ${
                                isCurrentPeriod
                                  ? 'ring-2 ring-[#c9a84c] shadow-md scale-105'
                                  : 'hover:opacity-80'
                              }`}
                              style={{
                                backgroundColor: subj.color + '22',
                                color: subj.color,
                                borderLeft: `3px solid ${subj.color}`,
                              }}
                            >
                              <div className="text-base mb-0.5">{subj.icon}</div>
                              <div className="text-center">{subj.name_ar.split(' ').slice(0, 2).join(' ')}</div>
                              {isCurrentPeriod && <div className="text-[10px] mt-0.5 font-bold" style={{ color: subj.color }}>الآن</div>}
                            </button>
                          ) : (
                            <div className="text-center text-gray-300 text-xs py-2">—</div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
