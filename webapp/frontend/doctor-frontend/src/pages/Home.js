import React from 'react';
import { useLocation } from 'react-router-dom';
import TopNavigationBar from '../components/Navigation/TopNavigationBar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles({
    errorMsg: {
        marginTop: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    root: {
        flexGrow: 1,
        margin: 40,
        alignItems: 'center'
    },
});

export default function Home() {

    let location = useLocation();
    const classes = useStyles();
    const handleSignin = () => {

        localStorage.setItem("user", "temp");
        localStorage.setItem("role", "user");
        navigate('/doctor-dashboard')
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        // TODO: backend API


    };
    let navigate = useNavigate();
    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <Grid  container spacing={1} className={classes.root}>
                    <Grid item xs={4} >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </Grid>
                    <Grid item xs={8} >
                    <Typography component="h1" variant="h2">
                            Welcome Doctor
                        </Typography>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                onClick={handleSignin}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}
