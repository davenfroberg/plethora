import React from 'react';
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="center-screen">
            <div className="container">
                <RegisterForm/>
                <LoginForm/>
            </div>
        </div>
    );
};

export default HomePage;
