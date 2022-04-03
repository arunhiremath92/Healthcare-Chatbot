import * as React from 'react';
import { Routes, Route } from "react-router-dom";
// pages

import DoctorDashboard from './Dashboard/DoctorDashboard';
import DoctorProfile from './Profile/DoctorProfile';
import Whoops404 from './Whoops404';
import Home from './Home';
import DoctorSignup from './Signup/DoctorSignup'

function Main() {
    
    return (
        <>
            <Routes>
                <Route path="/doctor-dashboard" element={   <DoctorDashboard />}/>
                <Route path="/doctor-profile" element={<DoctorProfile/>}/>
                <Route path="/signup" element={<DoctorSignup/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<Whoops404 />}/>
            </Routes>
           
        </>
    );
}

export default Main;
