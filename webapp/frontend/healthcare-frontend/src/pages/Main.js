import * as React from 'react';
import { Routes, Route } from "react-router-dom";
// pages
import PatientSignup from './Signup/PatientSignup';
import DoctorSignup from './Signup/DoctorSignup';
import Dashboard from './Dashboard/Dashboard';
import UserDashboard from './Dashboard/UserDashboard';
import DoctorDashboard from './Dashboard/DoctorDashboard';
import AdminDashboard from './Dashboard/AdminDashboard';
import MedicalPrescription from './MedicalPrescription/MedicalPrescription';
import ProvidersView from './ProviderView/ProvidersView';
import Contact from './Contact/Contact';
import About from './About/About';
// components
import ZohoSalesIQ from '../components/Chatbot/ZohoSalesIQ';

function Main() {
    
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/signup" element={<PatientSignup />}/>
                <Route path="/doctor-signup" element={<DoctorSignup />}/>
                {/* after authentication navbar different*/}
                <Route path="/user-dashboard" element={<UserDashboard />}/>
                <Route path="/doctor-dashboard" element={<DoctorDashboard />}/>
                <Route path="/admin-dashboard" element={<AdminDashboard />}/>
                <Route path="/prescription-refill" element={<MedicalPrescription />} />
                <Route path="/provider-search" element={<ProvidersView />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/about" element={<About />}/>
            </Routes>
            <ZohoSalesIQ />
        </>
    );
}

export default Main;
