import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import TopNavigationBar from '../../components/Navigation/TopNavigationBar';

const names = [
'Addiction Medicine (addictionmedicine)',
'Allergists (allergist)',
'Anesthesiologists (anesthesiologists)',
'Audiologist (audiologist)',
'Cardiologists (cardiology)',
'Cosmetic Surgeons (cosmeticsurgeons)',
'Dermatologists (dermatology)',
'Ear Nose & Throat (earnosethroat)',
'Emergency Medicine (emergencymedicine)',
'Endocrinologists (endocrinologists)',
'Family Practice (familydr)',
'Fertility (fertility)',
'Gastroenterologist (gastroenterologist)',
'Geneticists (geneticists)',
'Gerontologists (gerontologist)',
'Hepatologists (hepatologists)',
'Hospitalists (hospitalists)',
'Immunodermatologists (immunodermatologists)',
'Infectious Disease Specialists (infectiousdisease)',
'Internal Medicine (internalmed)',
'Naturopathic/Holistic (naturopathic)',
'Nephrologists (nephrologists)',
'Neurologist (neurologist)',
'Neuropathologists (neuropathologists)',
'Neurotologists (neurotologists)',
'Obstetricians & Gynecologists (obgyn)',
'Oncologist (oncologist)',
'Ophthalmologists (opthamalogists)',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

const theme = createTheme();

export default function DoctorSignup() {
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

    function isPhone(str){
        if(str.length===10){
            return true;
        }else{
            return false;
        }
    }

    function isNull(str){
        if(str.length === 0){
            return true
        }else{
            return false
        }
    }


    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            phone: data.get('number'),
            zip: data.get('zipcode'),

        });

        var firstName_s = data.get('firstName')
        var lastName_s = data.get('lastName')
        var email_s = data.get('email')
        var password_s = data.get('password')

        
        if(isNull(firstName_s)){
            alert('Please Enter Your FirstName!')
        }else if(isNull(lastName_s)){
            alert('Please Enter Your LastName!')
        }else if(!isEmail(email_s)){
            alert('Please Enter a Valid Email!')
        }else if(!isPass(password_s)){
            alert('Please Enter a password between 6 and 16')
        }else{
            alert('Sign up Success!');
            //add fetch function to post data
            navigate('/doctor-dashboard');
        }

        // if(!isPhone(data.get('number'))){
        //     alert('Please Enter a valid 10-digital phone number')
        // }else{
        //     alert('success!')
        // }


        // TODO: backend API
        localStorage.setItem("user", "temp");
        //navigate('/doctor-dashboard');
    };

    const [profession, setProfession] = React.useState([]);
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setProfession(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <TopNavigationBar />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/types-of-doctors-1600114658.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Doctor Signup
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                                        id="password"
                                        label="Password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Contact Phone Number"
                                        name="number"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="zipcode"
                                        label="Zip Code"
                                        name="zipcode"
                                    />

                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth={true}>
                                        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                                        <Select
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            multiple
                                            value={profession}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Primary Speciality" />}
                                            MenuProps={MenuProps}
                                        >
                                            {names.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(name, profession, theme)}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="practise_name"
                                        label="Practice Name (Optional)"
                                        name="practice_name"
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
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}