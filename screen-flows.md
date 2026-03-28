<!--
docs/screen-flows.md

Screen flow reference for the Arqam MVP frontend.
Defines every screen's purpose, content, actions, states, RTL rules,
and navigation flows. This is the spec frontend-engineer builds from.

Last updated: 2026-03-28
-->

# Arqam — Screen Flow Reference (MVP)

---

## Overview

This document is the authoritative UI specification for the Arqam MVP frontend. It covers every screen, every state, and every navigation path. Frontend-engineer must not build a screen that does not appear here, and must not add features beyond what is described.

**Tech stack reminders:**
- React + Vite + TypeScript
- Tailwind CSS — use `ms-`/`me-`/`ps-`/`pe-` for directional spacing; never `ml-`/`mr-`/`pl-`/`pr-`
- shadcn/ui component library
- `dir="rtl"` and `lang="ar"` set at the HTML root element
- JWT stored in memory (React context / Zustand). On page refresh, token is gone. User must re-login.
- API base path: `/api/v1`
- All user-facing copy is Arabic. No English-only labels in the UI.

**Role summary:**
- **Admin** — full access to all screens and actions
- **Teacher** — read access to most screens; can create and correct attendance records; cannot manage students, programs, courses, enrollments, or users

---

## 1. Application Shell

The persistent outer shell wraps every authenticated screen. It is not rendered on `/login`.

### 1.1 Layout Structure (RTL)

```
+------------------------------------------------------------------+
|  TOPBAR (right-to-left reading order)                            |
|  [Logo + App Name]  ........  [Username + Role Badge] [Logout]   |
|  (right side)                                 (left side)        |
+------------------------------------------------------------------+
|         |                                                        |
| SIDEBAR |                MAIN CONTENT AREA                       |
| (right) |                (fills remaining width)                 |
|         |                                                        |
| Nav     |                                                        |
| links   |                                                        |
| listed  |                                                        |
| top     |                                                        |
| to      |                                                        |
| bottom  |                                                        |
|         |                                                        |
+------------------------------------------------------------------+
```

The sidebar sits on the **right side** of the viewport. Content flows to the left. This is the correct RTL layout. Do not place the sidebar on the left.

### 1.2 Topbar

- **Right side:** Arqam logo + application name in Arabic (أرقم)
- **Left side:** Logged-in user's `full_name` (or `username` if `full_name` is null), a `Badge` showing their role (`مدير` for admin, `معلم` for teacher), and a Logout button
- Logout clears the in-memory token and redirects to `/login`
- The topbar is a fixed height, full width, with a subtle bottom border

### 1.3 Sidebar Navigation

Links in order (top to bottom):

| Arabic Label | Route | Admin | Teacher |
|---|---|---|---|
| لوحة التحكم | `/dashboard` | Yes | Yes |
| الطلاب | `/students` | Yes | Yes |
| البرامج | `/programs` | Yes | Yes |
| المقررات | `/courses` | Yes | Yes |
| التسجيلات | `/enrollments` | Yes | Yes |
| الحضور | `/attendance` | Yes | Yes |
| المستخدمون | `/users` | Yes | No (hidden) |

- The Users link is hidden entirely for teacher role — do not render it
- The active route is highlighted with a distinct background and a right-side accent border (RTL equivalent of a left-border active indicator)
- Use shadcn/ui `Button` with `variant="ghost"` for nav links, full-width, right-aligned text

### 1.4 Role Guard

All routes not accessible to a teacher must redirect to `/dashboard` on navigation attempt, with a toast notification: **"غير مصرح لك بالوصول إلى هذه الصفحة"**

This guard runs on the client. The backend will also enforce role restrictions — but the frontend must not silently allow navigation to admin-only screens.

### 1.5 Session Expiry

On any API response with HTTP 401:
- Clear the in-memory token
- Redirect to `/login`
- Show message on the login screen: **"انتهت الجلسة، يرجى تسجيل الدخول مجدداً"**

---

## 2. Authentication

### 2.1 Login Screen

**Route:** `/login`
**Role:** Public (no auth required)

**User goal:** Enter credentials and gain access to the application.

**Entry point:** Direct navigation, redirect after session expiry, redirect after logout.

**Layout:**
- Centered card on a neutral background, no sidebar, no topbar
- Arqam logo and institution name above the card
- Card contains: title ("تسجيل الدخول"), username field, password field, submit button
- Card width is fixed and centered — not full-width

**Content:**
- Field: `username` — label: "اسم المستخدم", type text, RTL input
- Field: `password` — label: "كلمة المرور", type password
- Submit button: "دخول" (primary, full-width within card)
- No "remember me" checkbox
- No "forgot password" link — not in MVP

**Actions:**
- Primary: Submit form → `POST /api/v1/auth/login`
- On success (`200`): store `access_token` in memory, redirect to `/dashboard`
- On `401`: show inline error below the form fields — **"بيانات الدخول غير صحيحة"** (do not clear the username field)
- On network error: show inline error — **"تعذّر الاتصال بالخادم، يرجى المحاولة مجدداً"**

**States:**
- Default: empty form, no errors
- Loading: submit button shows spinner, is disabled, fields are disabled
- Error 401: red inline error message below fields; fields remain editable
- Session-expired message: amber banner above the card, shown only when redirected from expiry

**RTL notes:**
- Form labels are right-aligned
- Input text flows right-to-left
- Submit button sits at the bottom of the card, full width

**Component guidance:**
- shadcn/ui `Card`, `Input`, `Label`, `Button`
- `Form` + `react-hook-form` for validation (both fields required)

**Flows to:** `/dashboard` on success

---

## 3. Dashboard

**Route:** `/dashboard`
**Role:** Admin and Teacher

**User goal:** Get a fast operational summary of the institution's current state and navigate quickly to frequent tasks.

**Entry point:** After login, sidebar nav link "لوحة التحكم".

**Content — Summary Cards (4 cards, displayed in a row, RTL order):**

Cards read right-to-left. Place the most important metric on the far right.

