# Frontend Architecture Proposal

## Tài liệu đề xuất kiến trúc Frontend cho hệ thống E-learning

**Version:** 1.0.0 
**Date:** 2025
**Author:** Lamlib

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Module Organization](#module-organization)
5. [State Management](#state-management)
6. [Routing Strategy](#routing-strategy)
7. [Authentication & Authorization](#authentication--authorization)
8. [API Integration](#api-integration)
9. [Styling Approach](#styling-approach)
10. [Performance Optimization](#performance-optimization)
11. [Development Workflow](#development-workflow)

---

## Overview

Tài liệu này mô tả kiến trúc Frontend cho hệ thống E-learning, được xây dựng dựa trên:
- **Component Specification** - Các UI components và pages
- **API-UI Mapping** - Mapping giữa API endpoints và UI
- **BE-FE Contract** - API.yaml (OpenAPI specification)

**Mục tiêu:**
- Scalable và maintainable codebase
- Performance tốt
- Developer experience tốt
- SEO friendly (cho public pages)
- Type-safe với TypeScript

---

## Technology Stack

### Core Framework
- **Next.js 14+** (App Router)
  - SSR/SSG cho SEO
  - File-based routing
  - Image optimization
  - API routes (nếu cần proxy)
  - Middleware cho authentication

### Language
- **TypeScript 5+**
  - Type safety
  - Better IDE support
  - Refactoring support

### UI Library
- **Tailwind CSS 3+**
  - Utility-first CSS
  - Responsive design
  - Custom design system
  - Fast development

### Component Library (Optional)
- **Custom Components** (Khuyến nghị)
  - Components được design trên Figma
  - Design inspired từ **Carbon Design System (IBM)**
  - **Implementation:** Tailwind CSS + **Radix UI Primitives**
  - Radix UI cho accessibility và behavior
  - Tailwind CSS cho styling theo Figma design
  - Document và test với Storybook
- **MUI** nếu cần component library đầy đủ

### State Management
- **Redux Toolkit**
  - Industry standard, widely adopted
  - Official Storybook support
  - Strong ecosystem and documentation
  - TypeScript support
  - RTK Query for server state (optional)
  - Hoặc **React Query (TanStack Query)** cho server state

### Data Fetching
- **React Query (TanStack Query)**
  - Caching
  - Background refetching
  - Optimistic updates
  - Error handling

### Form Management
- **React Hook Form**
  - Performance
  - Validation (Zod)
  - TypeScript support

### Validation
- **Zod**
  - Schema validation
  - Type inference
  - Runtime validation

### HTTP Client
- **Axios** hoặc **Fetch API**
  - Interceptors
  - Request/Response transformation
  - Error handling

### Video Player
- **Video.js** hoặc **React Player**
  - Customizable
  - Plugin support
  - Progress tracking

### Date/Time
- **date-fns** hoặc **dayjs**
  - Lightweight
  - Immutable
  - TypeScript support

### Icons
- **Lucide React** hoặc **Heroicons**
  - Tree-shakeable
  - TypeScript support

### Testing (Optional)
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing

---

## Project Structure

```
e-learning-frontend/
├── .next/                    # Next.js build output
├── public/                   # Static assets
│   ├── images/
│   ├── videos/
│   └── icons/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── (auth)/           # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/     # Protected routes
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── courses/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── students/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── courses/
│   │   │   ├── page.tsx      # Public course list
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── lectures/
│   │   │           └── [lectureId]/
│   │   │               └── page.tsx
│   │   ├── teachers/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── news/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── faq/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── exercises/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── admin/
│   │   │   └── users/
│   │   │       └── page.tsx
│   │   ├── layout.tsx        # Root layout
│   │   ├── loading.tsx       # Global loading
│   │   ├── error.tsx         # Global error
│   │   └── not-found.tsx     # 404 page
│   │
│   ├── components/           # Reusable components
│   │   ├── ui/               # Base UI components (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── modal.tsx
│   │   │   └── ...
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── AuthLayout.tsx
│   │   ├── guards/           # Guard components
│   │   │   ├── AuthGuard.tsx
│   │   │   └── RoleGate.tsx
│   │   ├── course/           # Course-related components
│   │   │   ├── CourseCard.tsx
│   │   │   ├── CourseHeader.tsx
│   │   │   ├── CourseInfo.tsx
│   │   │   ├── LectureList.tsx
│   │   │   ├── LectureCard.tsx
│   │   │   └── EnrollmentButton.tsx
│   │   ├── lecture/          # Lecture-related components
│   │   │   ├── VideoPlayer.tsx
│   │   │   ├── LectureInfo.tsx
│   │   │   └── NavigationButtons.tsx
│   │   ├── exercise/         # Exercise-related components
│   │   │   ├── ExerciseCard.tsx
│   │   │   ├── QuizBlock.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── AnswerOptions.tsx
│   │   │   └── Timer.tsx
│   │   ├── user/             # User-related components
│   │   │   ├── UserCard.tsx
│   │   │   ├── UserProfile.tsx
│   │   │   └── AvatarUpload.tsx
│   │   ├── comment/          # Comment components
│   │   │   ├── CommentSection.tsx
│   │   │   ├── CommentCard.tsx
│   │   │   └── CommentForm.tsx
│   │   ├── common/           # Common components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── ProgressChart.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   └── SuccessMessage.tsx
│   │   └── news/             # News components
│   │       ├── NewsCard.tsx
│   │       └── NewsContent.tsx
│   │
│   ├── modules/              # Feature modules (domain-based)
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── PasswordChangeForm.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useLogin.ts
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   ├── stores/
│   │   │   │   └── authStore.ts
│   │   │   └── types/
│   │   │       └── auth.types.ts
│   │   │
│   │   ├── course/
│   │   │   ├── components/
│   │   │   │   ├── CourseList.tsx
│   │   │   │   ├── CourseDetail.tsx
│   │   │   │   └── CourseForm.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useCourses.ts
│   │   │   │   ├── useCourse.ts
│   │   │   │   └── useEnrollment.ts
│   │   │   ├── services/
│   │   │   │   └── courseService.ts
│   │   │   └── types/
│   │   │       └── course.types.ts
│   │   │
│   │   ├── lecture/
│   │   │   ├── components/
│   │   │   │   ├── LectureList.tsx
│   │   │   │   ├── LecturePlayer.tsx
│   │   │   │   └── LectureForm.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useLectures.ts
│   │   │   │   ├── useLecture.ts
│   │   │   │   └── useVideoProgress.ts
│   │   │   ├── services/
│   │   │   │   └── lectureService.ts
│   │   │   └── types/
│   │   │       └── lecture.types.ts
│   │   │
│   │   ├── exercise/
│   │   │   ├── components/
│   │   │   │   ├── ExerciseList.tsx
│   │   │   │   ├── ExercisePlayer.tsx
│   │   │   │   └── ExerciseForm.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useExercises.ts
│   │   │   │   ├── useExercise.ts
│   │   │   │   └── useExerciseSubmission.ts
│   │   │   ├── services/
│   │   │   │   └── exerciseService.ts
│   │   │   └── types/
│   │   │       └── exercise.types.ts
│   │   │
│   │   ├── user/
│   │   │   ├── components/
│   │   │   │   ├── UserList.tsx
│   │   │   │   ├── UserDetail.tsx
│   │   │   │   └── UserForm.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useUsers.ts
│   │   │   │   ├── useUser.ts
│   │   │   │   └── useProfile.ts
│   │   │   ├── services/
│   │   │   │   └── userService.ts
│   │   │   └── types/
│   │   │       └── user.types.ts
│   │   │
│   │   ├── student/
│   │   │   ├── components/
│   │   │   │   ├── StudentList.tsx
│   │   │   │   ├── StudentDetail.tsx
│   │   │   │   └── ProgressOverview.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useStudents.ts
│   │   │   │   ├── useStudent.ts
│   │   │   │   └── useStudentProgress.ts
│   │   │   ├── services/
│   │   │   │   └── studentService.ts
│   │   │   └── types/
│   │   │       └── student.types.ts
│   │   │
│   │   ├── teacher/
│   │   │   ├── components/
│   │   │   │   ├── TeacherList.tsx
│   │   │   │   ├── TeacherDetail.tsx
│   │   │   │   └── StudentStats.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useTeachers.ts
│   │   │   │   ├── useTeacher.ts
│   │   │   │   └── useTeacherStudents.ts
│   │   │   ├── services/
│   │   │   │   └── teacherService.ts
│   │   │   └── types/
│   │   │       └── teacher.types.ts
│   │   │
│   │   ├── comment/
│   │   │   ├── components/
│   │   │   │   ├── CommentSection.tsx
│   │   │   │   ├── CommentCard.tsx
│   │   │   │   └── CommentForm.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useComments.ts
│   │   │   │   └── useComment.ts
│   │   │   ├── services/
│   │   │   │   └── commentService.ts
│   │   │   └── types/
│   │   │       └── comment.types.ts
│   │   │
│   │   ├── news/
│   │   │   ├── components/
│   │   │   │   ├── NewsList.tsx
│   │   │   │   ├── NewsDetail.tsx
│   │   │   │   └── NewsForm.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useNews.ts
│   │   │   │   └── useNewsItem.ts
│   │   │   ├── services/
│   │   │   │   └── newsService.ts
│   │   │   └── types/
│   │   │       └── news.types.ts
│   │   │
│   │   └── faq/
│   │       ├── components/
│   │       │   ├── FAQAccordion.tsx
│   │       │   └── FAQItem.tsx
│   │       ├── hooks/
│   │       │   └── useFAQ.ts
│   │       ├── services/
│   │       │   └── faqService.ts
│   │       └── types/
│   │           └── faq.types.ts
│   │
│   ├── hooks/                # Global custom hooks
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   └── useClickOutside.ts
│   │
│   ├── services/             # API services
│   │   ├── api/
│   │   │   ├── client.ts     # Axios instance
│   │   │   ├── interceptors.ts
│   │   │   └── endpoints.ts  # API endpoints constants
│   │   └── storage/
│   │       └── tokenStorage.ts
│   │
│   ├── stores/               # Global state stores (Redux Toolkit)
│   │   ├── store.ts          # Root store configuration
│   │   ├── hooks.ts          # Typed hooks (useAppDispatch, useAppSelector)
│   │   ├── slices/           # Redux slices
│   │   │   ├── authSlice.ts
│   │   │   ├── uiSlice.ts
│   │   │   └── cartSlice.ts (nếu có)
│   │   └── middleware/       # Custom middleware (nếu có)
│   │
│   ├── utils/                # Utility functions
│   │   ├── format.ts         # Format date, number, etc.
│   │   ├── validation.ts     # Validation helpers
│   │   ├── constants.ts      # Constants
│   │   └── helpers.ts       # Helper functions
│   │
│   ├── types/                # Global TypeScript types
│   │   ├── api.types.ts      # API response types
│   │   ├── common.types.ts   # Common types
│   │   └── index.ts
│   │
│   ├── constants/            # Constants
│   │   ├── routes.ts         # Route paths
│   │   ├── roles.ts          # User roles
│   │   └── config.ts         # App config
│   │
│   ├── styles/               # Global styles
│   │   ├── globals.css
│   │   └── tailwind.config.ts
│   │
│   └── middleware.ts         # Next.js middleware (auth)
│
├── .env.local                # Environment variables
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── README.md
```

---

## Module Organization

### Domain-Based Modules

Mỗi module được tổ chức theo domain, bao gồm:

```
modules/{domain}/
├── components/      # Domain-specific components
├── hooks/          # Custom hooks cho domain
├── services/       # API services
├── stores/         # Domain state (nếu cần)
└── types/          # TypeScript types
```

### Module List

1. **auth** - Authentication & Authorization
2. **course** - Course management
3. **lecture** - Lecture/Video management
4. **exercise** - Exercise/Quiz management
5. **user** - User management
6. **student** - Student-specific features
7. **teacher** - Teacher-specific features
8. **comment** - Comment system
9. **news** - News management
10. **faq** - FAQ management

### Module Dependencies

```
auth (base)
  ├── user
  ├── course
  │   ├── lecture
  │   │   └── exercise
  │   └── comment
  ├── student
  ├── teacher
  ├── news
  └── faq
```

---

## State Management

### Strategy

**Server State:** React Query (TanStack Query) hoặc RTK Query
- API data caching
- Background refetching
- Optimistic updates
- Error handling
- **Note:** React Query được khuyến nghị vì phổ biến và độc lập, nhưng RTK Query cũng là lựa chọn tốt nếu muốn tích hợp với Redux Toolkit

**Client State:** Redux Toolkit
- UI state (sidebar collapsed, modals)
- User preferences
- Authentication state
- Global application state

**URL State:** Next.js Router
- Filters, search queries
- Pagination

### Why Redux Toolkit?

**Lý do chọn Redux Toolkit:**
- ✅ **Storybook Support:** Có addon chính thức `@storybook/addon-redux-toolkit`
- ✅ **Industry Standard:** Được sử dụng rộng rãi trong các dự án lớn (72% apps)
- ✅ **Ecosystem:** Nhiều middleware, tools, và tài liệu
- ✅ **Team Experience:** Dễ onboard developers đã quen Redux
- ✅ **Scalability:** Phù hợp cho dự án lớn và phức tạp
- ✅ **DevTools:** Redux DevTools mạnh mẽ cho debugging

### Example: Auth Slice (Redux Toolkit)

```typescript
// stores/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

const persistConfig = {
  key: 'auth',
  storage,
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
export const { login, logout, updateUser } = authSlice.actions;
```

### Example: Store Setup

```typescript
// stores/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { uiReducer } from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Example: Typed Hooks

```typescript
// stores/hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

### Example: Course Query (React Query)

```typescript
// modules/course/hooks/useCourses.ts
import { useQuery } from '@tanstack/react-query';
import { courseService } from '../services/courseService';

export const useCourses = (filters?: CourseFilters) => {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: () => courseService.getCourses(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

---

## Routing Strategy

### Next.js App Router Structure

```
app/
├── (auth)/              # Route group - không có layout riêng
│   ├── login/
│   └── register/
│
├── (dashboard)/        # Route group - có layout với sidebar
│   ├── layout.tsx      # Dashboard layout
│   ├── dashboard/
│   ├── courses/
│   ├── students/
│   └── teachers/
│
├── courses/            # Public routes
│   ├── page.tsx        # Course list (SSR for SEO)
│   └── [id]/
│       └── page.tsx     # Course detail (SSR)
│
└── layout.tsx          # Root layout
```

### Route Groups

- `(auth)` - Authentication pages (no layout)
- `(dashboard)` - Protected dashboard pages (with sidebar)
- Public routes - Courses, News, FAQ (SSR for SEO)

### Dynamic Routes

- `/courses/[id]` - Course detail
- `/courses/[id]/lectures/[lectureId]` - Lecture player
- `/students/[id]` - Student detail
- `/teachers/[id]` - Teacher detail
- `/news/[id]` - News detail
- `/exercises/[id]` - Exercise page

---

## Authentication & Authorization

### Authentication Flow

1. **Login**
   ```
   User submits LoginForm
   → POST /auth/login
   → Store token in Redux store (with redux-persist)
   → Redirect to dashboard
   ```

2. **Token Management**
   - Store in Redux Toolkit (with redux-persist)
   - Add to Axios interceptor
   - Refresh token (nếu có)

3. **Protected Routes**
   - Next.js Middleware check token
   - AuthGuard component
   - Redirect to /login nếu chưa auth

### Authorization (Role-Based)

**RoleGate Component:**
```typescript
<RoleGate allowedRoles={['admin', 'teacher']}>
  <AdminPanel />
</RoleGate>
```

**Middleware Check:**
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const userRole = getRoleFromToken(token);
  
  // Check route access based on role
  if (request.nextUrl.pathname.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}
```

### Route Protection

- **Public Routes:** `/`, `/courses`, `/news`, `/faq`, `/login`, `/register`
- **Authenticated Routes:** `/dashboard`, `/profile`, `/courses/[id]`
- **Admin Routes:** `/admin/*`
- **Teacher Routes:** `/dashboard` (teacher view), `/courses/[id]` (if owner)
- **Student Routes:** `/dashboard` (student view)

---

## API Integration

### API Client Setup

```typescript
// services/api/client.ts
import axios from 'axios';
import { store } from '@/stores/store';
import { logout } from '@/stores/slices/authSlice';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token
apiClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Service Layer Pattern

```typescript
// modules/course/services/courseService.ts
import { apiClient } from '@/services/api/client';
import { Course, CourseFilters } from '../types/course.types';

export const courseService = {
  getCourses: async (filters?: CourseFilters) => {
    const { data } = await apiClient.get('/courses', { params: filters });
    return data;
  },
  
  getCourse: async (id: number) => {
    const { data } = await apiClient.get(`/courses/${id}`);
    return data;
  },
  
  enrollCourse: async (id: number) => {
    const { data } = await apiClient.post(`/courses/${id}/enroll`);
    return data;
  },
};
```

### React Query Integration

```typescript
// modules/course/hooks/useCourses.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { courseService } from '../services/courseService';

export const useCourses = (filters?: CourseFilters) => {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: () => courseService.getCourses(filters),
  });
};

export const useEnrollCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (courseId: number) => courseService.enrollCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};
```

---

## Design & Development Process

### Design Phase: Figma với Carbon Design System Inspiration

Components được design trên **Figma** với inspiration từ **Carbon Design System của IBM**:

- **Design Reference:** Carbon Design System principles và patterns
- **Design Tool:** Figma
- **Design System:** Custom design system inspired by Carbon
- **Components:** Buttons, Cards, Forms, Navigation, etc.
- **Accessibility:** Follow WCAG 2.1 AA guidelines (như Carbon)
- **Responsive Design:** Mobile-first approach

### Design to Code Workflow

```
Figma Design (Carbon-inspired)
    ↓
Design Review & Approval
    ↓
Component Implementation (Radix UI Primitives + Tailwind CSS)
    ↓
Storybook Documentation
    ↓
Integration Testing
```

### Design System Principles (Carbon-inspired)

- **Consistency:** Consistent spacing, typography, colors
- **Accessibility:** WCAG 2.1 AA compliant
- **Scalability:** Design tokens cho easy customization
- **Documentation:** Clear guidelines trong Storybook

---

## Styling Approach

### Tailwind CSS + Radix UI Primitives

**Approach:** Sử dụng **Radix UI Primitives** cho accessibility và behavior, kết hợp với **Tailwind CSS** cho styling theo Figma design.

**Lợi ích:**
- ✅ **Accessibility:** Radix UI primitives cung cấp accessibility built-in (ARIA, keyboard navigation, focus management)
- ✅ **Styling Freedom:** Tailwind CSS cho full control over styling theo Figma design
- ✅ **Headless Components:** Radix UI là headless, chỉ cung cấp behavior và accessibility
- ✅ **TypeScript:** Full TypeScript support từ cả hai libraries
- ✅ **Customizable:** Dễ dàng customize để match Figma designs

### Installation

```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install @radix-ui/react-button @radix-ui/react-checkbox @radix-ui/react-radio-group
# ... và các primitives khác tùy nhu cầu
```

### Tailwind CSS Configuration

```typescript
// tailwind.config.ts
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#...',
          500: '#...',
          900: '#...',
        },
      },
    },
  },
  plugins: [],
}
```

### Component Styling Strategy

- **Radix UI Primitives:** Cho behavior và accessibility (Dialog, Dropdown, Select, etc.)
- **Tailwind CSS:** Cho styling theo Figma design
- **Component variants** với `clsx` hoặc `cn` utility
- **Responsive design** với Tailwind breakpoints
- **Dark mode** với Tailwind dark mode

### Example Component với Radix UI + Tailwind

```typescript
// components/course/CourseCard.tsx
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/utils/helpers';

