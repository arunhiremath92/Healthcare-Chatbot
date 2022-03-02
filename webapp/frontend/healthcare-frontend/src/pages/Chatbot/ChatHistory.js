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
        axios.get('https://salesiq.zoho.com/api/v1/sjsu/chats', {
            headers: {
                Authorization: `Zoho-oauthtoken 1000.b6dd9bf14deaca9046db4c4dcf0f63d6.6efc3ca8c626cc617d3d3f5f3403b6da`
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
            alert(JSON.stringify(response.data));
            console.log(response.data);
            console.log(chatHistoryArray);
            console.log(chatHistory);
        }).catch(error => {
            console.log('Data not returned', error)
        })
    };

    const handlechatIdInfoChange = (event) => {
        setchatIdInfo(event.target.value);
        axios.get(`https://salesiq.zoho.com/api/v1/sjsu/chats/${chatIdInfo}`, {
            headers: {
                Authorization: `Zoho-oauthtoken 1000.b6dd9bf14deaca9046db4c4dcf0f63d6.6efc3ca8c626cc617d3d3f5f3403b6da`
            }
        }).then(response => {
            let chatInfo = [];
            chatInfo.push(
                <Grid item xs={3}>
                    <p>chat_initiated_url: {response.data.chat_initiated_url}</p>
                    <p>question: {response.data.question}</p>
                    <p>department_id: {response.data.department_id}</p>
                    <p>department_name: {response.data.department_name}</p>
                    <p>waited_duration: {response.data.waited_duration}</p>
                    <p>end_time: {response.data.end_time}</p>
                    <p>embed_name: {response.data.embed_name}</p>
                    <p>attender_name: {response.data.attender_name}</p>
                    <p>notes_available: {response.data.notes_available}</p>
                    <p>visitor_name: {response.data.visitor_name}</p>
                    <p>attender_id: {response.data.attender_id}</p>
                    <p>chat_id: {response.data.chat_id}</p>
                    <p>country_code: {response.data.country_code}</p>
                    <p>chat_duration: {response.data.chat_duration}</p>
                    <p>embed_id: {response.data.embed_id}</p>
                    <p>chatinitiated_time: {response.data.chatinitiated_time}</p>
                    <p>pickup_time: {response.data.pickup_time}</p>
                    <p>visitor_ip: {response.data.visitor_ip}</p>
                </Grid>
            );
            alert(JSON.stringify(response.data));
            console.log(response.data);
            console.log(chatInfo);
        }).catch(error => {
            console.log('Data not returned', error)
        })
    }

    const handlechatIdTranscriptChange = (event) => {
        setchatIdTranscript(event.target.value);
        axios.get(`https://salesiq.zoho.com/api/v1/sjsu/chats/${chatIdTranscript}/transcript`, {
            headers: {
                Authorization: `Zoho-oauthtoken 1000.08efb737a138f708bdcd3fedc4eca92a.e2d4fafd03855298fa1ae6aef9db7f4e`
            }
        }).then(response => {
            let chatTranscript = response.data;
            alert(JSON.stringify(chatTranscript));
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
                            </Box>
                            <Grid container spacing={2}>
                                {chatHistory}
                            </Grid>
                            {/* {chatHistory.map((chat) => {
                                return (
                                    <div>
                                        <p>{chat.chat_initiated_url}</p>
                                        <p>{chat.question}</p>
                                        <p>{chat.department_id}</p>
                                        <p>{chat.department_name}</p>
                                        <p>{chat.waited_duration}</p>
                                        <p>{chat.end_time}</p>
                                        <p>{chat.embed_name}</p>
                                        <p>{chat.attender_name}</p>
                                        <p>{chat.notes_available}</p>
                                        <p>{chat.visitor_name}</p>
                                        <p>{chat.attender_id}</p>
                                        <p>{chat.chat_id}</p>
                                        <p>{chat.country_code}</p>
                                        <p>{chat.chat_duration}</p>
                                        <p>{chat.embed_id}</p>
                                        <p>{chat.chatinitiated_time}</p>
                                        <p>{chat.pickup_time}</p>
                                        <p>{chat.visitor_ip}</p>
                                    </div>
                                )
                            })} */}
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