| Position (RTL) | Metric | Data Source | Visible to |
|---|---|---|---|
| 1st (rightmost) | إجمالي الطلاب النشطين | Count of students where `status=active` | Admin + Teacher |
| 2nd | إجمالي المقررات | Count of all courses | Admin + Teacher |
| 3rd | بانتظار المزامنة مع Moodle | Count of enrollments where `moodle_synced=false` | Admin only |
| 4th (leftmost) | جلسات الحضور اليوم | Count of distinct `session_date = today` attendance sessions | Admin + Teacher |

- The "بانتظار المزامنة" card is hidden entirely for teacher role — do not render it
- Each card shows: an Arabic label, a large numeric count, and a subtle icon
- Use Western numerals (123 not ١٢٣) for all counts at MVP — confirm with institution before changing
- Cards are not clickable links — they are display only

**Quick Actions (below cards):**

Three action buttons arranged in a row (RTL):

| Label | Target Route | Visible to |
|---|---|---|
| إضافة طالب | `/students/new` | Admin only |
| تسجيل الحضور | `/attendance/new` | Admin + Teacher |
| عرض التسجيلات | `/enrollments` | Admin + Teacher |

- Buttons not visible to a role are hidden, not disabled

**States:**
- Loading: skeleton loaders for all 4 cards (rectangular placeholder blocks)
- Error: inline error message within each failed card — "تعذّر تحميل البيانات"
- No empty state (counts can legitimately be zero — show 0)

**RTL notes:**
- Cards flow right to left in the row
- Quick action buttons flow right to left
- All text right-aligned

**Flows to:** `/students/new`, `/attendance/new`, `/enrollments`

---

## 4. Students Module

### 4.1 Student List

**Route:** `/students`
**Role:** Admin and Teacher

**User goal:** Browse all student records, filter by status or program, and navigate to individual students.

**Entry point:** Sidebar nav link "الطلاب".

**Content — Filter Bar (above table):**
- Dropdown: "الحالة" — options: الكل / نشط / موقوف / متخرج / منسحب (maps to: all / active / suspended / graduated / withdrawn)
- Dropdown: "البرنامج" — populated from `GET /api/v1/programs`, includes "الكل" option
- Filters apply on change (no separate apply button needed)
- Query params: `?status=active&program_id=2`

**Content — Table Columns (RTL column order, right to left):**

| Column | Data | Notes |
|---|---|---|
| رقم الهوية | `national_id` | |
| الاسم بالعربية | `name_ar` | Primary identifier, clickable link to student detail |
| البرنامج | Program `name_ar` | Show "غير مُعيَّن" if `program_id` is null |
| الحالة | `status` | `Badge` component: active=green, suspended=amber, graduated=blue, withdrawn=gray |
| حساب Moodle | `moodle_user_id` | Show checkmark icon if not null; show amber warning icon + "غير متزامن" if null |
| إجراءات | Row actions | See below |

**Row Actions:**
- Admin: "عرض" (view detail) + "تعديل" (edit — navigates to detail page in edit mode)
- Teacher: "عرض" only

**Admin actions (above table):**
- Button: "إضافة طالب" (primary) — navigates to `/students/new`

**Pagination:**
- Use shadcn/ui pagination component below the table
- Page size: 20 (default), use `?page=N&page_size=20`
- Show total count: "إجمالي الطلاب: 47"

**States:**
- Loading: skeleton rows (5 placeholder rows while data loads)
- Empty: "لا يوجد طلاب مسجَّلون" centered below the table header, with a brief description and (for admin) a link to add the first student
- Error: "تعذّر تحميل قائمة الطلاب" with a retry button

**RTL notes:**
- Table columns ordered right to left (رقم الهوية is the rightmost column)
- Row action buttons sit on the far left of each row
- Pagination controls are centered or left-aligned

**Component guidance:**
- shadcn/ui `DataTable` (built on TanStack Table)
- shadcn/ui `Badge` for status
- shadcn/ui `Select` for filter dropdowns

**Flows to:** `/students/:id` (view/edit), `/students/new`

---

### 4.2 Add Student

**Route:** `/students/new`
**Role:** Admin only (teacher is redirected with access-denied toast)

**User goal:** Register a new student in the institution's records.

**Entry point:** "إضافة طالب" button on Student List, Quick Actions on Dashboard.

**Layout:** Full-page form (not a modal — this has enough fields to warrant a dedicated page).

**Content — Form Fields:**

| Field | Label | Type | Required | Notes |
|---|---|---|---|---|
| `national_id` | رقم الهوية الوطنية | Text input | Yes | Omani national ID, max 20 chars |
| `name_ar` | الاسم الكامل بالعربية | Text input | Yes | Max 255 chars, RTL input |
| `name_en` | الاسم بالإنجليزية | Text input | No | Max 255 chars, LTR input with `dir="ltr"` |
| `phone` | رقم الهاتف | Text input | No | Max 20 chars |
| `email` | البريد الإلكتروني | Email input | No | |
| `program_id` | البرنامج | Select dropdown | No | Populated from `GET /api/v1/programs`; includes "بدون برنامج" as null option |

**Actions:**
- Primary: "حفظ" button (right side of button row in RTL)
- Secondary: "إلغاء" (navigates back to `/students`)

**On submit:** `POST /api/v1/students`
- On `201`: redirect to `/students/:id` (the newly created student), toast "تم إضافة الطالب بنجاح"
- On `409`: inline error below `national_id` field — **"رقم الهوية مستخدم مسبقاً"**
- On `422`: per-field validation errors displayed below each field
- On submit: button shows spinner, is disabled; fields remain visible

**Client-side validation (react-hook-form):**
- `national_id`: required, max 20 characters
- `name_ar`: required, max 255 characters
- `email`: valid email format if provided

**States:**
- Default: empty form
- Loading (programs dropdown): skeleton or spinner inside the select while programs load
- Submitting: spinner on save button, fields disabled
- Error: inline field errors in red below each field

**RTL notes:**
- All labels right-aligned, above their input
- "حفظ" button is on the right; "إلغاء" is to its left
- `name_en` field uses `dir="ltr"` on the input element itself — label is still RTL

**Component guidance:**
- shadcn/ui `Input`, `Label`, `Select`, `Button`
- `react-hook-form` for form state and validation

**Flows to:** `/students/:id` on success, `/students` on cancel

---

### 4.3 Student Detail / Edit

**Route:** `/students/:id`
**Role:** Admin and Teacher

**User goal:** View full student record, enrollment history, and (admin only) edit student information.

