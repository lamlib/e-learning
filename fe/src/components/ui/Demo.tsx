import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

/**
 * Button component matching Figma Enterprise Design System
 * Design Source: https://www.figma.com/design/HEgdVQJ9qZdJFYm5o2b3ki/Enterprise-Design-System?m=dev
 * 
 * Colors extracted from Figma:
 * - Primary: #0f62fe (hover: #0050e6, active: #002d9c)
 * - Secondary: #393939 (hover: #474747, active: #6f6f6f)
 * - Tertiary: #0f62fe (hover: #0050e6, active: #002d9c)
 * - Danger: #da1e28 (hover: #b81922, active: #750e13)
 * - Disabled: #c6c6c6
 * - Text on color: #ffffff
 * - Text primary: #161616
 * - Focus: #0f62fe
 */
/**
 * Button component matching Figma Enterprise Design System exactly
 * Design Source: https://www.figma.com/design/HEgdVQJ9qZdJFYm5o2b3ki/Enterprise-Design-System?m=dev
 * 
 * Key specifications from Figma:
 * - Font: IBM Plex Sans (Regular, 400)
 * - Icon positioning: Absolute right with 16px spacing
 * - Padding: pl-[16px] pr-[64px] when has icon, pr-[16px] when no icon
 * - Border radius: 0 (no rounded corners based on Figma design)
 * - Typography: body-compact-01 (14px/18px) for small/medium, body-compact-02 (16px/22px) for large
 */
const buttonVariants = cva(
  // Base styles from Figma Enterprise Design System
  // Note: No border-radius based on Figma design (square corners)
  // Using font-lm-sans from @theme in globals.css (IBM Plex Sans)
  'relative font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none font-[var(--font-lm-sans)]',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-lm-button-primary)] text-[var(--color-lm-text-on-color)] hover:bg-[var(--color-lm-button-primary-hover)] active:bg-[var(--color-lm-button-primary-active)] focus-visible:ring-[var(--color-lm-focus)] disabled:bg-[var(--color-lm-button-disabled)] disabled:text-[var(--color-lm-text-on-color-disabled)]',
        secondary:
          'bg-[var(--color-lm-button-secondary)] text-[var(--color-lm-text-on-color)] hover:bg-[var(--color-lm-button-secondary-hover)] active:bg-[var(--color-lm-button-secondary-active)] focus-visible:ring-[var(--color-lm-focus)] disabled:bg-[var(--color-lm-button-disabled)] disabled:text-[var(--color-lm-text-on-color-disabled)]',
        tertiary:
          'bg-transparent text-[var(--color-lm-button-tertiary)] border border-[var(--color-lm-border)] hover:bg-[var(--color-lm-background-hover)] hover:text-[var(--color-lm-button-tertiary-hover)] active:bg-[var(--color-lm-background-active)] active:text-[var(--color-lm-button-tertiary-active)] focus-visible:ring-[var(--color-lm-focus)] disabled:border-[var(--color-lm-button-disabled)] disabled:text-[var(--color-lm-text-on-color-disabled)]',
        ghost:
          'bg-transparent text-[var(--color-lm-text-primary)] hover:bg-[var(--color-lm-background-hover)] active:bg-[var(--color-lm-background-active)] focus-visible:ring-[var(--color-lm-focus)] disabled:text-[var(--color-lm-text-on-color-disabled)]',
        'danger-primary':
          'bg-[var(--color-lm-button-danger-primary)] text-[var(--color-lm-text-on-color)] hover:bg-[var(--color-lm-button-danger-hover)] active:bg-[var(--color-lm-button-danger-active)] focus-visible:ring-[var(--color-lm-focus)] disabled:bg-[var(--color-lm-button-disabled)] disabled:text-[var(--color-lm-text-on-color-disabled)]',
        'danger-tertiary':
          'bg-transparent text-[var(--color-lm-button-danger-primary)] border border-[var(--color-lm-button-danger-primary)] hover:bg-[var(--color-lm-background-hover)] hover:text-[var(--color-lm-button-danger-hover)] active:bg-[var(--color-lm-background-active)] active:text-[var(--color-lm-button-danger-active)] focus-visible:ring-[var(--color-lm-focus)] disabled:border-[var(--color-lm-button-disabled)] disabled:text-[var(--color-lm-text-on-color-disabled)]',
        'danger-ghost':
          'bg-transparent text-[var(--color-lm-button-danger-primary)] hover:bg-[var(--color-lm-background-hover)] active:bg-[var(--color-lm-background-active)] focus-visible:ring-[var(--color-lm-focus)] disabled:text-[var(--color-lm-text-on-color-disabled)]',
      },
      size: {
        // Small: 32px height - using CSS variables from @theme in globals.css
        // Padding: pl-[16px] pr-[16px] when no icon, pr-[64px] when has icon
        small:
          'h-8 text-[var(--font-size-lm-body-compact-01)] leading-[var(--line-height-lm-body-compact-01)] tracking-[var(--letter-spacing-lm-body-compact-01)] font-[var(--font-weight-lm-body-compact-01)]',
        // Medium: 40px height - using CSS variables from @theme
        // Padding: pl-[16px] pr-[16px] py-[11px] when no icon, pr-[64px] when has icon
        medium:
          'h-10 text-[var(--font-size-lm-body-compact-01)] leading-[var(--line-height-lm-body-compact-01)] tracking-[var(--letter-spacing-lm-body-compact-01)] font-[var(--font-weight-lm-body-compact-01)]',
        // Large: 48px height - using CSS variables from @theme
        // Padding: pl-[16px] pr-[16px] py-[15px] when no icon, pr-[64px] when has icon
        large:
          'h-12 text-[var(--font-size-lm-body-compact-02)] leading-[var(--line-height-lm-body-compact-02)] tracking-[var(--letter-spacing-lm-body-compact-02)] font-[var(--font-weight-lm-body-compact-02)]',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      fullWidth: false,
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
  skeleton?: boolean;
}

