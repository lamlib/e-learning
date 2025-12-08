'use client';

import Button from "@/components/ui/Button";
import { ChangeEvent, useState } from "react";

export default function LoginPage() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                {step === 1 && (
                    <>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">Log in</h1>
                        <div className="mb-8 text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={handleClickCreateAnElearningID}
                                className="underline text-blue-600 font-medium hover:text-blue-800"
                            >
                                Create an ElearningID
                            </button>
                        </div>

                        <hr className="mb-6" />

                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2 text-sm">
                                <span className="text-gray-700 font-medium">Continue with ElearningID</span>
                                <button
                                    onClick={handleClickForgotID}
                                    className="text-blue-500 hover:underline"
                                    type="button"
                                >
                                    Forgot ID?
                                </button>
                            </div>
                            <input
                                onChange={handleOnChangeUsername}
                                type="email"
                                placeholder="username@elearning.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
                            />
                            <Button
                                onClick={handleClickContinue}
                                className="w-full mb-3"
                            >
                                Continue
                            </Button>
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    name="rememberID"
                                    id="rememberID"
                                    className="mr-2"
                                />
                                <label htmlFor="rememberID" className="text-sm text-gray-700">
                                    Remember my ID
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="mx-3 text-sm text-gray-400">or</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <div className="flex flex-col gap-3 mb-6">
                            <button
                                type="button"
                                onClick={handleClickLoginWithGoogle}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 transition focus:outline-none"
                            >
                                <span>Login with Google</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleClickLoginWithApple}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 transition focus:outline-none"
                            >
                                <span>Login with Apple</span>
                            </button>
                        </div>

                        <hr className="mb-4" />

                        <div className="text-center text-sm text-gray-500">
                            Need help?{' '}
                            <span className="underline text-blue-500 cursor-pointer">
                                Contact the Elearning help desk
                            </span>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">Log in</h1>
                        <div className="flex items-center mb-6 text-sm text-gray-700">
                            <span>Logging in as <span className="font-medium">{username}</span></span>
                            <button
                                onClick={handleClickNotYou}
                                className="ml-2 text-blue-500 underline hover:text-blue-700"
                                type="button"
                            >
                                Not you?
                            </button>
                        </div>

                        <hr className="mb-6" />

                        <div className="flex justify-between items-center mb-2 text-sm">
                            <span className="text-gray-700 font-medium">Password</span>
                            <button
                                onClick={handleClickForgotPassword}
                                className="text-blue-500 hover:underline"
                                type="button"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <input
                            onChange={handleOnChangePassword}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-5"
                        />
                        <Button onClick={handleClickLogin} className="w-full">
                            Login
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}