---
description: Design System Rules for Figma Integration
globs: ["fe/src/**/*.tsx", "fe/src/**/*.ts", "fe/src/**/*.css"]
alwaysApply: true
---

# Design System Rules - Figma Integration

## Overview

This project uses a **Tailwind CSS + Radix UI Primitives** approach for component implementation, with design specifications from **Figma Enterprise Design System** (inspired by Carbon Design System).

**Design Source:** [Figma Enterprise Design System](https://www.figma.com/design/HEgdVQJ9qZdJFYm5o2b3ki/Enterprise-Design-System?node-id=10941-406859&m=dev)

**IMPORTANT:** Current components (e.g., `Button.tsx`) are **DEMO ONLY** and do NOT match the Figma design. All components must be re-implemented to match Figma specifications exactly.

---

## 1. Design Token Definitions

### Current State
- **Location:** Design tokens are currently **hardcoded** in component files using Tailwind utility classes
- **Format:** Tailwind CSS utility classes (e.g., `bg-blue-600`, `text-white`, `h-10`)
- **Transformation:** No token transformation system currently in place
- **Status:** Components use placeholder/demo values, NOT from Figma

### Target State (Figma Integration)
Design tokens MUST be extracted from Figma and defined directly in `@theme` directive in `globals.css`:

**Structure:**
```
fe/src/
├── app/
│   └── globals.css         # All tokens defined in @theme directive with "lm-" prefix
```

**Token Definition Format:**
```css
/* fe/src/app/globals.css */
@theme inline {
  /* All design tokens with "lm" prefix defined here */
  --color-lm-button-primary: #0f62fe;
  --color-lm-button-primary-hover: #0050e6;
  --font-lm-sans: 'IBM Plex Sans', sans-serif;
  --font-size-lm-body-compact-01: 14px;
  --line-height-lm-body-compact-01: 18px;
  --spacing-lm-button-padding-horizontal-medium: 16px;
  /* ... all tokens from Figma */
}
```

**Integration with Tailwind v4:**
```css
/* fe/src/app/globals.css */
@import "tailwindcss";

@theme inline {
  /* All design tokens with "lm" prefix defined here */
  --color-lm-button-primary: #0f62fe;
  --color-lm-button-primary-hover: #0050e6;
  --font-lm-sans: 'IBM Plex Sans', sans-serif;
  --font-size-lm-body-compact-01: 14px;
  --line-height-lm-body-compact-01: 18px;
  /* ... all tokens from Figma */
}
```

**Usage in Components:**
```typescript
// Use CSS variables directly in Tailwind classes
className="bg-[var(--color-lm-button-primary)] text-[var(--color-lm-text-on-color)]"
```

**NOTE:** With Tailwind CSS v4 + `@tailwindcss/postcss`, design tokens are defined in `@theme` directive in `globals.css`, NOT in `tailwind.config.ts`. The config file is kept minimal (only for content paths).

### Token Mapping from Figma
When extracting tokens from Figma using MCP Figma:
1. **Colors:** Extract from Figma color styles → Define as CSS variables in `@theme` with `lm-` prefix
2. **Typography:** Extract font families, sizes, weights, line heights → Define as CSS variables in `@theme`
3. **Spacing:** Extract spacing scale → Define as CSS variables in `@theme`
4. **Shadows:** Extract elevation styles → Define as CSS variables in `@theme`
5. **Borders:** Extract border radius → Define as CSS variables in `@theme`

**CRITICAL:** 
- Never use hardcoded values. Always extract from Figma first.
- All tokens MUST use `lm-` prefix (e.g., `--color-lm-button-primary`)
- All tokens are defined ONLY in `@theme` directive in `fe/src/app/globals.css` (no separate token files)
- Components use CSS variables: `bg-[var(--color-lm-button-primary)]`
- No TypeScript token files - tokens exist only as CSS variables in `globals.css`

---

## 2. Component Library

### Component Architecture

**Location:** `fe/src/components/ui/`

**Pattern:** 
- **Headless Primitives:** Radix UI for behavior and accessibility
- **Styling:** Tailwind CSS utility classes (using Figma-extracted tokens)
- **Variants:** Class Variance Authority (CVA) for component variants
- **Type Safety:** TypeScript with VariantProps

**IMPORTANT:** Current `Button.tsx` is DEMO ONLY. Must be re-implemented to match Figma design exactly.

### Component Implementation Pattern

**Step 1: Extract from Figma**
- Use MCP Figma to get design context for the component
- Extract all variants, sizes, states, colors, spacing
- Document exact specifications

**Step 2: Implement Component**
```typescript
// fe/src/components/ui/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/utils/cn';

// Extract exact values from Figma, NOT hardcoded
const buttonVariants = cva(
  // Base styles from Figma
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Extract exact colors from Figma
        primary: 'bg-[#FigmaColor] text-[#FigmaColor] hover:bg-[#FigmaColor] active:bg-[#FigmaColor] focus-visible:ring-[#FigmaColor]',
        // ... other variants from Figma
      },
      size: {
        // Extract exact dimensions from Figma
        small: 'h-[FigmaHeight] px-[FigmaPadding] text-[FigmaSize]',
        medium: 'h-[FigmaHeight] px-[FigmaPadding] text-[FigmaSize]',
        large: 'h-[FigmaHeight] px-[FigmaPadding] text-[FigmaSize]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, leftIcon, rightIcon, loading, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={disabled || loading} {...props}>
        {/* Component content matching Figma exactly */}
      </Comp>
    );
  }
);
```

**Step 3: Verify Against Figma**
- Compare Storybook with Figma design side-by-side
- Ensure pixel-perfect match
- Test all variants and states

### Component Documentation

**Location:** `fe/src/components/ui/*.stories.tsx`

**Pattern:** Storybook stories with Figma design references

**Example:**
```typescript
// fe/src/components/ui/Button.stories.tsx
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HEgdVQJ9qZdJFYm5o2b3ki/Enterprise-Design-System?node-id=10941-406859&m=dev',
    },
  },
} satisfies Meta<typeof Button>;
```

**Storybook Commands:**
- Development: `npm run storybook`
- Build: `npm run build-storybook`

---

## 3. Frameworks & Libraries

### Core Framework
- **Framework:** Next.js 16.0.7 (App Router)
- **React:** 19.2.0
- **TypeScript:** 5.x
- **Build System:** Vite (via Storybook), Next.js built-in bundler

### UI Libraries
- **Radix UI Primitives:** `@radix-ui/react-slot` (and others as needed)
  - Purpose: Accessibility and behavior (headless components)
  - Usage: Wrap with Tailwind CSS for styling from Figma

### Styling Libraries
- **Tailwind CSS:** v4.x
  - Configuration: Using `@theme inline` in `globals.css` (Tailwind v4 approach)
  - Approach: Utility-first CSS with CSS variables
  - PostCSS: `@tailwindcss/postcss`
  - **Design Tokens:** All tokens with `lm-` prefix defined in `@theme` directive in `globals.css`
  - **tailwind.config.ts:** Minimal config (only content paths), tokens NOT mapped here

### Utility Libraries
- **Class Variance Authority (CVA):** `class-variance-authority@0.7.1`
  - Purpose: Type-safe component variants
- **clsx:** `clsx@2.1.1` - Conditional class names
- **tailwind-merge:** `tailwind-merge@3.4.0` - Merge Tailwind classes intelligently

### Icon Library
- **Lucide React:** `lucide-react@0.556.0`
  - Usage: `<Plus className="h-4 w-4" />`
  - Naming: PascalCase component names
  - Sizing: Use `className` prop for sizing (e.g., `h-4 w-4`, `h-5 w-5`)
  - **Note:** Icon sizes should match Figma specifications

---

## 4. Asset Management

### Asset Storage
**Location:** `fe/public/`

**Current Assets:**
- SVG icons: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`
- Images: To be added in `public/images/`
- Videos: To be added in `public/videos/` (for course content)

### Asset Referencing
**Next.js Image Component (Recommended):**
```typescript
import Image from 'next/image';

<Image
  src="/images/logo.png"
  alt="Logo"
  width={200}
  height={50}
  priority // for above-the-fold images
/>
```

**Static Assets:**
```typescript
// For SVGs and other static files
<img src="/file.svg" alt="File" />
// Or use Next.js Image for optimization
```

### Asset Optimization
- **Images:** Use Next.js `Image` component for automatic optimization
- **SVGs:** Inline for small icons, or use as static files
- **Videos:** Store in `public/videos/` and reference directly

### CDN Configuration
- Currently: No CDN configured
- Future: Configure CDN in `next.config.ts` for production assets

---

## 5. Icon System

### Icon Library
**Library:** Lucide React (`lucide-react@0.556.0`)

**Location:** Imported directly in components

**Usage Pattern:**
```typescript
import { ArrowRight, Download, Trash2, Plus } from 'lucide-react';

<Button leftIcon={<Plus className="h-4 w-4" />}>
  Add Item
</Button>
```

### Icon Naming Convention
- **Component Names:** PascalCase (e.g., `ArrowRight`, `Download`)
- **Sizing:** Use Tailwind classes - sizes should match Figma icon specifications
  - Small: `h-4 w-4` (16px) - verify with Figma
  - Medium: `h-5 w-5` (20px) - verify with Figma
  - Large: `h-6 w-6` (24px) - verify with Figma
- **Color:** Inherits from parent text color by default, or use `text-*` classes from Figma tokens

### Icon Integration with Components
Icons are passed as React nodes to component props:
- `leftIcon?: React.ReactNode`
- `rightIcon?: React.ReactNode`

**Example from Button:**
```typescript
{!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
{children && <span>{children}</span>}
{!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
```

**IMPORTANT:** Icon sizes and spacing should match Figma specifications exactly.

---

## 6. Styling Approach

### CSS Methodology
**Approach:** Utility-first CSS with Tailwind CSS v4

**Global Styles Location:** `fe/src/app/globals.css`

**Current Global Styles:**
```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

**Future:** Update CSS variables with values extracted from Figma design tokens.

### Class Merging Utility
**Location:** `fe/src/utils/cn.ts`

**Implementation:**
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Usage:** Always use `cn()` for conditional or merged classes:
```typescript
className={cn(buttonVariants({ variant, size }), className)}
```

### Responsive Design
**Approach:** Mobile-first with Tailwind breakpoints

**Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Example:**
```typescript
<div className="flex flex-col md:flex-row lg:gap-8">
  {/* Mobile: column, Desktop: row */}
</div>
```

**Note:** Responsive breakpoints should match Figma responsive designs if specified.

### Dark Mode
**Current:** CSS variables with `prefers-color-scheme`
**Future:** Implement Tailwind dark mode with class strategy, using colors from Figma dark mode tokens.

---

## 7. Project Structure

### Overall Organization
```
fe/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   └── ui/              # UI components (design system)
│   │       ├── Button.tsx   # DEMO - needs re-implementation
│   │       └── Button.stories.tsx
│   ├── tokens/              # TO BE CREATED - Figma design tokens
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   └── utils/
│       └── cn.ts            # Class name utility
├── public/                  # Static assets
├── .storybook/             # Storybook configuration
└── package.json
```

### Feature Organization (Future)
Based on `docs/fap.md`, the project will use module-based organization:

```
src/
├── modules/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── course/
│   └── ...
└── components/
    └── ui/                  # Shared UI components (design system)
```

### Component Naming Conventions
- **Components:** PascalCase (`Button.tsx`, `CourseCard.tsx`)
- **Stories:** `ComponentName.stories.tsx`
- **Utils:** camelCase (`cn.ts`, `helpers.ts`)
- **Types:** PascalCase (`ButtonProps`, `Course`)

---

## 8. Figma Integration Workflow

### Design-to-Code Process

1. **Design in Figma:**
   - Design components in Figma Enterprise Design System
   - Use design tokens (colors, typography, spacing)
   - Document all variants and states

2. **Extract Design Tokens (MCP Figma):**
   - Use MCP Figma commands to extract tokens:
     - `/Figma/get_design_context` - Get component design specs
     - `/Figma/get_variable_defs` - Get design variables/tokens
   - Define tokens directly in `@theme` directive in `fe/src/app/globals.css` with `lm-` prefix
   - No separate token files - all tokens are CSS variables in `globals.css`

3. **Extract Component Specifications:**
   - Use `/Figma/get_design_context` with node-id from Figma URL
   - Extract exact dimensions, padding, border radius, colors
   - Document all variants, sizes, and states

4. **Implement Component:**
   - Create component file: `fe/src/components/ui/ComponentName.tsx`
   - Use Radix UI primitives for behavior
   - Style with Tailwind CSS using extracted tokens
   - Use CVA for variants
   - **Match Figma design pixel-perfect**

5. **Document in Storybook:**
   - Create stories file: `ComponentName.stories.tsx`
   - Link to Figma design in `parameters.design.url`
   - Document all variants, sizes, and states
   - Add accessibility tests

6. **Verify:**
   - Compare Storybook with Figma design side-by-side
   - Test responsive behavior
   - Verify accessibility (WCAG 2.1 AA)
   - Ensure pixel-perfect match

### Figma Design Reference Format
Always include Figma design reference in Storybook:

```typescript
parameters: {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/{FILE_KEY}?node-id={NODE_ID}&m=dev',
  },
}
```

**Example for Button:**
```typescript
url: 'https://www.figma.com/design/HEgdVQJ9qZdJFYm5o2b3ki/Enterprise-Design-System?node-id=10941-406859&m=dev'
```

### Token Extraction from Figma
When using MCP Figma to extract tokens:

1. **Colors:**
   - Use `/Figma/get_variable_defs` to get color variables
   - Extract color styles from Figma
   - Define as CSS variables in `@theme` in `globals.css` with `lm-` prefix
   - Example: `--color-lm-button-primary: #0f62fe;`
   - Use in components: `bg-[var(--color-lm-button-primary)]`

2. **Typography:**
   - Extract text styles (font family, size, weight, line height)
   - Define as CSS variables in `@theme` in `globals.css` with `lm-` prefix
   - Example: `--font-size-lm-body-compact-01: 14px;`
   - Use in components: `text-[var(--font-size-lm-body-compact-01)]`

3. **Spacing:**
   - Extract spacing scale from Figma
   - Define as CSS variables in `@theme` in `globals.css` with `lm-` prefix
   - Example: `--spacing-lm-button-padding-horizontal-medium: 16px;`
   - Use in components: `px-[var(--spacing-lm-button-padding-horizontal-medium)]`

4. **Component Specs:**
   - Use `/Figma/get_design_context` to get exact specifications
   - Extract component dimensions, padding, border radius
   - Match exactly in component implementation
   - Document any deviations (should be minimal)

### MCP Figma Commands Reference
- `/Figma/get_design_context` - Get UI code and design specs for a node
- `/Figma/get_variable_defs` - Get variable definitions (design tokens)
- `/Figma/get_metadata` - Get node structure overview
- `/Figma/get_screenshot` - Generate screenshot of a node
- `/Figma/create_design_system_rules` - Generate design system rules (this file)

---

## 9. Best Practices

### Component Implementation
1. **Always extract from Figma first** - Never use placeholder/hardcoded values
2. **Always use Radix UI primitives** for interactive components (accessibility)
3. **Style with Tailwind CSS** to match Figma designs exactly (pixel-perfect)
4. **Use CVA for variants** to ensure type safety
5. **Export both component and variants** for flexibility
6. **Verify against Figma** before considering implementation complete

### Token Usage
1. **Extract tokens from Figma** using MCP Figma before implementation
2. **Define tokens in `@theme`** in `globals.css` with `lm-` prefix as CSS variables
3. **Use CSS variables in components** via Tailwind arbitrary values: `bg-[var(--color-lm-button-primary)]`
4. **Maintain token consistency** across all components
5. **Update tokens** when Figma design changes (update `@theme` in `globals.css` only)
6. **No separate token files** - all tokens exist as CSS variables in `globals.css`

### Storybook Documentation
1. **Link to Figma design** in every story (required)
2. **Document all variants** and states from Figma
3. **Include accessibility tests** using a11y addon
4. **Show responsive behavior** with different viewports
5. **Compare with Figma** to ensure accuracy

### Code Quality
1. **TypeScript strict mode** enabled
2. **Use `cn()` utility** for all class merging
3. **Follow naming conventions** consistently
4. **Export types** for component props
5. **Match Figma exactly** - no approximations

---

## 10. Migration Path from Demo to Figma-Based

### Current State (DEMO)
- Components use placeholder/hardcoded values
- No Figma token integration
- `Button.tsx` is demo only, does NOT match Figma

### Target State (Figma-Based)
- All components match Figma design exactly
- Design tokens extracted from Figma
- Tokens defined ONLY in `@theme` directive in `fe/src/app/globals.css` with `lm-` prefix
- Components use CSS variables via Tailwind arbitrary values: `bg-[var(--color-lm-button-primary)]`
- No separate token files - tokens exist only as CSS variables

### Migration Steps for Each Component

1. **Extract from Figma:**
   - Use MCP Figma `/Figma/get_design_context` with component node-id
   - Extract all variants, sizes, states, colors, spacing
   - Use `/Figma/get_variable_defs` for design tokens

2. **Create/Update Tokens:**
   - Define tokens directly in `@theme` directive in `fe/src/app/globals.css` with `lm-` prefix
   - All tokens use `lm-` prefix (e.g., `--color-lm-button-primary`)
   - No separate token files needed

3. **Re-implement Component:**
   - Replace demo implementation with Figma-based implementation
   - Use extracted tokens and specifications
   - Match Figma design pixel-perfect

4. **Update Storybook:**
   - Update stories to reflect Figma design
   - Ensure Figma link is correct
   - Add all variants and states from Figma

5. **Verify:**
   - Compare Storybook with Figma side-by-side
   - Test all variants and states
   - Verify accessibility

---

## 11. Accessibility Requirements

### Standards
- **WCAG 2.1 AA** compliance (as per Carbon Design System inspiration)
- **Keyboard navigation** via Radix UI primitives
- **Screen reader support** via ARIA attributes (Radix UI)
- **Focus management** via Radix UI focus traps

### Testing
- Use Storybook `@storybook/addon-a11y` for accessibility testing
- Test with keyboard navigation
- Test with screen readers
- Verify color contrast ratios (should match Figma specifications)

---

## 12. File Paths Reference

### Key Files
- **Component (DEMO):** `fe/src/components/ui/Button.tsx` - Needs re-implementation
- **Stories:** `fe/src/components/ui/Button.stories.tsx`
- **Utils:** `fe/src/utils/cn.ts`
- **Global Styles:** `fe/src/app/globals.css`
- **Layout:** `fe/src/app/layout.tsx`
- **Storybook Config:** `fe/.storybook/main.ts`
- **Storybook Preview:** `fe/.storybook/preview.ts`
- **Package:** `fe/package.json`
- **TypeScript Config:** `fe/tsconfig.json`

### Files to be Created/Updated
- `fe/tailwind.config.ts` - Minimal Tailwind config (only content paths)
- `fe/src/app/globals.css` - Contains `@theme` directive with all design tokens (CSS variables with `lm-` prefix)
- **Note:** No separate token files - all tokens are defined in `@theme` in `globals.css`

---

## 13. Critical Reminders

### ⚠️ IMPORTANT NOTES

1. **Current Button is DEMO ONLY** - Does NOT match Figma design
2. **Always extract from Figma first** - Never use placeholder values
3. **Match Figma pixel-perfect** - No approximations
4. **Use MCP Figma commands** to extract design specifications
5. **Store tokens centrally** in `@theme` in `fe/src/app/globals.css`
6. **Link to Figma** in all Storybook stories
7. **Verify against Figma** before considering complete

### Workflow Checklist for New Components

- [ ] Extract design context from Figma using MCP Figma
- [ ] Extract design tokens (colors, typography, spacing)
- [ ] Define tokens in `@theme` in `fe/src/app/globals.css` with `lm-` prefix
- [ ] Implement component matching Figma exactly
- [ ] Create Storybook stories with Figma link
- [ ] Verify pixel-perfect match with Figma
- [ ] Test accessibility
- [ ] Document any deviations (should be minimal)

---

## 14. Figma File Reference

**Figma Design System:**
- **File Key:** `HEgdVQJ9qZdJFYm5o2b3ki`
- **File Name:** Enterprise Design System
- **Button Node ID:** `10941-406859`
- **URL:** https://www.figma.com/design/HEgdVQJ9qZdJFYm5o2b3ki/Enterprise-Design-System?node-id=10941-406859&m=dev

**MCP Figma Usage:**
```bash
# Get Button design context
/Figma/get_design_context nodeId="10941-406859" fileKey="HEgdVQJ9qZdJFYm5o2b3ki"

# Get design tokens
/Figma/get_variable_defs nodeId="10941-406859" fileKey="HEgdVQJ9qZdJFYm5o2b3ki"
```