**Entry point:** Row action "عرض" or "تعديل" from Student List; redirect after creating a student.

**Layout:** Detail page with two sections — use shadcn/ui `Tabs` for the two sections.

**Tab 1: البيانات الشخصية (Personal Information)**

Displays all student fields. Admin can edit; Teacher sees read-only.

| Field | Display Label | Editable (Admin) |
|---|---|---|
| `national_id` | رقم الهوية الوطنية | No — always read-only |
| `name_ar` | الاسم بالعربية | Yes |
| `name_en` | الاسم بالإنجليزية | Yes |
| `phone` | رقم الهاتف | Yes |
| `email` | البريد الإلكتروني | Yes |
| `status` | الحالة | Yes — `Select` dropdown |
| `program_id` | البرنامج | Yes — `Select` dropdown |
| `moodle_user_id` | حساب Moodle | No — display only |

`moodle_user_id` display:
- If not null: show the numeric ID with a green checkmark — "مرتبط بـ Moodle (ID: 104)"
- If null: show amber warning icon — **"لم يتم إنشاء حساب Moodle بعد"** — This means enrollment has not yet triggered Moodle provisioning for this student

For Admin: "تعديل" button in the top-right area of the tab toggles the form between read-only and edit mode. In edit mode: "حفظ التعديلات" and "إلغاء" appear.

On save: `PATCH /api/v1/students/:id`
- On `200`: show toast "تم حفظ التعديلات بنجاح", return to read-only view
- On error: inline error message, form stays in edit mode

**Tab 2: سجل التسجيلات (Enrollment History)**

Table of all enrollments for this student. Calls `GET /api/v1/students/:id/enrollments`.

| Column | Data |
|---|---|
| المقرر | Course `name_ar` |
| الحالة | Enrollment `status` Badge: active=green, dropped=gray, completed=blue |
| Moodle | `moodle_synced` — checkmark or amber warning icon |
| تاريخ التسجيل | `enrolled_at` formatted as Arabic date (DD/MM/YYYY) |

- No actions in this table from the Student Detail view
- If empty: "لا توجد تسجيلات لهذا الطالب"

**States:**
- Loading: skeleton for both tabs
- Not found (`404`): full-page "الطالب غير موجود" with link back to student list

**RTL notes:**
- Tab labels right-to-left
- In edit mode: "حفظ التعديلات" on the right, "إلغاء" to its left
- `name_en` input uses `dir="ltr"` on the input element

**Flows to:** `/students` (via breadcrumb or back action)

---

## 5. Programs Module

### 5.1 Program List

**Route:** `/programs`
**Role:** Admin and Teacher

**User goal:** View all academic programs defined in the institution.

**Entry point:** Sidebar nav link "البرامج".

**Content — Table Columns (RTL order):**

| Column | Data |
|---|---|
| الاسم بالعربية | `name_ar` — primary display name |
| الاسم بالإنجليزية | `name_en` — show "—" if null |
| الوصف | `description` — truncate at 80 characters, show full on hover via tooltip |
| تاريخ الإنشاء | `created_at` formatted as DD/MM/YYYY |
| إجراءات | Row actions (admin only) |

**Admin actions (above table):**
- Button: "إضافة برنامج" → navigates to `/programs/new`

**Row Actions (admin only):**
- "تعديل" → navigates to `/programs/:id/edit`
- "حذف" → confirmation dialog before delete

Delete confirmation dialog:
- Title: "حذف البرنامج"
- Body: "هل أنت متأكد من حذف برنامج [name_ar]؟ لا يمكن التراجع عن هذا الإجراء."
- Confirm button: "حذف" (destructive/red variant)
- Cancel button: "إلغاء"
- On confirm: `DELETE /api/v1/programs/:id`
- On `409`: close dialog, show toast error — **"لا يمكن حذف البرنامج لأنه مرتبط بطلاب نشطين"**
- On `204`: remove row, show toast "تم حذف البرنامج"

**States:**
- Loading: skeleton rows
- Empty: "لا توجد برامج مُعرَّفة بعد" with add button (admin only)
- Error: "تعذّر تحميل البرامج" with retry

**Flows to:** `/programs/new`, `/programs/:id/edit`

---

### 5.2 Add / Edit Program

**Routes:** `/programs/new` (add) and `/programs/:id/edit` (edit)
**Role:** Admin only

**User goal:** Define a new academic program or update an existing one.

**Entry point:** "إضافة برنامج" button or row "تعديل" action.

**Content — Form Fields:**

| Field | Label | Type | Required |
|---|---|---|---|
| `name_ar` | الاسم بالعربية | Text input | Yes |
| `name_en` | الاسم بالإنجليزية | Text input | No |
| `description` | الوصف | Textarea | No |

**Actions:**
- Primary: "حفظ" (right side)
- Secondary: "إلغاء" → `/programs`

- Add: `POST /api/v1/programs` → on `201` redirect to `/programs`, toast "تم إضافة البرنامج"
- Edit: pre-fill form with existing values via `GET /api/v1/programs/:id`, then `PATCH /api/v1/programs/:id` → on `200` redirect to `/programs`, toast "تم حفظ التعديلات"

**States:**
- Edit mode loading: skeleton form while fetching program data
- Submitting: spinner on save, fields disabled

**Flows to:** `/programs`

---

## 6. Courses Module

### 6.1 Course List

**Route:** `/courses`
**Role:** Admin and Teacher

**User goal:** View all Moodle-synced courses and their Arqam program assignments.

**Entry point:** Sidebar nav link "المقررات".

**Content — Filter Bar:**
- Dropdown: "البرنامج" — filter by `program_id` (includes "الكل" option)

**Content — Table Columns (RTL order):**

| Column | Data |
|---|---|
| الاسم بالعربية | `name_ar` — show "بدون اسم" if null (can happen before sync) |
| الاسم بالإنجليزية | `name_en` |
| معرّف Moodle | `moodle_course_id` |
| البرنامج | Program `name_ar` — show **"غير مُعيَّن"** if `program_id` is null |
| آخر مزامنة | `synced_at` formatted as DD/MM/YYYY HH:MM — show "لم تتم المزامنة" if null |
| إجراءات | Admin only: "تعيين برنامج" |

