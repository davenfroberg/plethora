import React, {useState} from 'react';
import './RegisterForm.css';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Registering in with username: ${username} and password: ${password}`);
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