import * as React from 'react';
import { Routes, Route } from "react-router-dom";
// pages
import PatientSignup from './Signup/PatientSignup';
import DoctorSignup from './Signup/DoctorSignup';
import Dashboard from './Dashboard/Dashboard';
import UserDashboard from './Dashboard/UserDashboard';
import DoctorDashboard from './Dashboard/DoctorDashboard';
import AdminDashboard from './Dashboard/AdminDashboard';
import UserProfile from './Profile/UserProfile';
import DoctorProfile from './Profile/DoctorProfile';
import Order from './Order/Order';
import MyHealth from './MyHealth/MyHealth';
import ChatHistory from './Chatbot/ChatHistory';
import Consultation from './Consultation/Consultation';
import ConsultationDoctorView from './Consultation/ConsultationDoctorView';
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
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<PatientSignup />}/>
                <Route path="/doctor-signup" element={<DoctorSignup />}/>
                {/* after authentication navbar different*/}
                <Route path="/user-dashboard" element={<UserDashboard />}/>
                <Route path="/doctor-dashboard" element={<DoctorDashboard />}/>
                <Route path="/admin-dashboard" element={<AdminDashboard />}/>
                <Route path="/user-profile" element={<UserProfile />}/>
                <Route path="/doctor-profile" element={<DoctorProfile />}/>
                <Route path="/mycart" element={<Order />}/>
                <Route path="/myhealth" element={<MyHealth />}/>
                <Route path="/chathistory" element={<ChatHistory />}/>
                <Route path="/user-consultation" element={<Consultation />}/>
                <Route path="/doctor-consultation" element={<ConsultationDoctorView />}/>
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
