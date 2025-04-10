import React, {useEffect, useState} from 'react';
import './ProfilePage.css';
import {useNavigate} from "react-router-dom";
import Files from "../Files/Files";

const ProfilePage = () => {
    const [username, setUsername] = useState();
    const [isTokenValidated, setIsTokenValidated] = useState(false);

    const navigate = useNavigate();

    async function getProfile() {
        return await fetch('/api/profile',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                if (!response.ok) {
                    throw new Error('Unauthorized');
                }
                const data = await response.json();
                setUsername(data.username);
                setIsTokenValidated(true);
            } catch (error) {
                console.error('Profile fetch failed:', error);
                navigate('/');
            }
        };

        fetchProfile();
    }, []);

    if (!isTokenValidated) {
        return (<div/>);
    }
    return (
        <div className="profile-page">
            <div className="profile-page-header">
                <h1 className="title">Plethora</h1>
                <button id="logout-button" onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/');
                }}>Logout</button>
            </div>
            <Files/>
        </div>
    );
};

export default ProfilePage;
