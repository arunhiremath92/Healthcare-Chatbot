import React from 'react';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
const useStyles = makeStyles({
    errorMsg: {
        marginTop: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default function Whoops404() {

    let location = useLocation();
    const classes = useStyles();
    const mdTheme = createTheme();
    return (
        <ThemeProvider theme={mdTheme}>
            <Box>
                <Grid container component="main" className={classes.errorMsg}>
                    <CssBaseline />
                    <Typography component="h1" variant="h5">
                        Resource Not Found at {location.pathname}
                    </Typography>
                </Grid>
                <Grid container component="main" className={classes.errorMsg}>
                    <img src={'https://jamaicahospital.org/newsletter/wp-content/uploads/2015/04/RX-Symbol-177245590.jpg'} alt="whoops" />
                </Grid>
            </Box >
        </ThemeProvider >

    )
}
