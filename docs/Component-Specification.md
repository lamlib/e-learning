# Component Specification / FE Spec

## Tài liệu mô tả các UI Components và Pages của hệ thống E-learning

**Version:** 1.0.0  
**Date:** 2025 
**Author:** Lamlib

---

## Table of Contents

1. [Global Layout Elements](#global-layout-elements)
2. [Pages](#pages)
3. [Reusable Components](#reusable-components)
4. [Functional Modules](#functional-modules)

---

## Global Layout Elements

### Header
- **Type:** Layout
- **Description:** Header chung cho toàn bộ ứng dụng
- **Props:**
  - `user`: User object (current logged in user)
  - `onLogout`: function - Handler khi logout
- **States:**
  - `isAuthenticated`: boolean
  - `userMenuOpen`: boolean
- **Events:**
  - `onLogoClick`: Navigate to home
  - `onProfileClick`: Navigate to profile
  - `onLogout`: Logout action
- **Usage:** Hiển thị ở đầu mọi trang, chứa logo, navigation, user menu

### Sidebar
- **Type:** Layout
- **Description:** Sidebar navigation menu
- **Props:**
  - `items`: Array<MenuItem> - Danh sách menu items
  - `activePath`: string - Path hiện tại
  - `collapsed`: boolean - Trạng thái thu gọn
- **States:**
  - `collapsed`: boolean
  - `activeItem`: string
- **Events:**
  - `onItemClick`: Navigate to route
  - `onToggle`: Toggle collapse
- **Usage:** Hiển thị menu điều hướng, có thể thu gọn/mở rộng

### Breadcrumb
- **Type:** Layout
- **Description:** Breadcrumb navigation
- **Props:**
  - `items`: Array<{label: string, path?: string}>
- **Events:**
  - `onItemClick`: Navigate to path
- **Usage:** Hiển thị đường dẫn điều hướng, giúp user biết vị trí hiện tại

### RoleGate
- **Type:** Guard
- **Description:** Component kiểm tra quyền truy cập dựa trên role
- **Props:**
  - `allowedRoles`: Array<'admin' | 'teacher' | 'student'>
  - `children`: ReactNode
  - `fallback`: ReactNode (optional)
- **States:**
  - `hasAccess`: boolean
- **Usage:** Bảo vệ các component/page chỉ cho phép role nhất định truy cập

### AuthGuard
- **Type:** Guard
- **Description:** Component kiểm tra authentication
- **Props:**
  - `children`: ReactNode
  - `redirectTo`: string (default: '/login')
- **States:**
  - `isAuthenticated`: boolean
- **Usage:** Bảo vệ các route cần đăng nhập, redirect nếu chưa đăng nhập

---

## Pages

### Login
- **Route:** `/login`
- **Description:** Trang đăng nhập
- **Components Used:**
  - `LoginForm`
  - `AuthLayout`
- **API Dependencies:**
  - `POST /auth/login`
- **User Roles:** Public (unauthenticated users)
- **Props:** None
- **States:**
  - `loading`: boolean
  - `error`: string | null
- **Events:**
  - `onSubmit`: Submit login form
  - `onSuccess`: Navigate after successful login
- **Interaction Rules:**
  - Validate email và password trước khi submit
  - Hiển thị error message nếu đăng nhập thất bại
  - Redirect đến dashboard sau khi đăng nhập thành công

### Register
- **Route:** `/register`
- **Description:** Trang đăng ký tài khoản
- **Components Used:**
  - `RegisterForm`
  - `AuthLayout`
- **API Dependencies:**
  - `POST /auth/register`
- **User Roles:** Public
- **Props:** None
- **States:**
  - `loading`: boolean
  - `error`: string | null
- **Events:**
  - `onSubmit`: Submit register form
  - `onSuccess`: Navigate to login
- **Interaction Rules:**
  - Validate form fields (name, email, password, password_confirmation)
  - Hiển thị error nếu validation fail
  - Redirect đến login sau khi đăng ký thành công

### Dashboard (Admin)
- **Route:** `/dashboard`
- **Description:** Trang tổng quan dành cho Admin
- **Components Used:**
  - `StatsCard` (x4: total_users, total_courses, total_students, total_teachers)
  - `RecentCourses`
  - `ActivityFeed`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /dashboard`
- **User Roles:** admin
- **Props:** None
- **States:**
  - `stats`: DashboardStats object
  - `loading`: boolean
- **Events:**
  - `onCardClick`: Navigate to detail page
- **Interaction Rules:**
  - Load dashboard stats khi component mount
  - Hiển thị loading state khi đang fetch data
  - Refresh data khi user quay lại trang

### Dashboard (Student)
- **Route:** `/dashboard`
- **Description:** Trang tổng quan dành cho học viên
- **Components Used:**
  - `MyCourses`
  - `ProgressOverview`
  - `RecentActivity`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /students/{id}/courses`
  - `GET /students/{id}/progress`
- **User Roles:** student
- **Props:** None
- **States:**
  - `courses`: Array<Course>
  - `progress`: ProgressStats
  - `loading`: boolean
- **Events:**
  - `onCourseClick`: Navigate to course detail
- **Interaction Rules:**
  - Hiển thị khóa học đang học và tiến độ
  - Hiển thị hoạt động gần đây

### Dashboard (Teacher)
- **Route:** `/dashboard`
- **Description:** Trang tổng quan dành cho giảng viên
- **Components Used:**
  - `MyCourses`
  - `StudentStats`
  - `RecentActivity`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /teachers/{id}/courses`
  - `GET /teachers/{id}/students`
- **User Roles:** teacher
- **Props:** None
- **States:**
  - `courses`: Array<Course>
  - `students`: Array<Student>
  - `loading`: boolean
- **Events:**
  - `onCourseClick`: Navigate to course detail
  - `onStudentClick`: Navigate to student detail
- **Interaction Rules:**
  - Hiển thị khóa học đang giảng dạy
  - Hiển thị thống kê học viên

### Course List
- **Route:** `/courses`
- **Description:** Trang danh sách khóa học
- **Components Used:**
  - `CourseCard` (multiple)
  - `SearchBar`
  - `FilterPanel`
  - `Pagination`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /courses`
- **User Roles:** All authenticated users
- **Props:**
  - `search`: string (query param)
  - `subject_id`: number (query param)
  - `teacher_id`: number (query param)
- **States:**
  - `courses`: Array<Course>
  - `loading`: boolean
  - `pagination`: Pagination object
  - `filters`: FilterState
- **Events:**
  - `onSearch`: Update search query
  - `onFilterChange`: Update filters
  - `onPageChange`: Navigate to page
  - `onCourseClick`: Navigate to course detail
- **Interaction Rules:**
  - Load courses với pagination
  - Filter theo subject, teacher
  - Search theo keyword
  - Infinite scroll hoặc pagination

### Course Detail
- **Route:** `/courses/:id`
- **Description:** Trang chi tiết khóa học
- **Components Used:**
  - `CourseHeader`
  - `CourseInfo`
  - `LectureList`
  - `EnrollmentButton`
  - `CommentSection`
  - `Breadcrumb`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /courses/{id}`
  - `POST /courses/{id}/enroll`
  - `GET /courses/{id}/students`
  - `GET /comments?course_id={id}`
  - `POST /comments`
- **User Roles:** All authenticated users
- **Props:**
  - `id`: number (route param)
- **States:**
  - `course`: CourseDetail object
  - `lectures`: Array<Lecture>
  - `comments`: Array<Comment>
  - `isEnrolled`: boolean
  - `loading`: boolean
- **Events:**
  - `onEnroll`: Enroll to course
  - `onLectureClick`: Navigate to lecture player
  - `onCommentSubmit`: Submit comment
- **Interaction Rules:**
  - Hiển thị thông tin khóa học, danh sách bài giảng
  - Button "Đăng ký" chỉ hiển thị nếu chưa đăng ký
  - Hiển thị tiến độ nếu đã đăng ký
  - Cho phép bình luận

### Lecture Player
- **Route:** `/courses/:courseId/lectures/:lectureId`
- **Description:** Trang xem bài giảng
- **Components Used:**
  - `VideoPlayer`
  - `LectureInfo`
  - `ExerciseList`
  - `CommentSection`
  - `ProgressBar`
  - `NavigationButtons`
  - `Breadcrumb`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /lectures/{id}`
  - `GET /exercises?lecture_id={id}`
  - `GET /comments?lecture_id={id}`
  - `POST /comments`
  - `POST /exercises/{id}/submit`
- **User Roles:** All authenticated users (must be enrolled)
- **Props:**
  - `courseId`: number (route param)
  - `lectureId`: number (route param)
- **States:**
  - `lecture`: LectureDetail object
  - `exercises`: Array<Exercise>
  - `comments`: Array<Comment>
  - `currentTime`: number (video time)
  - `progress`: number
  - `loading`: boolean
- **Events:**
  - `onVideoTimeUpdate`: Update progress
  - `onExerciseClick`: Open exercise modal
  - `onNextLecture`: Navigate to next lecture
  - `onPrevLecture`: Navigate to previous lecture
  - `onCommentSubmit`: Submit comment
- **Interaction Rules:**
  - Auto-play video khi load
  - Lưu tiến độ xem video
  - Hiển thị danh sách bài tập liên quan
  - Navigation giữa các bài giảng
  - Chỉ cho phép xem nếu đã đăng ký khóa học

### Exercise/Quiz Page
- **Route:** `/exercises/:id`
- **Description:** Trang làm bài tập/quiz
- **Components Used:**
  - `QuizBlock`
  - `QuestionCard`
  - `AnswerOptions`
  - `Timer`
  - `SubmitButton`
  - `Breadcrumb`
  - `Header`
- **API Dependencies:**
  - `GET /exercises/{id}`
  - `POST /exercises/{id}/submit`
  - `GET /exercises/{id}/result`
- **User Roles:** All authenticated users
- **Props:**
  - `id`: number (route param)
- **States:**
  - `exercise`: Exercise object
  - `answers`: Object<questionId, answer>
  - `timeRemaining`: number
  - `submitted`: boolean
  - `result`: ExerciseResult object
  - `loading`: boolean
- **Events:**
  - `onAnswerSelect`: Select answer
  - `onSubmit`: Submit exercise
  - `onTimeUp`: Auto submit when time up
- **Interaction Rules:**
  - Hiển thị timer nếu có thời gian giới hạn
  - Validate trước khi submit
  - Hiển thị kết quả sau khi submit
  - Không cho phép chỉnh sửa sau khi submit

### Student List
- **Route:** `/students`
- **Description:** Trang danh sách học viên (Admin/Teacher)
- **Components Used:**
  - `UserCard` (multiple)
  - `SearchBar`
  - `Pagination`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /students`
- **User Roles:** admin, teacher
- **Props:** None
- **States:**
  - `students`: Array<User>
  - `loading`: boolean
  - `pagination`: Pagination object
- **Events:**
  - `onSearch`: Update search query
  - `onPageChange`: Navigate to page
  - `onStudentClick`: Navigate to student detail
- **Interaction Rules:**
  - Load danh sách học viên với pagination
  - Search theo tên, email
  - Click vào card để xem chi tiết

### Student Detail
- **Route:** `/students/:id`
- **Description:** Trang chi tiết học viên
- **Components Used:**
  - `UserProfile`
  - `CourseList`
  - `ProgressChart`
  - `ExerciseList`
  - `Breadcrumb`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /students/{id}`
  - `GET /students/{id}/courses`
  - `GET /students/{id}/progress`
  - `GET /students/{id}/exercises`
- **User Roles:** admin, teacher
- **Props:**
  - `id`: number (route param)
- **States:**
  - `student`: User object
  - `courses`: Array<Course>
  - `progress`: ProgressStats
  - `exercises`: Array<Exercise>
  - `loading`: boolean
- **Events:**
  - `onCourseClick`: Navigate to course detail
  - `onExerciseClick`: Navigate to exercise detail
- **Interaction Rules:**
  - Hiển thị thông tin học viên
  - Hiển thị khóa học đã đăng ký
  - Hiển thị tiến độ học tập
  - Hiển thị bài tập đã làm

### Teacher List
- **Route:** `/teachers`
- **Description:** Trang danh sách giảng viên
- **Components Used:**
  - `UserCard` (multiple)
  - `SearchBar`
  - `Pagination`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /teachers`
- **User Roles:** All authenticated users
- **Props:** None
- **States:**
  - `teachers`: Array<User>
  - `loading`: boolean
  - `pagination`: Pagination object
- **Events:**
  - `onSearch`: Update search query
  - `onPageChange`: Navigate to page
  - `onTeacherClick`: Navigate to teacher detail
- **Interaction Rules:**
  - Load danh sách giảng viên với pagination
  - Search theo tên, email

### Teacher Detail
- **Route:** `/teachers/:id`
- **Description:** Trang chi tiết giảng viên
- **Components Used:**
  - `UserProfile`
  - `CourseList`
  - `StudentStats`
  - `Breadcrumb`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /teachers/{id}`
  - `GET /teachers/{id}/courses`
  - `GET /teachers/{id}/students`
- **User Roles:** All authenticated users
- **Props:**
  - `id`: number (route param)
- **States:**
  - `teacher`: User object
  - `courses`: Array<Course>
  - `students`: Array<Student>
  - `loading`: boolean
- **Events:**
  - `onCourseClick`: Navigate to course detail
  - `onStudentClick`: Navigate to student detail
- **Interaction Rules:**
  - Hiển thị thông tin giảng viên
  - Hiển thị khóa học đang giảng dạy
  - Hiển thị thống kê học viên

### News List
- **Route:** `/news`
- **Description:** Trang danh sách tin tức
- **Components Used:**
  - `NewsCard` (multiple)
  - `Pagination`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /news`
- **User Roles:** All authenticated users
- **Props:** None
- **States:**
  - `news`: Array<News>
  - `loading`: boolean
  - `pagination`: Pagination object
- **Events:**
  - `onPageChange`: Navigate to page
  - `onNewsClick`: Navigate to news detail
- **Interaction Rules:**
  - Load danh sách tin tức với pagination
  - Hiển thị tin tức mới nhất trước

### News Detail
- **Route:** `/news/:id`
- **Description:** Trang chi tiết tin tức
- **Components Used:**
  - `NewsContent`
  - `Breadcrumb`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /news/{id}`
- **User Roles:** All authenticated users
- **Props:**
  - `id`: number (route param)
- **States:**
  - `news`: News object
  - `loading`: boolean
- **Events:** None
- **Interaction Rules:**
  - Hiển thị nội dung tin tức đầy đủ
  - Format markdown nếu có

### FAQ
- **Route:** `/faq`
- **Description:** Trang câu hỏi thường gặp
- **Components Used:**
  - `FAQAccordion`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /faq`
- **User Roles:** All authenticated users
- **Props:** None
- **States:**
  - `faqs`: Array<FAQ>
  - `expandedItems`: Array<number>
  - `loading`: boolean
- **Events:**
  - `onItemToggle`: Toggle expand/collapse FAQ item
- **Interaction Rules:**
  - Hiển thị danh sách FAQ dạng accordion
  - Có thể mở/đóng từng item
  - Sắp xếp theo order_num

### Profile
- **Route:** `/profile`
- **Description:** Trang thông tin cá nhân
- **Components Used:**
  - `ProfileForm`
  - `AvatarUpload`
  - `PasswordChangeForm`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /users/profile`
  - `PUT /users/profile`
  - `POST /auth/change-password`
- **User Roles:** All authenticated users
- **Props:** None
- **States:**
  - `user`: User object
  - `loading`: boolean
  - `saving`: boolean
- **Events:**
  - `onUpdate`: Update profile
  - `onPasswordChange`: Change password
  - `onAvatarUpload`: Upload avatar
- **Interaction Rules:**
  - Load thông tin user khi mount
  - Validate form trước khi submit
  - Hiển thị success message sau khi update
  - Cho phép upload avatar

### Admin - User Management
- **Route:** `/admin/users`
- **Description:** Trang quản lý người dùng (Admin only)
- **Components Used:**
  - `UserTable`
  - `UserForm` (modal)
  - `SearchBar`
  - `FilterPanel`
  - `Pagination`
  - `Header`
  - `Sidebar`
- **API Dependencies:**
  - `GET /admin/users`
  - `POST /admin/users`
  - `PUT /admin/users/{id}`
  - `DELETE /admin/users/{id}`
- **User Roles:** admin
- **Props:** None
- **States:**
  - `users`: Array<User>
  - `selectedUser`: User | null
  - `showForm`: boolean
  - `loading`: boolean
  - `pagination`: Pagination object
- **Events:**
  - `onCreate`: Open create form
  - `onEdit`: Open edit form
  - `onDelete`: Delete user
  - `onSearch`: Update search
  - `onFilter`: Update filters
- **Interaction Rules:**
  - CRUD operations cho users
  - Filter theo role
  - Search theo tên, email
  - Confirm trước khi delete

---

## Reusable Components

### CourseCard
- **Type:** Reusable
- **Description:** Card hiển thị thông tin khóa học
- **Props:**
  - `id`: number
  - `title`: string
  - `thumbnail`: string (image URL)
  - `description`: string
  - `teacher`: User object
  - `subject`: Subject object
  - `rating`: number
  - `studentCount`: number
  - `price`: number
  - `isEnrolled`: boolean
- **States:**
  - `hover`: boolean
  - `loading`: boolean
- **Events:**
  - `onClick`: Navigate to course detail
  - `onEnroll`: Enroll to course (if not enrolled)
- **Usage:** Sử dụng trong Course List, Dashboard, Teacher Detail

### LectureCard
- **Type:** Reusable
- **Description:** Card hiển thị thông tin bài giảng
- **Props:**
  - `id`: number
  - `title`: string
  - `description`: string
  - `duration`: number (minutes)
  - `order`: number
  - `isCompleted`: boolean
  - `isLocked`: boolean
- **States:**
  - `hover`: boolean
- **Events:**
  - `onClick`: Navigate to lecture player
- **Usage:** Sử dụng trong Course Detail, Lecture List

### ExerciseCard
- **Type:** Reusable
- **Description:** Card hiển thị thông tin bài tập
- **Props:**
  - `id`: number
  - `title`: string
  - `description`: string
  - `type`: 'quiz' | 'assignment'
  - `deadline`: string (date)
  - `score`: number | null
  - `isSubmitted`: boolean
- **States:**
  - `hover`: boolean
- **Events:**
  - `onClick`: Navigate to exercise page
- **Usage:** Sử dụng trong Lecture Player, Student Detail

### VideoPlayer
- **Type:** Reusable
- **Description:** Video player component
- **Props:**
  - `videoUrl`: string
  - `autoplay`: boolean
  - `onTimeUpdate`: function(currentTime: number)
  - `onEnded`: function()
- **States:**
  - `playing`: boolean
  - `currentTime`: number
  - `duration`: number
  - `volume`: number
  - `loading`: boolean
- **Events:**
  - `onPlay`: Play video
  - `onPause`: Pause video
  - `onSeek`: Seek to time
  - `onVolumeChange`: Change volume
- **Usage:** Sử dụng trong Lecture Player

### QuizBlock
- **Type:** Reusable
- **Description:** Component hiển thị câu hỏi quiz
- **Props:**
  - `question`: Question object
  - `selectedAnswer`: string | null
  - `showResult`: boolean
  - `correctAnswer`: string | null
- **States:**
  - `selectedAnswer`: string | null
- **Events:**
  - `onAnswerSelect`: Select answer
- **Usage:** Sử dụng trong Exercise/Quiz Page

### QuestionCard
- **Type:** Reusable
- **Description:** Card hiển thị câu hỏi
- **Props:**
  - `id`: number
  - `question`: string
  - `type`: 'multiple_choice' | 'true_false' | 'essay'
  - `options`: Array<string> (for multiple choice)
  - `selectedAnswer`: string | null
- **States:**
  - `selectedAnswer`: string | null
- **Events:**
  - `onAnswerChange`: Update selected answer
- **Usage:** Sử dụng trong QuizBlock

### AnswerOptions
- **Type:** Reusable
- **Description:** Component hiển thị các lựa chọn trả lời
- **Props:**
  - `options`: Array<{id: string, label: string}>
  - `selectedId`: string | null
  - `type`: 'radio' | 'checkbox'
  - `disabled`: boolean
- **States:**
  - `selectedId`: string | null
- **Events:**
  - `onSelect`: Select option
- **Usage:** Sử dụng trong QuestionCard

### CommentSection
- **Type:** Reusable
- **Description:** Component hiển thị và quản lý bình luận
- **Props:**
  - `comments`: Array<Comment>
  - `courseId`: number | null
  - `lectureId`: number | null
  - `currentUser`: User object
- **States:**
  - `comments`: Array<Comment>
  - `newComment`: string
  - `loading`: boolean
- **Events:**
  - `onSubmit`: Submit new comment
  - `onDelete`: Delete comment (if owner)
- **Usage:** Sử dụng trong Course Detail, Lecture Player

### CommentCard
- **Type:** Reusable
- **Description:** Card hiển thị một bình luận
- **Props:**
  - `comment`: Comment object
  - `currentUser`: User object
- **States:**
  - `isEditing`: boolean
- **Events:**
  - `onEdit`: Edit comment
  - `onDelete`: Delete comment
- **Usage:** Sử dụng trong CommentSection

### UserCard
- **Type:** Reusable
- **Description:** Card hiển thị thông tin user
- **Props:**
  - `user`: User object
  - `showRole`: boolean
  - `showStats`: boolean
- **States:**
  - `hover`: boolean
- **Events:**
  - `onClick`: Navigate to user detail
- **Usage:** Sử dụng trong Student List, Teacher List

### StatsCard
- **Type:** Reusable
- **Description:** Card hiển thị thống kê
- **Props:**
  - `title`: string
  - `value`: number | string
  - `icon`: ReactNode
  - `trend`: number | null (percentage change)
  - `color`: string
- **States:** None
- **Events:**
  - `onClick`: Navigate to detail (optional)
- **Usage:** Sử dụng trong Dashboard

### SearchBar
- **Type:** Reusable
- **Description:** Component tìm kiếm
- **Props:**
  - `placeholder`: string
  - `value`: string
  - `onSearch`: function(query: string)
  - `debounce`: number (ms)
- **States:**
  - `value`: string
  - `focus`: boolean
- **Events:**
  - `onChange`: Update search value
  - `onSubmit`: Submit search
  - `onClear`: Clear search
- **Usage:** Sử dụng trong Course List, Student List, Teacher List

### FilterPanel
- **Type:** Reusable
- **Description:** Panel lọc dữ liệu
- **Props:**
  - `filters`: FilterConfig[]
  - `values`: Object
  - `onChange`: function(filters: Object)
- **States:**
  - `values`: Object
  - `expanded`: boolean
- **Events:**
  - `onFilterChange`: Update filter values
  - `onReset`: Reset all filters
- **Usage:** Sử dụng trong Course List

### Pagination
- **Type:** Reusable
- **Description:** Component phân trang
- **Props:**
  - `currentPage`: number
  - `totalPages`: number
  - `onPageChange`: function(page: number)
  - `showPageNumbers`: boolean
- **States:**
  - `currentPage`: number
- **Events:**
  - `onPageChange`: Navigate to page
  - `onNext`: Next page
  - `onPrev`: Previous page
- **Usage:** Sử dụng trong các list pages

### ProgressBar
- **Type:** Reusable
- **Description:** Thanh hiển thị tiến độ
- **Props:**
  - `progress`: number (0-100)
  - `label`: string
  - `showPercentage`: boolean
  - `color`: string
- **States:** None
- **Events:** None
- **Usage:** Sử dụng trong Course Detail, Lecture Player, Student Detail

### ProgressChart
- **Type:** Reusable
- **Description:** Biểu đồ hiển thị tiến độ
- **Props:**
  - `data`: Array<{label: string, value: number}>
  - `type`: 'line' | 'bar' | 'pie'
- **States:** None
- **Events:** None
- **Usage:** Sử dụng trong Student Detail, Dashboard

### Timer
- **Type:** Reusable
- **Description:** Component đếm ngược thời gian
- **Props:**
  - `duration`: number (seconds)
  - `onTimeUp`: function()
  - `format`: 'mm:ss' | 'hh:mm:ss'
- **States:**
  - `timeRemaining`: number
  - `isRunning`: boolean
- **Events:**
  - `onStart`: Start timer
  - `onPause`: Pause timer
  - `onTimeUp`: Trigger when time up
- **Usage:** Sử dụng trong Exercise/Quiz Page

### AvatarUpload
- **Type:** Reusable
- **Description:** Component upload avatar
- **Props:**
  - `currentAvatar`: string (URL)
  - `onUpload`: function(file: File)
  - `maxSize`: number (bytes)
- **States:**
  - `uploading`: boolean
  - `preview`: string | null
- **Events:**
  - `onFileSelect`: Select file
  - `onUpload`: Upload file
- **Usage:** Sử dụng trong Profile

### NewsCard
- **Type:** Reusable
- **Description:** Card hiển thị tin tức
- **Props:**
  - `id`: number
  - `title`: string
  - `image`: string (URL)
  - `excerpt`: string
  - `publishedAt`: string (date)
  - `author`: User object
- **States:**
  - `hover`: boolean
- **Events:**
  - `onClick`: Navigate to news detail
- **Usage:** Sử dụng trong News List

### FAQAccordion
- **Type:** Reusable
- **Description:** Accordion hiển thị FAQ
- **Props:**
  - `faqs`: Array<FAQ>
  - `defaultExpanded`: Array<number>
- **States:**
  - `expandedItems`: Array<number>
- **Events:**
  - `onItemToggle`: Toggle expand/collapse
- **Usage:** Sử dụng trong FAQ page

### FAQItem
- **Type:** Reusable
- **Description:** Item trong FAQ accordion
- **Props:**
  - `faq`: FAQ object
  - `isExpanded`: boolean
- **States:**
  - `isExpanded`: boolean
- **Events:**
  - `onToggle`: Toggle expand/collapse
- **Usage:** Sử dụng trong FAQAccordion

### BreadcrumbItem
- **Type:** Reusable
- **Description:** Item trong breadcrumb
- **Props:**
  - `label`: string
  - `path`: string | null
  - `isLast`: boolean
- **States:** None
- **Events:**
  - `onClick`: Navigate to path (if not last)
- **Usage:** Sử dụng trong Breadcrumb

### LoadingSpinner
- **Type:** Reusable
- **Description:** Component loading spinner
- **Props:**
  - `size`: 'small' | 'medium' | 'large'
  - `color`: string
- **States:** None
- **Events:** None
- **Usage:** Sử dụng khi đang load data

### ErrorMessage
- **Type:** Reusable
- **Description:** Component hiển thị error message
- **Props:**
  - `message`: string
  - `type`: 'error' | 'warning' | 'info'
  - `onDismiss`: function()
- **States:**
  - `visible`: boolean
- **Events:**
  - `onDismiss`: Dismiss message
- **Usage:** Sử dụng khi có lỗi

### SuccessMessage
- **Type:** Reusable
- **Description:** Component hiển thị success message
- **Props:**
  - `message`: string
  - `autoHide`: boolean
  - `duration`: number (ms)
- **States:**
  - `visible`: boolean
- **Events:**
  - `onHide`: Hide message
- **Usage:** Sử dụng sau khi action thành công

### Modal
- **Type:** Reusable
- **Description:** Modal dialog component
- **Props:**
  - `isOpen`: boolean
  - `title`: string
  - `onClose`: function()
  - `size`: 'small' | 'medium' | 'large' | 'fullscreen'
  - `children`: ReactNode
- **States:**
  - `isOpen`: boolean
- **Events:**
  - `onClose`: Close modal
- **Usage:** Sử dụng cho forms, confirmations

### Button
- **Type:** Reusable
- **Description:** Button component
- **Props:**
  - `variant`: 'primary' | 'secondary' | 'danger' | 'outline'
  - `size`: 'small' | 'medium' | 'large'
  - `disabled`: boolean
  - `loading`: boolean
  - `icon`: ReactNode
  - `onClick`: function()
- **States:**
  - `hover`: boolean
  - `active`: boolean
- **Events:**
  - `onClick`: Handle click
- **Usage:** Sử dụng khắp nơi trong ứng dụng

### Input
- **Type:** Reusable
- **Description:** Input component
- **Props:**
  - `type`: string
  - `value`: string
  - `placeholder`: string
  - `error`: string | null
  - `disabled`: boolean
  - `onChange`: function(value: string)
- **States:**
  - `value`: string
  - `focus`: boolean
- **Events:**
  - `onChange`: Update value
  - `onFocus`: Handle focus
  - `onBlur`: Handle blur
- **Usage:** Sử dụng trong forms

### Select
- **Type:** Reusable
- **Description:** Select dropdown component
- **Props:**
  - `options`: Array<{value: string, label: string}>
  - `value`: string
  - `placeholder`: string
  - `onChange`: function(value: string)
- **States:**
  - `isOpen`: boolean
  - `value`: string
- **Events:**
  - `onChange`: Update value
  - `onToggle`: Toggle dropdown
- **Usage:** Sử dụng trong forms, filters

---

## Functional Modules

### AuthModule
- **Description:** Module xử lý authentication
- **Components:**
  - `LoginForm`
  - `RegisterForm`
  - `PasswordResetForm`
- **API Dependencies:**
  - `POST /auth/login`
  - `POST /auth/register`
  - `POST /auth/change-password`
- **States:**
  - `isAuthenticated`: boolean
  - `user`: User | null
  - `token`: string | null
- **Events:**
  - `onLogin`: Login action
  - `onLogout`: Logout action
  - `onRegister`: Register action

### CourseModule
- **Description:** Module quản lý khóa học
- **Components:**
  - `CourseList`
  - `CourseDetail`
  - `CourseForm`
  - `EnrollmentButton`
- **API Dependencies:**
  - `GET /courses`
  - `GET /courses/{id}`
  - `POST /courses`
  - `PUT /courses/{id}`
  - `DELETE /courses/{id}`
  - `POST /courses/{id}/enroll`
- **States:**
  - `courses`: Array<Course>
  - `selectedCourse`: Course | null
- **Events:**
  - `onCourseSelect`: Select course
  - `onEnroll`: Enroll to course

### LectureModule
- **Description:** Module quản lý bài giảng
- **Components:**
  - `LectureList`
  - `LecturePlayer`
  - `LectureForm`
- **API Dependencies:**
  - `GET /lectures`
  - `GET /lectures/{id}`
  - `POST /lectures`
  - `PUT /lectures/{id}`
  - `DELETE /lectures/{id}`
- **States:**
  - `lectures`: Array<Lecture>
  - `currentLecture`: Lecture | null
  - `progress`: number
- **Events:**
  - `onLectureSelect`: Select lecture
  - `onProgressUpdate`: Update progress

### ExerciseModule
- **Description:** Module quản lý bài tập
- **Components:**
  - `ExerciseList`
  - `ExerciseForm`
  - `ExercisePlayer`
- **API Dependencies:**
  - `GET /exercises`
  - `GET /exercises/{id}`
  - `POST /exercises`
  - `PUT /exercises/{id}`
  - `DELETE /exercises/{id}`
  - `POST /exercises/{id}/submit`
  - `GET /exercises/{id}/result`
- **States:**
  - `exercises`: Array<Exercise>
  - `currentExercise`: Exercise | null
  - `answers`: Object
- **Events:**
  - `onExerciseSelect`: Select exercise
  - `onAnswerSubmit`: Submit answers

### UserModule
- **Description:** Module quản lý người dùng
- **Components:**
  - `UserList`
  - `UserDetail`
  - `UserForm`
  - `ProfileForm`
- **API Dependencies:**
  - `GET /users/profile`
  - `PUT /users/profile`
  - `GET /students`
  - `GET /students/{id}`
  - `GET /teachers`
  - `GET /teachers/{id}`
  - `GET /admin/users`
  - `POST /admin/users`
  - `PUT /admin/users/{id}`
  - `DELETE /admin/users/{id}`
- **States:**
  - `users`: Array<User>
  - `currentUser`: User | null
- **Events:**
  - `onUserSelect`: Select user
  - `onUserUpdate`: Update user

### CommentModule
- **Description:** Module quản lý bình luận
- **Components:**
  - `CommentSection`
  - `CommentCard`
  - `CommentForm`
- **API Dependencies:**
  - `GET /comments`
  - `POST /comments`
  - `DELETE /comments/{id}`
- **States:**
  - `comments`: Array<Comment>
  - `newComment`: string
- **Events:**
  - `onCommentSubmit`: Submit comment
  - `onCommentDelete`: Delete comment

---

## Notes

- Tất cả các components đều cần xử lý loading và error states
- Các components cần responsive design
- Cần implement accessibility (a11y) cho tất cả components
- Các form components cần validation
- Các API calls cần error handling và retry logic
- Cần implement caching cho các data không thay đổi thường xuyên
- Cần implement optimistic updates cho better UX

