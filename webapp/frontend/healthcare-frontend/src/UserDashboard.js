import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MediaCard from './MediaCard';
import NavigationButton from './NavigationButton'
import Paper from '@mui/material/Paper';
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


export default function UserDashboard() {


    const classes = useStyles();
    
    return (
        <React.Fragment>
            <Container maxWidth="lg" className={classes.root}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <NavigationButton></NavigationButton>
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
                                Your Prescription Orders
                            </Typography>

                        </Grid>
                    </Grid>
                </Box>
            </Container >
        </React.Fragment >
    );
}
