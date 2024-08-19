import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from "./components/ProfilePage/ProfilePage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path ="/profile" element={<ProfilePage/>}/>
        </Routes>
    );
};

export default App;
