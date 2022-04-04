import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { ACCESS_TOKEN_TRANSCRIPT, ACCESS_TOKEN_CHAT } from '../../configureApi';


const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
const data01 = [
    {
        "name": "Group A",
        "value": 25
    },
    {
        "name": "Group B",
        "value": 10
    },
    {
        "name": "Group C",
        "value": 15
    },

];
const data02 = [
    {
        "name": "Group D",
        "value": 20
    },
    {
        "name": "Group E",
        "value": 30
    },
];

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: 40
    }
});

const mdTheme = createTheme();

class AdminDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime: '',
            chatNumber: 0,
            chatWithDoctorNumber: 20,//hardcoded
            doctorChatNumber: 15,//hardcoded
            NumberOfUsers: 6,//hardcoded
            NumberOfDoctors: 7,//hardcoded
            NumberOfOnlineDoctors: 3,//hardcoded
            NumberOfOperators: 4//hardcoded
        }
    }

    componentDidMount() {
        //get number of chats
        axios.get('https://cors-anywhere.herokuapp.com/https://salesiq.zoho.com/api/v1/sjsu/chats', {
            headers: {
                Authorization: ACCESS_TOKEN_CHAT
            },
            params: {
                limit: 1
            },
        }).then(response => {
            //console.log(response.data.data[0]);
            let latest_chatid = response.data.data[0].chat_id;
            this.setState({ chatNumber: latest_chatid });
        }).catch(error => {
            console.log('Data not returned', error);
        })

        //get current date and time
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.toTimeString().split(" ")[0];
        var dateTime = date + ' ' + time;
        this.setState({ currentTime: dateTime });
    }

    render() {

        const { classes } = this.props;

        var options_pie = {
            animationEnabled: true,
            exportFileName: "User Distribution Pie Chart",
            exportEnabled: true,
            title: {
                text: ""
            },
            data: [{
                type: "pie",
                showInLegend: true,
                legendText: "{label}",
                toolTipContent: "{label}: <strong>{y}%</strong>",
                indexLabel: "{y}%",
                indexLabelPlacement: "inside",
                dataPoints: [
                    { y: this.state.NumberOfUsers, label: "User" },
                    { y: this.state.NumberOfDoctors, label: "Doctor" },
                    { y: this.state.NumberOfOperators, label: "Operator" }
                ]
            }]
        }

        var options_bar = {
            animationEnabled: true,
            exportFileName: "Messages Bar Chart",
            exportEnabled: true,
            theme: "light2",
            title: {
                text: ""
            },
            axisX: {
                title: "",
                reversed: true,
            },
            axisY: {
                title: "Number of Messages",
                includeZero: true
            },
            data: [{
                type: "bar",
                dataPoints: [
                    { y: 60, label: "with Chatbot" },
                    { y: this.state.chatWithDoctorNumber, label: "with Online Doctor" }
                ]
            }]
        }



        return (

            <ThemeProvider theme={mdTheme}>
                <Box>
                    <Container maxWidth="full" sx={{ mt: 3, mb: 4 }}>
                        <Grid container spacing={3}>

                            {/* AdminDashboard Main */}
                            <Container maxWidth="lg" className={classes.root}>
                                <Container maxWidth="lg" className={classes.root}>
                                    <Typography component="h1" variant="h4" color="primary" gutterBottom>
                                        Admin Dashboard
                                    </Typography>
                                    <Grid container spacing={3}>
                                        {/* number of chat with chatbot */}
                                        <Grid item xs={12} md={4} lg={3}>
                                            <Paper
                                                sx={{
                                                    p: 2,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    height: 240,
                                                }}
                                            >
                                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                                    No. Chats with Chatbot
                                                </Typography>
                                                <Typography component="p" variant="h4">
                                                    {this.state.chatNumber}
                                                </Typography>
                                                <Typography color="text.secondary" sx={{ flex: 1 }}>
                                                    Till: {this.state.currentTime}
                                                </Typography>
                                                <div>
                                                    <Link color="primary" href="https://analytics.zoho.com/open-view/2541981000000003029" target="_blank">
                                                        View Chat Details
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link color="primary" href="https://analytics.zoho.com/open-view/2541981000000003030" target="_blank">
                                                        View Visit Details
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link color="primary" href="https://analytics.zoho.com/open-view/2541981000000003031" target="_blank">
                                                        View Event Logs
                                                    </Link>
                                                </div>
                                            </Paper>
                                        </Grid>
                                        {/* number of chat with online doctors */}
                                        <Grid item xs={12} md={4} lg={4}>
                                            <Paper
                                                sx={{
                                                    p: 2,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    height: 240,
                                                }}
                                            >
                                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                                    No. Chats with Online Doctors
                                                </Typography>
                                                <Typography component="p" variant="h4">
                                                    {this.state.chatWithDoctorNumber}
                                                </Typography>
                                                <Typography color="text.secondary" sx={{ flex: 1 }}>
                                                    Till: {this.state.currentTime}
                                                </Typography>
                                                <div>
                                                    <Link color="primary" href="/admin-chathistory">
                                                        View Chat Details
                                                    </Link>
                                                </div>
                                            </Paper>
                                        </Grid>
                                        {/* canvas pie chart */}
                                        <Grid item xs={12} md={4} lg={5}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart
                                                    width='100%'
                                                    height={240}
                                                    data={data}
                                                    margin={{
                                                        top: 5,
                                                        right: 30,
                                                        left: 20,
                                                        bottom: 5,
                                                    }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="pv" fill="#8884d8" />
                                                    <Bar dataKey="uv" fill="#82ca9d" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3}>
                                        {/* number of users */}
                                        <Grid item xs={12} md={4} lg={3}>
                                            <Paper
                                                sx={{
                                                    p: 2,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    height: 240,
                                                }}
                                            >
                                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                                    Number of Users
                                                </Typography>
                                                <Typography component="p" variant="h4">
                                                    {this.state.NumberOfUsers}
                                                </Typography>
                                                <Typography color="text.secondary" sx={{ flex: 1 }}>
                                                </Typography>
                                                <div>
                                                    <Link color="primary" href="https://analytics.zoho.com/open-view/2541981000000003027" target="_blank">
                                                        View Visitors Details
                                                    </Link>
                                                </div>
                                            </Paper>
                                        </Grid>
                                        {/* number of doctors */}
                                        <Grid item xs={12} md={4} lg={3}>
                                            <Paper
                                                sx={{
                                                    p: 2,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    height: 240,
                                                }}
                                            >
                                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                                    Number of Doctors
                                                </Typography>
                                                <Typography component="p" variant="h4">
                                                    {this.state.NumberOfDoctors}
                                                </Typography>
                                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                                    Online Doctors
                                                </Typography>
                                                <Typography component="p" variant="h4">
                                                    {this.state.NumberOfOnlineDoctors}
                                                </Typography>
                                                <Typography color="text.secondary" sx={{ flex: 1 }}>
                                                </Typography>
                                                <div>
                                                    <Link color="primary" href="/management">
                                                        User Management
                                                    </Link>
                                                </div>
                                            </Paper>
                                        </Grid>
                                        {/* number of operators */}
                                        <Grid item xs={12} md={4} lg={3}>
                                            <Paper
                                                sx={{
                                                    p: 2,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    height: 240,
                                                }}
                                            >
                                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                                    Number of Operators
                                                </Typography>
                                                <Typography component="p" variant="h4">
                                                    {this.state.NumberOfOperators}
                                                </Typography>
                                                <Typography color="text.secondary" sx={{ flex: 1 }}>
                                                </Typography>
                                                <div>
                                                    <Link color="primary" href="https://analytics.zoho.com/open-view/2541981000000003026" target="_blank">
                                                        View Operators Details
                                                    </Link>
                                                </div>
                                            </Paper>
                                        </Grid>
                                        {/* canvas pie chart */}
                                        <Grid item xs={12} md={4} lg={3}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart height={240}>
                                                    <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                                                    <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                                                </PieChart>
                                               
                                            </ResponsiveContainer>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Container>
                        </Grid>
                    </Container>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 128,
                            height: 128,
                        },
                    }}
                >
                    <Paper elevation={0} />
                    <Paper />
                    <Paper elevation={3} />
                </Box>
            </ThemeProvider>

        )
    }
}

export default withStyles(useStyles)(AdminDashboard);