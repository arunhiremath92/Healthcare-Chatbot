import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NavigationButton from '../../components/Navigation/NavigationButton';
import MedicineResultList from './medicineResultList';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        margin: 40,
        
    },
    textbox: {
        margin: 10,
        marginTop: 40,
    }
});

const mdTheme = createTheme();


export default function MedicalPrescription() {
    const classes = useStyles();
    const [provider, setProvider] = React.useState('');
    const [medicineResult,setmedicineResult] = React.useState('')
    const [flag,setflag] = React.useState(1)
    const myRef = React.useRef()


    function Show(){
        console.log('Show',provider)

        if(myRef.current.value){
            axios.get(`https://rxnav.nlm.nih.gov/REST/${provider}/${myRef.current.value}/allrelated.json`, {
                }).then(response=>{
                    //console.log('@',response.data.allRelatedGroup.conceptGroup)
                    setmedicineResult(response.data.allRelatedGroup.conceptGroup)
                    setflag(1)
                }).catch(error=>{
                    console.log('Data not returned',error)
                    setflag(0)
                })
            }else{
                alert('Please Enter a NDC Code: xxxx-xxxx')
            }

    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setProvider(event.target.value);
    };

    return (
        <>
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <NavigationButton />
                </Grid>
                <Grid item xs={8}>
                    <TextField id="prescription-number" label="RxCUI Number" variant="outlined" inputRef ={myRef}/>
                    &nbsp;
                    <Button  variant="contained" onClick = {Show}>Click Me to Search</Button>
                </Grid>
                <Grid item xs={4} >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Provider</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={provider}
                            label="Provider"
                            onChange={handleChange}
                        >
                            <MenuItem value={"rxcui"}>RxCUI</MenuItem>
                            <MenuItem value={"others"}>Others</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {
                flag === 1 ? <MedicineResultList {...medicineResult}/> : <h3>Please select one provider</h3>
            }
        </>



    );
}