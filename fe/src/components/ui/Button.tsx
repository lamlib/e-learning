import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
    'ps-4 py-3 pe-16',
    {
        variants: {
            variant: {
                'primary': 'bg-ds-button-primary hover:bg-ds-button-primary-hover active:bg-ds-button-primary-active focus:shadow-[inset_0_0_0_2px_var(--color-ds-focus),inset_0_0_0_3px_var(--color-ds-focus-inset)] disabled:bg-ds-button-disabled',
                'secondary': 'bg-ds-button-secondary hover:bg-ds-button-secondary-hover active:bg-ds-button-secondary-active focus:shadow-[inset_0_0_0_2px_var(--color-ds-focus),inset_0_0_0_3px_var(--color-ds-focus-inset)] disabled:bg-ds-button-disabled',
                'tertiary': 'bg-ds-button-tertiary hover:bg-ds-button-tertiary-hover active:bg-ds-button-tertiary-active focus:shadow-[inset_0_0_0_2px_var(--color-ds-focus),inset_0_0_0_3px_var(--color-ds-focus-inset)] disabled:bg-ds-button-disabled',
                'ghost': 'bg-ds-button-ghost hover:bg-ds-button-ghost-hover active:bg-ds-button-ghost-active focus:shadow-[inset_0_0_0_2px_var(--color-ds-focus),inset_0_0_0_3px_var(--color-ds-focus-inset)] disabled:bg-ds-button-disabled',
                'danger-primary': 'bg-ds-button-danger-primary hover:bg-ds-button-danger-hover active:bg-ds-button-danger-active focus:shadow-[inset_0_0_0_2px_var(--color-ds-focus),inset_0_0_0_3px_var(--color-ds-focus-inset)] disabled:bg-ds-button-disabled',
                'danger-secondary': 'bg-ds-button-danger-secondary hover:bg-ds-button-danger-hover active:bg-ds-button-danger-active focus:shadow-[inset_0_0_0_2px_var(--color-ds-focus),inset_0_0_0_3px_var(--color-ds-focus-inset)] disabled:bg-ds-button-disabled',
                'danger-tertiary': 'bg-ds-button-danger-tertiary hover:bg-ds-button-danger-hover active:bg-ds-button-danger-active focus:shadow-[inset_0_0_0_2px_var(--color-ds-focus),inset_0_0_0_3px_var(--color-ds-focus-inset)] disabled:bg-ds-button-disabled',
                'danger-ghost': 'bg-ds-button-danger-ghost hover:bg-ds-button-danger-hover active:bg-ds-button-danger-active focus:shadow-[inset_0_0_0_2px_var(--color-ds-focus),inset_0_0_0_3px_var(--color-ds-focus-inset)] disabled:bg-ds-button-disabled',
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

}

export default function Button ({variant, ...props}: ButtonProps) {
    return (
        <button className={cn(buttonVariants({ variant }))} {...props}>
            Click me!
        </button>
    )
}



