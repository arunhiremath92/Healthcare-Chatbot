import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import io from "socket.io-client";
import { Navigate } from 'react-router-dom';
import { MessageLeft, MessageRight } from "./Message";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
const SERVER = "https://healthapp-chat-server.herokuapp.com:41698";
const mdTheme = createTheme();
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        margin: 1
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


export default function DoctorDashboard() {

    let [selectedIndex, setSelectedIndex] = React.useState(1);
    let [userInView, setUserInView] = React.useState("");
    let [activeUsers, setActiveUsers] = React.useState([]);
    let [myArray, setMyArray] = React.useState([]);
    let [userReply, setUserReply] = React.useState("")
    let [checked, setChecked] = React.useState(false);
    let [socket, setSocket] = React.useState(null)
    let [userMessages, setUserMessages] = React.useState([])

    const handleChange = (event) => {
        let sendMessage = { type: 'Endocrinologists', message: userReply, from: 'arunhiremath', to: 'Patient-1', messageid: userInView.messageid }
        socket.emit('private-message', sendMessage);
        setUserReply("")
        // setUserMessages(oldArray => [...oldArray,sendMessage] );

    };

    let handleTextFieldChange = (e) => {
        setUserReply(e.target.value);
    }


    React.useEffect(() => {
        if (socket === null) {
            setSocket(io(SERVER, { transports: ["websocket"] }));
        }
        if (socket) {
            socket.on('connect', (clientSocket) => {
                console.log("Connected")

                socket.on('private-message', message => {
                    setUserMessages(oldArray => [...oldArray, message]);
                    console.log(message)
                });

                socket.on('connect-to-doctor', message => {
                    let newArray = [...activeUsers]
                    let found = false
                    for (let i = 0; i < newArray.length; i++) {
                        const user = newArray[i];
                        if (message.from === user.username) {
                            found = true
                        }
                    }
                    if (!found) {
                        newArray.push({ fullName: message.fullName, username: message.from, messageid: message.messageid })
                    }

                    setActiveUsers(newArray)
                    console.log(newArray)
                });

            })
        }
    }, [socket])

    const handleSwitchChange = (event) => {
        setChecked(event.target.checked);
        socket.emit('set-active',
            { fullName: "Dr Arun Hiremath", username: 'arunhiremath', type: 'Endocrinologists', roomid: 'arunhiremath' });

    };
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        let selectedUser = activeUsers[index]
        console.log(userMessages)
        setUserInView(selectedUser)
    };
    const classes = useStyles();
    return (
        <>
            <Box>

                <Container maxWidth="lg"
                    spacing={2}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 2,
                            mt: 5,

                        },
                    }}>
                    <Grid container>
                        <Grid item xs={12} className={classes.root}>
                            <Typography variant="h3" gutterBottom component="div">
                                Welcome Doctor
                            </Typography>

                        </Grid >
                        <Grid item xs={12} className={classes.root} sx={{
                            '& > :not(style)': {
                                mb: 5,
                            },
                        }}>
                            <Divider light flexItem variant="middle" />
                        </Grid>
                        <Grid item xs={3} className={classes.root}>
                            <List sx={{ width: '100%', }} >
                                {activeUsers.map((value, i) => (
                                    <ListItem alignItems="flex-start" key={value.username}>
                                        <ListItemButton onClick={(event) => handleListItemClick(event, i)}>
                                            <ListItemAvatar>
                                                <Avatar alt={value.fullName} src="/static/images/avatar/2.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText primary={value.fullName} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <Grid item xs={8}>
                            <Grid container spacing={1}>
                                <Container maxWidth="lg" sx={{ width: '100%', height: 400, overflow: 'auto' }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Switch
                                                    checked={checked}
                                                    onChange={handleSwitchChange}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Container>


                                <Container maxWidth="lg" sx={{ width: '100%', height: 400, overflow: 'auto' }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>

                                                {userMessages.map((value, i) => (
                                                    value.messageid === userInView.messageid ? value.type === 'user' ? <MessageLeft
                                                        message={value.message}
                                                        displayName={"U"}
                                                    /> : <MessageRight
                                                        message={value.message}
                                                        displayName={"D"}
                                                    /> : <></>
                                                ))}

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
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>

    )
}
