import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// pages

import DoctorDashboard from './Dashboard/DoctorDashboard';
import DoctorProfile from './Profile/DoctorProfile';
import Whoops404 from './Whoops404';
import Home from './Home';
import DoctorSignup from './Signup/DoctorSignup'
import TopNavigationBar from '../components/Navigation/TopNavigationBar';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        margin: 40,

    },
})
const mdTheme = createTheme();
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
                                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                                <Route path="/doctor-profile" element={<DoctorProfile />} />
                                <Route path="/signup" element={<DoctorSignup />} />
                                <Route path="/" element={<Home />} />
                                <Route path="*" element={<Whoops404 />} />
                            </Routes>
                    </Box>
                </Container>

            </React.Fragment>

        </ThemeProvider >

    );
}

export default Main;
