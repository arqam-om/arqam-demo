// School mock data — Arqam Demo
// Islamic high school, Oman — Grades 10, 11, 12

export type Grade = 10 | 11 | 12
export type MathTrack = 'basic' | 'advanced'
export type AssignmentStatus = 'pending' | 'submitted' | 'graded'

// ─── SUBJECTS ───────────────────────────────────────────────────────────────

export interface Subject {
  id: number
  name_ar: string
  name_en: string
  icon: string
  color: string
  teacher_id: number
  grades: Grade[]
}

export const subjects: Subject[] = [
  { id: 1,  name_ar: 'التربية الإسلامية', name_en: 'Islamic Education',    icon: '☪️',  color: '#1b4332', teacher_id: 3, grades: [10, 11, 12] },
  { id: 2,  name_ar: 'اللغة العربية',      name_en: 'Arabic Language',       icon: '📖', color: '#7c3aed', teacher_id: 6, grades: [10, 11, 12] },
  { id: 3,  name_ar: 'اللغة الإنجليزية',  name_en: 'English Language',      icon: '🇬🇧', color: '#1d4ed8', teacher_id: 2, grades: [10, 11, 12] },
  { id: 4,  name_ar: 'الرياضيات المتقدمة',name_en: 'Mathematics (Advanced)', icon: '📐', color: '#b45309', teacher_id: 1, grades: [11, 12] },
  { id: 5,  name_ar: 'الرياضيات الأساسية',name_en: 'Mathematics (Basic)',    icon: '📐', color: '#b45309', teacher_id: 1, grades: [10, 11, 12] },
  { id: 6,  name_ar: 'الفيزياء',           name_en: 'Physics',               icon: '⚡', color: '#0369a1', teacher_id: 5, grades: [11, 12] },
  { id: 7,  name_ar: 'الكيمياء',           name_en: 'Chemistry',             icon: '🧪', color: '#059669', teacher_id: 7, grades: [11, 12] },
  { id: 8,  name_ar: 'الأحياء',            name_en: 'Biology',               icon: '🧬', color: '#16a34a', teacher_id: 4, grades: [11, 12] },
  { id: 9,  name_ar: 'تقنية المعلومات',   name_en: 'Information Technology', icon: '💻', color: '#6d28d9', teacher_id: 8, grades: [10, 11, 12] },
  { id: 10, name_ar: 'الدراسات الاجتماعية',name_en: 'Social Studies',        icon: '🌍', color: '#b45309', teacher_id: 9, grades: [10] },
  { id: 11, name_ar: 'مهارات الحياة',      name_en: 'Life Skills',           icon: '🌱', color: '#0f766e', teacher_id: 10, grades: [10, 11, 12] },
  { id: 12, name_ar: 'الفرنسية',           name_en: 'French (Elective)',      icon: '🇫🇷', color: '#be185d', teacher_id: 11, grades: [11, 12] },
]

// ─── TEACHERS ────────────────────────────────────────────────────────────────

export interface Teacher {
  id: number
  name_ar: string
  name_en: string
  subject_ids: number[]
  email: string
  phone: string
  avatar_initial: string
}

