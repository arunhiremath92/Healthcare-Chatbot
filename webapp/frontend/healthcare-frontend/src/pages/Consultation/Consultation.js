import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';

import TopNavigationBarLoggedIn from '../../components/Navigation/TopNavigationBarLoggedIn';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    }
});

const mdTheme = createTheme();

export default function Consultation() {

    let redirectVar = null;
    if(!localStorage.getItem("user")){
        redirectVar = <Navigate to= "/"/>
    }

    return (
        <>
        {redirectVar}
        <ThemeProvider theme={mdTheme}>
        <Box>
            <Container maxWidth="full" sx={{ mt: 3, mb: 4 }}>
                <Grid container spacing={3}>
                    <TopNavigationBarLoggedIn />
                    {/* Consultation Main */}
                    <h1>Consultation</h1>
                </Grid>
            </Container>
        </Box>
        </ThemeProvider>
        </>
    )
}
