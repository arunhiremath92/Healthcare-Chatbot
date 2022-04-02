import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import NavigationButton from '../../components/Navigation/NavigationButton'
import ChatHistory from '../Chatbot/ChatHistory';

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

export default function UserDashboard() {

    const classes = useStyles();

    let redirectVar = null;
    if (!localStorage.getItem("user")) {
        redirectVar = <Navigate to="/" />
    }

    return (
            <ThemeProvider theme={mdTheme}>
                <Box>
                    <Container maxWidth="full" sx={{ mt: 3, mb: 4 }}>
                        <Grid container spacing={3}>
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
                                    <ChatHistory></ChatHistory>
                                </Container >
                            </Container>
                        </Grid>
                    </Container>
                </Box>
            </ThemeProvider>
    )
}