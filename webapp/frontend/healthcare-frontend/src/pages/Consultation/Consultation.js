import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';
import { MessageLeft, MessageRight } from "./Message";
import TextField from '@mui/material/TextField';
import socketClient from "socket.io-client";
import NavigationButton from '../../components/Navigation/NavigationButton'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'
import Fab from '@mui/material/Fab';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import { Paper } from '@material-ui/core';
import io from "socket.io-client"

const SERVER = "http://127.0.0.1:3004";
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: 40
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

const names = [

  'Addiction Medicine',
  'Allergists',
  'Anesthesiologists',
  'Audiologist',
  'Cardiologists',
  'Cosmetic Surgeons',
  'Dermatologists',
  'Ear Nose & Throat',
  'Emergency Medicine',
  'Endocrinologists',
  'Family Practice',
  'Fertility',
  'Gastroenterologist',
  'Geneticists',
  'Gerontologists',
  'Hepatologists',
  'Hospitalists',
  'Immunodermatologists',
  'Infectious Disease Specialists',
  'Internal Medicine',
  'Naturopathic/Holistic',
  'Nephrologists',
  'Neurologist',
  'Neuropathologists',
  'Neurotologists',
  'Obstetricians & Gynecologists',
  'Oncologist ',
  'Ophthalmologists',
];
const Professionals = [

  {
    type: 'Allergists',
    name: "Arun Hiremath",
  },

  {
    type: 'Allergists',
    name: "Karan Singh",
  },
  {
    type: 'Fertility',
    name: "Chyvan Phadke",
  },
  {
    type: 'Fertility',
    name: "Mohit Sharma",
  },
  {
    type: 'Allergists',
    name: "Alexu Vittle",
  },
  {
    type: 'Endocrinologists',
    name: "Maria Smith",
  }
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const mdTheme = createTheme();

export default function Consultation() {


  const [profession, setProfession] = React.useState([]);

  const classes = useStyles();

  const [myArray, setMyArray] = React.useState([]);
  const [professionalsList, setProfessional] = React.useState([]);
  const [selectedProfession, setSelectedProfession] = React.useState([]);
  const [userReply, setUserReply] = React.useState("")
  const [show, setShow] = React.useState('hidden')
  const handleChange = (event) => {
    socket.emit('private-message', { type: 'user', message: 'test-message', from: 'Patient-1', to: 'arunhiremath' });
    setUserReply("")

  };
  let redirectVar = null;
  if (!localStorage.getItem("user")) {
    redirectVar = <Navigate to="/" />
  }
  let handleTextFieldChange = (e) => {
    setUserReply(e.target.value);
  }
  let handleFAB = (e) => {
    setShow('visible')
  }
  React.useEffect(
    () => {




      return () => {
        socket.disconnect();
      }
    },
    [myArray]
  )


  const handleDoctorSelection = (e) => {
    setSelectedProfession(e.target.value)
    let selected = e.target.value
    let availableList = []
    
    // for (var i = 0; i < Professionals.length; i++) {
    //   if (Professionals[i].type == selected) {
    //     availableList.push(

    //       <Fab color="primary" aria-label="add" onClick={handleFAB}>
    //         <AccountCircleIcon />
    //       </Fab>)
    //   }
    // }
    // setProfessional(availableList)

  }
  const [hello, setCount] = React.useState("0")
  const [socket, setSocket] = React.useState(null)

  React.useEffect(() => {
    if (socket === null) {
      setSocket(io(SERVER));
    }
    if (socket) {
      socket.on('connect', (clientSocket) => {
        // socket.emit('joined', { 'serverchannel': 120 })
        console.log("Connected")

        socket.on('active-doctors', message => {
          let newArray = [...message]
          console.log(newArray)
          socket.emit('connect-to-doctor', { fullName: "Arun Hiremath", to: 'arunhiremath', from: 'Patient-1' });
        })


        socket.on('private-message', message => {
          console.log(message)
          // let newArray = [...myArray]
          // if (message.type !== "user") {

          //   newArray.push(<MessageLeft
          //     message={message.message}
          //     displayName={message.from}
          //   />)

          // } else {
          //   let newArray = [...myArray]
          //   newArray.push(<MessageRight
          //     message={message.message}
          //     displayName={message.from}
          //   />)
          // }
          // setMyArray(newArray);
        });
      })
    }
  }, [socket])

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NavigationButton />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth={true}>
            <InputLabel id="demo-multiple-name-label">Select a Healthcare Provider For</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={selectedProfession}
              onChange={handleDoctorSelection}
              input={<OutlinedInput label="Primary Speciality" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, profession, mdTheme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
            <div style={{ height: 400, width: '100%' }}>
              <div style={{ height: 350, width: '100%' }}>
                {myArray}
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Reply" id="fullWidth"
            onChange={handleTextFieldChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.keyCode === 13) {
                handleChange()
              }
            }}
            value={userReply} />
        </Grid>
      </Grid >
    </>

  )
}
