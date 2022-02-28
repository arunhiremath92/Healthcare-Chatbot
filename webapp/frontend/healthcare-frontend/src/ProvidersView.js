import * as React from 'react';
import { useState,useRef,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NavigationButton from './NavigationButton'
import Button from '@mui/material/Button';
import queryString from 'query-string'

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResultList from './resultList';
import FetchData from './FetchData'

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
const API_BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3'
const BEARER_TOKEN = 'd2XtHxl5upksITGq6-Z-quIyBDQWAdMi1U0SH5QaZCDFDb3P1WA_Xp9ZsZXShsDib_W_EIiv6V6jN7XJaR1k-cHPsegN-sOOQlDC7lM0FWYeuC0cQqqfrgnZ7ysPYnYx'

function Show(){

}


const location = 'hospitals'
export default function ProvidersView() {

  const classes = useStyles();
  const [profession, setProfession] = React.useState([]);

   //const [search,setSearch] = useState('')
   const myRef = React.useRef()
   const [search,setSearch] = useState('')
  //#Version 3 (Work)
   const [businessList, setBusinessList] = useState([])


  function Show(){
    console.log('@@',myRef.current.value)
    
     setSearch(()=>{
       return myRef.current.value
     })

     axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', {
       headers: {
         Authorization: `Bearer d2XtHxl5upksITGq6-Z-quIyBDQWAdMi1U0SH5QaZCDFDb3P1WA_Xp9ZsZXShsDib_W_EIiv6V6jN7XJaR1k-cHPsegN-sOOQlDC7lM0FWYeuC0cQqqfrgnZ7ysPYnYx`
      },
       params:{
         categories: 'hospitals',
         location: myRef.current.value,
      },
     }).then(response=>{
       setBusinessList(response.data.businesses)
       console.log('@',response.data.businesses)
     }).catch(error=>{
       console.log('Data not returned',error)
     })
  }
  

  const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setProfession(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    // //create a function to get the result
    // function handleSearch(e){
    //   console.log(e.target.value)
    //   setSearch(e.target.value)
    // }
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
            <Grid item xs={8}>
              {/* <TextField id="location" fullwidth label="City/Pincode/Area" variant="outlined" inputRef={myRef} /> */}
              <TextField id="location" fullwidth label="City/Pincode/Area" variant="outlined" inputRef={myRef} />
              &nbsp;
              <Button variant="contained" onClick={Show} >Click Me to Search</Button>
            </Grid>
            <Grid item xs={4}>
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
            <h3>There are some results near: {search}</h3>
              
          </Grid>
          <ResultList {...businessList}/>
        </Box>
      </Container>
    </React.Fragment>

  );
}