export const teachers: Teacher[] = [
  { id: 1,  name_ar: 'الأستاذ خالد الرواحي',  name_en: 'Mr. Khalid Al-Rawahi', subject_ids: [4, 5], email: 'k.rawahi@school.edu.om',  phone: '+968 9111 2222', avatar_initial: 'خ' },
  { id: 2,  name_ar: 'الأستاذة عائشة الهنائية', name_en: 'Ms. Aisha Al-Hinai',  subject_ids: [3],    email: 'a.hinai@school.edu.om',   phone: '+968 9222 3333', avatar_initial: 'ع' },
  { id: 3,  name_ar: 'الأستاذ يوسف الكندي',    name_en: 'Mr. Yousuf Al-Kindi', subject_ids: [1],    email: 'y.kindi@school.edu.om',   phone: '+968 9333 4444', avatar_initial: 'ي' },
  { id: 4,  name_ar: 'الأستاذة هدى الغافرية',  name_en: 'Ms. Huda Al-Ghafri',  subject_ids: [8],    email: 'h.ghafri@school.edu.om',  phone: '+968 9444 5555', avatar_initial: 'ه' },
  { id: 5,  name_ar: 'الأستاذ سالم الحارثي',   name_en: 'Mr. Salem Al-Harthi', subject_ids: [6],    email: 's.harthi@school.edu.om',  phone: '+968 9555 6666', avatar_initial: 'س' },
  { id: 6,  name_ar: 'الأستاذة مريم البلوشية', name_en: 'Ms. Mariam Al-Balushi',subject_ids: [2],   email: 'm.balushi@school.edu.om', phone: '+968 9666 7777', avatar_initial: 'م' },
  { id: 7,  name_ar: 'الأستاذ أحمد الشيدي',    name_en: 'Mr. Ahmad Al-Shidi',  subject_ids: [7],    email: 'a.shidi@school.edu.om',   phone: '+968 9777 8888', avatar_initial: 'أ' },
  { id: 8,  name_ar: 'الأستاذة نور الفارسية',  name_en: 'Ms. Noor Al-Farsi',   subject_ids: [9],    email: 'n.farsi@school.edu.om',   phone: '+968 9888 9999', avatar_initial: 'ن' },
  { id: 9,  name_ar: 'الأستاذ ماجد العبري',    name_en: 'Mr. Majid Al-Abri',   subject_ids: [10],   email: 'm.abri@school.edu.om',    phone: '+968 9999 0000', avatar_initial: 'م' },
  { id: 10, name_ar: 'الأستاذة لمياء الزدجالية',name_en: 'Ms. Lamia Al-Zadjali',subject_ids: [11],  email: 'l.zadjali@school.edu.om', phone: '+968 9100 1001', avatar_initial: 'ل' },
  { id: 11, name_ar: 'الأستاذ فيليب مارتن',    name_en: 'Mr. Philippe Martin', subject_ids: [12],   email: 'p.martin@school.edu.om',  phone: '+968 9200 2002', avatar_initial: 'ف' },
]

// ─── STUDENTS ────────────────────────────────────────────────────────────────

export interface Student {
  id: number
  name_ar: string
  name_en: string
  grade: Grade
  section: string
  national_id: string
  math_track?: MathTrack
  electives: number[]
  subject_ids: number[]
  gpa: number
}

export const students: Student[] = [
  {
    id: 1,
    name_ar: 'أحمد بن سالم الحارثي',
    name_en: 'Ahmed Al-Harthi',
    grade: 11,
    section: 'أ',
    national_id: '11223344',
    math_track: 'advanced',
    electives: [12],
    subject_ids: [1, 2, 3, 4, 6, 7, 8, 9, 11, 12],
    gpa: 3.7,
  },
  {
    id: 2,
    name_ar: 'فاطمة بنت خالد البلوشية',
    name_en: 'Fatima Al-Balushi',
    grade: 12,
    section: 'ب',
    national_id: '22334455',
    math_track: 'advanced',
    electives: [12],
    subject_ids: [1, 2, 3, 4, 6, 7, 8, 9, 11],
    gpa: 3.9,
  },
  {
    id: 3,
    name_ar: 'خالد بن ناصر الزدجالي',
    name_en: 'Khalid Al-Zadjali',
    grade: 10,
    section: 'أ',
    national_id: '33445566',
    subject_ids: [1, 2, 3, 5, 9, 10, 11],
    electives: [],
    gpa: 3.2,
  },
  {
    id: 4,
    name_ar: 'سارة بنت علي المعمرية',
    name_en: 'Sara Al-Maamari',
    grade: 11,
    section: 'ب',
    national_id: '44556677',
    math_track: 'basic',
    electives: [],
    subject_ids: [1, 2, 3, 5, 8, 9, 11],
    gpa: 3.5,
  },
]

// ─── CURRENT LOGGED-IN STUDENT (demo = Ahmed, Grade 11 Advanced) ─────────────
export const currentStudent = students[0]

// ─── CURRENT LOGGED-IN TEACHER (demo = Mr. Khalid, Mathematics) ─────────────
export const currentTeacher = teachers[0]

// ─── TIMETABLE ────────────────────────────────────────────────────────────────

export interface Period {
  period: number
  time: string
  subject_id: number | null
  label?: string
}

export interface DaySchedule {
  day_ar: string
  day_en: string
  periods: Period[]
}

