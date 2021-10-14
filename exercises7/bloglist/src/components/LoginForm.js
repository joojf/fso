import React from 'react'

const LoginForm = ({
    handleLogin,
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
}) => (
    <form onSubmit={handleLogin}>
        <div>
            username
            <input
                type="text"
                id="username"
                value={username}
                name="Username"
                onChange={handleUsernameChange}
            />
        </div>
        <div>
            password
            <input
                type="password"
                id="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange}
            />
        </div>
        <button id="login-button" type="submit">
            login
        </button>
    </form>
)

export default LoginForm
