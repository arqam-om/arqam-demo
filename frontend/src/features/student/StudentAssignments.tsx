import { useState } from 'react'
import { assignments as initialAssignments, subjects, type Assignment } from '@/lib/school-data'
import { CheckCircle, Clock, Award, Upload, Loader2 } from 'lucide-react'

export function StudentAssignments() {
  const [items, setItems] = useState<Assignment[]>(initialAssignments)
  const [submitting, setSubmitting] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all')

  async function handleSubmit(id: number) {
    setSubmitting(id)
    await new Promise(r => setTimeout(r, 1200))
    setItems(prev => prev.map(a => a.id === id ? { ...a, status: 'submitted' } : a))
    setSubmitting(null)
  }

  const filtered = filter === 'all' ? items : items.filter(a => a.status === filter)

  const counts = {
    pending:   items.filter(a => a.status === 'pending').length,
    submitted: items.filter(a => a.status === 'submitted').length,
    graded:    items.filter(a => a.status === 'graded').length,
  }

  const statusConfig = {
    pending:   { label: 'معلّق',      color: 'text-amber-700 bg-amber-100',  icon: Clock },
    submitted: { label: 'تم التسليم', color: 'text-blue-700 bg-blue-100',   icon: CheckCircle },
    graded:    { label: 'تم التصحيح', color: 'text-emerald-700 bg-emerald-100', icon: Award },
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">الواجبات</h1>
        <p className="text-sm text-gray-500 mt-1">جميع الواجبات للفصل الدراسي الثاني</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { key: 'pending',   label: 'معلّقة',        count: counts.pending,   icon: Clock,        bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700' },
          { key: 'submitted', label: 'تم التسليم',    count: counts.submitted, icon: CheckCircle,  bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-700' },
          { key: 'graded',    label: 'تم التصحيح',    count: counts.graded,    icon: Award,        bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
        ].map(card => (
          <button
            key={card.key}
            onClick={() => setFilter(filter === card.key ? 'all' : card.key as typeof filter)}
            className={`${card.bg} border ${card.border} rounded-2xl p-4 text-right transition hover:shadow-sm ${filter === card.key ? 'ring-2 ring-offset-1 ring-[#c9a84c]' : ''}`}
          >
            <card.icon className={`w-5 h-5 mb-2 ${card.text}`} />
            <div className={`text-2xl font-black ${card.text}`}>{card.count}</div>
            <div className={`text-xs ${card.text} mt-0.5`}>{card.label}</div>
          </button>
        ))}
      </div>

      {/* Assignments list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-[#e8e5df]">
            لا توجد واجبات في هذا التصنيف
          </div>
        ) : filtered.map(a => {
          const subj = subjects.find(s => s.id === a.subject_id)
          const cfg = statusConfig[a.status]
          const StatusIcon = cfg.icon
          const isOverdue = a.status === 'pending' && new Date(a.due_date) < new Date()

          return (
            <div
              key={a.id}
              className={`bg-white rounded-2xl shadow-sm border p-5 transition ${
                isOverdue ? 'border-red-300 bg-red-50/30' : 'border-[#e8e5df]'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Subject icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: subj?.color + '18' }}
                >
                  {subj?.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{a.title_ar}</h3>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: subj?.color }}>{subj?.name_ar}</p>
                    </div>
                    <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${cfg.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {cfg.label}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{a.description_ar}</p>

                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                        <Clock className="w-3.5 h-3.5" />
                        {isOverdue ? '⚠️ متأخر — ' : ''}تسليم: {a.due_date}
                      </span>
                      <span className="text-xs text-gray-400">الدرجة الكاملة: {a.max_grade}</span>
                      {a.grade !== undefined && (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          درجتك: {a.grade}/{a.max_grade}
                        </span>
                      )}
                    </div>

                    {a.status === 'pending' && (
                      <button
                        onClick={() => handleSubmit(a.id)}
                        disabled={submitting === a.id}
                        className="flex items-center gap-1.5 text-xs bg-[#1b4332] text-white px-4 py-2 rounded-xl hover:bg-[#143f27] transition disabled:opacity-60 font-medium"
                      >
                        {submitting === a.id
                          ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />جارٍ التسليم...</>
                          : <><Upload className="w-3.5 h-3.5" />تسليم الواجب</>
                        }
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
