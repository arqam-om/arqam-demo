import { teacherTimetable, subjects } from '@/lib/school-data'

export function TeacherTimetable() {
  const todayIndex = 0

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">جدولي الدراسي</h1>
        <p className="text-sm text-gray-500 mt-1">الأستاذ خالد الرواحي — الرياضيات — الفصل الثاني ٢٠٢٥/٢٠٢٦</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-[#1a2e44] text-white">
                <th className="px-4 py-3 text-right font-semibold w-28">الوقت</th>
                {teacherTimetable.map((day, i) => (
                  <th key={i} className={`px-4 py-3 text-center font-semibold ${i === todayIndex ? 'bg-[#c9a84c] text-[#1a2e44]' : ''}`}>
                    {day.day_ar}
                    {i === todayIndex && <div className="text-xs font-normal opacity-80">اليوم</div>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4, 5, 6].map(pidx => {
                const isBreak = pidx === 3
                return (
                  <tr key={pidx} className={`border-b border-gray-100 ${isBreak ? 'bg-amber-50' : ''}`}>
                    <td className="px-4 py-2">
                      <div className="text-xs text-gray-500 font-mono">{teacherTimetable[0].periods[pidx].time}</div>
                      {isBreak && <div className="text-xs text-amber-600">☕ استراحة</div>}
                    </td>
                    {teacherTimetable.map((day, dayIdx) => {
                      const p = day.periods[pidx]
                      const subj = p.subject_id ? subjects.find(s => s.id === p.subject_id) : null
                      const isToday = dayIdx === todayIndex
                      const isCurrent = isToday && pidx === 0

                      if (isBreak) return <td key={dayIdx} className="px-2 py-2 text-center text-gray-300">—</td>

                      if (!subj) {
                        return (
                          <td key={dayIdx} className="px-2 py-2 text-center">
                            <div className="text-xs text-gray-300 py-3">{p.label ?? '—'}</div>
                          </td>
                        )
                      }

                      return (
                        <td key={dayIdx} className="px-2 py-1.5">
                          <div
                            className={`rounded-xl p-2.5 text-xs leading-tight ${isCurrent ? 'ring-2 ring-[#c9a84c] shadow-md' : ''}`}
                            style={{ backgroundColor: subj.color + '15', borderRight: `3px solid ${subj.color}` }}
                          >
                            <div className="font-bold" style={{ color: subj.color }}>{subj.name_ar}</div>
                            <div className="text-gray-600 mt-0.5 text-[11px]">{p.label?.replace(subj.name_ar, '').trim()}</div>
                            {isCurrent && <div className="text-[10px] font-bold mt-0.5" style={{ color: subj.color }}>الآن</div>}
                          </div>
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