interface CourseCardProps {
  title: string;
  thumbnail: string;
  description?: string;
  className?: string;
}

export const CourseCard = ({ title, thumbnail, description, className }: CourseCardProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            "rounded-lg shadow-md hover:shadow-lg transition-shadow",
            "p-4 bg-white text-left w-full",
            "focus:outline-none focus:ring-2 focus:ring-primary-500",
            className
          )}
        >
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-48 object-cover rounded mb-4" 
          />
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "bg-white rounded-lg shadow-xl p-6 max-w-md w-full",
            "focus:outline-none"
          )}
        >
          <Dialog.Title className="text-xl font-bold mb-2">{title}</Dialog.Title>
          <Dialog.Description className="text-gray-600 mb-4">
            {description}
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600">
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
```

### Example: Button với Radix UI + Tailwind

```typescript
// components/ui/Button.tsx
import * as ButtonPrimitive from '@radix-ui/react-button';
import { cn } from '@/utils/helpers';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  "focus:outline-none focus:ring-2 focus:ring-offset-2",
  "disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-500",
        ghost: "hover:bg-gray-100 focus:ring-gray-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof ButtonPrimitive.Root>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <ButtonPrimitive.Root
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
```

---

## Performance Optimization

### Code Splitting
- Next.js automatic code splitting
- Dynamic imports cho heavy components
- Route-based splitting

### Image Optimization
- Next.js Image component
- Lazy loading
- Responsive images

### Data Fetching
- React Query caching
- SSR/SSG cho public pages
- ISR (Incremental Static Regeneration) cho course list

### Bundle Optimization
- Tree shaking
- Dynamic imports
- Analyze bundle size

### Example: Dynamic Import

```typescript
// Lazy load heavy components
const VideoPlayer = dynamic(() => import('@/components/lecture/VideoPlayer'), {
  loading: () => <LoadingSpinner />,
  ssr: false, // Client-side only
});
```

---

## Storybook Integration

### Overview

**Storybook** được sử dụng để:
- Document components được design từ Figma
- Test components với different states
- Showcase design variations
- Verify implementation matches Figma designs
- Test với Redux store states

### Redux Toolkit Setup

Storybook có hỗ trợ chính thức cho Redux Toolkit thông qua addon:

```bash
npm install --save-dev @storybook/addon-redux-toolkit
```

### Configuration

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-redux-toolkit', // Redux Toolkit addon
    // ... other addons
  ],
  // ...
};

export default config;
```

