import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  useNavigate } from 'react-router-dom';

import TopNavigationBar from '../../components/Navigation/TopNavigationBar';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
            Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function PatientSignup() {
    function isEmail(str){
        var string = str.replace(/\s|&nbsp;/g, '') //先去除用户输入的无效字符
        var reg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        if (reg.test(string)) {
          return true;
        } else {
          return false;
        }
    }
    function isPass(str){
        if(str.length>=6 && str.length<=16){
            return true;
        }else{
            return false;
        }
    }
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        var email_s = data.get('email')
        var password_s = data.get('password')
        if(!isEmail(email_s)){
            alert('Please Enter a Valid Email!')
        }else if(!isPass(password_s)){
            alert('Please Enter a password between 6 and 16')
        }else{
            alert('Sign up Success!');
            //add fetch function to post data
            const url = 'http://localhost:3000'
            var msg = {
                email: data.get('email'),
                password: data.get('password'),
            }

            fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body:JSON.stringify(msg),
            }).then((res)=>{
                res.json(()=>{

                }).then((res)=>{
                    console.log(res)
                }).catch((error)=>{
                    console.error('ERROR',error)
                })
            })
            // let request = new Request(url + '/signup' ,{
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            //     },
            //     body: {
            //         email: data.get('email'),
            //         password: data.get('password'),
            //     },
            // })

            // fetch(request).then(response=>{
            //     let result = response.text()
            //     //let result = response.json()

            //     result.then(res=>{
            //         console.log(res)
            //     }).catch(err=>{
            //         console.log(err)
            //     })
            // })



            //navigate('/user-dashboard');
        }

        // TODO: backend API
        localStorage.setItem("user", "temp");
        
        //navigate('/user-dashboard');
    };

    return (
        <ThemeProvider theme={theme}>
        <TopNavigationBar />
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} style={{ "width": "50%" }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    />
                </Grid>
                
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="/" variant="body2">
                    Already have an account? Sign in
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
        
        </Container>
        </ThemeProvider>
    );
}