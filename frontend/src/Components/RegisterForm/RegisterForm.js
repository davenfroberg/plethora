import React, {useState} from 'react';
import './RegisterForm.css';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Registering in with username: ${username} and password: ${password}`);
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .then(data => {
                window.location.href = '/profile.html';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h1 id="header">Register</h1>
            <label>
                <span>Username:</span>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>
                <span>Password:</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <input type="submit" value="Register"/>
        </form>
    );
}

export default RegisterForm;