import * as React from 'react';
import { Routes, Route } from "react-router-dom";
// pages
import PatientSignup from './Signup/PatientSignup';
import Dashboard from './Dashboard/Dashboard';
import UserDashboard from './Dashboard/UserDashboard';
import UserProfile from './Profile/UserProfile';
import ChatHistory from './Chatbot/ChatHistory';
import MedicalPrescription from './MedicalPrescription/MedicalPrescription';
import ProvidersView from './ProviderView/ProvidersView';
import UserManagement from './UserManagement/UserManagement';
import Contact from './Contact/Contact';
import About from './About/About';
import Whoops404 from './Whoops404';
// components
import ZohoSalesIQ from '../components/Chatbot/ZohoSalesIQ';
import TopNavigationBar from '../components/Navigation/TopNavigationBar';
import BottomNavigationBar from '../components/Navigation/BottomNavigationBar';
import Consultation from './Consultation/Consultation';

function Main() {
    
    return (
        <>
            <TopNavigationBar></TopNavigationBar>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<PatientSignup />}/>

                {/* after authentication navbar different*/}
                <Route path="/user-dashboard" element={<UserDashboard />}/>
                <Route path="/user-profile" element={<UserProfile />}/>
                <Route path="/telehealth" element={<Consultation />}/>
                <Route path="/prescription-refill" element={<MedicalPrescription />} />
                <Route path="/provider-search" element={<ProvidersView />}/>
                 
                <Route path="/contact" element={<Contact />}/>
                <Route path="/about" element={<About />}/>
                <Route path="*" element={<Whoops404 />}/>
            </Routes>
            
            <BottomNavigationBar></BottomNavigationBar>
            <ZohoSalesIQ />
        </>
        
    );
}

export default Main;