**Admin actions (above table):**
- Button: "مزامنة المقررات" (Sync Courses) — triggers the sync flow (see 6.2)

**Row Action — "تعيين برنامج" (Admin only):**
- Opens an inline dropdown or small dialog to pick a program
- Sends `PATCH /api/v1/courses/:id` with `{"program_id": selectedId}` (or `null` to remove)
- On success: row updates, toast "تم تحديث البرنامج"

**States:**
- Loading: skeleton rows
- Empty: "لا توجد مقررات. ابدأ بمزامنة المقررات من Moodle." (admin) / "لا توجد مقررات متاحة" (teacher)
- Error: "تعذّر تحميل المقررات"

**Flows to:** `/courses/:id`

---

### 6.2 Sync Courses Flow (Admin only)

**Trigger:** "مزامنة المقررات" button on Course List

This is not a separate route — it is an inline async action from the Course List page.

**Flow:**

```
Admin clicks "مزامنة المقررات"
        |
        v
Button shows spinner, is disabled
"جارٍ المزامنة مع Moodle..." text shown near button
        |
        v
POST /api/v1/courses/sync
        |
        +---- Success (200) ----------------------------------------+
        |     Response: { synced: 45, created: 3, updated: 42 }     |
        |     Toast (green): "تمت المزامنة:                         |
        |       3 مقررات جديدة، 42 مقرراً محدَّثاً"                 |
        |     Table refreshes automatically                          |
        |                                                            |
        +---- Error (500 or network) --------------------------------+
              Toast (red): "فشلت المزامنة مع Moodle.
                تحقق من إعدادات الاتصال وأعد المحاولة."
              Button re-enabled
```

---

### 6.3 Course Detail

**Route:** `/courses/:id`
**Role:** Admin and Teacher

**User goal:** View a course's details and the students currently enrolled in it.

**Entry point:** Row click from Course List (name_ar is clickable).

**Content:**

Top section (course metadata):
- `name_ar`, `name_en`, `moodle_course_id`, assigned program, `synced_at`
- Admin: program assignment dropdown (inline edit, same as row action)

Bottom section (enrolled students):
- Table: student `name_ar`, `national_id`, enrollment `status` Badge, `enrolled_at`
- Calls `GET /api/v1/enrollments?course_id=:id&status=active`
- If empty: "لا يوجد طلاب مسجَّلون في هذا المقرر"

**Flows to:** `/students/:id` (via student name link), `/enrollments`

---

## 7. Enrollments Module

### 7.1 Enrollment List

**Route:** `/enrollments`
**Role:** Admin and Teacher

**User goal:** View all enrollments across the institution, identify unsynced records, and manage enrollment status.

**Entry point:** Sidebar nav link "التسجيلات", Quick Actions on Dashboard.

**Content — Filter Bar:**
- Dropdown: "المقرر" — populated from courses list
- Dropdown: "الطالب" — searchable, populated from students
- Dropdown: "الحالة" — options: الكل / نشط / متوقف / مكتمل
- Checkbox or toggle: "بانتظار المزامنة فقط" — when checked adds `?moodle_synced=false` to query

**Content — Table Columns (RTL order):**

| Column | Data |
|---|---|
| الطالب | Student `name_ar` — clickable to `/students/:id` |
| المقرر | Course `name_ar` |
| الحالة | Enrollment `status` Badge: active=green, dropped=gray, completed=blue |
| Moodle | `moodle_synced` — green checkmark if true; amber warning icon if false |
| تاريخ التسجيل | `enrolled_at` as DD/MM/YYYY |
| إجراءات | Admin only: see below |

**Row Actions (Admin only):**
- On rows where `moodle_synced=false`: "إعادة مزامنة" (retry icon button) — triggers 7.3 Retry Sync
- On rows where `status=active`: "إسقاط التسجيل" (drop) — triggers drop confirmation

Drop enrollment confirmation:
- Title: "إسقاط التسجيل"
- Body: "هل تريد إسقاط تسجيل [student name_ar] في مقرر [course name_ar]؟ سيتم إلغاء تسجيله في Moodle."
- Confirm: "إسقاط" (red/destructive)
- Cancel: "إلغاء"
- On confirm: `PATCH /api/v1/enrollments/:id` with `{"status": "dropped"}`
- On success: row status updates to "متوقف", toast "تم إسقاط التسجيل"
- On failure: toast error

**Admin actions (above table):**
- Button: "تسجيل طالب" → `/enrollments/new`

**States:**
- Loading: skeleton rows
- Empty (no filter): "لا توجد تسجيلات بعد"
- Empty (filtered): "لا توجد تسجيلات تطابق الفلاتر المحددة"
- Error: "تعذّر تحميل التسجيلات"

**moodle_synced=false visibility:**
Rows with `moodle_synced=false` must be visually distinct — use a subtle amber left border (in RTL: right border) on the row, in addition to the warning icon in the Moodle column.

**Flows to:** `/enrollments/new`, `/students/:id`

---

### 7.2 Enroll Student

**Route:** `/enrollments/new`
**Role:** Admin only

**User goal:** Register a student in a course and push that enrollment to Moodle.

**Entry point:** "تسجيل طالب" button on Enrollment List.

**Layout:** Dedicated page with a focused form (not a modal — the moodle_synced feedback after submission is important enough to warrant a full page).

**Content — Form Fields:**

| Field | Label | Type | Required | Notes |
|---|---|---|---|---|
| `student_id` | الطالب | Searchable Select | Yes | Search by name or national_id. Only students with `status=active` shown. |
| `course_id` | المقرر | Select | Yes | All courses available |

**Actions:**
- Primary: "تسجيل" (right side)
- Secondary: "إلغاء" → `/enrollments`

See flow diagram in Section 7.2.1 below.

**Error states:**
- `409`: inline error below the form — **"هذا الطالب مسجَّل مسبقاً في هذا المقرر"**
- `400` (student not enrollable): inline error — **"لا يمكن تسجيل هذا الطالب. تحقق من حالة الطالب."**
- `404`: inline error — **"لم يتم العثور على الطالب أو المقرر المحدد"**

**Moodle sync result after success:**

