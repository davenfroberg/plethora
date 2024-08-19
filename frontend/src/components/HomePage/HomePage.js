import React from 'react';
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="center-screen">
            <div id="title">
                <h1>Plethora File Storage</h1>
                <h2>The Google Drive killer</h2>
            </div>
            <div className="container">
                <RegisterForm/>
                <LoginForm/>
            </div>
        </div>
    );
};

export default HomePage;
