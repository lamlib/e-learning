"use client";

import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import TextInput from "@/components/ui/TextInput";
import { ArrowRight } from "@carbon/icons-react";
import { ChangeEvent, useState } from "react";

export default function LoginPage() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let isUsernameValid = !username;
    function handleClickContinue() {
        setStep(2);
    }

    function handleClickLoginWithGoogle() {
        //TODO: Implement logic login google
    }

    function handleClickLoginWithApple() {
        //TODO: Implement logic login apple
    }

    function handleClickLogin() {

    }

    function handleClickNotYou() {
        setStep(1);
    }

    function handleClickCreateAnElearningID() {

    }

    function handleClickForgotID() {

    }

    function handleClickForgotPassword() {

    }

    function handleOnChangeUsername(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        event.stopPropagation();
        setUsername(event.currentTarget.value);
    }

    function handleOnChangePassword(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        event.stopPropagation();
        setPassword(event.currentTarget.value);
    }

    return (
        <div className="flex min-h-screen items-start justify-center w-96">
            <div className="w-full p-8">
                {step === 1 && (
                    <>
                        <h1 className="mb-2 text-3xl font-bold">Log in</h1>
                        <div className="flex justify-between gap-2 mb-8 text-sm">
                            Don't have an account?{' '}
                            <Link href="/register">Create an ElearningID</Link>
                        </div>

                        <hr className="mb-6" />

                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2 text-sm">
                                <span className="font-medium">Continue with ElearningID</span>
                            </div>
                            <TextInput type="email" value={username} placeholder="username@elearning.com" onChange={handleOnChangeUsername} className="mb-3"/>
                            <Button leftIcon={<ArrowRight/>} onClick={handleClickContinue} className="w-full mb-3" disabled={isUsernameValid}>
                                Continue
                            </Button>
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    name="rememberID"
                                    id="rememberID"
                                    className="mr-2"
                                />
                                <label htmlFor="rememberID" className="text-sm">
                                    Remember my ID
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center my-4">
                            <div className="grow border-t border-gray-200"></div>
                            <span className="mx-3 text-sm text-gray-400">or</span>
                            <div className="grow border-t border-gray-200"></div>
                        </div>

                        <div className="flex flex-col gap-3 mb-6">
                            <Button leftIcon={<ArrowRight/>} variant="tertiary" onClick={handleClickLoginWithGoogle}>
                                Login with Google
                            </Button>
                            <Button leftIcon={<ArrowRight/>} variant="tertiary" onClick={handleClickLoginWithApple}>
                                Login with Apple
                            </Button>
                        </div>

                        <hr className="mb-4" />

                        <div className="text-center text-sm">
                            Need help?{' '}
                            <Link href="tel:+91123-456-7890">Contact the Elearning help desk</Link>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h1 className="mb-2 text-3xl font-bold">Log in</h1>
                        <div className="flex justify-between gap-2 mb-8 text-sm">
                            <span>Logging in as <span className="font-medium">{username}</span></span>
                            <Link href="#" onClick={() => {setStep(1)}}>Not you?</Link>
                        </div>

                        <hr className="mb-6" />

                        <div className="flex justify-between items-center mb-2 text-sm">
                            <span className="font-medium">Password</span>
                            <Link href="/register">Forgot password?</Link>
                        </div>
                        <TextInput onChange={handleOnChangePassword}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="mb-3"
                        />
                        <Button leftIcon={<ArrowRight/>} onClick={handleClickLogin} className="w-full">
                            Login
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}