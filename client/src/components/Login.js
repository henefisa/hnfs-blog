import React from 'react';

export default () => (
    <div className="login">
        <form>
            <label htmlFor="username">Username </label>
            <input type="text" id="username" name="username"/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"/>
            <button>Login</button>
        </form>
    </div>
);