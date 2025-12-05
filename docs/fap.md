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
- **shadcn/ui** hoặc **Radix UI**
  - Accessible components
  - Customizable
  - Headless components
  - Hoặc **MUI** nếu cần component library đầy đủ

### State Management
- **Zustand** hoặc **Jotai**
  - Lightweight
  - Simple API
  - TypeScript support
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
│   ├── stores/               # Global state stores (Zustand)
│   │   ├── authStore.ts
│   │   ├── uiStore.ts
│   │   └── cartStore.ts (nếu có)
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

**Server State:** React Query (TanStack Query)
- API data caching
- Background refetching
- Optimistic updates
- Error handling

**Client State:** Zustand
- UI state (sidebar collapsed, modals)
- User preferences
- Local form state (nếu không dùng React Hook Form)

**URL State:** Next.js Router
- Filters, search queries
- Pagination

### Example: Auth Store (Zustand)

```typescript
// stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updateUser: (user) => set({ user }),
    }),
    { name: 'auth-storage' }
  )
);
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
   → Store token in Zustand + localStorage
   → Redirect to dashboard
   ```

2. **Token Management**
   - Store in Zustand (persist)
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
import { useAuthStore } from '@/stores/authStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
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
      useAuthStore.getState().logout();
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

## Styling Approach

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

### Component Styling

- **Utility-first** với Tailwind
- **Component variants** với `clsx` hoặc `cn` utility
- **Responsive design** với Tailwind breakpoints
- **Dark mode** (nếu cần) với Tailwind dark mode

### Example Component

```typescript
// components/course/CourseCard.tsx
import { cn } from '@/utils/helpers';

interface CourseCardProps {
  title: string;
  thumbnail: string;
  className?: string;
}

export const CourseCard = ({ title, thumbnail, className }: CourseCardProps) => {
  return (
    <div className={cn(
      "rounded-lg shadow-md hover:shadow-lg transition-shadow",
      "p-4 bg-white",
      className
    )}>
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
    </div>
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
    "type-check": "tsc --noEmit"
  }
}
```

### Code Organization Rules

1. **Components:** Một file một component
2. **Hooks:** Custom hooks trong `hooks/` folder
3. **Services:** API calls trong `services/`
4. **Types:** TypeScript types trong `types/`
5. **Utils:** Pure functions trong `utils/`

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
✅ **Tailwind CSS** cho styling  
✅ **React Query** cho server state  
✅ **Zustand** cho client state  
✅ **Module-based** organization  
✅ **Domain-driven** structure  
✅ **SEO-friendly** với SSR/SSG  
✅ **Performance optimized**  
✅ **Scalable** và maintainable  

Tài liệu này cung cấp foundation cho việc phát triển Frontend của hệ thống E-learning.

