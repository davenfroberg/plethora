import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <div className="center-screen">
            <div className="container">
                <RegisterForm/>
                <LoginForm/>
            </div>
        </div>
    </React.StrictMode>
);
