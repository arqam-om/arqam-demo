import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Shared
import { LoginPage } from '@/features/auth/LoginPage'

// Admin portal
import { Layout } from '@/components/Layout'
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

// Student portal
import { StudentLayout } from '@/features/student/StudentLayout'
import { StudentDashboard } from '@/features/student/StudentDashboard'
import { StudentSubjects } from '@/features/student/StudentSubjects'
import { StudentSubjectPage } from '@/features/student/StudentSubjectPage'
import { StudentTimetable } from '@/features/student/StudentTimetable'
import { StudentAssignments } from '@/features/student/StudentAssignments'
import { StudentProfile } from '@/features/student/StudentProfile'

// Teacher portal
import { TeacherLayout } from '@/features/teacher/TeacherLayout'
import { TeacherDashboard } from '@/features/teacher/TeacherDashboard'
import { TeacherClassesList, TeacherClassWorkspace } from '@/features/teacher/TeacherClasses'
import { TeacherTimetable } from '@/features/teacher/TeacherTimetable'
import { TeacherAssignments } from '@/features/teacher/TeacherAssignments'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ── Student Portal ── */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard"       element={<StudentDashboard />} />
          <Route path="subjects"        element={<StudentSubjects />} />
          <Route path="subjects/:id"    element={<StudentSubjectPage />} />
          <Route path="timetable"       element={<StudentTimetable />} />
          <Route path="assignments"     element={<StudentAssignments />} />
          <Route path="profile"         element={<StudentProfile />} />
        </Route>

        {/* ── Teacher Portal ── */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<Navigate to="/teacher/dashboard" replace />} />
          <Route path="dashboard"       element={<TeacherDashboard />} />
          <Route path="classes"         element={<TeacherClassesList />} />
          <Route path="classes/:id"     element={<TeacherClassWorkspace />} />
          <Route path="timetable"       element={<TeacherTimetable />} />
          <Route path="assignments"     element={<TeacherAssignments />} />
        </Route>

        {/* ── Admin Portal ── */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard"       element={<DashboardPage />} />
          <Route path="students"        element={<StudentsPage />} />
          <Route path="students/new"    element={<StudentFormPage />} />
          <Route path="students/:id"    element={<StudentDetailPage />} />
          <Route path="programs"        element={<ProgramsPage />} />
          <Route path="programs/new"    element={<ProgramFormPage />} />
          <Route path="programs/:id/edit" element={<ProgramFormPage />} />
          <Route path="courses"         element={<CoursesPage />} />
          <Route path="enrollments"     element={<EnrollmentsPage />} />
          <Route path="enrollments/new" element={<EnrollFormPage />} />
          <Route path="attendance"      element={<AttendancePage />} />
          <Route path="attendance/new"  element={<AttendanceFormPage />} />
          <Route path="attendance/:id/edit" element={<AttendanceEditPage />} />
          <Route path="users"           element={<UsersPage />} />
          <Route path="users/new"       element={<UserFormPage />} />
          <Route path="users/:id/edit"  element={<UserFormPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