After `201` response, check `moodle_synced` in the response:
- If `moodle_synced=true`: redirect to `/enrollments`, toast "تم التسجيل بنجاح وتمت المزامنة مع Moodle"
- If `moodle_synced=false`: **stay on this page**, show prominent amber warning banner:

  > **"تم التسجيل في أرقم، لكن تعذّرت المزامنة مع Moodle. سيتم إعادة المحاولة يدوياً من قائمة التسجيلات."**

  Below the banner: two buttons — "عرض التسجيلات" (go to enrollment list) and "تسجيل طالب آخر" (clear form and start over)

**States:**
- Loading (student/course data): skeleton within select fields
- Submitting: spinner on button, fields disabled

**Flows to:** `/enrollments` on success or user action

---

#### 7.2.1 Enroll Student Flow Diagram

```
Admin navigates to /enrollments/new
            |
            v
  Select student (searchable dropdown)
  Select course (dropdown)
            |
            v
  Click "تسجيل"
            |
            v
  Client-side validation
  (both fields required)
            |
     [validation fails]----------> Inline field errors shown
            |                      Form stays open
     [validation passes]
            |
            v
  POST /api/v1/enrollments
  { student_id, course_id }
  Button: spinner + disabled
            |
     +------+------+
     |             |
  [201]         [4xx / 5xx]
     |             |
     v             v
  Check        Show inline error
  moodle_synced  (409 / 400 / 404)
  in response    Form stays open
     |
     +------+------------------+
     |                         |
  [moodle_synced=true]    [moodle_synced=false]
     |                         |
     v                         v
  Redirect to             Stay on page
  /enrollments            Show amber warning banner:
  Toast (green):          "تم التسجيل، لكن تعذّرت
  "تم التسجيل             المزامنة مع Moodle"
  بنجاح"                  Show: "عرض التسجيلات"
                          and "تسجيل طالب آخر"
```

---

### 7.3 Retry Moodle Sync (Admin only)

**No dedicated route.** Triggered from the Enrollment List row action "إعادة مزامنة".

**Flow:**

```
Admin clicks retry icon on a row where moodle_synced=false
            |
            v
  Confirmation dialog (shadcn/ui Dialog):
  Title: "إعادة محاولة المزامنة"
  Body:  "هل تريد إعادة محاولة مزامنة تسجيل
          [student name] في مقرر [course name] مع Moodle؟"
  Confirm: "إعادة المحاولة"
  Cancel: "إلغاء"
            |
     [Cancel]-----------> Dialog closes, no change
            |
     [Confirm]
            |
            v
  POST /api/v1/enrollments/:id/sync
  Dialog shows loading state
            |
     +------+------+
     |             |
  [200]         [error]
  moodle_synced   |
  = true in resp  v
     |          Toast (red):
     v          "فشلت المزامنة مجدداً.
  Dialog closes  تحقق من إعدادات Moodle
  Row updates    وأعد المحاولة لاحقاً."
  (warning icon  Dialog closes
  replaced with
  checkmark)
  Toast (green):
  "تمت المزامنة بنجاح"
```

---

## 8. Attendance Module

### 8.1 Attendance List

**Route:** `/attendance`
**Role:** Admin and Teacher

**User goal:** Review attendance records across courses and dates; navigate to a specific session to correct records.

**Entry point:** Sidebar nav link "الحضور".

**Content — Filter Bar:**
- Dropdown: "المقرر" — filter by `course_id`
- Searchable Select: "الطالب" — filter by `student_id`
- Date picker: "التاريخ" — filter by `session_date` (Arabic format display: DD/MM/YYYY)

**Content — Table Columns (RTL order):**

| Column | Data |
|---|---|
| المقرر | Course `name_ar` |
| الطالب | Student `name_ar` |
| تاريخ الجلسة | `session_date` as DD/MM/YYYY |
| الحالة | `status` Badge — see color coding below |
| ملاحظة | `note` — truncated to 50 chars, show "—" if null |
| سُجِّل بواسطة | `marked_by` user's `full_name` or `username` |
| إجراءات | "تعديل" link |

**Attendance status badge colors:**
- `present` (حاضر): green
- `absent` (غائب): red
- `late` (متأخر): amber
- `excused` (بعذر): blue

**Row Action — "تعديل":**
- Admin and Teacher: navigates to `/attendance/:id/edit`

**States:**
- Loading: skeleton rows
- Empty: "لا توجد سجلات حضور تطابق الفلاتر المحددة"
- Error: "تعذّر تحميل سجلات الحضور"

**Flows to:** `/attendance/new`, `/attendance/:id/edit`

---

### 8.2 Record Attendance

**Route:** `/attendance/new`
**Role:** Admin and Teacher

**User goal:** Mark attendance for all students in a course for a specific class session.

**Entry point:** "تسجيل الحضور" button — Sidebar nav link on Attendance List, Quick Actions on Dashboard.

**Layout:** This is a two-step flow. Step 1 selects the session; Step 2 is the attendance sheet.

See flow diagram in Section 8.2.1 below.

**Step 1 — اختيار المقرر والتاريخ (Select Course and Date)**

Fields:
- Dropdown: "المقرر" — required, select from all available courses
- Date picker: "تاريخ الجلسة" — required, defaults to today, Arabic locale, DD/MM/YYYY display

After both fields are selected, the UI checks whether attendance already exists for this combination:
- `GET /api/v1/attendance?course_id=X&date=YYYY-MM-DD`
- If records exist (count > 0): show amber warning banner below the fields:
  **"تم تسجيل الحضور لهذه الجلسة مسبقاً. يمكنك تعديل السجلات الموجودة من قائمة الحضور."**
  Show a "عرض السجلات الموجودة" link. Do not proceed to Step 2 in this case.
- If no records exist: show "متابعة" button to proceed to Step 2

**Step 2 — ورقة الحضور (Attendance Sheet)**

This step shows the full attendance sheet for the selected session.

Header (above the table):
- Course name (right side) + session date in Arabic format (left side)
- Bulk action button: **"تحديد الكل حاضر"** — sets all rows' status to `present`

Table — one row per actively enrolled student:
- Calls `GET /api/v1/enrollments?course_id=X&status=active` to get the student list
- No pagination on this table — show all enrolled students on one page (teachers need the full class list visible at once)

