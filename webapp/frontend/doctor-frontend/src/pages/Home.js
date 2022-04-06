import React from 'react';
import { useLocation } from 'react-router-dom';
import TopNavigationBar from '../components/Navigation/TopNavigationBar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    errorMsg: {
        marginTop: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default function Home() {

    let location = useLocation();
    const classes = useStyles();

    return (
        <>
            <TopNavigationBar />
            <Grid container component="main" className={classes.errorMsg}>
                <CssBaseline />
                <Typography component="h1" variant="h5">
                    
                </Typography>
            </Grid>
            <Grid container component="main" className={classes.errorMsg}>
                <img src={'https://jamaicahospital.org/newsletter/wp-content/uploads/2015/04/RX-Symbol-177245590.jpg'} alt="whoops" />
            </Grid>
        </>
    )
}
