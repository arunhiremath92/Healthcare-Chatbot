import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import ChatHistory from '../Chatbot/ChatHistory';
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        margin: 10,
        width: 200,
        height: 150,
    },
});

const mdTheme = createTheme();


export default function UserProfile() {

    let redirectVar = null;
    if (!localStorage.getItem("user")) {
        redirectVar = <Navigate to="/" />
    }
    const classes = useStyles();
    return (
        <ThemeProvider theme={mdTheme}>
            <Box>
                <Container maxWidth="full" sx={{ mt: 3, mb: 4 }}>
                    <Grid container spacing={3} justify="center" alignItems="center">
                        <Container maxWidth="lg" className={classes.root}>
                            <Container maxWidth="lg" className={classes.root}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container >
                                                <Avatar alt="Remy Sharp" src="https://i.redd.it/v0caqchbtn741.jpg" className={classes.bigAvatar} />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField disabled fullWidth label="Arun" id="fullWidth" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField disabled fullWidth label="Hiremath" id="fullWidth" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField disabled fullWidth label="arunhiremath92@gmail.com" id="fullWidth" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth type="password" label="Current Password" id="fullWidth" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField fullWidth type="password" label="New Password" id="fullWidth" />
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