// Grade 11A - Advanced Math - Ahmed's timetable
export const studentTimetable: DaySchedule[] = [
  {
    day_ar: 'الأحد', day_en: 'Sunday',
    periods: [
      { period: 1, time: '07:30 – 08:15', subject_id: 1 },
      { period: 2, time: '08:15 – 09:00', subject_id: 2 },
      { period: 3, time: '09:00 – 09:45', subject_id: 4 },
      { period: 4, time: '09:45 – 10:15', subject_id: null, label: 'استراحة' },
      { period: 5, time: '10:15 – 11:00', subject_id: 3 },
      { period: 6, time: '11:00 – 11:45', subject_id: 6 },
      { period: 7, time: '11:45 – 12:30', subject_id: 7 },
    ],
  },
  {
    day_ar: 'الاثنين', day_en: 'Monday',
    periods: [
      { period: 1, time: '07:30 – 08:15', subject_id: 2 },
      { period: 2, time: '08:15 – 09:00', subject_id: 3 },
      { period: 3, time: '09:00 – 09:45', subject_id: 4 },
      { period: 4, time: '09:45 – 10:15', subject_id: null, label: 'استراحة' },
      { period: 5, time: '10:15 – 11:00', subject_id: 1 },
      { period: 6, time: '11:00 – 11:45', subject_id: 7 },
      { period: 7, time: '11:45 – 12:30', subject_id: 9 },
    ],
  },
  {
    day_ar: 'الثلاثاء', day_en: 'Tuesday',
    periods: [
      { period: 1, time: '07:30 – 08:15', subject_id: 4 },
      { period: 2, time: '08:15 – 09:00', subject_id: 6 },
      { period: 3, time: '09:00 – 09:45', subject_id: 8 },
      { period: 4, time: '09:45 – 10:15', subject_id: null, label: 'استراحة' },
      { period: 5, time: '10:15 – 11:00', subject_id: 2 },
      { period: 6, time: '11:00 – 11:45', subject_id: 3 },
      { period: 7, time: '11:45 – 12:30', subject_id: 11 },
    ],
  },
  {
    day_ar: 'الأربعاء', day_en: 'Wednesday',
    periods: [
      { period: 1, time: '07:30 – 08:15', subject_id: 1 },
      { period: 2, time: '08:15 – 09:00', subject_id: 4 },
      { period: 3, time: '09:00 – 09:45', subject_id: 3 },
      { period: 4, time: '09:45 – 10:15', subject_id: null, label: 'استراحة' },
      { period: 5, time: '10:15 – 11:00', subject_id: 7 },
      { period: 6, time: '11:00 – 11:45', subject_id: 8 },
      { period: 7, time: '11:45 – 12:30', subject_id: 2 },
    ],
  },
  {
    day_ar: 'الخميس', day_en: 'Thursday',
    periods: [
      { period: 1, time: '07:30 – 08:15', subject_id: 3 },
      { period: 2, time: '08:15 – 09:00', subject_id: 4 },
      { period: 3, time: '09:00 – 09:45', subject_id: 2 },
      { period: 4, time: '09:45 – 10:15', subject_id: null, label: 'استراحة' },
      { period: 5, time: '10:15 – 11:00', subject_id: 6 },
      { period: 6, time: '11:00 – 11:45', subject_id: 9 },
      { period: 7, time: '11:45 – 12:30', subject_id: 12 },
    ],
  },
]