### Using Redux Store in Stories

```typescript
// components/course/CourseCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CourseCard } from './CourseCard';
import { authSlice } from '@/stores/slices/authSlice';

// Create mock store for Storybook
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      // ... other reducers
    },
    preloadedState: initialState,
  });
};

const meta = {
  component: CourseCard,
  decorators: [
    (Story) => (
      <Provider store={createMockStore({ auth: { isAuthenticated: true } })}>
        <Story />
      </Provider>
    ),
  ],
} satisfies Meta<typeof CourseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    course: {
      id: 1,
      title: 'Test Course',
      // ...
    },
  },
};
```

### Benefits

- ✅ Official Storybook support
- ✅ Easy to mock Redux state
- ✅ Test components with different store states
- ✅ Redux DevTools integration in Storybook

### Design-to-Code Workflow với Storybook

1. **Design Phase (Figma):**
   - Design components inspired by Carbon Design System
   - Create design tokens (colors, spacing, typography)
   - Document component states và variants
   - Export assets và specifications

2. **Implementation Phase:**
   - Implement components với **Radix UI Primitives + Tailwind CSS**
   - Sử dụng Radix UI cho accessibility và behavior
   - Sử dụng Tailwind CSS cho styling theo Figma specifications
   - Match design từ Figma specifications
   - Follow Carbon Design System principles (spacing, typography, etc.)

