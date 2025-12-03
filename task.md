Project manager
## Phân tích yêu cầu từ người dùng viết tài liệu Software Requirement Specification (SRS).
## Phân tích tài liệu Software Requirement Specification viết tài liệu Software Design Documentation (SDD).
## Đọc tài liệu SSD từ đó viết tài liệu API Contract (API Swagger yaml):
    + Chuẩn OPEN API đang sử dụng
    + Thông tin chung về dự án
    + Thông tin máy chủ
    + Các tags
    + Các paths
    + Các components
## Đọc tài liệu SSD phân tích UI/UX thành lập các unit:
    + Page/screen
    + Functional modules
    + Reusable UI components
    + Global layout elements (header, sidebar, breadcrumb, guard, role-gate, ..)
    Chẳng hạn:

* Page: Dashboard, Course Detail, Lesson Player

* Component: CourseCard, VideoPlayer, QuizBlock, SidebarMenu…

Bạn cần trích xuất từ UI thành các khối lập trình FE.

**Sau đó xây dựng FE Architecture Proposal gồm:**

a, Công nghệ sử dụng:

* React/Next.js/Vue/Angular/Svelte/Flutter…

* UI Library (MUI, Tailwind, Charka, custom…)

b, Cấu trúc thư mục FE

Ví dụ của Next.js:

```
src/
  app/
  components/
  modules/
  hooks/
  services/
  utils/
  constants/
  types/
  layouts/
```

c, Module hóa theo domain

Ví dụ LMS:

```
modules/
  course/
    pages/
    components/
    services/
  user/
  quiz/
  notification/
```

**Sau khi đã có cái nhìn đầu tiên về FE architecture, chúng ta cần xác định API requirement & mapping với backend:**

FE Strusture phải dựa trên:

* API cần gọi

* Data shape (schema)

* Auth flow(JWT, OAuth…)

* Role & Permission

**Sau khi đã có cái nhìn đầu tiên về FE architecture, chúng ta cần xác định API requirement & mapping với backend:**

FE Strusture phải dựa trên:

* API cần gọi

* Data shape (schema)

* Auth flow(JWT, OAuth…)

* Role & Permission

Đi với đó là các tài liệu cần tạo sau:

* FE-BE Contract

* API list mapping to UI component

**Khi đã có API requirement và mapping với backend, tiếp đến là Component Specification / FE Spec**

Mỗi components/page được mô tả:

* Props

* Data input/output

* Event

* State

* Interaction rule

Ví dụ:

```
CourseCard
props: title, thumbnail, author, rating
events: onClick
states: hover, disabled
```