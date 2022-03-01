import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import DataTable from '../../components/DataGrid';
import TopNavigationBar from '../../components/Navigation/TopNavigationBar';
import TopNavigationBarLoggedIn from '../../components/Navigation/TopNavigationBarLoggedIn';

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

function AboutMain() {
    const classes = useStyles();
    return (
        <>
        <h3 className={classes.form}>Team Members</h3>
        <Container maxWidth="lg" className={classes.root}>
            <div className={classes.form}>
                <DataTable />
            </div>
        </Container>
        </>
    )
}

export default function About() {

    return (
        <>
        {localStorage.getItem("user") ?
            <>
                <ThemeProvider theme={mdTheme}>
                <Box>
                    <Container maxWidth="full" sx={{ mt: 3, mb: 4 }}>
                        <Grid container spacing={3}>
                            <TopNavigationBarLoggedIn />
                            <AboutMain />
                        </Grid>
                    </Container>
                </Box>
                </ThemeProvider>
            </>
            :
            <>
                <TopNavigationBar />
                <AboutMain />
            </>
        }
        </>
    )
}
