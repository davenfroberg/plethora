import React, {useState} from 'react';
import './LoginForm.css';
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function loginUser(credentials) {
        return fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await loginUser({
                username: username,
                password: password,
            });
            localStorage.setItem('token', data.token);
            navigate('/profile');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h1 id="header">Login</h1>
            <label>
                <span>Username:</span>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>
                <span>Password:</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <input type="submit" value="Log in"/>
        </form>

    );
}

export default LoginForm;