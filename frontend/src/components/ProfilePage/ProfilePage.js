import React, {useEffect, useState} from 'react';
import './ProfilePage.css';
import {useNavigate} from "react-router-dom";

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
            })
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
        <div>
            <p>Profile Page!</p>
            <span>{username}</span>
        </div>
    );
};

export default ProfilePage;
