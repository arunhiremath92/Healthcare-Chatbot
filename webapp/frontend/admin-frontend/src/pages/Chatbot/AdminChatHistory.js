import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

import {ACCESS_TOKEN_TRANSCRIPT, ACCESS_TOKEN_CHAT} from '../../configureApi';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: 40
    },
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        height: 600,//800 is full screen
        backgroundColor: 'white',
        border: '1px solid #1f396e',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto'
    }
});

const mdTheme = createTheme();
const ariaLabel = { 'aria-label': 'description' };

class AdminChatHistory extends Component {

    constructor(props){
        super(props);
        this.state = {  
            currentTime : '',
            fromTime : '',
            toTime : '',
            amount : 20, //default
            totalAmount : '',
            chatInfo : [],
            chatlist : [],
            transcript : [],
            open : false
        }
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handlefromTimeChange = this.handlefromTimeChange.bind(this);
        this.handletoTimeChange = this.handletoTimeChange.bind(this);
        this.filterChats = this.filterChats.bind(this);
        this.getOneChat = this.getOneChat.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        //this.printModal = this.printModal.bind(this);
    }  

    componentDidMount(){
        //default render 20 chats
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
                if (listing.chat_duration) {
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
                }
                else {
                    listing.chat_duration = "None"
                }
            })
            this.setState({chatlist : chatarray});
            //console.log(chatarray);
        }).catch(error => {
            console.log('Data not returned', error)
        })

        //set all chat amount number
        axios.get('https://cors-anywhere.herokuapp.com/https://salesiq.zoho.com/api/v1/sjsu/chats', {
            headers: {
                Authorization: ACCESS_TOKEN_CHAT
            },
            params:{
                limit: 1
            },
        }).then(response => {
            let latest_chatid = response.data.data[0].chat_id;
            this.setState({totalAmount : latest_chatid});
        }).catch(error => {
            console.log('Data not returned', error);
        })
    }

    handleAmountChange = (e) => {
        this.setState({ amount : e.target.value })
    };
    handlefromTimeChange = (e) => {
        this.setState({ fromTime : e.target.value })
    };
    handletoTimeChange = (e) => {
        this.setState({ toTime : e.target.value })
    };
    handleClickOpen = () => {
        this.setState({open : true});
    };
    handleClose = () => {
        this.setState({open : false});
    };

    // chats filter function
    filterChats = (event) => {
        event.preventDefault();//stop refresh
        if (this.state.fromTime && this.state.toTime){
            //convert time into miliseconds
            var from_time = new Date(this.state.fromTime);
            var fromTime = from_time.getTime();
            var to_time = new Date(this.state.toTime);
            var toTime = to_time.getTime();
            axios.get('https://cors-anywhere.herokuapp.com/https://salesiq.zoho.com/api/v1/sjsu/chats', {
                headers: {
                    Authorization: ACCESS_TOKEN_CHAT
                },
                params:{
                    limit : this.state.amount,
                    fromtime : fromTime,
                    totime : toTime
                },
            }).then(response => {
                let chatarray = response.data.data;
                chatarray.map((listing) => {
                    // convert milisenconds to date and time
                    var chatinitiated_time = Number(listing.chatinitiated_time);
                    var d = new Date(chatinitiated_time);
                    listing.chatinitiated_time = d.toLocaleString(); 
                    // convert miliseconds duration to mins+seconds.
                    if (listing.chat_duration) {
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
                    }
                    else {
                        listing.chat_duration = "None"
                    }
                })
                this.setState({chatlist : chatarray});
            }).catch(error => {
                console.log('Data not returned', error)
            })
        }
        else {
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
                    if (listing.chat_duration) {
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
                    }
                    else {
                        listing.chat_duration = "None"
                    }
                })
                this.setState({chatlist : chatarray});
            }).catch(error => {
                console.log('Data not returned', error)
            })
        }
    }

    // chats filter function
    getOneChat = (oneChatInfo) => {
        this.setState({chatInfo : oneChatInfo});
        var chatId = oneChatInfo.chat_id;
        axios.get(`https://cors-anywhere.herokuapp.com/https://salesiq.zoho.com/api/v1/sjsu/chats/${chatId}/transcript`, {
            headers: {
                Authorization: ACCESS_TOKEN_TRANSCRIPT
            }
        }).then(response => {
            let data = response.data.data;
            var chatTranscript = data.slice(1)//remove the first element
            let Transcript = [];
            chatTranscript.map((listing) => {
                if (typeof listing.msg !== 'object') {
                    Transcript.push(listing);
                }
            })
            Transcript.map((listing) => {
                // convert milisenconds to date and time
                var time = Number(listing.time);
                var d = new Date(time);
                listing.time = d.toLocaleString(); 
            })
            this.setState({transcript : Transcript});
            // console.log(chatTranscript);
            // console.log(Transcript);
            //open the modal
            this.handleClickOpen();
        }).catch(error => {
            console.log('Data not returned', error)
        })
    }

    //print the transcript: bugs
    // printModal = () => {
    //     var elem = document.getElementById("printThis");
    //     var domClone = elem.cloneNode(true);
    //     var $printSection = document.getElementById("printSection");
    //     if (!$printSection) {
    //         var $printSection = document.createElement("div");
    //         $printSection.id = "printSection";
    //         document.body.appendChild($printSection);
    //     }
    //     $printSection.innerHTML = "";
    //     $printSection.appendChild(domClone);
    //     window.print();
    // }
    
    render(){
        //console.log(this.state)
        const { classes } = this.props;
        // const columns = [
        //     { field: 'chat_id', headerName: 'Chat ID', width: 70 },
        //     { field: 'visitor_name', headerName: 'Visitor Name', width: 150 },
        //     { field: 'visitor_email', headerName: 'Visitor Email', width: 100 },
        //     { field: 'country_code', headerName: 'Country Code', width: 150 },
        //     { field: 'attender_name', headerName: 'Attended By', width: 100 },
        //     { field: 'chatinitiated_time', headerName: 'Start Time', width: 150 },
        //     { field: 'chat_duration', headerName: 'Chat Duration', width: 150 },
        //     { field: 'question', headerName: 'Initiated Question', width: 180 }
        // ];
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
                                            <InputLabel id="demo-simple-select-label">Latest #</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={this.state.amount}
                                                sx={{ width: 250 }}
                                                label="Amount"
                                                onChange={this.handleAmountChange}
                                            >
                                            <MenuItem value={1}>1 chat</MenuItem>
                                            <MenuItem value={5}>5 chats</MenuItem>
                                            <MenuItem value={10}>10 chats</MenuItem>
                                            <MenuItem value={20}>20 chats</MenuItem>
                                            <MenuItem value={50}>50 chats</MenuItem>
                                            <MenuItem value={this.state.totalAmount}>All chats</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={3}>
                                            <TextField
                                                id="datetime-local"
                                                label="From time"
                                                type="datetime-local"
                                                value={this.state.fromTime}
                                                onChange={this.handlefromTimeChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={3}>
                                            <TextField
                                                id="datetime-local"
                                                label="To time"
                                                type="datetime-local"
                                                value={this.state.toTime}
                                                onChange={this.handletoTimeChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={3}>
                                            <Button size="large" variant="outlined" onClick={this.filterChats}>Filter</Button>
                                        </Grid>
                                    </Grid>
                                    </FormControl>
                                </Box>
                                <hr/>
                                {/* <DataGrid
                                    style={{height: '100%', width: '100%'}} autoHeight
                                    getRowId={(row) => row.id}
                                    rows={this.state.chatlist}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                /> */}
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
                                            <TableCell>Initiated Question</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.chatlist.map((row) => (
                                            <TableRow onClick={()=>{this.getOneChat(row)}} key={row.id}>
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
                                {/* transcript modal */}
                                <Modal id="printThis"
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={this.state.open}>
                                        <Box className={classes.box}>
                                            <Typography id="transition-modal-title" variant="h4" component="h2" 
                                                style={{display: 'flex', justifyContent:'center', alignItems:'center', color: '#1f396e', margin: 5}}>
                                                Chat Transcript
                                            </Typography>
                                            <Typography id="transition-modal-description" sx={{ mt: 2 }} style={{margin: 10}}>
                                                <p style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                                                    #{this.state.chatInfo.chat_id}  Start: {this.state.chatInfo.chatinitiated_time}  Duration: {this.state.chatInfo.chat_duration}
                                                </p>
                                                <p>Visitor Name: {this.state.chatInfo.visitor_name}</p>
                                                <p>Visitor Email: {this.state.chatInfo.visitor_email}</p>
                                                <p>Website: {this.state.chatInfo.chat_initiated_url}</p>
                                                <p>Attended By: {this.state.chatInfo.attender_name}</p>
                                                <p>Visitor Country: {this.state.chatInfo.country_code}</p>
                                                <p>Visitor IP Address: {this.state.chatInfo.visitor_ip}</p>
                                                <hr/>
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>{this.state.chatInfo.visitor_name}</TableCell>
                                                            <TableCell>{this.state.chatInfo.question}</TableCell>
                                                            <TableCell align="right">{this.state.chatInfo.chatinitiated_time}</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {this.state.transcript.map((row) => (
                                                            <TableRow key={row.id}>
                                                                <TableCell>{row.dname}</TableCell>
                                                                <TableCell>{row.msg}</TableCell>
                                                                <TableCell align="right">{row.time}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </Typography>
                                            {/* <Typography id="transition-modal-footer" sx={{ mt: 2 }} style={{margin: 10, textAlign: 'right'}}>
                                                <Button variant="outlined" style={{marginRight: 5}} onClick={this.handleClose}>Close</Button>
                                                <Button variant="outlined" onClick={this.printModal}>Print</Button>
                                            </Typography> */}
                                        </Box>
                                    </Fade>
                                </Modal>
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