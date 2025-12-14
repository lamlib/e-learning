import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
    'ps-4 py-3 pe-4 focus:shadow-[inset_0_0_0_2px_var(--color-ds-focus),inset_0_0_0_3px_var(--color-ds-focus-inset)] disabled:bg-ds-button-disabled',
    {
        variants: {
            variant: {
                'primary': 'text-ds-text-on-color bg-ds-button-primary hover:bg-ds-button-primary-hover active:bg-ds-button-primary-active',
                'secondary': 'bg-ds-button-secondary hover:bg-ds-button-secondary-hover active:bg-ds-button-secondary-active',
                'tertiary': 'text-ds-button-tertiary bg-transparent border border-ds-button-tertiary hover:bg-ds-button-tertiary-hover hover:text-ds-text-inverse active:bg-ds-button-tertiary-active active:text-ds-text-inverse focus:bg-ds-button-tertiary-active focus:text-ds-text-inverse',
                'ghost': 'bg-ds-button-ghost hover:bg-ds-button-ghost-hover active:bg-ds-button-ghost-active',
                'danger-primary': 'bg-ds-button-danger-primary hover:bg-ds-button-danger-hover active:bg-ds-button-danger-active',
                'danger-secondary': 'bg-ds-button-danger-secondary hover:bg-ds-button-danger-hover active:bg-ds-button-danger-active',
                'danger-tertiary': 'bg-ds-button-danger-tertiary hover:bg-ds-button-danger-hover active:bg-ds-button-danger-active',
                'danger-ghost': 'bg-ds-button-danger-ghost hover:bg-ds-button-danger-hover active:bg-ds-button-danger-active',
            },
            size: {
                '2x-large': '',
                'extra-large': '',
                'large': '',
                'medium': '',
                'small': '',
                'extra-small': '',
                'expressive': '',
            }
        },
        defaultVariants: {
            size: 'medium',
            variant: 'primary',
        }
    },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> , VariantProps<typeof buttonVariants> {
    leftIcon?: React.ReactNode,
}

export default function Button ({children, variant, size, leftIcon, className, ...props}: ButtonProps) {
    return (
        <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
            <div className={cn(leftIcon ? "justify-between" : "", "flex items-center")}>
                {children}
                {leftIcon}
            </div>
        </button>
    )
}



