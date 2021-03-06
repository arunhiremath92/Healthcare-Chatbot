import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import queryString from 'query-string'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';

import NavigationButton from '../../components/Navigation/NavigationButton';
import ResultList from './resultList';


const names = [

    'Addiction Medicine ',
    'Allergists ',
    'Anesthesiologists ',
    'Audiologist ',
    'Cardiologists ',
    'Cosmetic Surgeons ',
    'Dermatologists ',
    'Ear Nose & Throat ',
    'Emergency Medicine ',
    'Endocrinologists ',
    'Family Practice ',
    'Fertility ',
    'Gastroenterologist ',
    'Geneticists ',
    'Gerontologists ',
    'Hepatologists ',
    'Hospitalists ',
    'Immunodermatologists ',
    'Infectious Disease Specialists ',
    'Internal Medicine ',
    'Naturopathic/Holistic ',
    'Nephrologists ',
    'Neurologist ',
    'Neuropathologists ',
    'Neurotologists ',
    'Obstetricians & Gynecologists ',
    'Oncologist ',
    'Ophthalmologists ',
];

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

const mdTheme = createTheme();

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const theme = createTheme();
const API_BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3'
const BEARER_TOKEN = 'd2XtHxl5upksITGq6-Z-quIyBDQWAdMi1U0SH5QaZCDFDb3P1WA_Xp9ZsZXShsDib_W_EIiv6V6jN7XJaR1k-cHPsegN-sOOQlDC7lM0FWYeuC0cQqqfrgnZ7ysPYnYx'

function Show() {

}

const location = 'hospitals'



export default function ProvidersView() {


    const classes = useStyles();
    const [profession, setProfession] = React.useState([]);

    //const [search,setSearch] = useState('')
    const myRef = React.useRef()
    const [search, setSearch] = useState('')
    //#Version 3 (Work)
    const [businessList, setBusinessList] = useState([])


    function Show() {
        console.log('@@', myRef.current.value)

        setSearch(() => {
            return myRef.current.value
        })

        axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', {
            headers: {
                Authorization: `Bearer d2XtHxl5upksITGq6-Z-quIyBDQWAdMi1U0SH5QaZCDFDb3P1WA_Xp9ZsZXShsDib_W_EIiv6V6jN7XJaR1k-cHPsegN-sOOQlDC7lM0FWYeuC0cQqqfrgnZ7ysPYnYx`
            },
            params: {
                categories: 'hospitals',
                location: myRef.current.value,
            },
        }).then(response => {
            setBusinessList(response.data.businesses)
            console.log('@', response.data.businesses)
        }).catch(error => {
            console.log('Data not returned', error)
        })
    }

    const handleChange = (e) => {
        setProfession(() => { return e.target.value })
        console.log(e.target.value.join())
        axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', {
            headers: {
                Authorization: `Bearer d2XtHxl5upksITGq6-Z-quIyBDQWAdMi1U0SH5QaZCDFDb3P1WA_Xp9ZsZXShsDib_W_EIiv6V6jN7XJaR1k-cHPsegN-sOOQlDC7lM0FWYeuC0cQqqfrgnZ7ysPYnYx`
            },
            params: {
                categories: 'hospitals',
                location: myRef.current.value,
                term: e.target.value.join()
            },
        }).then(response => {
            setBusinessList(response.data.businesses)
            console.log('@', response.data.businesses)
        }).catch(error => {
            alert('Please Enter a Location :)')
            console.log('Data not returned', error)
        })
    }


    function hasResult() {
        if (businessList.length > 0) {
            return true
        } else {
            return false
        }
    }
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <NavigationButton />
                </Grid>

                <Grid item xs={8}>
                    {/* <TextField id="location" fullwidth label="City/Pincode/Area" variant="outlined" inputRef={myRef} /> */}
                    <TextField id="location" fullwidth label="City/Pincode/Area" variant="outlined" inputRef={myRef} />
                    &nbsp;
                    <Button variant="contained" onClick={Show} >Click Me to Search</Button>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth={true}>
                        <InputLabel id="demo-multiple-name-label">Name(one or more)</InputLabel>
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
                    <Box sx={{ flexGrow: 1 }}>


                    {
                    search.length > 0 && <h3 style={{color:'darkblue'}}>There are {hasResult ? `${businessList.length}` :'no'} results near: <b>{search}</b>. </h3>
                    }
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        
                        
                        {/* <h3>There are some results near: {search}</h3> */}

                        {
                        profession.length > 0 && <h5 style={{color:'darkblue'}}>Categories: {profession}</h5>
                        }
                        <ResultList {...businessList} />
                    </Box>
                </Grid>
            </Grid>

        </>




    )
}