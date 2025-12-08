import React from "react";

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full flex">
            {children}
            <div className="flex-1 bg-zinc-100 dark:bg-zinc-900">
            </div>
        </div>
    )
}