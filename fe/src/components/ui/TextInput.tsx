import { cn } from "@/utils/cn";
import React from "react";

export default function TextInput({children, className, ...props}: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className={cn('px-4 py-3 flex flex-col gap-1 bg-ds-field-01 border-b border-ds-border-strong-01', className)}>
            <input className="focus:outline-0 text-ds-text-primary placeholder:text-ds-text-placeholder"  {...props}/>
        </div>
    );
}