// Teacher timetable — Mr. Khalid (Math)
export const teacherTimetable: DaySchedule[] = [
  {
    day_ar: 'الأحد', day_en: 'Sunday',
    periods: [
      { period: 1, time: '07:30 – 08:15', subject_id: null, label: 'حصة فراغ' },
      { period: 2, time: '08:15 – 09:00', subject_id: 4, label: 'الصف ١١أ — رياضيات متقدمة' },
      { period: 3, time: '09:00 – 09:45', subject_id: 5, label: 'الصف ١٢ب — رياضيات أساسية' },
      { period: 4, time: '09:45 – 10:15', subject_id: null, label: 'استراحة' },
      { period: 5, time: '10:15 – 11:00', subject_id: 4, label: 'الصف ١٢أ — رياضيات متقدمة' },
      { period: 6, time: '11:00 – 11:45', subject_id: null, label: 'حصة فراغ' },
      { period: 7, time: '11:45 – 12:30', subject_id: null, label: 'حصة فراغ' },
    ],
  },
  {
    day_ar: 'الاثنين', day_en: 'Monday',
    periods: [
      { period: 1, time: '07:30 – 08:15', subject_id: 5, label: 'الصف ١١ب — رياضيات أساسية' },
      { period: 2, time: '08:15 – 09:00', subject_id: null, label: 'حصة فراغ' },
      { period: 3, time: '09:00 – 09:45', subject_id: 4, label: 'الصف ١١أ — رياضيات متقدمة' },
      { period: 4, time: '09:45 – 10:15', subject_id: null, label: 'استراحة' },
      { period: 5, time: '10:15 – 11:00', subject_id: null, label: 'حصة فراغ' },
      { period: 6, time: '11:00 – 11:45', subject_id: 4, label: 'الصف ١٢أ — رياضيات متقدمة' },
      { period: 7, time: '11:45 – 12:30', subject_id: null, label: 'حصة فراغ' },
    ],
  },
  {
    day_ar: 'الثلاثاء', day_en: 'Tuesday',
    periods: [
      { period: 1, time: '07:30 – 08:15', subject_id: 4, label: 'الصف ١١أ — رياضيات متقدمة' },
      { period: 2, time: '08:15 – 09:00', subject_id: 5, label: 'الصف ١٠أ — رياضيات أساسية' },
      { period: 3, time: '09:00 – 09:45', subject_id: null, label: 'حصة فراغ' },
      { period: 4, time: '09:45 – 10:15', subject_id: null, label: 'استراحة' },
      { period: 5, time: '10:15 – 11:00', subject_id: 4, label: 'الصف ١٢أ — رياضيات متقدمة' },
      { period: 6, time: '11:00 – 11:45', subject_id: 5, label: 'الصف ١١ب — رياضيات أساسية' },
      { period: 7, time: '11:45 – 12:30', subject_id: null, label: 'حصة فراغ' },
    ],
  },
  {
    day_ar: 'الأربعاء', day_en: 'Wednesday',
    periods: [
      { period: 1, time: '07:30 – 08:15', subject_id: null, label: 'حصة فراغ' },
      { period: 2, time: '08:15 – 09:00', subject_id: 4, label: 'الصف ١١أ — رياضيات متقدمة' },
      { period: 3, time: '09:00 – 09:45', subject_id: 5, label: 'الصف ١٢ب — رياضيات أساسية' },
      { period: 4, time: '09:45 – 10:15', subject_id: null, label: 'استراحة' },
      { period: 5, time: '10:15 – 11:00', subject_id: null, label: 'حصة فراغ' },
      { period: 6, time: '11:00 – 11:45', subject_id: 4, label: 'الصف ١٢أ — رياضيات متقدمة' },
      { period: 7, time: '11:45 – 12:30', subject_id: null, label: 'حصة فراغ' },
    ],
  },
  {
    day_ar: 'الخميس', day_en: 'Thursday',
    periods: [
      { period: 1, time: '07:30 – 08:15', subject_id: 5, label: 'الصف ١٠أ — رياضيات أساسية' },
      { period: 2, time: '08:15 – 09:00', subject_id: 4, label: 'الصف ١١أ — رياضيات متقدمة' },
      { period: 3, time: '09:00 – 09:45', subject_id: 5, label: 'الصف ١١ب — رياضيات أساسية' },
      { period: 4, time: '09:45 – 10:15', subject_id: null, label: 'استراحة' },
      { period: 5, time: '10:15 – 11:00', subject_id: null, label: 'حصة فراغ' },
      { period: 6, time: '11:00 – 11:45', subject_id: null, label: 'حصة فراغ' },
      { period: 7, time: '11:45 – 12:30', subject_id: null, label: 'حصة فراغ' },
    ],
  },
]

// ─── ANNOUNCEMENTS ────────────────────────────────────────────────────────────

export interface Announcement {
  id: number
  subject_id: number
  title_ar: string
  body_ar: string
  teacher_id: number
  date: string
}

