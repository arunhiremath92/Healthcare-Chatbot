import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import TopNavigationBarLoggedIn from '../../components/Navigation/TopNavigationBarLoggedIn';
import TopNavigationBar from '../../components/Navigation/TopNavigationBar';
import MediaCard from '../../components/MediaCard';
import NavigationButton from '../../components/Navigation/NavigationButton'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        margin: 40
    },
    textbox: {
        margin: 10,
        marginTop: 40,
    }
});

const mdTheme = createTheme();

function UserDashboardMain() {

    const classes = useStyles();

    return (
        <>
        <Container maxWidth="lg" className={classes.root}>
            <Container maxWidth="lg" className={classes.root}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <NavigationButton />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="lg" className={classes.root}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Typography variant="h6" gutterBottom component="div">
                                Your AI Chat History
                            </Typography>

                        </Grid>
                        <Grid item xs={12} >
                            <Box
                                sx={{
                                    display: 'flex',
                                    '& > :not(style)': {
                                        m: 1,
                                        width: 128,
                                        height: 128,
                                    },
                                }}>
                                <Paper elevation={3} />
                                <Paper elevation={3} />
                                <Paper elevation={3} />
                                <Paper elevation={3} />
                                <Paper elevation={3} />
                                <Paper elevation={3} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography variant="h6" gutterBottom component="div">
                            Your Prescription Orders:
                            </Typography>

                        </Grid>
                        <Grid item xs={12} >
                            <Typography variant="h6" gutterBottom component="div">
                                {/* Your Prescription Orders */}
                                <Box
                                sx={{
                                    display: 'flex',
                                    '& > :not(style)': {
                                        m: 1,
                                        width: 128,
                                        height: 128,
                                    },
                                }}>
                                <Paper elevation={3} />
                                <Paper elevation={3} />
                                <Paper elevation={3} />
                                <Paper elevation={3} />
                                <Paper elevation={3} />
                                <Paper elevation={3} />
                            </Box>
                            </Typography>

                        </Grid>
                    </Grid>
                </Box>
            </Container >
        </Container>
        </>
    );
}

export default function UserDashboard() {

    return (
        <>
        {localStorage.getItem("user") ?
            <>
                <ThemeProvider theme={mdTheme}>
                <Box>
                    <Container maxWidth="full" sx={{ mt: 3, mb: 4 }}>
                        <Grid container spacing={3}>
                            <TopNavigationBarLoggedIn />
                            <UserDashboardMain />
                        </Grid>
                    </Container>
                </Box>
                </ThemeProvider>
            </>
            :
            <>
                <TopNavigationBar />
                <UserDashboardMain />
            </>
        }
        </>
    )
}