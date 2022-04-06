import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';
import { MessageLeft, MessageRight } from "./Message";
import TextField from '@mui/material/TextField';
import socketClient from "socket.io-client";

const SERVER = "http://127.0.0.1:3004";
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    alignItems: "center",
  },
  paper2: {



  },

  messagesBody: {
    margin: 10,
  }
});


const mdTheme = createTheme();

export default function ConsultationDoctorView() {
  const socket = socketClient(SERVER, {
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax': 5000,
    'reconnectionAttempts': 5
  });



  let sampleMessages = []
  for(let i=0; i<20;i++){
    if(i%2 == 0){
      sampleMessages.push(
        <MessageRight
              message={"A"}
              displayName="doctor"
            />
      )  
    }else{
      sampleMessages.push(
        <MessageLeft
              message={"B"}
              displayName="Patient"
            />
      )
  
    }
  }
  const classes = useStyles();
  const [myArray, setMyArray] = React.useState(sampleMessages);
  const [userReply, setUserReply] = React.useState("")
  const handleChange = (event) => {
    socket.emit('send-message', { user: "doctor", txt: userReply });
    setUserReply("")
  };
  let redirectVar = null;
  if (!localStorage.getItem("user")) {
    redirectVar = <Navigate to="/" />
  }
  let handleTextFieldChange = (e) => {
    setUserReply(e.target.value);
  }


  React.useEffect(
    () => {

      socket.on('message', message => {
        if (message.user == "doctor") {
          let newArray = [...myArray]
          newArray.push(<MessageLeft
            message={message.txt}
            displayName="Doctor"
          />)
          setMyArray(newArray);
        } else {
          let newArray = [...myArray]
          newArray.push(<MessageRight
            message={message.txt}
            displayName="Patient"
          />)
          setMyArray(newArray);
        }
      });

      return () => {
        socket.disconnect();
      }
    },
    [myArray]
  )
  return (
    <>
      {redirectVar}
      <ThemeProvider theme={mdTheme}>

        <Box>

          <Grid container spacing={1}>
            <Container maxWidth="lg" sx={{ width: '100%', height: 400, overflow: 'auto' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    {myArray}
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Container maxWidth="lg" className={classes.root} >
              <Box sx={{ flexGrow: 1 }} >
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <TextField fullWidth label="Reply" id="fullWidth" value={userReply} onChange={handleTextFieldChange} />
                  </Grid>
                  <Grid item xs={2} sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                          m: 1,
                        },
                    }}>
                    <Button variant="contained" onClick={handleChange} endIcon={<SendIcon />}>
                      Send
                    </Button>
                  </Grid>

                </Grid>
              </Box>
            </Container>
            {/* Consultation Main */}
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  )
}