export const announcements: Announcement[] = [
  { id: 1, subject_id: 4, title_ar: 'اختبار الفصل الثاني — الأسبوع القادم', body_ar: 'سيُعقد اختبار الفصل الثاني يوم الثلاثاء القادم. يشمل الاختبار الوحدتين الثالثة والرابعة. تأكدوا من مراجعة التمارين في نهاية كل وحدة.', teacher_id: 1, date: '2026-03-26' },
  { id: 2, subject_id: 4, title_ar: 'تم رفع ملخص الوحدة الرابعة', body_ar: 'تجدون ملخصاً شاملاً للوحدة الرابعة في قسم المواد. يغطي الملخص جميع النقاط الأساسية للاختبار.', teacher_id: 1, date: '2026-03-24' },
  { id: 3, subject_id: 3, title_ar: 'موعد تسليم المقال — ٣١ مارس', body_ar: 'تذكير: آخر موعد لتسليم مقال "التغير المناخي وتأثيره على الشباب" هو ٣١ مارس. المقال لا يقل عن ٥٠٠ كلمة.', teacher_id: 2, date: '2026-03-25' },
  { id: 4, subject_id: 1, title_ar: 'رحلة ميدانية — المسجد الكبير', body_ar: 'ستُنظَّم رحلة تعليمية إلى المسجد الكبير بمسقط يوم الخميس القادم. يرجى الحصول على إذن ولي الأمر قبل يوم الأربعاء.', teacher_id: 3, date: '2026-03-23' },
  { id: 5, subject_id: 8, title_ar: 'تجربة عملية الأسبوع المقبل', body_ar: 'سنجري تجربة عملية حول DNA في مختبر الأحياء الأسبوع المقبل. ارتدوا المعطف المختبري وأحضروا دفاتر الملاحظات.', teacher_id: 4, date: '2026-03-22' },
  { id: 6, subject_id: 2, title_ar: 'تصحيح الاختبار التجريبي', body_ar: 'تم رفع نموذج الإجابة للاختبار التجريبي في قسم المواد. راجعوا إجاباتكم وتواصلوا معي في حال وجود استفسارات.', teacher_id: 6, date: '2026-03-20' },
]

// ─── ASSIGNMENTS ─────────────────────────────────────────────────────────────

export interface Assignment {
  id: number
  subject_id: number
  title_ar: string
  description_ar: string
  teacher_id: number
  due_date: string
  max_grade: number
  status: AssignmentStatus
  grade?: number
}

export const assignments: Assignment[] = [
  { id: 1, subject_id: 4, title_ar: 'حل التمارين ١ – ١٠ (الوحدة الرابعة)', description_ar: 'حل جميع تمارين الصفحات ٨٧–٩٢ من الكتاب المدرسي. يجب إرفاق الحل مكتوباً بخط واضح.', teacher_id: 1, due_date: '2026-04-02', max_grade: 10, status: 'pending' },
  { id: 2, subject_id: 3, title_ar: 'كتابة مقال — التغير المناخي', description_ar: 'اكتب مقالاً باللغة الإنجليزية لا يقل عن ٥٠٠ كلمة حول تأثير التغير المناخي على الشباب في عُمان.', teacher_id: 2, due_date: '2026-03-31', max_grade: 20, status: 'submitted' },
  { id: 3, subject_id: 1, title_ar: 'بحث حول أركان الإسلام', description_ar: 'أعدّ بحثاً موجزاً لا يزيد عن صفحتين حول أحد أركان الإسلام الخمسة مع توضيح أهميته في حياتنا.', teacher_id: 3, due_date: '2026-04-05', max_grade: 15, status: 'pending' },
  { id: 4, subject_id: 6, title_ar: 'مسائل الحركة والقوة', description_ar: 'حل مسائل الحركة المستقيمة المتسارعة في الورقة المرفقة. أظهر جميع خطوات الحل بوضوح.', teacher_id: 5, due_date: '2026-03-30', max_grade: 15, status: 'graded', grade: 13 },
  { id: 5, subject_id: 8, title_ar: 'ملخص الوحدة الثالثة — الجهاز الهضمي', description_ar: 'أعدّ ملخصاً للوحدة الثالثة يشمل: بنية الجهاز الهضمي، وظائفه، والأمراض الشائعة وطرق الوقاية.', teacher_id: 4, due_date: '2026-04-08', max_grade: 10, status: 'pending' },
  { id: 6, subject_id: 2, title_ar: 'تحليل قصيدة — المتنبي', description_ar: 'اختر قصيدة من ديوان المتنبي وحللها من حيث: المعنى، الصور البلاغية، والموسيقى الشعرية.', teacher_id: 6, due_date: '2026-03-28', max_grade: 20, status: 'submitted' },
]

