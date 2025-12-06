# Nhật ký phát triển
Mọi tiến trình được chạy trên:
- Node version 22.21.0
- Npm version 10.9.4

## Thiết lập ban đầu
**1. Khởi tạo từ template Next.js** 
```bash
npx create-next-app@16.0.7 fe --yes
```

Template có các gói mặc định với `package.json` như sau:
```json
{
  "name": "fe",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.0.7",
    "react": "19.2.0",
    "react-dom": "19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.0.7",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

```

Tạo thư mục src và di chuyển thư mục app vào src ta có cấu trúc như sau: 
```bash
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src
│   └── app
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
└── tsconfig.json
```

**2. Cập nhập tệp README.md ghi lại nhật ký phát triển**  

**3. Thử các script**  

```bash
# Chạy ứng dụng ở chế độ development
npm run dev
```

```bash
# Chạy linter đảm bảo chất lượng code
npm run lint
```

```bash
# Build ứng dụng ra production
npm run build
```

```bash
# Chạy ứng dụng ở chế độ production (yêu cầu build trước đó)
npm run start
```
**4. Cài đặt thêm UI Library dựa trên FAP**  
```bash
# Tailwind CSS đã có sẵn trong template do đó bỏ qua bước này
```

**5. Cài đặt thêm Component Library dựa trên FAP**
```bash
# Radix UI Primitives theo reference để build design system với chuẩn ARIA
npm install radix-ui@1.4.3
```
Lệnh này chỉ thêm `radix-ui@1.4.3` library vào `node_modules` và `packages.json`  
**6. Viết Component UI đầu tiên**  
Theo như cấu trúc thư mục được đề cập trong FAP tạo một tệp là `./src/components/ui/Popover.jsx` với nội dung sau:
```tsx
import { Popover } from "radix-ui";

const StandardPopover = () => (
    <Popover.Root>
        <Popover.Trigger>More info</Popover.Trigger>
        <Popover.Portal>
            <Popover.Content>
                Some more info...
            </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
);

export default StandardPopover;
```

Tại file `./src/app/page.tsx` cập nhập thành nội dung sau:
```tsx
import StandardPopover from "../components/ui/Popover";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <StandardPopover></StandardPopover>
    </div>
  );
}
```

Bạn sẽ thấy có một text "More info" nằm ở giữa màn hình, khi click vào thì hiển thị thêm text "Some more info..." và chúng hoàn toàn chưa được style. 

Lúc này chúng ta cần áp dụng design system, với giao diện yêu cầu chuyên nghiệp, phù hợp cho enterprise, lựa chọn
[Carbon Design System](https://carbondesignsystem.com/) của IBM là hợp lý.

Công cụ để hệ thống hóa các component là [figma design từ IBM](https://www.figma.com/community/file/874592104192380079/ibm-carbon-design-system) và [storybook](https://storybook.js.org/)

Từ tài liệu [hướng dẫn cài đặt](https://storybook.js.org/docs/get-started/install) của storybook, tiến hành cài đặt công cụ này:
```bash
npm create storybook@10.1.4
```

Trong quá trình setup storybook các thay đổi sau được thực hiện:
- Cấu hình ESLint plugin cho storybook
- Thêm một loạt các file cấu hình cho các gói phụ trợ (xem cấu trúc bên dưới để thấy được sự thay đổi)
- Thêm các command vào package.json
- Sap chép framework templates

Tiếp đó storybook tự động thêm các gói sau vào devDependencies, và một loạt các cấu hình tự động được thực thi:
```json
{
  "name": "fe",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    "next": "16.0.7",
    "radix-ui": "^1.4.3",
    "react": "19.2.0",
    "react-dom": "19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.0.7",
    "tailwindcss": "^4",
    "typescript": "^5",
    "storybook": "^10.1.4",
    "@storybook/nextjs-vite": "^10.1.4",
    "@chromatic-com/storybook": "^4.1.3",
    "@storybook/addon-vitest": "^10.1.4",
    "@storybook/addon-a11y": "^10.1.4",
    "@storybook/addon-docs": "^10.1.4",
    "@storybook/addon-onboarding": "^10.1.4",
    "vite": "^7.2.6",
    "eslint-plugin-storybook": "^10.1.4",
    "vitest": "^4.0.15",
    "playwright": "^1.57.0",
    "@vitest/browser-playwright": "^4.0.15",
    "@vitest/coverage-v8": "^4.0.15"
  }
}
```

Với cấu trúc thư mục mới là:
```bash
├── .storybook                      #new
│   ├── main.ts                     #new
│   ├── preview.ts                  #new
│   └── vitest.setup.ts             #new
├── eslint.config.mjs               #modify
├── next-env.d.ts
├── next.config.ts
├── package-lock.json               #modify
├── package.json                    #modify
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   └── ui
│   │       └── Popover.tsx
│   └── stories                      #new
│       ├── assets                   #new
│       │   ├── accessibility.png    #new  
│       │   ├── accessibility.svg    #new
│       │   ├── addon-library.png    #new
│       │   ├── assets.png           #new
│       │   ├── avif-test-image.avif #new
│       │   ├── context.png          #new
│       │   ├── discord.svg          #new
│       │   ├── docs.png             #new
│       │   ├── figma-plugin.png     #new
│       │   ├── github.svg           #new
│       │   ├── share.png            #new
│       │   ├── styling.png          #new
│       │   ├── testing.png          #new
│       │   ├── theming.png          #new
│       │   ├── tutorials.svg        #new
│       │   └── youtube.svg          #new
│       ├── button.css               #new
│       ├── Button.stories.ts        #new
│       ├── Button.tsx               #new
│       ├── Configure.mdx            #new
│       ├── header.css               #new
│       ├── Header.stories.ts        #new
│       ├── Header.tsx               #new 
│       ├── page.css                 #new
│       ├── Page.stories.ts          #new
│       └── Page.tsx                 #new
├── tsconfig.json
├── vitest.config.ts                 #new
└── vitest.shims.d.ts                #new
```
Để thấy rõ sự khác biệt bạn có thể kiểm tra log git.

Nếu storybook chưa được khởi động bạn có thể chạy command `npm run storybook`.

Hãy làm quen với storybook theo guild tour khi mới bắt đầu.