| Column | Data / Control |
|---|---|
| الاسم | Student `name_ar` |
| رقم الهوية | Student `national_id` |
| الحالة | Radio button group or Select per row: حاضر / غائب / متأخر / بعذر (default: حاضر) |
| ملاحظة | Text input (optional), placeholder: "ملاحظة..." |

Interaction rules:
- Default status for all rows on page load: `present` (حاضر)
- "تحديد الكل حاضر" resets all status selects to `present`
- Individual rows can be changed after bulk action
- Note field is optional; cleared when status is reset to present via bulk action

Submit:
- Button: "حفظ الحضور" (primary, fixed at bottom of page or sticky footer on tablet)
- Sends `POST /api/v1/attendance` with full `records` array
- On `201`: redirect to `/attendance`, toast "تم حفظ سجلات الحضور بنجاح (X طالباً)"
- On `409`: show inline error — **"تم تسجيل الحضور لهذه الجلسة مسبقاً. استخدم التعديل لتصحيح السجلات."**
- On `400` (student not enrolled): show inline error with affected student names — **"بعض الطلاب غير مسجَّلين بشكل نشط في هذا المقرر"**
- On submit: button shows spinner, table is non-interactive

Back navigation:
- "رجوع" link at top returns to Step 1 without submitting

**States:**
- Step 1 — loading course list: spinner in course dropdown
- Step 2 — loading students: skeleton rows while enrollment list loads
- Step 2 — empty (no active enrollments): "لا يوجد طلاب مسجَّلون بشكل نشط في هذا المقرر"

**Tablet considerations:**
- The attendance sheet table must be readable and operable on a tablet screen
- Status select per row: use a compact `Select` (not radio buttons) on narrow viewports
- "حفظ الحضور" button is sticky at the bottom of the viewport on tablet

**RTL notes:**
- All table columns RTL order: الاسم rightmost, ملاحظة leftmost
- "حفظ الحضور" is on the right in the button row; "رجوع" to its left

**Flows to:** `/attendance` on success or via back navigation

---

#### 8.2.1 Record Attendance Flow Diagram

```
Admin or Teacher navigates to /attendance/new
              |
              v
  STEP 1: Select course + session_date
              |
              v
  Both fields filled?
              |
       [No]---> Wait (button disabled)
              |
       [Yes]
              |
              v
  GET /api/v1/attendance?course_id=X&date=Y
  Check if attendance already recorded
              |
     +--------+--------+
     |                 |
  [Records exist]  [No records]
     |                 |
     v                 v
  Amber warning    Show "متابعة" button
  "تم تسجيل        |
  الحضور مسبقاً"   v
  Link to view    STEP 2: Load attendance sheet
  existing recs   GET /api/v1/enrollments
                  ?course_id=X&status=active
                       |
                  [Loading] --> skeleton rows
                       |
                  [Loaded] --> table of students
                  All rows default to: حاضر
                       |
                  Teacher adjusts statuses
                  and notes per student
                       |
                  Click "حفظ الحضور"
                       |
                       v
                  POST /api/v1/attendance
                  { course_id, session_date,
                    records: [...] }
                       |
              +--------+--------+
              |                 |
           [201]           [409 / 400]
              |                 |
              v                 v
        Redirect to       Inline error shown
        /attendance       Table stays open
        Toast (green):    Admin corrects and
        "تم حفظ           retries
        الحضور بنجاح"
```

---

### 8.3 Correct Attendance Record

**Route:** `/attendance/:id/edit`
**Role:** Admin and Teacher

**User goal:** Correct a previously submitted attendance status or note for a single student record.

**Entry point:** "تعديل" row action from Attendance List.

**Layout:** Focused edit form — not a full table. Shows the record context at the top (course, student, date) as read-only, with only the editable fields below.

**Content (read-only context):**
- المقرر: course `name_ar`
- الطالب: student `name_ar`
- التاريخ: `session_date` formatted DD/MM/YYYY
- سُجِّل بواسطة: `marked_by` user's display name, `created_at` timestamp

**Content (editable fields):**

| Field | Label | Type | Required |
|---|---|---|---|
| `status` | الحالة الجديدة | Select: حاضر / غائب / متأخر / بعذر | Yes |
| `note` | ملاحظة | Textarea | No |

**Actions:**
- Primary: "حفظ التعديل" (right side)
- Secondary: "إلغاء" → back to `/attendance`

On submit: `PATCH /api/v1/attendance/:id`
- On `200`: redirect to `/attendance`, toast "تم حفظ التعديل بنجاح"
- On `404`: "السجل غير موجود" — redirect to `/attendance`

**Note about `marked_by`:** The API automatically updates `marked_by` to the current user on PATCH. The UI does not need to send this field — it is inferred from the JWT.

**States:**
- Loading: skeleton for context fields while fetching attendance record
- Submitting: spinner on save button, fields disabled
- Not found: redirect to `/attendance` with toast "السجل غير موجود"

**Flows to:** `/attendance`

---

## 9. Users Module (Admin only)

All Users module screens redirect Teacher role to `/dashboard` with access-denied toast.

### 9.1 User List

**Route:** `/users`
**Role:** Admin only

**User goal:** View and manage Arqam system accounts for admins and teachers.

**Entry point:** Sidebar nav link "المستخدمون".

**Content — Filter Bar:**
- Dropdown: "الدور" — options: الكل / مدير / معلم (all / admin / teacher)

**Content — Table Columns (RTL order):**

| Column | Data | Notes |
|---|---|---|
| اسم المستخدم | `username` | |
| الاسم الكامل | `full_name` | Show "—" if null |
| البريد الإلكتروني | `email` | Show "—" if null |
| الدور | `role` | Badge: admin=blue, teacher=green |
| الحالة | `is_active` | Active: no indicator (normal); Inactive: entire row uses muted/gray text style with strikethrough on `username` |
| إجراءات | "تعديل" action | |

**Admin actions (above table):**
- Button: "إضافة مستخدم" → `/users/new`

**Deactivated users:** Shown in the table with a muted visual treatment (gray text, no bold). They are not hidden — admins need to see the full account history. Add a subtle `is_active=false` badge ("غير نشط") in the status column.

**States:**
- Loading: skeleton rows
- Empty: "لا يوجد مستخدمون مسجَّلون"
- Error: "تعذّر تحميل قائمة المستخدمين"

**Flows to:** `/users/new`, `/users/:id/edit`

