import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { LoginPage } from '@/features/auth/LoginPage'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { StudentsPage } from '@/features/students/StudentsPage'
import { StudentDetailPage } from '@/features/students/StudentDetailPage'
import { StudentFormPage } from '@/features/students/StudentFormPage'
import { ProgramsPage } from '@/features/programs/ProgramsPage'
import { ProgramFormPage } from '@/features/programs/ProgramFormPage'
import { CoursesPage } from '@/features/courses/CoursesPage'
import { EnrollmentsPage } from '@/features/enrollments/EnrollmentsPage'
import { EnrollFormPage } from '@/features/enrollments/EnrollFormPage'
import { AttendancePage } from '@/features/attendance/AttendancePage'
import { AttendanceFormPage } from '@/features/attendance/AttendanceFormPage'
import { AttendanceEditPage } from '@/features/attendance/AttendanceEditPage'
import { UsersPage } from '@/features/users/UsersPage'
import { UserFormPage } from '@/features/users/UserFormPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/new" element={<StudentFormPage />} />
          <Route path="students/:id" element={<StudentDetailPage />} />
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="programs/new" element={<ProgramFormPage />} />
          <Route path="programs/:id/edit" element={<ProgramFormPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="enrollments" element={<EnrollmentsPage />} />
          <Route path="enrollments/new" element={<EnrollFormPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="attendance/new" element={<AttendanceFormPage />} />
          <Route path="attendance/:id/edit" element={<AttendanceEditPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/new" element={<UserFormPage />} />
          <Route path="users/:id/edit" element={<UserFormPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
