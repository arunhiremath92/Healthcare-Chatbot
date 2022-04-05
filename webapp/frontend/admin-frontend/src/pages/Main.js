import React from "react";
import { Routes, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// pages
import Dashboard from './Dashboard/Dashboard';
import AdminDashboard from './Dashboard/AdminDashboard';
import AdminChatHistory from './Chatbot/AdminChatHistory';
import AdminStatistics from './Statistics/AdminStatistics';
import UserManagement from './UserManagement/UserManagement';
import Whoops404 from './Whoops404';
import Feedbacks from './Statistics/Feedbacks';
import TopNavigationBar from "../components/Navigation/TopNavigationBar";
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
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/dashboard" element={<Dashboard />} />

                            {/* after authentication navbar different*/}
                            <Route path="/admin-dashboard" element={<AdminDashboard />} />
                            <Route path="/admin-chathistory" element={<AdminChatHistory />} />
                            <Route path="/statistics" element={<AdminStatistics />} />
                            <Route path="/management" element={<UserManagement />} />
                            <Route path="/feedback" element={<Feedbacks />} />
                            <Route path="*" element={<Whoops404 />} />
                        </Routes>
                    </Box>
                </Container>
            </React.Fragment>
        </ThemeProvider >
    );
}

export default Main;
