import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockUsers } from '@/lib/mock-data'
import { delay } from '@/lib/utils'
import { PageHeader } from '@/components/PageHeader'
import { Badge } from '@/components/Badge'
import { TableSkeleton } from '@/components/Skeleton'
import { UserPlus, Pencil } from 'lucide-react'

export function UsersPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [roleFilter, setRoleFilter] = useState('all')

  useEffect(() => {
    delay(600).then(() => setLoading(false))
  }, [])

  const filtered = roleFilter === 'all'
    ? mockUsers
    : mockUsers.filter(u => u.role === roleFilter)

  return (
    <div>
      <PageHeader
        title="المستخدمون"
        subtitle="إدارة حسابات المديرين والمعلمين"
        action={
          <button
            onClick={() => navigate('/users/new')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1b4332] text-white rounded-xl text-sm font-semibold hover:bg-[#143f27] transition shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            إضافة مستخدم
          </button>
        }
      />

      {/* Filter */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#e8e5df]">
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-right bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
        >
          <option value="all">الدور: الكل</option>
          <option value="admin">مدير</option>
          <option value="teacher">معلم</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e5df] overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="bg-[#f0f7f4] border-b border-[#e8e5df]">
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">اسم المستخدم</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الاسم الكامل</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">البريد الإلكتروني</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الدور</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">الحالة</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1b4332]">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableSkeleton rows={4} cols={6} />
            ) : filtered.map(user => (
              <tr
                key={user.id}
                className={`border-b border-gray-100 hover:bg-[#f9fdf9] transition-colors ${!user.is_active ? 'opacity-50' : ''}`}
              >
                <td className="px-4 py-3">
                  <span className={`font-mono text-sm ${!user.is_active ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {user.username}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{user.full_name ?? '—'}</td>
                <td className="px-4 py-3 text-gray-500" dir="ltr">{user.email ?? '—'}</td>
                <td className="px-4 py-3">
                  <Badge variant={user.role === 'admin' ? 'blue' : 'green'}>
                    {user.role === 'admin' ? 'مدير' : 'معلم'}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {!user.is_active && <Badge variant="gray">غير نشط</Badge>}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => navigate(`/users/${user.id}/edit`)}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-[#d8ece4] hover:text-[#1b4332] transition"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
