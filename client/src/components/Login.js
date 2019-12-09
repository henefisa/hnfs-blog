import React from 'react';
import axios from 'axios';
const handleSubmit = event =>{
    const {username, password} = document.forms['loginForm'];
    axios.post('/api/login', {
        username: username.value,
        password: password.value
    }).then((res) => console.log("Login....!", res.status))
    event.preventDefault();
}

const handleClick = event => {
    const {username, password} = document.forms['loginForm'];
    //event.preventDefault();
}

export default () => (
    <div className="login">
        <form name="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="username">Username </label>
            <input type="text" id="username" name="username"/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"/>
            <button onClick={handleClick}>Login</button>
        </form>
    </div>
);