3. **Documentation Phase (Storybook):**
   - Create stories cho mỗi component
   - Document all variants và states
   - Include Figma design references
   - Show component props và usage examples
   - Test accessibility với a11y addon

4. **Verification:**
   - Compare Storybook với Figma designs
   - Verify responsive behavior
   - Test với different themes (light/dark)
   - Accessibility testing

### Storybook Best Practices

- **Component Stories:** Mỗi component có stories file
- **Design References:** Link đến Figma designs trong stories
- **Variants:** Document tất cả design variants
- **States:** Show all component states (default, hover, active, disabled, etc.)
- **Accessibility:** Use a11y addon để verify accessibility
- **Responsive:** Test với different viewport sizes

---

## Development Workflow

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

### Design & Development Workflow

1. **Design (Figma):**
   - Design components inspired by Carbon Design System
   - Create design tokens và specifications
   - Review với team

2. **Implementation:**
   - Implement components với Tailwind CSS
   - Match Figma designs
   - Create Storybook stories

3. **Documentation (Storybook):**
   - Document components với stories
   - Include Figma design references
   - Test accessibility và responsive

4. **Integration:**
   - Integrate vào application
   - Test với Redux store
   - Verify với design specs

### Code Organization Rules

1. **Components:** Một file một component + một file stories
2. **Hooks:** Custom hooks trong `hooks/` folder
3. **Services:** API calls trong `services/`
4. **Types:** TypeScript types trong `types/`
5. **Utils:** Pure functions trong `utils/`
6. **Stories:** Component stories trong cùng folder với component

### Naming Conventions

- **Components:** PascalCase (`CourseCard.tsx`)
- **Hooks:** camelCase với prefix `use` (`useCourses.ts`)
- **Services:** camelCase (`courseService.ts`)
- **Types:** PascalCase (`Course.ts`)
- **Constants:** UPPER_SNAKE_CASE (`API_URL`)

---

## Summary

Kiến trúc Frontend được đề xuất:

✅ **Next.js 14+** với App Router  
✅ **TypeScript** cho type safety  
✅ **Figma Design** với Carbon Design System inspiration  
✅ **Radix UI Primitives + Tailwind CSS** cho component implementation  
✅ **Storybook** cho component documentation và testing  
✅ **React Query** cho server state  
✅ **Redux Toolkit** cho client state  
✅ **Module-based** organization  
✅ **Domain-driven** structure  
✅ **SEO-friendly** với SSR/SSG  
✅ **Performance optimized**  
✅ **Scalable** và maintainable  

Tài liệu này cung cấp foundation cho việc phát triển Frontend của hệ thống E-learning.

