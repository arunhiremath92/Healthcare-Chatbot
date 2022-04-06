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
        margin: 20
    },
    textbox: {
        margin: 10,
        marginTop: 40,
    }
});

const mdTheme = createTheme();

export default function UserDashboard() {

    const classes = useStyles();




    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid alignItems="center" justifyContent="center" container spacing={1} className={classes.root}>
                    <Grid item xs={12}>
                        <NavigationButton />
                    </Grid>
                    <Grid item xs={12}>
                        <ChatHistory></ChatHistory>
                    </Grid>
                </Grid>
            </Box>
        </>

    )
}