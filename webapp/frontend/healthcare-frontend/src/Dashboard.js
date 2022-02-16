import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import NavigationButton from './NavigationButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ZohoSalesIQ from './ZohoSalesIQ';
import MediaCard from './MediaCard';


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

const topQuestions = [
  { title: 'Can I get Professional consultation on your Website?' },
];


export default function Dashboard() {


  const classes = useStyles();
  return (
    <React.Fragment>
    <Container maxWidth="lg" className={classes.root}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <NavigationButton></NavigationButton>
          </Grid>
          <Grid item xs={12} >
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={topQuestions.map((option) => option.title)}
              renderInput={(params) => (
                <TextField className={classes.textbox}
                  {...params}
                  label="Your Query"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3" display="block" gutterBottom>
              Our Services
            </Typography>

          </Grid>
          <Grid item xs={3}>
            <MediaCard></MediaCard>
          </Grid>
          <Grid item xs={3}>
            <MediaCard></MediaCard>
          </Grid>
          <Grid item xs={3}>
            <MediaCard></MediaCard>
          </Grid>
          <Grid item xs={3}>
            <MediaCard></MediaCard>
          </Grid>

        </Grid>
        <ZohoSalesIQ></ZohoSalesIQ>
      </Box>
    </Container >
    </React.Fragment>
  );
}
