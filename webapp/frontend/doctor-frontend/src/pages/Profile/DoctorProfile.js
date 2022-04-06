import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    }
});

const mdTheme = createTheme();

export default function DoctorProfile() {
    return (
        <>
            <Box>
                <Container maxWidth="full" sx={{ mt: 3, mb: 4 }}>
                    <Grid container spacing={3}>
                        {/* DoctorProfile Main */}
                        <h1>DoctorProfile</h1>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}
