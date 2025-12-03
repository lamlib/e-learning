# API-UI Mapping Document

## Tài liệu mapping giữa API Endpoints và UI Components/Pages

**Version:** 1.0.0  
**Date:** 2024  
**Author:** Development Team

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication APIs](#authentication-apis)
3. [User Management APIs](#user-management-apis)
4. [Course APIs](#course-apis)
5. [Lecture APIs](#lecture-apis)
6. [Exercise APIs](#exercise-apis)
7. [Student APIs](#student-apis)
8. [Teacher APIs](#teacher-apis)
9. [Subject APIs](#subject-apis)
10. [News APIs](#news-apis)
11. [FAQ APIs](#faq-apis)
12. [Comment APIs](#comment-apis)
13. [Search APIs](#search-apis)
14. [Dashboard APIs](#dashboard-apis)
15. [Data Flow Diagrams](#data-flow-diagrams)

---

## Overview

Tài liệu này mô tả mối quan hệ giữa các API endpoints và UI components/pages trong hệ thống E-learning. Mỗi API endpoint được map với:
- **Pages** sử dụng API
- **Components** sử dụng API
- **Data Flow** từ API đến UI
- **Usage Context** - Khi nào và cách sử dụng

---

## Authentication APIs

### POST /auth/login

| Aspect | Details |
|--------|---------|
| **Method** | POST |
| **Purpose** | Đăng nhập vào hệ thống |
| **Used by Page** | Login |
| **Used by Components** | LoginForm |
| **Request Data** | `{ email: string, password: string }` |
| **Response Data** | `{ access_token: string, token_type: string, user: User }` |
| **Data Flow** | `LoginForm → POST /auth/login → Store token → Navigate to Dashboard` |
| **Usage Context** | User nhập email/password và click "Đăng nhập" |
| **Error Handling** | Hiển thị error message trong LoginForm nếu 401 |

### POST /auth/register

| Aspect | Details |
|--------|---------|
| **Method** | POST |
| **Purpose** | Đăng ký tài khoản mới |
| **Used by Page** | Register |
| **Used by Components** | RegisterForm |
| **Request Data** | `{ name: string, email: string, password: string, password_confirmation: string, phone?: string }` |
| **Response Data** | `{ user: User, message: string }` |
| **Data Flow** | `RegisterForm → POST /auth/register → Show success → Navigate to Login` |
| **Usage Context** | User điền form đăng ký và submit |
| **Error Handling** | Hiển thị validation errors trong RegisterForm nếu 400 |

### POST /auth/change-password

| Aspect | Details |
|--------|---------|
| **Method** | POST |
| **Purpose** | Thay đổi mật khẩu |
| **Used by Page** | Profile |
| **Used by Components** | PasswordChangeForm |
| **Request Data** | `{ old_password: string, new_password: string, new_password_confirmation: string }` |
| **Response Data** | `{ message: string }` |
| **Data Flow** | `PasswordChangeForm → POST /auth/change-password → Show success message` |
| **Usage Context** | User muốn đổi mật khẩu trong trang Profile |
| **Error Handling** | Hiển thị error nếu mật khẩu cũ không đúng (400) |

### POST /auth/reset-password

| Aspect | Details |
|--------|---------|
| **Method** | POST |
| **Purpose** | Gửi email reset password |
| **Used by Page** | ResetPassword (nếu có) |
| **Used by Components** | PasswordResetForm |
| **Request Data** | `{ email: string }` |
| **Response Data** | `{ message: string }` |
| **Data Flow** | `PasswordResetForm → POST /auth/reset-password → Show success message` |
| **Usage Context** | User quên mật khẩu, nhập email để nhận link reset |
| **Error Handling** | Hiển thị error nếu email không tồn tại |

---

## User Management APIs

### GET /users/profile

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy thông tin cá nhân của user hiện tại |
| **Used by Page** | Profile |
| **Used by Components** | ProfileForm, Header |
| **Request Data** | None (sử dụng token từ header) |
| **Response Data** | `User` object |
| **Data Flow** | `Profile page mount → GET /users/profile → ProfileForm (populate form)` |
| **Usage Context** | Load thông tin user khi vào trang Profile, hoặc load user info cho Header |
| **Error Handling** | Redirect to login nếu 401 |

### PUT /users/profile

| Aspect | Details |
|--------|---------|
| **Method** | PUT |
| **Purpose** | Cập nhật thông tin cá nhân |
| **Used by Page** | Profile |
| **Used by Components** | ProfileForm |
| **Request Data** | `{ name?: string, phone?: string, avatar?: string, bio?: string }` |
| **Response Data** | `User` object |
| **Data Flow** | `ProfileForm submit → PUT /users/profile → Update local state → Show success` |
| **Usage Context** | User cập nhật thông tin trong ProfileForm và submit |
| **Error Handling** | Hiển thị validation errors nếu 400 |

---

## Admin - User Management APIs

### GET /admin/users

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách tất cả người dùng (Admin only) |
| **Used by Page** | Admin - User Management |
| **Used by Components** | UserTable, SearchBar, FilterPanel, Pagination |
| **Request Data** | Query params: `page`, `limit`, `search`, `role` |
| **Response Data** | `{ data: User[], pagination: Pagination }` |
| **Data Flow** | `UserTable mount → GET /admin/users?page=1&limit=10 → Render UserCard[]` |
| **Usage Context** | Admin xem danh sách users, có thể filter theo role, search theo tên/email |
| **Error Handling** | Show error message nếu không có quyền (403) |

### POST /admin/users

| Aspect | Details |
|--------|---------|
| **Method** | POST |
| **Purpose** | Tạo người dùng mới (Admin only) |
| **Used by Page** | Admin - User Management |
| **Used by Components** | UserForm (modal) |
| **Request Data** | `{ name: string, email: string, password: string, role: string, phone?: string }` |
| **Response Data** | `User` object |
| **Data Flow** | `UserForm submit → POST /admin/users → Refresh UserTable → Close modal` |
| **Usage Context** | Admin click "Tạo mới" → Mở UserForm modal → Submit |
| **Error Handling** | Hiển thị validation errors trong UserForm |

### GET /admin/users/{id}

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy thông tin chi tiết một người dùng |
| **Used by Page** | Admin - User Management |
| **Used by Components** | UserForm (modal - edit mode) |
| **Request Data** | Path param: `id` |
| **Response Data** | `User` object |
| **Data Flow** | `Click edit user → GET /admin/users/{id} → Populate UserForm` |
| **Usage Context** | Admin click "Sửa" trên một user trong UserTable |
| **Error Handling** | Show error nếu user không tồn tại (404) |

### PUT /admin/users/{id}

| Aspect | Details |
|--------|---------|
| **Method** | PUT |
| **Purpose** | Cập nhật thông tin người dùng |
| **Used by Page** | Admin - User Management |
| **Used by Components** | UserForm (modal) |
| **Request Data** | Path param: `id`, Body: `{ name?: string, email?: string, role?: string, phone?: string }` |
| **Response Data** | `User` object |
| **Data Flow** | `UserForm submit → PUT /admin/users/{id} → Refresh UserTable → Close modal` |
| **Usage Context** | Admin sửa thông tin user trong UserForm và submit |
| **Error Handling** | Hiển thị validation errors |

### DELETE /admin/users/{id}

| Aspect | Details |
|--------|---------|
| **Method** | DELETE |
| **Purpose** | Xóa người dùng (soft delete) |
| **Used by Page** | Admin - User Management |
| **Used by Components** | UserTable, ConfirmationModal |
| **Request Data** | Path param: `id` |
| **Response Data** | `{ message: string }` |
| **Data Flow** | `Click delete → Show confirmation → DELETE /admin/users/{id} → Refresh UserTable` |
| **Usage Context** | Admin click "Xóa" → Confirm → Delete |
| **Error Handling** | Show error message nếu delete fail |

---

## Course APIs

### GET /courses

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách khóa học |
| **Used by Page** | Course List |
| **Used by Components** | CourseCard (multiple), SearchBar, FilterPanel, Pagination |
| **Request Data** | Query params: `page`, `limit`, `search`, `subject_id`, `teacher_id` |
| **Response Data** | `{ data: Course[], pagination: Pagination }` |
| **Data Flow** | `CourseList mount → GET /courses → Render CourseCard[] → User scroll/filter → GET /courses?filters → Update CourseCard[]` |
| **Usage Context** | User vào trang danh sách khóa học, có thể search, filter theo subject/teacher |
| **Error Handling** | Show error message, retry button |

### POST /courses

| Aspect | Details |
|--------|---------|
| **Method** | POST |
| **Purpose** | Tạo khóa học mới (Admin/Teacher only) |
| **Used by Page** | Course List (nếu có form tạo mới) |
| **Used by Components** | CourseForm (modal) |
| **Request Data** | `{ title: string, description: string, subject_id: number, teacher_id: number, thumbnail?: string, price?: number }` |
| **Response Data** | `Course` object |
| **Data Flow** | `CourseForm submit → POST /courses → Refresh CourseList → Close modal` |
| **Usage Context** | Admin/Teacher click "Tạo khóa học" → Mở CourseForm → Submit |
| **Error Handling** | Hiển thị validation errors trong CourseForm |

### GET /courses/{id}

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy thông tin chi tiết khóa học |
| **Used by Page** | Course Detail |
| **Used by Components** | CourseHeader, CourseInfo, LectureList, EnrollmentButton |
| **Request Data** | Path param: `id` |
| **Response Data** | `CourseDetail` object (bao gồm lectures, teacher, subject) |
| **Data Flow** | `CourseDetail mount → GET /courses/{id} → Populate CourseHeader, CourseInfo, LectureList` |
| **Usage Context** | User click vào CourseCard hoặc navigate đến `/courses/:id` |
| **Error Handling** | Show 404 page nếu course không tồn tại |

### PUT /courses/{id}

| Aspect | Details |
|--------|---------|
| **Method** | PUT |
| **Purpose** | Cập nhật thông tin khóa học |
| **Used by Page** | Course Detail |
| **Used by Components** | CourseForm (edit mode) |
| **Request Data** | Path param: `id`, Body: `{ title?: string, description?: string, subject_id?: number, thumbnail?: string, price?: number }` |
| **Response Data** | `Course` object |
| **Data Flow** | `CourseForm submit → PUT /courses/{id} → Refresh CourseDetail → Close form` |
| **Usage Context** | Admin/Teacher (owner) click "Sửa" trong CourseDetail |
| **Error Handling** | Hiển thị validation errors |

### DELETE /courses/{id}

| Aspect | Details |
|--------|---------|
| **Method** | DELETE |
| **Purpose** | Xóa khóa học (soft delete) |
| **Used by Page** | Course Detail |
| **Used by Components** | DeleteButton, ConfirmationModal |
| **Request Data** | Path param: `id` |
| **Response Data** | `{ message: string }` |
| **Data Flow** | `Click delete → Confirm → DELETE /courses/{id} → Navigate to CourseList` |
| **Usage Context** | Admin/Teacher (owner) click "Xóa" → Confirm |
| **Error Handling** | Show error nếu có học viên đã đăng ký |

### POST /courses/{id}/enroll

| Aspect | Details |
|--------|---------|
| **Method** | POST |
| **Purpose** | Đăng ký khóa học |
| **Used by Page** | Course Detail |
| **Used by Components** | EnrollmentButton |
| **Request Data** | Path param: `id` |
| **Response Data** | `{ message: string }` |
| **Data Flow** | `Click EnrollmentButton → POST /courses/{id}/enroll → Update button state (enrolled) → Show success` |
| **Usage Context** | Student click "Đăng ký" trong CourseDetail |
| **Error Handling** | Show error nếu đã đăng ký hoặc không đủ điều kiện |

### GET /courses/{id}/students

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách học viên đã đăng ký khóa học |
| **Used by Page** | Course Detail |
| **Used by Components** | StudentList (tab trong CourseDetail) |
| **Request Data** | Path param: `id` |
| **Response Data** | `{ data: User[] }` |
| **Data Flow** | `Click "Học viên" tab → GET /courses/{id}/students → Render UserCard[]` |
| **Usage Context** | Teacher/Admin xem danh sách học viên trong khóa học |
| **Error Handling** | Show error nếu không có quyền (403) |

---

## Lecture APIs

### GET /lectures

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách bài giảng |
| **Used by Page** | Course Detail |
| **Used by Components** | LectureList, LectureCard (multiple) |
| **Request Data** | Query param: `course_id` (required) |
| **Response Data** | `{ data: Lecture[], pagination: Pagination }` |
| **Data Flow** | `CourseDetail mount → GET /lectures?course_id={id} → Render LectureCard[] in LectureList` |
| **Usage Context** | Load danh sách bài giảng khi vào CourseDetail |
| **Error Handling** | Show error message |

### POST /lectures

| Aspect | Details |
|--------|---------|
| **Method** | POST |
| **Purpose** | Tạo bài giảng mới (Admin/Teacher only) |
| **Used by Page** | Course Detail |
| **Used by Components** | LectureForm (modal) |
| **Request Data** | `{ course_id: number, title: string, description: string, video_url: string, order: number, duration?: number }` |
| **Response Data** | `Lecture` object |
| **Data Flow** | `LectureForm submit → POST /lectures → Refresh LectureList → Close modal` |
| **Usage Context** | Teacher click "Thêm bài giảng" trong CourseDetail |
| **Error Handling** | Hiển thị validation errors |

### GET /lectures/{id}

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy thông tin chi tiết bài giảng |
| **Used by Page** | Lecture Player |
| **Used by Components** | VideoPlayer, LectureInfo, ExerciseList, CommentSection |
| **Request Data** | Path param: `id` |
| **Response Data** | `LectureDetail` object (bao gồm video_url, exercises, comments) |
| **Data Flow** | `LecturePlayer mount → GET /lectures/{id} → Load video in VideoPlayer → Load exercises in ExerciseList` |
| **Usage Context** | User click LectureCard hoặc navigate đến `/courses/:courseId/lectures/:lectureId` |
| **Error Handling** | Show 404 nếu lecture không tồn tại hoặc không có quyền xem |

### PUT /lectures/{id}

| Aspect | Details |
|--------|---------|
| **Method** | PUT |
| **Purpose** | Cập nhật thông tin bài giảng |
| **Used by Page** | Lecture Player |
| **Used by Components** | LectureForm (edit mode) |
| **Request Data** | Path param: `id`, Body: `{ title?: string, description?: string, video_url?: string, order?: number }` |
| **Response Data** | `Lecture` object |
| **Data Flow** | `LectureForm submit → PUT /lectures/{id} → Refresh LecturePlayer → Close form` |
| **Usage Context** | Teacher (owner) click "Sửa" trong LecturePlayer |
| **Error Handling** | Hiển thị validation errors |

### DELETE /lectures/{id}

| Aspect | Details |
|--------|---------|
| **Method** | DELETE |
| **Purpose** | Xóa bài giảng (soft delete) |
| **Used by Page** | Course Detail, Lecture Player |
| **Used by Components** | DeleteButton, ConfirmationModal |
| **Request Data** | Path param: `id` |
| **Response Data** | `{ message: string }` |
| **Data Flow** | `Click delete → Confirm → DELETE /lectures/{id} → Refresh LectureList → Navigate to CourseDetail` |
| **Usage Context** | Teacher (owner) click "Xóa" → Confirm |
| **Error Handling** | Show error message |

---

## Exercise APIs

### GET /exercises

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách bài tập của một bài giảng |
| **Used by Page** | Lecture Player |
| **Used by Components** | ExerciseList, ExerciseCard (multiple) |
| **Request Data** | Query param: `lecture_id` (required) |
| **Response Data** | `{ data: Exercise[] }` |
| **Data Flow** | `LecturePlayer mount → GET /exercises?lecture_id={id} → Render ExerciseCard[] in ExerciseList` |
| **Usage Context** | Load danh sách bài tập khi vào LecturePlayer |
| **Error Handling** | Show error message |

### POST /exercises

| Aspect | Details |
|--------|---------|
| **Method** | POST |
| **Purpose** | Tạo bài tập mới (Admin/Teacher only) |
| **Used by Page** | Lecture Player |
| **Used by Components** | ExerciseForm (modal) |
| **Request Data** | `{ lecture_id: number, title: string, description: string, type: string, questions: Question[], time_limit?: number }` |
| **Response Data** | `Exercise` object |
| **Data Flow** | `ExerciseForm submit → POST /exercises → Refresh ExerciseList → Close modal` |
| **Usage Context** | Teacher click "Thêm bài tập" trong LecturePlayer |
| **Error Handling** | Hiển thị validation errors |

### GET /exercises/{id}

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy thông tin chi tiết bài tập |
| **Used by Page** | Exercise/Quiz Page |
| **Used by Components** | QuizBlock, QuestionCard, AnswerOptions, Timer |
| **Request Data** | Path param: `id` |
| **Response Data** | `Exercise` object (bao gồm questions, time_limit) |
| **Data Flow** | `ExercisePage mount → GET /exercises/{id} → Render QuizBlock with QuestionCard[]` |
| **Usage Context** | User click ExerciseCard hoặc navigate đến `/exercises/:id` |
| **Error Handling** | Show 404 nếu exercise không tồn tại |

### PUT /exercises/{id}

| Aspect | Details |
|--------|---------|
| **Method** | PUT |
| **Purpose** | Cập nhật thông tin bài tập |
| **Used by Page** | Exercise/Quiz Page |
| **Used by Components** | ExerciseForm (edit mode) |
| **Request Data** | Path param: `id`, Body: `{ title?: string, description?: string, questions?: Question[], time_limit?: number }` |
| **Response Data** | `Exercise` object |
| **Data Flow** | `ExerciseForm submit → PUT /exercises/{id} → Refresh ExercisePage → Close form` |
| **Usage Context** | Teacher (owner) click "Sửa" trong ExercisePage |
| **Error Handling** | Hiển thị validation errors |

### DELETE /exercises/{id}

| Aspect | Details |
|--------|---------|
| **Method** | DELETE |
| **Purpose** | Xóa bài tập |
| **Used by Page** | Lecture Player |
| **Used by Components** | DeleteButton, ConfirmationModal |
| **Request Data** | Path param: `id` |
| **Response Data** | `{ message: string }` |
| **Data Flow** | `Click delete → Confirm → DELETE /exercises/{id} → Refresh ExerciseList` |
| **Usage Context** | Teacher (owner) click "Xóa" → Confirm |
| **Error Handling** | Show error message |

### POST /exercises/{id}/submit

| Aspect | Details |
|--------|---------|
| **Method** | POST |
| **Purpose** | Nộp bài tập/quiz |
| **Used by Page** | Exercise/Quiz Page |
| **Used by Components** | SubmitButton, QuizBlock |
| **Request Data** | Path param: `id`, Body: `{ answers: Object<questionId, answer> }` |
| **Response Data** | `{ score: number, total_questions: number, correct_answers: number }` |
| **Data Flow** | `Click SubmitButton → POST /exercises/{id}/submit → Show result → Disable form` |
| **Usage Context** | Student hoàn thành bài tập và click "Nộp bài" |
| **Error Handling** | Show error nếu đã nộp hoặc hết thời gian |

### GET /exercises/{id}/result

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy kết quả bài tập đã nộp |
| **Used by Page** | Exercise/Quiz Page |
| **Used by Components** | ResultDisplay |
| **Request Data** | Path param: `id` |
| **Response Data** | `{ score: number, total_questions: number, correct_answers: number, answers: Object }` |
| **Data Flow** | `ExercisePage mount (if submitted) → GET /exercises/{id}/result → Show ResultDisplay` |
| **Usage Context** | User xem lại kết quả bài tập đã làm |
| **Error Handling** | Show error nếu chưa nộp bài |

---

## Student APIs

### GET /students

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách tất cả học viên |
| **Used by Page** | Student List |
| **Used by Components** | UserCard (multiple), SearchBar, Pagination |
| **Request Data** | Query params: `page`, `limit`, `search` |
| **Response Data** | `{ data: User[], pagination: Pagination }` |
| **Data Flow** | `StudentList mount → GET /students → Render UserCard[]` |
| **Usage Context** | Admin/Teacher xem danh sách học viên, có thể search |
| **Error Handling** | Show error nếu không có quyền (403) |

### GET /students/{id}

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy thông tin chi tiết học viên |
| **Used by Page** | Student Detail |
| **Used by Components** | UserProfile |
| **Request Data** | Path param: `id` |
| **Response Data** | `User` object |
| **Data Flow** | `StudentDetail mount → GET /students/{id} → Populate UserProfile` |
| **Usage Context** | Admin/Teacher click UserCard trong StudentList |
| **Error Handling** | Show 404 nếu student không tồn tại |

### GET /students/{id}/courses

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách khóa học mà học viên đã đăng ký |
| **Used by Page** | Student Detail, Dashboard (Student) |
| **Used by Components** | CourseList, CourseCard (multiple) |
| **Request Data** | Path param: `id`, Query params: `page`, `limit` |
| **Response Data** | `{ data: Array<{course: Course, enrolled_at: string, progress: number}>, pagination: Pagination }` |
| **Data Flow** | `StudentDetail mount → GET /students/{id}/courses → Render CourseCard[]` |
| **Usage Context** | Xem khóa học của học viên trong StudentDetail hoặc Dashboard |
| **Error Handling** | Show error message |

### GET /students/{id}/progress

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy thông tin tiến độ học tập của học viên |
| **Used by Page** | Student Detail, Dashboard (Student) |
| **Used by Components** | ProgressChart, StatsCard (multiple) |
| **Request Data** | Path param: `id`, Query param: `course_id` (optional) |
| **Response Data** | `{ total_courses: number, completed_courses: number, in_progress_courses: number, total_lectures: number, completed_lectures: number, total_exercises: number, completed_exercises: number, average_score: number }` |
| **Data Flow** | `StudentDetail mount → GET /students/{id}/progress → Render ProgressChart, StatsCard[]` |
| **Usage Context** | Hiển thị thống kê tiến độ học tập |
| **Error Handling** | Show error message |

### GET /students/{id}/exercises

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách bài tập mà học viên đã làm |
| **Used by Page** | Student Detail |
| **Used by Components** | ExerciseList, ExerciseCard (multiple) |
| **Request Data** | Path param: `id`, Query params: `course_id` (optional), `page`, `limit` |
| **Response Data** | `{ data: Array<{exercise: Exercise, score: number, submitted_at: string}>, pagination: Pagination }` |
| **Data Flow** | `Click "Bài tập" tab → GET /students/{id}/exercises → Render ExerciseCard[]` |
| **Usage Context** | Xem lịch sử làm bài tập của học viên |
| **Error Handling** | Show error message |

---

## Teacher APIs

### GET /teachers

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách tất cả giảng viên |
| **Used by Page** | Teacher List |
| **Used by Components** | UserCard (multiple), SearchBar, Pagination |
| **Request Data** | Query params: `page`, `limit`, `search` |
| **Response Data** | `{ data: User[], pagination: Pagination }` |
| **Data Flow** | `TeacherList mount → GET /teachers → Render UserCard[]` |
| **Usage Context** | User xem danh sách giảng viên, có thể search |
| **Error Handling** | Show error message |

### GET /teachers/{id}

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy thông tin chi tiết giảng viên |
| **Used by Page** | Teacher Detail |
| **Used by Components** | UserProfile |
| **Request Data** | Path param: `id` |
| **Response Data** | `{ id: number, name: string, email: string, phone: string, avatar: string, bio: string, total_courses: number, total_students: number }` |
| **Data Flow** | `TeacherDetail mount → GET /teachers/{id} → Populate UserProfile` |
| **Usage Context** | User click UserCard trong TeacherList |
| **Error Handling** | Show 404 nếu teacher không tồn tại |

### GET /teachers/{id}/courses

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách khóa học mà giảng viên đang giảng dạy |
| **Used by Page** | Teacher Detail, Dashboard (Teacher) |
| **Used by Components** | CourseList, CourseCard (multiple) |
| **Request Data** | Path param: `id`, Query params: `page`, `limit` |
| **Response Data** | `{ data: Course[], pagination: Pagination }` |
| **Data Flow** | `TeacherDetail mount → GET /teachers/{id}/courses → Render CourseCard[]` |
| **Usage Context** | Xem khóa học của giảng viên trong TeacherDetail hoặc Dashboard |
| **Error Handling** | Show error message |

### GET /teachers/{id}/students

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách học viên trong các khóa học của giảng viên |
| **Used by Page** | Teacher Detail, Dashboard (Teacher) |
| **Used by Components** | StudentList, UserCard (multiple) |
| **Request Data** | Path param: `id`, Query params: `course_id` (optional), `page`, `limit` |
| **Response Data** | `{ data: Array<{student: User, course: Course, enrolled_at: string, progress: number}>, pagination: Pagination }` |
| **Data Flow** | `Click "Học viên" tab → GET /teachers/{id}/students → Render UserCard[]` |
| **Usage Context** | Teacher xem tất cả học viên trong các khóa học của mình |
| **Error Handling** | Show error message |

---

## Subject APIs

### GET /subjects

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách thể loại khóa học |
| **Used by Page** | Course List |
| **Used by Components** | FilterPanel, Select (subject filter) |
| **Request Data** | None |
| **Response Data** | `{ data: Subject[] }` |
| **Data Flow** | `CourseList mount → GET /subjects → Populate FilterPanel subject options` |
| **Usage Context** | Load danh sách subjects để hiển thị trong filter |
| **Error Handling** | Show error message |

### POST /subjects

| Aspect | Details |
|--------|---------|
| **Method** | POST |
| **Purpose** | Tạo thể loại mới (Admin only) |
| **Used by Page** | Admin - Subject Management (nếu có) |
| **Used by Components** | SubjectForm (modal) |
| **Request Data** | `{ name: string, description?: string }` |
| **Response Data** | `Subject` object |
| **Data Flow** | `SubjectForm submit → POST /subjects → Refresh subject list → Close modal` |
| **Usage Context** | Admin tạo subject mới |
| **Error Handling** | Hiển thị validation errors |

### GET /subjects/{id}

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy thông tin chi tiết thể loại |
| **Used by Page** | Subject Detail (nếu có) |
| **Used by Components** | SubjectInfo |
| **Request Data** | Path param: `id` |
| **Response Data** | `Subject` object |
| **Data Flow** | `SubjectDetail mount → GET /subjects/{id} → Populate SubjectInfo` |
| **Usage Context** | Xem chi tiết subject |
| **Error Handling** | Show 404 nếu subject không tồn tại |

### PUT /subjects/{id}

| Aspect | Details |
|--------|---------|
| **Method** | PUT |
| **Purpose** | Cập nhật thông tin thể loại |
| **Used by Page** | Subject Detail (nếu có) |
| **Used by Components** | SubjectForm (edit mode) |
| **Request Data** | Path param: `id`, Body: `{ name?: string, description?: string }` |
| **Response Data** | `Subject` object |
| **Data Flow** | `SubjectForm submit → PUT /subjects/{id} → Refresh SubjectDetail` |
| **Usage Context** | Admin sửa subject |
| **Error Handling** | Hiển thị validation errors |

### DELETE /subjects/{id}

| Aspect | Details |
|--------|---------|
| **Method** | DELETE |
| **Purpose** | Xóa thể loại (soft delete) |
| **Used by Page** | Subject Detail (nếu có) |
| **Used by Components** | DeleteButton, ConfirmationModal |
| **Request Data** | Path param: `id` |
| **Response Data** | `{ message: string }` |
| **Data Flow** | `Click delete → Confirm → DELETE /subjects/{id} → Navigate to subject list` |
| **Usage Context** | Admin xóa subject |
| **Error Handling** | Show error nếu có khóa học đang sử dụng subject |

---

## News APIs

### GET /news

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách tin tức |
| **Used by Page** | News List |
| **Used by Components** | NewsCard (multiple), Pagination |
| **Request Data** | Query params: `page`, `limit` |
| **Response Data** | `{ data: News[], pagination: Pagination }` |
| **Data Flow** | `NewsList mount → GET /news → Render NewsCard[]` |
| **Usage Context** | User xem danh sách tin tức |
| **Error Handling** | Show error message |

### POST /news

| Aspect | Details |
|--------|---------|
| **Method** | POST |
| **Purpose** | Tạo tin tức mới (Admin only) |
| **Used by Page** | News List (nếu có form tạo mới) |
| **Used by Components** | NewsForm (modal) |
| **Request Data** | `{ title: string, content: string, image?: string }` |
| **Response Data** | `News` object |
| **Data Flow** | `NewsForm submit → POST /news → Refresh NewsList → Close modal` |
| **Usage Context** | Admin tạo tin tức mới |
| **Error Handling** | Hiển thị validation errors |

### GET /news/{id}

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy thông tin chi tiết tin tức |
| **Used by Page** | News Detail |
| **Used by Components** | NewsContent |
| **Request Data** | Path param: `id` |
| **Response Data** | `News` object |
| **Data Flow** | `NewsDetail mount → GET /news/{id} → Render NewsContent` |
| **Usage Context** | User click NewsCard trong NewsList |
| **Error Handling** | Show 404 nếu news không tồn tại |

### PUT /news/{id}

| Aspect | Details |
|--------|---------|
| **Method** | PUT |
| **Purpose** | Cập nhật thông tin tin tức |
| **Used by Page** | News Detail |
| **Used by Components** | NewsForm (edit mode) |
| **Request Data** | Path param: `id`, Body: `{ title?: string, content?: string, image?: string }` |
| **Response Data** | `News` object |
| **Data Flow** | `NewsForm submit → PUT /news/{id} → Refresh NewsDetail → Close form` |
| **Usage Context** | Admin sửa tin tức |
| **Error Handling** | Hiển thị validation errors |

### DELETE /news/{id}

| Aspect | Details |
|--------|---------|
| **Method** | DELETE |
| **Purpose** | Xóa tin tức |
| **Used by Page** | News Detail |
| **Used by Components** | DeleteButton, ConfirmationModal |
| **Request Data** | Path param: `id` |
| **Response Data** | `{ message: string }` |
| **Data Flow** | `Click delete → Confirm → DELETE /news/{id} → Navigate to NewsList` |
| **Usage Context** | Admin xóa tin tức |
| **Error Handling** | Show error message |

---

## FAQ APIs

### GET /faq

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách câu hỏi thường gặp |
| **Used by Page** | FAQ |
| **Used by Components** | FAQAccordion, FAQItem (multiple) |
| **Request Data** | None |
| **Response Data** | `{ data: FAQ[] }` |
| **Data Flow** | `FAQ page mount → GET /faq → Render FAQItem[] in FAQAccordion` |
| **Usage Context** | User xem danh sách FAQ |
| **Error Handling** | Show error message |

### POST /faq

| Aspect | Details |
|--------|---------|
| **Method** | POST |
| **Purpose** | Tạo câu hỏi thường gặp mới (Admin only) |
| **Used by Page** | FAQ (nếu có form tạo mới) |
| **Used by Components** | FAQForm (modal) |
| **Request Data** | `{ question: string, answer: string, order_num?: number }` |
| **Response Data** | `FAQ` object |
| **Data Flow** | `FAQForm submit → POST /faq → Refresh FAQ list → Close modal` |
| **Usage Context** | Admin tạo FAQ mới |
| **Error Handling** | Hiển thị validation errors |

### GET /faq/{id}

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy thông tin chi tiết FAQ |
| **Used by Page** | FAQ |
| **Used by Components** | FAQItem |
| **Request Data** | Path param: `id` |
| **Response Data** | `FAQ` object |
| **Data Flow** | `FAQItem expand → GET /faq/{id} → Show answer` (hoặc load tất cả cùng lúc) |
| **Usage Context** | User click để xem câu trả lời |
| **Error Handling** | Show error message |

### PUT /faq/{id}

| Aspect | Details |
|--------|---------|
| **Method** | PUT |
| **Purpose** | Cập nhật thông tin FAQ |
| **Used by Page** | FAQ |
| **Used by Components** | FAQForm (edit mode) |
| **Request Data** | Path param: `id`, Body: `{ question?: string, answer?: string, order_num?: number }` |
| **Response Data** | `FAQ` object |
| **Data Flow** | `FAQForm submit → PUT /faq/{id} → Refresh FAQ list → Close form` |
| **Usage Context** | Admin sửa FAQ |
| **Error Handling** | Hiển thị validation errors |

### DELETE /faq/{id}

| Aspect | Details |
|--------|---------|
| **Method** | DELETE |
| **Purpose** | Xóa câu hỏi thường gặp |
| **Used by Page** | FAQ |
| **Used by Components** | DeleteButton, ConfirmationModal |
| **Request Data** | Path param: `id` |
| **Response Data** | `{ message: string }` |
| **Data Flow** | `Click delete → Confirm → DELETE /faq/{id} → Refresh FAQ list` |
| **Usage Context** | Admin xóa FAQ |
| **Error Handling** | Show error message |

---

## Comment APIs

### GET /comments

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy danh sách bình luận |
| **Used by Page** | Course Detail, Lecture Player |
| **Used by Components** | CommentSection, CommentCard (multiple) |
| **Request Data** | Query params: `course_id` hoặc `lecture_id` |
| **Response Data** | `{ data: Comment[] }` |
| **Data Flow** | `CommentSection mount → GET /comments?course_id={id} → Render CommentCard[]` |
| **Usage Context** | Load bình luận khi vào CourseDetail hoặc LecturePlayer |
| **Error Handling** | Show error message |

### POST /comments

| Aspect | Details |
|--------|---------|
| **Method** | POST |
| **Purpose** | Tạo bình luận mới |
| **Used by Page** | Course Detail, Lecture Player |
| **Used by Components** | CommentSection, CommentForm |
| **Request Data** | `{ content: string, course_id?: number, lecture_id?: number }` |
| **Response Data** | `Comment` object |
| **Data Flow** | `CommentForm submit → POST /comments → Add CommentCard to CommentSection → Clear form` |
| **Usage Context** | User nhập bình luận và submit |
| **Error Handling** | Hiển thị validation errors |

### DELETE /comments/{id}

| Aspect | Details |
|--------|---------|
| **Method** | DELETE |
| **Purpose** | Xóa bình luận |
| **Used by Page** | Course Detail, Lecture Player |
| **Used by Components** | CommentCard |
| **Request Data** | Path param: `id` |
| **Response Data** | `{ message: string }` |
| **Data Flow** | `Click delete on CommentCard → DELETE /comments/{id} → Remove CommentCard from CommentSection` |
| **Usage Context** | User (owner) xóa bình luận của mình |
| **Error Handling** | Show error nếu không có quyền (403) |

---

## Search APIs

### GET /search

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Tìm kiếm giảng viên, học viên, khóa học |
| **Used by Page** | Search Results (nếu có page riêng) |
| **Used by Components** | SearchBar (global), SearchResults |
| **Request Data** | Query params: `q` (required), `type` (optional: 'user', 'course', 'teacher', 'student') |
| **Response Data** | `{ users: User[], courses: Course[] }` |
| **Data Flow** | `User type in SearchBar → Debounce → GET /search?q={query} → Show SearchResults dropdown` |
| **Usage Context** | User search trong SearchBar ở Header |
| **Error Handling** | Show error message |

---

## Dashboard APIs

### GET /dashboard

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy thống kê tổng quan (Admin only) |
| **Used by Page** | Dashboard (Admin) |
| **Used by Components** | StatsCard (x4: total_users, total_courses, total_students, total_teachers) |
| **Request Data** | None (sử dụng token từ header) |
| **Response Data** | `{ total_users: number, total_courses: number, total_lectures: number, total_students: number, total_teachers: number }` |
| **Data Flow** | `Dashboard mount → GET /dashboard → Populate StatsCard[]` |
| **Usage Context** | Admin vào Dashboard để xem thống kê tổng quan |
| **Error Handling** | Show error nếu không có quyền (403) |

### GET /dashboard/history

| Aspect | Details |
|--------|---------|
| **Method** | GET |
| **Purpose** | Lấy lịch sử khóa học và thông tin học viên |
| **Used by Page** | Dashboard (Admin) |
| **Used by Components** | HistoryTable, ActivityFeed |
| **Request Data** | Query params: `course_id` (optional), `user_id` (optional) |
| **Response Data** | `{ data: Array<{course: Course, user: User, enrolled_at: string, progress: number}> }` |
| **Data Flow** | `Dashboard mount → GET /dashboard/history → Render HistoryTable` |
| **Usage Context** | Admin xem lịch sử đăng ký khóa học |
| **Error Handling** | Show error message |

---

## Data Flow Diagrams

### Course List Page Flow

```
User visits /courses
    ↓
CourseList page mounts
    ↓
GET /courses (initial load)
    ↓
Render CourseCard[] (10 items)
    ↓
User scrolls / clicks pagination
    ↓
GET /courses?page=2
    ↓
Append/Replace CourseCard[]
```

### Course Detail Page Flow

```
User clicks CourseCard
    ↓
Navigate to /courses/:id
    ↓
CourseDetail page mounts
    ↓
Parallel API calls:
    ├─ GET /courses/{id} → CourseHeader, CourseInfo
    ├─ GET /lectures?course_id={id} → LectureList
    ├─ GET /comments?course_id={id} → CommentSection
    └─ GET /courses/{id}/students → StudentList (if teacher/admin)
    ↓
Render all components with data
```

### Lecture Player Flow

```
User clicks LectureCard
    ↓
Navigate to /courses/:courseId/lectures/:lectureId
    ↓
LecturePlayer page mounts
    ↓
Parallel API calls:
    ├─ GET /lectures/{id} → VideoPlayer, LectureInfo
    ├─ GET /exercises?lecture_id={id} → ExerciseList
    └─ GET /comments?lecture_id={id} → CommentSection
    ↓
Auto-play video in VideoPlayer
    ↓
User watches video → Update progress
    ↓
User clicks ExerciseCard
    ↓
Navigate to /exercises/:id
```

### Exercise Submission Flow

```
User on Exercise/Quiz Page
    ↓
GET /exercises/{id} → Load questions
    ↓
User selects answers → Store in local state
    ↓
User clicks SubmitButton
    ↓
POST /exercises/{id}/submit
    ↓
Show result → Disable form
    ↓
GET /exercises/{id}/result (if needed for details)
```

### Student Dashboard Flow

```
Student visits /dashboard
    ↓
Parallel API calls:
    ├─ GET /students/{id}/courses → MyCourses
    ├─ GET /students/{id}/progress → ProgressOverview
    └─ GET /dashboard/history?user_id={id} → RecentActivity
    ↓
Render all components
```

### Teacher Dashboard Flow

```
Teacher visits /dashboard
    ↓
Parallel API calls:
    ├─ GET /teachers/{id}/courses → MyCourses
    ├─ GET /teachers/{id}/students → StudentStats
    └─ GET /dashboard/history?teacher_id={id} → RecentActivity
    ↓
Render all components
```

### Enrollment Flow

```
User on CourseDetail page
    ↓
Check if enrolled (from course data)
    ↓
If not enrolled → Show EnrollmentButton
    ↓
User clicks "Đăng ký"
    ↓
POST /courses/{id}/enroll
    ↓
Update button state → Show success message
    ↓
Refresh course data → Show progress
```

---

## Summary

Tài liệu này cung cấp mapping đầy đủ giữa:
- **30+ API endpoints** với các UI components/pages
- **Data flow** từ API đến UI
- **Usage context** cho mỗi API call
- **Error handling** strategies

Mỗi API endpoint được map với:
- Pages sử dụng
- Components sử dụng
- Request/Response data structure
- Data flow diagram
- Error handling approach

