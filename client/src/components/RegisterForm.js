import React, { useState } from "react";

let emailTimeout;

const REGEX_CHECK_EMAIL = /\S+@[a-zA-Z0-9]{2,}\.\S{2,4}$/;

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isEmailError, setIsEmailError] = useState(false);
    const [isUsernameError, setIsUsernameError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    

    const onUsernameChange = async e => {
        const { value } = e.target;
        setUsername(value);
    };
    const onPasswordChange = e => {
        const { value } = e.target;
        setPassword(value);
    };

    const onEmailChange = e => {
        const { value } = e.target;
        setEmail(value);
        clearTimeout(emailTimeout);

        if(REGEX_CHECK_EMAIL.test(email)){
            emailTimeout = setTimeout(async () => {
                const fetchData = await fetch("/authentication/check_email", {
                    method: "POST",
                    body: JSON.stringify({
                        email
                    })
                });
                const valid = await fetchData.json();
                console.log(valid);
            }, 1000);
        }else {
            console.log("Errrrrrrrrorrrrr");
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        const fetchData = await fetch("/authentication/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });
        const result = await fetchData.json();
        if (result.success) {
            setIsSuccess(true);
        }
    };

    return (
        <div>
            <form>
                <label htmlFor="username"> Username</label>
                <input
                    name="username"
                    value={username}
                    onChange={onUsernameChange}
                />
                <label htmlFor="email"> Email</label>
                <input name="email" value={email} onChange={onEmailChange} />
                <label htmlFor="password"> Password</label>
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChange}
                />
            </form>
        </div>
    );
};

export default RegisterForm;