---

### 9.2 Add User

**Route:** `/users/new`
**Role:** Admin only

**User goal:** Create a new admin or teacher account.

**Entry point:** "إضافة مستخدم" button on User List.

**Content — Form Fields:**

| Field | Label | Type | Required | Notes |
|---|---|---|---|---|
| `username` | اسم المستخدم | Text input | Yes | Max 150 chars, Latin chars recommended |
| `password` | كلمة المرور | Password input | Yes | Show strength indicator if possible |
| `full_name` | الاسم الكامل | Text input | No | Arabic or Latin |
| `email` | البريد الإلكتروني | Email input | No | Must be unique if provided |
| `role` | الدور | Select: مدير / معلم | Yes | Cannot select "طالب" — not exposed in UI |

**Actions:**
- Primary: "إنشاء حساب" (right side)
- Secondary: "إلغاء" → `/users`

On submit: `POST /api/v1/users`
- On `201`: redirect to `/users`, toast "تم إنشاء الحساب بنجاح"
- On `409`: inline error — **"اسم المستخدم أو البريد الإلكتروني مستخدم مسبقاً"**

**States:**
- Submitting: spinner on button, fields disabled

**Flows to:** `/users`

---

### 9.3 Edit User

**Route:** `/users/:id/edit`
**Role:** Admin only

**User goal:** Update a user's details or deactivate their account.

**Entry point:** "تعديل" row action from User List.

**Content — Form Fields (pre-filled from `GET /api/v1/users/:id`):**

| Field | Label | Type | Editable |
|---|---|---|---|
| `username` | اسم المستخدم | Text (read-only display) | No — cannot change username |
| `full_name` | الاسم الكامل | Text input | Yes |
| `email` | البريد الإلكتروني | Email input | Yes |
| `password` | كلمة المرور الجديدة | Password input | Yes — leave blank to keep current password |

Note for password field: show helper text below — "اتركه فارغاً إذا لم ترد تغيير كلمة المرور"

**Actions:**
- Primary: "حفظ التعديلات" (right side)
- Secondary: "إلغاء" → `/users`
- Destructive: "تعطيل الحساب" — shown separately, below the form, with a visual separator and a different button style (outline red)

Deactivate confirmation dialog:
- Title: "تعطيل الحساب"
- Body: "هل أنت متأكد من تعطيل حساب [username]؟ لن يتمكن هذا المستخدم من تسجيل الدخول. يمكن التراجع عن ذلك لاحقاً."
- Confirm: "تعطيل" (red)
- Cancel: "إلغاء"
- On confirm: `DELETE /api/v1/users/:id`
- On `204`: redirect to `/users`, toast "تم تعطيل الحساب"

On save: `PATCH /api/v1/users/:id`
- Send only the fields that changed (omit password if blank)
- On `200`: redirect to `/users`, toast "تم حفظ التعديلات"
- On `409`: inline error — **"البريد الإلكتروني مستخدم من قِبَل حساب آخر"**

**States:**
- Loading: skeleton form while fetching user data
- Submitting: spinner on save button, fields disabled
- Not found (`404`): redirect to `/users` with toast "المستخدم غير موجود"

**Flows to:** `/users`

---

## 10. Global UX Patterns

This section specifies patterns that apply across all screens. Frontend-engineer must implement these consistently — do not invent alternative patterns screen-by-screen.

### 10.1 Loading States

| Context | Pattern |
|---|---|
| Tables | Skeleton rows — render 5 gray placeholder rows at the same height as real rows |
| Form (edit mode, loading existing data) | Skeleton for each form field — gray block at the same size as the input |
| Single stat cards (dashboard) | Gray rectangular block at the card's full dimensions |
| Dropdowns (loading options) | Spinner inside the select, options disabled |
| Action buttons (submitting) | Replace button label with a spinner; keep button width stable; disable the button |

Use shadcn/ui `Skeleton` component for all skeleton states.

### 10.2 Toast Notifications

Use shadcn/ui `Sonner` (or the shadcn/ui toast system). All toasts appear at **top-start** (which in RTL is the top-right of the viewport).

| Type | Color | When |
|---|---|---|
| Success | Green | Record created, saved, deleted, synced successfully |
| Error | Red | API errors, sync failures, unexpected errors |
| Warning | Amber | Moodle sync failed (but Arqam operation succeeded), session already recorded |

Toasts auto-dismiss after 5 seconds. Errors persist until manually dismissed.

### 10.3 Confirmation Dialogs

Use shadcn/ui `Dialog` for all destructive actions. Never use the browser's `window.confirm`.

Required for:
- Deleting a program
- Dropping an enrollment
- Deactivating a user account
- Retrying a Moodle sync

Dialog structure:
- Title (Arabic, bold)
- Body copy explaining consequences
- Two buttons: destructive action (right in RTL) and "إلغاء" (to its left)
- Loading state on the confirm button after click (spinner, disabled) while API call is in flight

### 10.4 Empty States

Every table must have an Arabic empty state message. Generic empty states are not acceptable.

| Screen | Empty state copy |
|---|---|
| Student List | لا يوجد طلاب مسجَّلون |
| Student List (filtered) | لا يوجد طلاب يطابقون الفلاتر المحددة |
| Program List | لا توجد برامج مُعرَّفة بعد |
| Course List | لا توجد مقررات. ابدأ بمزامنة المقررات من Moodle. |
| Enrollment List | لا توجد تسجيلات بعد |
| Enrollment List (filtered) | لا توجد تسجيلات تطابق الفلاتر المحددة |
| Attendance List | لا توجد سجلات حضور |
| Student enrollment history | لا توجد تسجيلات لهذا الطالب |
| Course detail — enrolled students | لا يوجد طلاب مسجَّلون في هذا المقرر |
| User List | لا يوجد مستخدمون مسجَّلون |
| Attendance sheet (no active enrollments) | لا يوجد طلاب مسجَّلون بشكل نشط في هذا المقرر |

For admin users, empty states on list screens should include the primary action button to add the first record (where applicable).

### 10.5 Form Validation

- Use `react-hook-form` for all form state management
- Validate on submit, not on blur (less disruptive for admin users)
- Display error messages in red below the relevant field
- Arabic error messages — do not use English validation messages

Common validation messages:

