// Mock data for demo — no backend required

export const mockUser = {
  id: 1,
  username: 'admin',
  full_name: 'محمد بن سالم الحارثي',
  role: 'admin' as const,
  is_active: true,
}

export const mockPrograms = [
  { id: 1, name_ar: 'الدراسات الإسلامية', name_en: 'Islamic Studies', description: 'برنامج شامل في العلوم الإسلامية والشريعة والعقيدة', created_at: '2024-09-01' },
  { id: 2, name_ar: 'علوم القرآن الكريم', name_en: 'Quranic Sciences', description: 'تحفيظ القرآن الكريم وتجويده وتفسيره', created_at: '2024-09-01' },
  { id: 3, name_ar: 'الفقه وأصوله', name_en: 'Fiqh & Usul', description: 'دراسة الفقه الإسلامي وأصوله ومذاهبه', created_at: '2024-09-01' },
  { id: 4, name_ar: 'اللغة العربية', name_en: 'Arabic Language', description: 'النحو والصرف والبلاغة والأدب العربي', created_at: '2024-10-01' },
]

export const mockCourses = [
  { id: 1, name_ar: 'العقيدة الإسلامية', name_en: 'Islamic Creed', moodle_course_id: 101, program_id: 1, synced_at: '2026-03-27 09:00' },
  { id: 2, name_ar: 'فقه العبادات', name_en: 'Fiqh of Worship', moodle_course_id: 102, program_id: 3, synced_at: '2026-03-27 09:00' },
  { id: 3, name_ar: 'تفسير القرآن', name_en: 'Quran Tafseer', moodle_course_id: 103, program_id: 2, synced_at: '2026-03-27 09:05' },
  { id: 4, name_ar: 'النحو والصرف', name_en: 'Arabic Grammar', moodle_course_id: 104, program_id: 4, synced_at: '2026-03-26 15:30' },
  { id: 5, name_ar: 'الحديث النبوي', name_en: 'Hadith Studies', moodle_course_id: 105, program_id: 1, synced_at: '2026-03-25 10:00' },
  { id: 6, name_ar: 'السيرة النبوية', name_en: 'Prophet Biography', moodle_course_id: 106, program_id: 1, synced_at: null },
]

export type StudentStatus = 'active' | 'suspended' | 'graduated' | 'withdrawn'

export const mockStudents = [
  { id: 1, national_id: '92847561', name_ar: 'عبدالله بن خالد المعمري', name_en: 'Abdullah Al-Maamari', phone: '+968 9123 4567', email: 'a.maamari@example.com', program_id: 1, status: 'active' as StudentStatus, moodle_user_id: 201 },
  { id: 2, national_id: '83921047', name_ar: 'سالم بن سعيد الحارثي', name_en: 'Salem Al-Harthi', phone: '+968 9234 5678', email: null, program_id: 2, status: 'active' as StudentStatus, moodle_user_id: 202 },
  { id: 3, national_id: '76543210', name_ar: 'أحمد بن يوسف البلوشي', name_en: 'Ahmad Al-Balushi', phone: '+968 9345 6789', email: 'ahmad.b@example.com', program_id: 3, status: 'active' as StudentStatus, moodle_user_id: null },
  { id: 4, national_id: '65432109', name_ar: 'محمد بن عبدالرحمن الريامي', name_en: 'Mohammed Al-Riyami', phone: null, email: null, program_id: 1, status: 'active' as StudentStatus, moodle_user_id: 204 },
  { id: 5, national_id: '54321098', name_ar: 'يوسف بن ناصر الكندي', name_en: 'Yousuf Al-Kindi', phone: '+968 9456 7890', email: 'y.kindi@example.com', program_id: 2, status: 'active' as StudentStatus, moodle_user_id: 205 },
  { id: 6, national_id: '43210987', name_ar: 'عمر بن سليمان الشكيلي', name_en: 'Omar Al-Shukaily', phone: '+968 9567 8901', email: null, program_id: 4, status: 'suspended' as StudentStatus, moodle_user_id: 206 },
  { id: 7, national_id: '32109876', name_ar: 'حمد بن علي الغافري', name_en: 'Hamad Al-Ghafri', phone: '+968 9678 9012', email: 'h.ghafri@example.com', program_id: 1, status: 'active' as StudentStatus, moodle_user_id: 207 },
  { id: 8, national_id: '21098765', name_ar: 'إبراهيم بن محمد الهاشمي', name_en: 'Ibrahim Al-Hashimi', phone: null, email: null, program_id: 3, status: 'graduated' as StudentStatus, moodle_user_id: 208 },
  { id: 9, national_id: '10987654', name_ar: 'خالد بن أحمد الزدجالي', name_en: 'Khalid Al-Zadjali', phone: '+968 9789 0123', email: 'k.zadjali@example.com', program_id: 2, status: 'active' as StudentStatus, moodle_user_id: 209 },
  { id: 10, national_id: '98765432', name_ar: 'نواف بن سعود العبري', name_en: 'Nawaf Al-Abri', phone: '+968 9890 1234', email: null, program_id: null, status: 'withdrawn' as StudentStatus, moodle_user_id: null },
]

