import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import MediaCard from '../../components/MediaCard';
import NavigationButton from '../../components/Navigation/NavigationButton';

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
const services = [
  {
    title: 'Online Consultation',
    imageSrc: 'https://customsitesmedia.usc.edu/wp-content/uploads/sites/59/2021/04/14180812/telehealth-psoriasis-web-824x549.jpg',
    description: '',
  },
  {
    title: 'Symptom Checker',
    imageSrc: 'https://www.pinclipart.com/picdir/big/7-71918_clip-art-prescription-drugs-clipart-prescription-clipart-png.png',
    description: '',
  },
  {
    title: 'AI assisted Chatbot',
    imageSrc: 'https://www.pikpng.com/pngl/b/490-4906657_emma-mobile-screen-chatbot-image-transparent-clipart.png',
    description: '',
  },
  {
    title: 'Prescription Refill',
    imageSrc: 'https://api.healthlynked.com/assets/img/mdoctor.png',
    description: '',
  },

];


export default function Dashboard() {

  const classes = useStyles();
  var indents = [];
  for (var i = 0; i < services.length; i++) {
    indents.push(<Grid item xs={3}>
      <MediaCard title={services[i].title} imageSrc={services[i].imageSrc} description={services[i].description}></MediaCard>
    </Grid>
    );
  }

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
            {indents}

          </Grid>
        </Box>
      </Container >

    </React.Fragment>
  );
}
