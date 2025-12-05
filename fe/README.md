# Nhật ký phát triển

## Thiết lập ban đầu
**1. Khởi tạo từ template Next.js** 
```bash
npx create-next-app@16.0.7 fe --yes
```

Template có các gói mặc định sau:
```json
{
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