| Situation | Message |
|---|---|
| Required field empty | "هذا الحقل مطلوب" |
| Invalid email format | "يرجى إدخال بريد إلكتروني صحيح" |
| Field too long | "يجب ألا يتجاوز [N] حرفاً" |
| Duplicate (409 from API) | Specific message per field (see each screen) |

### 10.6 moodle_synced=false Visual Indicator

The `moodle_synced=false` state must be surfaced consistently throughout the UI. Use these conventions everywhere:

- Icon: amber triangle warning icon (Lucide `TriangleAlert`)
- Text accompaniment: "غير متزامن" next to the icon
- Row highlight: subtle amber right-border (RTL) on table rows with `moodle_synced=false`
- Do not hide or minimize this — admins must notice unsynced records without searching for them

Locations where this applies:
- Enrollment List — per row
- Student Detail — enrollment history tab
- Dashboard card — total count of unsynced enrollments

### 10.7 Date Display

- All dates displayed in the UI use **DD/MM/YYYY** format (e.g., 28/03/2026)
- Date-time values show **DD/MM/YYYY HH:MM** (24-hour clock)
- Date picker uses Arabic locale month names
- API sends and receives dates as ISO 8601: `YYYY-MM-DD` for dates, `YYYY-MM-DDTHH:MM:SSZ` for datetimes
- The frontend is responsible for formatting API dates for display

### 10.8 Numerals

Use Western Arabic numerals (0–9) throughout the UI at MVP. Do not use Eastern Arabic numerals (٠١٢٣) in data displays or inputs. Confirm with the institution before changing this default.

### 10.9 Role Guard Implementation

Implement a `RequireAdmin` wrapper component that:
1. Reads the current user's role from auth context
2. If role is not `admin`: navigates to `/dashboard` and shows the access-denied toast
3. If role is `admin`: renders `children`

Use this wrapper on all admin-only routes in the React Router configuration.

### 10.10 API Client

All API calls go through `src/lib/api.ts`. No component calls `fetch()` directly.

The API client must:
- Attach the `Authorization: Bearer <token>` header on every request
- On `401` response: clear the token from memory, redirect to `/login`, show session-expired message
- On `403` response: show access-denied toast, do not redirect
- On `5xx` response: show generic error toast — **"حدث خطأ في الخادم. يرجى المحاولة مجدداً."**

---

## Appendix A — Route Summary

| Route | Component | Admin | Teacher |
|---|---|---|---|
| `/login` | LoginPage | Yes | Yes |
| `/dashboard` | DashboardPage | Yes | Yes |
| `/students` | StudentListPage | Yes | Yes |
| `/students/new` | StudentFormPage | Yes | Redirect |
| `/students/:id` | StudentDetailPage | Yes | Yes |
| `/programs` | ProgramListPage | Yes | Yes |
| `/programs/new` | ProgramFormPage | Yes | Redirect |
| `/programs/:id/edit` | ProgramFormPage | Yes | Redirect |
| `/courses` | CourseListPage | Yes | Yes |
| `/courses/:id` | CourseDetailPage | Yes | Yes |
| `/enrollments` | EnrollmentListPage | Yes | Yes |
| `/enrollments/new` | EnrollmentFormPage | Yes | Redirect |
| `/attendance` | AttendanceListPage | Yes | Yes |
| `/attendance/new` | AttendanceFormPage | Yes | Yes |
| `/attendance/:id/edit` | AttendanceCorrectionPage | Yes | Yes |
| `/users` | UserListPage | Yes | Redirect |
| `/users/new` | UserFormPage | Yes | Redirect |
| `/users/:id/edit` | UserFormPage | Yes | Redirect |

---

## Appendix B — shadcn/ui Component Map

| UI Pattern | shadcn/ui Component |
|---|---|
| All list/data tables | `DataTable` (TanStack Table wrapper) |
| Modal forms and confirmations | `Dialog` |
| Status indicators (student, enrollment, attendance) | `Badge` |
| Dropdown filters and form selects | `Select` |
| Searchable student/course pickers | `Combobox` |
| Date inputs | `DatePicker` (Calendar + Popover) |
| Detail pages with multiple sections | `Tabs` |
| Loading placeholders | `Skeleton` |
| Toast notifications | `Sonner` |
| Destructive action buttons | `Button` with `variant="destructive"` |
| Inline form fields | `Input`, `Textarea`, `Label` |
| Form state and validation | `react-hook-form` with `zodResolver` |
| Tooltips (truncated content) | `Tooltip` |

---

## Appendix C — API Endpoints Reference (Quick Lookup)

| Screen Action | Method | Endpoint |
|---|---|---|
| Login | POST | `/api/v1/auth/login` |
| List students | GET | `/api/v1/students` |
| Create student | POST | `/api/v1/students` |
| Get student | GET | `/api/v1/students/:id` |
| Update student | PATCH | `/api/v1/students/:id` |
| Student enrollments | GET | `/api/v1/students/:id/enrollments` |
| List programs | GET | `/api/v1/programs` |
| Create program | POST | `/api/v1/programs` |
| Update program | PATCH | `/api/v1/programs/:id` |
| Delete program | DELETE | `/api/v1/programs/:id` |
| List courses | GET | `/api/v1/courses` |
| Get course | GET | `/api/v1/courses/:id` |
| Update course program | PATCH | `/api/v1/courses/:id` |
| Sync courses from Moodle | POST | `/api/v1/courses/sync` |
| List enrollments | GET | `/api/v1/enrollments` |
| Create enrollment | POST | `/api/v1/enrollments` |
| Update enrollment status | PATCH | `/api/v1/enrollments/:id` |
| Retry Moodle sync | POST | `/api/v1/enrollments/:id/sync` |
| List attendance | GET | `/api/v1/attendance` |
| Record attendance (bulk) | POST | `/api/v1/attendance` |
| Get attendance record | GET | `/api/v1/attendance/:id` |
| Correct attendance record | PATCH | `/api/v1/attendance/:id` |
| List users | GET | `/api/v1/users` |
| Create user | POST | `/api/v1/users` |
| Get user | GET | `/api/v1/users/:id` |
| Update user | PATCH | `/api/v1/users/:id` |
| Deactivate user | DELETE | `/api/v1/users/:id` |
