
import React from "react";
import { Routes, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// pages
import PatientSignup from './Signup/PatientSignup';
import Dashboard from './Dashboard/Dashboard';
import UserDashboard from './Dashboard/UserDashboard';
import UserProfile from './Profile/UserProfile';
import MedicalPrescription from './MedicalPrescription/MedicalPrescription';
import ProvidersView from './ProviderView/ProvidersView';


import Contact from './Contact/Contact';

import About from './About/About';
import Whoops404 from './Whoops404';

// components
import ZohoSalesIQ from '../components/Chatbot/ZohoSalesIQ';
import TopNavigationBar from '../components/Navigation/TopNavigationBar';
import BottomNavigationBar from '../components/Navigation/BottomNavigationBar';
import Consultation from './Consultation/Consultation';
const mdTheme = createTheme();


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        margin: 40,
       
    },
})
function Main() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={mdTheme}>
            <TopNavigationBar></TopNavigationBar>
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg" >
                    <Box sx={{ minHeight: '50vw' }} className={classes.root}>
                        <Routes>
                            
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/signup" element={<PatientSignup />} />

                            {/* after authentication navbar different*/}
                            <Route path="/user-dashboard" element={<UserDashboard />} />
                            <Route path="/user-profile" element={<UserProfile />} />
                            <Route path="/telehealth" element={<Consultation />} />
                            <Route path="/prescription-refill" element={<MedicalPrescription />} />
                            <Route path="/provider-search" element={<ProvidersView />} />

                            <Route path="/contact" element={<Contact />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/" element={<Dashboard />} />
                            <Route path="*" element={<Whoops404 />} />

                        </Routes>
                    </Box>
                </Container>
                <BottomNavigationBar></BottomNavigationBar>
                <ZohoSalesIQ />
            </React.Fragment>

        </ThemeProvider >

    );
}

export default Main;
