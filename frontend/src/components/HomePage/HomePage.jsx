import React, { useEffect } from 'react';
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import './HomePage.css';

const HomePage = () => {

    useEffect(() => {
        const validateJwt = async () => {
            try {
                const request = new Request('/api/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    },
                });
                const response = await fetch(request);
                if (response.status === 200) {
                    window.location.href= '/profile';
                }
            } catch (error) {
                console.error('Error during API call:', error);
            }
        };

        validateJwt();
    }, []);

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
