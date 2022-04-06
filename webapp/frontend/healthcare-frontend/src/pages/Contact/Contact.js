import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import TopNavigationBar from '../../components/Navigation/TopNavigationBar';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        display: 'flex',  
        justifyContent:'center', 
        alignItems:'center'
    },
    form: {
        marginTop: 60,
        display: 'flex',  
        justifyContent:'center', 
        alignItems:'center'
    }
});

const mdTheme = createTheme();

function ContactMain(){
    const classes = useStyles();
    return (
        <>
        <Container maxWidth="lg" className={classes.root}>
            <div className={classes.form}>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScM1klqzc3jR_HJELDd5SFyqZNDFuDNLaqZ6h2oUGV6nwhaKw/viewform?embedded=true" width="740" height="1492" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            </div>
        </Container>
        </>
    )
}

export default function Contact() {

    return (
                <ThemeProvider theme={mdTheme}>
                <Box>
                    <Container maxWidth="full" sx={{ mt: 3, mb: 4 }}>
                        <Grid container spacing={3}>
                            <ContactMain />
                        </Grid>
                    </Container>
                </Box>
                </ThemeProvider>
    )
}