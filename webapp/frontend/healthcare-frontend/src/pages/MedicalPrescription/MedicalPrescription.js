
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
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import MedicineResultList from './medicineResultList';

import NavigationButton from '../../components/Navigation/NavigationButton';
import TopNavigationBar from '../../components/Navigation/TopNavigationBar';
import BottomNavigationBar from '../../components/Navigation/BottomNavigationBar';
import TopNavigationBarLoggedIn from '../../components/Navigation/TopNavigationBarLoggedIn';

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


const mdTheme = createTheme();

function PrescriptionBody(){

    const classes = useStyles();
    const [provider, setProvider] = React.useState('');
    const [medicineResult,setmedicineResult] = React.useState('')
    const [flag,setflag] = React.useState(1)
    


    const myRef = React.useRef()
    function Show(){
        console.log('Show',provider)
        
        // if(myRef.current.value){
        //     axios.get(`https://rxnav.nlm.nih.gov/REST/ndcproperties.json?id=${myRef.current.value}`, {
        //         }).then(response=>{
        //             console.log('@',response.data.ndcPropertyList.ndcProperty)
        //             setmedicineResult(response.data.ndcPropertyList.ndcProperty)
        //             setflag(1)
        //         }).catch(error=>{
        //             console.log('Data not returned',error)
        //             setflag(0)
        //         })
        //     }else{
        //         alert('Please Enter a NDC Code: xxxx-xxxx')
        //     }



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
        setProvider(event.target.value);
    };

    function getRefil(){
        console.log('Get Refill!')
        axios.post(`https://cors-anywhere.herokuapp.com/https://services-qa.walgreens.com/api/util/mweb5url`, {
                "apiKey":"qUIVGVw6jaf8SIziRpKjg6qdkhVONM0p",
                "affId":"rxapi",
                "transaction":"refillByScan",
                "act":"mweb5Url",
                "view":"mweb5UrlJSON"
            
            }).then(response=>{
                    // console.log('@',response.data.allRelatedGroup.conceptGroup)
                    // console.log(response.data)

                    axios.post(response.data.landingUrl, {
                        "affId":"rxapi",
                        "token":`${response.data.token}`,
                        "appID":"refillByScan",
                        "act":"chkExpRx",
                        "rxNo":"0425215-59107",
                        "appver":"1.0"
                        }).then(res=>{
                            console.log('Data received')
                            console.log(res.data)
                            

                             var newPage = window.open("about:blank",'_blank')
                             newPage.document.write(res.data)

                        }).catch(error=>{
                            console.log('Failed!!!',error)
                        
                        })



                }).catch(error=>{
                    console.error(error)
                })
    }

    
    return (
        <>
        <Container maxWidth="lg" className={classes.root}>
            <Container maxWidth="lg" className={classes.root}>
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <NavigationButton />
                    </Grid>
                </Grid>
                </Box>
            </Container>
            <Container maxWidth="lg" className={classes.root}>
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                    <TextField id="prescription-number" label="RxCUI Number" variant="outlined" inputRef ={myRef} />
                    &nbsp;
                    <Button  variant="contained" onClick = {Show}>Click Me to Search</Button>
                    <button onClick={getRefil}>Walgreen Test Button</button>
                    </Grid>
                    <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Provider (NIH)</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={provider}
                        label="Provider"
                        onChange={handleChange}
                        >
                        {/* <MenuItem value={"wallgreens"}>Walgreens</MenuItem> */}
                        <MenuItem value={"rxcui"} >RxCUI</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                </Grid>
                {/* <MedicineResultList {...medicineResult}/> */}

                {
                flag === 1 ? <MedicineResultList {...medicineResult}/> : <h3>Please select one provider</h3>
                }


                </Box>
            </Container>
            <div style={{
                position: "fixed",
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: "green"
                }}>
                <BottomNavigationBar />
            </div>
        </Container>
        </>
    )
}


export default function MedicalPrescription() {

    return (
        <>
        {localStorage.getItem("user") ?
            <>
                <ThemeProvider theme={mdTheme}>
                <Box>
                    <Container maxWidth="full" sx={{ mt: 3, mb: 4 }}>
                        <Grid container spacing={3}>
                            <TopNavigationBarLoggedIn />
                            <PrescriptionBody />
                        </Grid>
                    </Container>
                </Box>
                </ThemeProvider>
            </>
            :
            <>
                <TopNavigationBar />
                <PrescriptionBody />
            </>
        }
        </>
    );
}