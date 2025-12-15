"use client";

import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import TextInput from "@/components/ui/TextInput";
import { ArrowRight } from "@carbon/icons-react";

export default function ForgotPasswordPage () {
    return (
        <div className="flex min-h-screen items-start justify-center w-96">
            <div className="w-full p-8">
                <h1 className="mb-2 text-3xl font-bold">Password Reset</h1>
                <div className="flex justify-start gap-2 mb-8 text-sm">
                    Do you remember you ID?
                    <Link href='/forgot-id'>Forgot ID</Link>
                </div>

                <hr className="mb-6"/>

                <div className="mb-6">
                    <TextInput type="email" placeholder="username@elearning.com" className="mb-3"/>
                    <Button leftIcon={<ArrowRight/>} className="w-full mb-3">
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}