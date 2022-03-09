import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';

import TopNavigationBarLoggedIn from '../../components/Navigation/TopNavigationBarLoggedIn';
import {ACCESS_TOKEN_TRANSCRIPT, ACCESS_TOKEN_CHAT} from '../../configureApi';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: 40
    }
});

const mdTheme = createTheme();
const ariaLabel = { 'aria-label': 'description' };

class AdminChatHistory extends Component {

    constructor(props){
        super(props);
        this.state = {  
            currentTime : '',
            fromTime : new Date('2022-03-7T20:11:54'),
            toTime : new Date('2022-03-10T20:11:54'),
            amount : 50, //default
            chatId : '',
            chatlist : [],
            transcript : []
        }
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handlechatIdChange = this.handlechatIdChange.bind(this);
        this.handlefromTimeChange = this.handlefromTimeChange.bind(this);
        this.handletoTimeChange = this.handletoTimeChange.bind(this);
        this.filterChats = this.filterChats.bind(this);
    }  

    componentDidMount(){
        axios.get('https://cors-anywhere.herokuapp.com/https://salesiq.zoho.com/api/v1/sjsu/chats', {
            headers: {
                Authorization: ACCESS_TOKEN_CHAT
            },
            params:{
                limit: this.state.amount
            },
        }).then(response => {
            let chatarray = response.data.data;
            chatarray.map((listing) => {
                // convert milisenconds to date and time
                var chatinitiated_time = Number(listing.chatinitiated_time);
                var d = new Date(chatinitiated_time);
                listing.chatinitiated_time = d.toLocaleString(); 
                // convert miliseconds duration to mins+seconds.
                var chat_duration = Number(listing.chat_duration);
                function pad(n, z) {
                    z = z || 2;
                    return ('00' + n).slice(-z);
                }
                var ms = chat_duration % 1000;
                chat_duration = (chat_duration - ms) / 1000;
                var secs = chat_duration % 60;
                chat_duration = (chat_duration - secs) / 60;
                var mins = chat_duration % 60;
                var hrs = (chat_duration - mins) / 60;
                var duration_in_min = pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
                listing.chat_duration = duration_in_min; 
            })
            this.setState({chatlist : chatarray});
            //console.log(chatarray);
        }).catch(error => {
            console.log('Data not returned', error)
        })
    }

    handleAmountChange = (e) => {
        this.setState({ amount : e.target.value })
    };
    handlechatIdChange = (e) => {
        this.setState({ chatId : e.target.value })
    };
    handlefromTimeChange = (e) => {
        this.setState({ fromTime : e.target.value })
    };
    handletoTimeChange = (e) => {
        this.setState({ toTime : e.target.value })
    };

    // chats filter function
    filterChats = (event) => {
        event.preventDefault();//stop refresh
        axios.get('https://cors-anywhere.herokuapp.com/https://salesiq.zoho.com/api/v1/sjsu/chats', {
            headers: {
                Authorization: ACCESS_TOKEN_CHAT
            },
            params:{
                limit : this.state.amount,
                fromtime : this.state.fromTime,
                totime : this.state.toTime
            },
        }).then(response => {
            let chatarray = response.data.data;
            chatarray.map((listing) => {
                // convert milisenconds to date and time
                var chatinitiated_time = Number(listing.chatinitiated_time);
                var d = new Date(chatinitiated_time);
                listing.chatinitiated_time = d.toLocaleString(); 
                // convert miliseconds duration to mins+seconds.
                var chat_duration = Number(listing.chat_duration);
                function pad(n, z) {
                    z = z || 2;
                    return ('00' + n).slice(-z);
                }
                var ms = chat_duration % 1000;
                chat_duration = (chat_duration - ms) / 1000;
                var secs = chat_duration % 60;
                chat_duration = (chat_duration - secs) / 60;
                var mins = chat_duration % 60;
                var hrs = (chat_duration - mins) / 60;
                var duration_in_min = pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
                listing.chat_duration = duration_in_min; 
            })
            this.setState({chatlist : chatarray});
            //console.log(chatarray);
        }).catch(error => {
            console.log('Data not returned', error)
        })
    }

    render(){
        console.log(this.state)
        const { classes } = this.props;

        let redirectVar = null;
        if(!localStorage.getItem("user")){
            redirectVar = <Navigate to= "/"/>
        }
        return (
            <>
            {redirectVar}
            <ThemeProvider theme={mdTheme}>
            <Box>
                <Container maxWidth="full" sx={{ mt: 3, mb: 4 }}>
                    <Grid container spacing={3}>
                        <TopNavigationBarLoggedIn />
                        {/* ChatHistoryMain */}
                        <Container maxWidth="lg" className={classes.root}>
                            <Container maxWidth="lg" className={classes.root}>
                                <Typography component="h1" variant="h4" color="primary" gutterBottom>
                                    Chat History
                                </Typography>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={4} lg={3}>
                                            <InputLabel id="demo-simple-select-label">Amount (Latest)</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={this.state.amount}
                                                label="Amount"
                                                onChange={this.handleAmountChange}
                                            >
                                            <MenuItem value={5}>Five</MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={50}>Fifty</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={3}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    label="Date&Time From"
                                                    value={this.state.fromTime}
                                                    onChange={this.handlefromTimeChange}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={3}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    label="Date&Time To"
                                                    value={this.state.toTime}
                                                    onChange={this.handletoTimeChange}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={3}>
                                            <Button variant="outlined" onClick={this.filterChats}>Search</Button>
                                        </Grid>
                                    </Grid>
                                    </FormControl>
                                </Box>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Chat ID</TableCell>
                                            <TableCell>Visitor Name</TableCell>
                                            <TableCell>Visitor Email</TableCell>
                                            <TableCell>Country Code</TableCell>
                                            <TableCell>Attended By</TableCell>
                                            <TableCell>Start Time</TableCell>
                                            <TableCell>Chat Duration</TableCell>
                                            <TableCell>Chat Initiated Question</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.chatlist.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.chat_id}</TableCell>
                                                <TableCell>{row.visitor_name}</TableCell>
                                                <TableCell>{row.visitor_email}</TableCell>
                                                <TableCell>{row.country_code}</TableCell>
                                                <TableCell>{row.attender_name}</TableCell>
                                                <TableCell>{row.chatinitiated_time}</TableCell>
                                                <TableCell>{row.chat_duration}</TableCell>
                                                <TableCell>{row.question}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Container>
                            <Container maxWidth="lg" className={classes.root}>
                                <h2>Get One Chat Information</h2>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1 },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                    <Input value={this.state.chatId} label="chatId" onChange={this.handlechatIdChange}
                                        placeholder="Chat ID" inputProps={ariaLabel} />
                                    {/* <Button variant="outlined" onClick={renderChatInfo}>Search</Button> */}
                                </Box>

                            </Container>
                            <Container maxWidth="lg" className={classes.root}>
                                <h2>Chat Transcript</h2>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1 },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                    {/* <Input value={chatIdTranscript} label="chatId" onChange={handlechatIdTranscriptChange}
                                        placeholder="Chat ID" inputProps={ariaLabel} /> */}
                                    {/* <Button variant="outlined" onClick={renderChatTranscript}>Search</Button> */}
                                </Box>

                            </Container>
                        </Container>
                    </Grid>
                </Container>
            </Box>
            </ThemeProvider>
            </>
        )
    }
}

export default withStyles(useStyles)(AdminChatHistory);