import * as React from 'react';
import { Routes, Route } from "react-router-dom";
// pages
import Dashboard from './Dashboard/Dashboard';
import AdminDashboard from './Dashboard/AdminDashboard';
import AdminChatHistory from './Chatbot/AdminChatHistory';
import AdminStatistics from './Statistics/AdminStatistics';
import UserManagement from './UserManagement/UserManagement';
import Whoops404 from './Whoops404';
import Feedbacks from './Statistics/Feedbacks';

function Main() {
    
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* after authentication navbar different*/}
                <Route path="/admin-dashboard" element={<AdminDashboard />}/>
                <Route path="/admin-chathistory" element={<AdminChatHistory />}/>
                <Route path="/statistics" element={<AdminStatistics />}/>
                <Route path="/management" element={<UserManagement />}/>
                <Route path="/feedback" element={<Feedbacks />}/>
                <Route path="*" element={<Whoops404 />}/>
            </Routes>
        </>
    );
}

export default Main;
