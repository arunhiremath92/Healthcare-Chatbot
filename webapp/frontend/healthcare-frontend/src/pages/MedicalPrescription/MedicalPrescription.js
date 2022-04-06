import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NavigationButton from '../../components/Navigation/NavigationButton';

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
    const handleChange = (event) => {
        setProvider(event.target.value);
    };
    return (
        <>
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <NavigationButton />
                </Grid>
                <Grid item xs={8}>
                    <TextField id="prescription-number" label="Prescription Number" variant="outlined" />
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
                            <MenuItem value={"wallgreens"}>Walgreens</MenuItem>
                            <MenuItem value={"others"}>Others</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>



    );
}