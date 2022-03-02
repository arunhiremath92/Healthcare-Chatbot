import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

import TopNavigationBarLoggedIn from '../../components/Navigation/TopNavigationBarLoggedIn';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        margin: 40
    }
});

const mdTheme = createTheme();
const ariaLabel = { 'aria-label': 'description' };

export default function ChatHistory() {

    const classes = useStyles();

    let redirectVar = null;
    if(!localStorage.getItem("user")){
        redirectVar = <Navigate to= "/"/>
    }

    let chatHistory = [];
    let chatInfo = [];
    let chatTranscript = [];

    const [amount, setAmount] = React.useState('');
    const [chatIdInfo, setchatIdInfo] = React.useState('');
    const [chatIdTranscript, setchatIdTranscript] = React.useState('');

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }

    function renderAllChats(){
        axios.get('https://cors-anywhere.herokuapp.com/https://salesiq.zoho.com/api/v1/sjsu/chats', {
            headers: {
                Authorization: `Zoho-oauthtoken 1000.5062f7c51414e390e1a828a8d77509ac.5b7562fd36d93ff0d5da71dfdf36e282`
            },
            params:{
                limit: amount
            },
        }).then(response => {
            let chatHistory = [];
            let chatHistoryArray = response.data;
            for (var i = 0; i < chatHistoryArray.length; i++) {
                chatHistory.push(
                    <Grid item xs={3}>
                        <p>chat_initiated_url: {chatHistoryArray[i].chat_initiated_url}</p>
                        <p>question: {chatHistoryArray[i].question}</p>
                        <p>department_id: {chatHistoryArray[i].department_id}</p>
                        <p>department_name: {chatHistoryArray[i].department_name}</p>
                        <p>waited_duration: {chatHistoryArray[i].waited_duration}</p>
                        <p>end_time: {chatHistoryArray[i].end_time}</p>
                        <p>embed_name: {chatHistoryArray[i].embed_name}</p>
                        <p>attender_name: {chatHistoryArray[i].attender_name}</p>
                        <p>notes_available: {chatHistoryArray[i].notes_available}</p>
                        <p>visitor_name: {chatHistoryArray[i].visitor_name}</p>
                        <p>attender_id: {chatHistoryArray[i].attender_id}</p>
                        <p>chat_id: {chatHistoryArray[i].chat_id}</p>
                        <p>country_code: {chatHistoryArray[i].country_code}</p>
                        <p>chat_duration: {chatHistoryArray[i].chat_duration}</p>
                        <p>embed_id: {chatHistoryArray[i].embed_id}</p>
                        <p>chatinitiated_time: {chatHistoryArray[i].chatinitiated_time}</p>
                        <p>pickup_time: {chatHistoryArray[i].pickup_time}</p>
                        <p>visitor_ip: {chatHistoryArray[i].visitor_ip}</p>
                    </Grid>
                );
            }
            alert(JSON.stringify(response.data, null, 4));
            console.log(response.data);
            console.log(chatHistoryArray);
            console.log(chatHistory);
        }).catch(error => {
            console.log('Data not returned', error)
        })
    };

    const handlechatIdInfoChange = (event) => {
        setchatIdInfo(event.target.value);
    }

    function renderChatInfo() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://salesiq.zoho.com/api/v1/sjsu/chats/${chatIdInfo}`, {
            headers: {
                Authorization: `Zoho-oauthtoken 1000.5062f7c51414e390e1a828a8d77509ac.5b7562fd36d93ff0d5da71dfdf36e282`
            }
        }).then(response => {
            let chatInfo = [];
            let output = response.data;
            chatInfo.push(
                <Grid item xs={3}>
                    <p>chat_initiated_url: {output.chat_initiated_url}</p>
                    <p>question: {output.question}</p>
                    <p>department_id: {output.department_id}</p>
                    <p>department_name: {output.department_name}</p>
                    <p>waited_duration: {output.waited_duration}</p>
                    <p>end_time: {output.end_time}</p>
                    <p>embed_name: {output.embed_name}</p>
                    <p>attender_name: {output.attender_name}</p>
                    <p>notes_available: {output.notes_available}</p>
                    <p>visitor_name: {output.visitor_name}</p>
                    <p>attender_id: {output.attender_id}</p>
                    <p>chat_id: {output.chat_id}</p>
                    <p>country_code: {output.country_code}</p>
                    <p>chat_duration: {output.chat_duration}</p>
                    <p>embed_id: {output.embed_id}</p>
                    <p>chatinitiated_time: {output.chatinitiated_time}</p>
                    <p>pickup_time: {output.pickup_time}</p>
                    <p>visitor_ip: {output.visitor_ip}</p>
                </Grid>
            );
            alert(JSON.stringify(output, null, 4));
            console.log(response.data);
            console.log(chatInfo);
        }).catch(error => {
            console.log('Data not returned', error)
        })
    }

    const handlechatIdTranscriptChange = (event) => {
        setchatIdTranscript(event.target.value);
    }

    function renderChatTranscript() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://salesiq.zoho.com/api/v1/sjsu/chats/${chatIdTranscript}/transcript`, {
            headers: {
                Authorization: `Zoho-oauthtoken 1000.5dfc0f907db7b0c81302ad21e1a859c7.656bbdcf94c772fa8baa450d234536a4`
            }
        }).then(response => {
            let chatTranscript = response.data;
            alert(JSON.stringify(chatTranscript, null, 4));
            console.log(response.data);
            console.log(chatTranscript);
        }).catch(error => {
            console.log('Data not returned', error)
        })
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
                            <h2>Chat History</h2>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Amount (Latest)</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={amount}
                                        label="Amount"
                                        onChange={handleAmountChange}
                                    >
                                    <MenuItem value={5}>Five</MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={50}>Fifty</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="outlined" onClick={renderAllChats}>Apply</Button>
                            </Box>
                            <Grid container spacing={2}>
                                {chatHistory}
                            </Grid>
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
                                <Input value={chatIdInfo} label="chatId" onChange={handlechatIdInfoChange}
                                    placeholder="Chat ID" inputProps={ariaLabel} />
                                <Button variant="outlined" onClick={renderChatInfo}>Search</Button>
                            </Box>
                            {chatInfo}
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
                                <Input value={chatIdTranscript} label="chatId" onChange={handlechatIdTranscriptChange}
                                    placeholder="Chat ID" inputProps={ariaLabel} />
                                <Button variant="outlined" onClick={renderChatTranscript}>Search</Button>
                            </Box>
                            {chatTranscript}
                        </Container>
                    </Container>
                </Grid>
            </Container>
        </Box>
        </ThemeProvider>
        </>
    )
}