export type EnrollmentStatus = 'active' | 'dropped' | 'completed'

export const mockEnrollments = [
  { id: 1, student_id: 1, course_id: 1, status: 'active' as EnrollmentStatus, moodle_synced: true, enrolled_at: '2024-09-15' },
  { id: 2, student_id: 1, course_id: 2, status: 'active' as EnrollmentStatus, moodle_synced: true, enrolled_at: '2024-09-15' },
  { id: 3, student_id: 2, course_id: 3, status: 'active' as EnrollmentStatus, moodle_synced: false, enrolled_at: '2024-09-16' },
  { id: 4, student_id: 3, course_id: 1, status: 'active' as EnrollmentStatus, moodle_synced: false, enrolled_at: '2024-09-16' },
  { id: 5, student_id: 4, course_id: 2, status: 'active' as EnrollmentStatus, moodle_synced: true, enrolled_at: '2024-09-17' },
  { id: 6, student_id: 5, course_id: 3, status: 'dropped' as EnrollmentStatus, moodle_synced: true, enrolled_at: '2024-09-17' },
  { id: 7, student_id: 6, course_id: 4, status: 'active' as EnrollmentStatus, moodle_synced: true, enrolled_at: '2024-09-18' },
  { id: 8, student_id: 7, course_id: 1, status: 'active' as EnrollmentStatus, moodle_synced: true, enrolled_at: '2024-09-18' },
  { id: 9, student_id: 9, course_id: 5, status: 'active' as EnrollmentStatus, moodle_synced: false, enrolled_at: '2024-10-01' },
  { id: 10, student_id: 2, course_id: 1, status: 'completed' as EnrollmentStatus, moodle_synced: true, enrolled_at: '2024-01-10' },
]

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused'

export const mockAttendance = [
  { id: 1, course_id: 1, student_id: 1, session_date: '2026-03-27', status: 'present' as AttendanceStatus, note: null, marked_by: 'محمد الحارثي', created_at: '2026-03-27 08:30' },
  { id: 2, course_id: 1, student_id: 4, session_date: '2026-03-27', status: 'absent' as AttendanceStatus, note: 'مريض', marked_by: 'محمد الحارثي', created_at: '2026-03-27 08:30' },
  { id: 3, course_id: 1, student_id: 7, session_date: '2026-03-27', status: 'late' as AttendanceStatus, note: 'تأخر 15 دقيقة', marked_by: 'محمد الحارثي', created_at: '2026-03-27 08:30' },
  { id: 4, course_id: 2, student_id: 1, session_date: '2026-03-26', status: 'present' as AttendanceStatus, note: null, marked_by: 'أحمد المسكري', created_at: '2026-03-26 10:00' },
  { id: 5, course_id: 2, student_id: 4, session_date: '2026-03-26', status: 'excused' as AttendanceStatus, note: 'إجازة رسمية', marked_by: 'أحمد المسكري', created_at: '2026-03-26 10:00' },
  { id: 6, course_id: 3, student_id: 2, session_date: '2026-03-28', status: 'present' as AttendanceStatus, note: null, marked_by: 'محمد الحارثي', created_at: '2026-03-28 09:00' },
  { id: 7, course_id: 5, student_id: 9, session_date: '2026-03-28', status: 'present' as AttendanceStatus, note: null, marked_by: 'سعيد البلوشي', created_at: '2026-03-28 11:00' },
]

export const mockUsers = [
  { id: 1, username: 'admin', full_name: 'محمد بن سالم الحارثي', email: 'm.harthi@institute.edu.om', role: 'admin' as const, is_active: true },
  { id: 2, username: 'teacher.ahmad', full_name: 'أحمد بن ناصر المسكري', email: 'a.maskari@institute.edu.om', role: 'teacher' as const, is_active: true },
  { id: 3, username: 'teacher.saeed', full_name: 'سعيد بن علي البلوشي', email: 's.balushi@institute.edu.om', role: 'teacher' as const, is_active: true },
  { id: 4, username: 'teacher.hamood', full_name: 'حمود بن محمد الشحي', email: null, role: 'teacher' as const, is_active: false },
]

export const mockDashboardStats = {
  totalActiveStudents: 7,
  totalCourses: 6,
  pendingMoodleSync: 3,
  attendanceSessToday: 2,
}