// ─── MATERIALS ────────────────────────────────────────────────────────────────

export interface Material {
  id: number
  subject_id: number
  title_ar: string
  type: 'pdf' | 'video' | 'link' | 'doc'
  date: string
  size?: string
  duration?: string
}

export const materials: Material[] = [
  { id: 1,  subject_id: 4, title_ar: 'ملخص الوحدة الرابعة — المشتقات', type: 'pdf',   date: '2026-03-24', size: '2.4 MB' },
  { id: 2,  subject_id: 4, title_ar: 'شرح التكامل — فيديو تعليمي',     type: 'video', date: '2026-03-20', duration: '18 دقيقة' },
  { id: 3,  subject_id: 4, title_ar: 'ورقة عمل — تمارين المشتقات',     type: 'doc',   date: '2026-03-18', size: '1.1 MB' },
  { id: 4,  subject_id: 4, title_ar: 'نموذج اختبار سابق ٢٠٢٥',        type: 'pdf',   date: '2026-03-10', size: '3.2 MB' },
  { id: 5,  subject_id: 3, title_ar: 'Unit 5: Climate Change — Slides', type: 'pdf',   date: '2026-03-22', size: '5.1 MB' },
  { id: 6,  subject_id: 3, title_ar: 'Essay Writing Guide',             type: 'doc',   date: '2026-03-18', size: '0.8 MB' },
  { id: 7,  subject_id: 3, title_ar: 'Listening Practice — Track 3',    type: 'video', date: '2026-03-15', duration: '12 دقيقة' },
  { id: 8,  subject_id: 1, title_ar: 'العبادات وأحكامها — الدرس السادس', type: 'pdf', date: '2026-03-21', size: '1.8 MB' },
  { id: 9,  subject_id: 6, title_ar: 'قوانين نيوتن — شرح مفصل',        type: 'pdf',   date: '2026-03-19', size: '3.0 MB' },
  { id: 10, subject_id: 6, title_ar: 'تجربة المدفع — فيديو المختبر',   type: 'video', date: '2026-03-16', duration: '9 دقيقة' },
  { id: 11, subject_id: 8, title_ar: 'الجهاز الهضمي — رسوم تفاعلية',  type: 'link',  date: '2026-03-23' },
  { id: 12, subject_id: 8, title_ar: 'ملخص الوحدة الثالثة',            type: 'pdf',   date: '2026-03-17', size: '2.2 MB' },
  { id: 13, subject_id: 2, title_ar: 'ديوان المتنبي — مقتطفات مختارة', type: 'pdf',   date: '2026-03-15', size: '4.5 MB' },
  { id: 14, subject_id: 7, title_ar: 'جدول الدورية — الطبعة المحدّثة', type: 'pdf',   date: '2026-03-20', size: '1.5 MB' },
]

// ─── TEACHER CLASSES ─────────────────────────────────────────────────────────

export interface TeacherClass {
  id: number
  grade: Grade
  section: string
  subject_id: number
  student_count: number
}

export const teacherClasses: TeacherClass[] = [
  { id: 1, grade: 11, section: 'أ', subject_id: 4, student_count: 28 },
  { id: 2, grade: 11, section: 'ب', subject_id: 5, student_count: 30 },
  { id: 3, grade: 12, section: 'أ', subject_id: 4, student_count: 25 },
  { id: 4, grade: 12, section: 'ب', subject_id: 5, student_count: 27 },
  { id: 5, grade: 10, section: 'أ', subject_id: 5, student_count: 32 },
]

// ─── GRADE SUMMARY (for admin) ────────────────────────────────────────────────

export const gradeSummary = [
  { grade: 10, sections: ['أ', 'ب', 'ج'], student_count: 94, subject_count: 8 },
  { grade: 11, sections: ['أ', 'ب'], student_count: 62, subject_count: 11 },
  { grade: 12, sections: ['أ', 'ب'], student_count: 55, subject_count: 11 },
]

// Today's classes for Ahmed (Grade 11, based on Sunday schedule)
export const todaySchedule = studentTimetable[0].periods.filter(p => p.subject_id !== null)
