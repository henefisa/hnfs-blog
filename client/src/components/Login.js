import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default () => {
    const [ ,setUser] = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const history = useHistory();

    const onSubmit = async e => {
        e.preventDefault();
        const fetchData = await fetch("/authentication/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const result = await fetchData.json();
        if (result.accessToken) {
            setUser({
                accessToken: result.accessToken
            });
            history.push('/');
        } else {
            setIsError(true);
        }
    };

    const onUsernameChange = e => {
        const { value } = e.target;
        setUsername(value);
    };
    const onPasswordChange = e => {
        const { value } = e.target;
        setPassword(value);
    };

    return (
        <div className="login">
            <form name="loginForm" onSubmit={onSubmit}>
                {isError && <p>Wrong username or password!</p>}
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={onUsernameChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={onPasswordChange}
                />
                <button>Login</button>
            </form>
        </div>
    );
};
