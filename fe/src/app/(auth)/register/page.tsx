import { ChangeEvent, useState } from "react";

export default function RegisterPage () {
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
        <div>
        {step == 1 && 
            (<div className="bg-white p-4">
                <div>
                    Log in
                </div>
                <div>
                    Dont't have account? <span onClick={handleClickCreateAnElearningID}>Create an ElearningID</span>
                </div>
                <div>
                    <div>
                        <span>Continue with ElearningID</span>
                        <span onClick={handleClickForgotID}>Forgot ID?</span>
                    </div>
                    <input onChange={handleOnChangeUsername} type="email" placeholder="username@elearning.com" />
                </div>
                <div>
                    <span onClick={handleClickContinue}>Continue</span>
                </div>
                <div>
                   <input type="checkbox" name="rememberID" id="rememberID" />
                </div>
                <hr />

                <button type="button" onClick={handleClickLoginWithGoogle}>Login with Google</button>
                <button type="button" onClick={handleClickLoginWithApple}>Login with Apple</button>

                <hr />

                <div>
                    Need help? <span>Contact the Elearning help desk</span>
                </div>
            </div>)
        }

        {step == 2 &&
            (<div className="bg-white p-4">
                <div>
                    Log in
                </div>
                <div>
                    Logging in as {username} <span onClick={handleClickNotYou}>Not you?</span>
                </div>

                <hr />

                <div>
                    <span>Password</span>
                    <span onClick={handleClickForgotPassword}>Forgot password?</span>
                </div>

                <input onChange={handleOnChangePassword} type="password" name="password" id="password" />
                <button onClick={handleClickLogin} type="button">Login</button>
            </div>)
        }
        </div>
    );
}