const Demo = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      skeleton = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    // Icon size based on button size - extracted from Figma (16px for small/medium, 20px for large)
    const iconSize = size === 'small' || size === 'medium' ? 'h-4 w-4' : 'h-5 w-5';

    // Padding based on size and icon presence - extracted from Figma
    // When has icon: pl-[16px] pr-[64px], when no icon: pl-[16px] pr-[16px]
    // Vertical padding: py-[11px] for medium, py-[15px] for large, py-[7px] for small (calculated)
    const hasIcon = !loading && (leftIcon || rightIcon);
    const paddingClasses = {
      small: hasIcon ? 'pl-[16px] pr-[64px] py-[7px]' : 'pl-[16px] pr-[16px] py-[7px]',
      medium: hasIcon ? 'pl-[16px] pr-[64px] py-[11px]' : 'pl-[16px] pr-[16px] py-[11px]',
      large: hasIcon ? 'pl-[16px] pr-[64px] py-[15px]' : 'pl-[16px] pr-[16px] py-[15px]',
    };

    // Skeleton state - extracted from Figma
    if (skeleton) {
      return (
        <Comp
          className={cn(
            buttonVariants({ variant, size, fullWidth }),
            'bg-[var(--color-lm-skeleton-background)]',
            'relative overflow-hidden',
            paddingClasses[size || 'medium'],
            className
          )}
          ref={ref}
          disabled={true}
          {...props}
        >
          <div className="absolute inset-0 bg-[var(--color-lm-skeleton-element)] animate-pulse" />
          <span className="relative opacity-0">{children || 'Button'}</span>
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          paddingClasses[size || 'medium'],
          'flex items-center',
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {/* Button content wrapper - matching Figma structure */}
        <div className="flex items-center relative w-full">
          {loading && (
            <svg
              className={cn('animate-spin', iconSize)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {!loading && leftIcon && (
            <span className={cn('shrink-0 mr-2', iconSize)}>{leftIcon}</span>
          )}
          {children && <span className="relative z-10">{children}</span>}
          {!loading && rightIcon && (
            <span
              className={cn(
                'absolute right-[16px] top-1/2 -translate-y-1/2 z-0',
                iconSize
              )}
            >
              {rightIcon}
            </span>
          )}
        </div>
      </Comp>
    );
  }
);

Demo.displayName = 'Button';

export { Demo , buttonVariants };

