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
import NavigationButton from '../../components/Navigation/NavigationButton';

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

        const data = [
            {
                name: 'Number of Chats',
                chatbot: this.state.chatNumber,
                doctor: this.state.chatWithDoctorNumber
            }
        ];

        const data01 = [
            {
                "name": "User",
                "value": this.state.NumberOfUsers
            },
            {
                "name": "Online Doctor",
                "value": this.state.NumberOfOnlineDoctors
            },
            {
                "name": "Offline Doctor",
                "value": this.state.NumberOfDoctors-this.state.NumberOfOnlineDoctors
            },
            {
                "name": "Operator",
                "value": this.state.NumberOfOperators
            }
        ];

        const data02 = [
            {
                "name": "Users",
                "value": this.state.NumberOfUsers
            },
            {
                "name": "Doctors",
                "value": this.state.NumberOfDoctors
            },
            {
                "name": "Operators",
                "value": this.state.NumberOfOperators
            }
        ];

        return (
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Typography component="h1" variant="h4" color="primary" gutterBottom>
                        Admin Dashboard
                    </Typography>
                </Grid>

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
                <Grid item xs={12} md={4} lg={5} sx={{

                    justifyContent: "center",
                    alignItems: "center",
                    padding: 1
                }}>
                    <ResponsiveContainer width="100%" height={240}>
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
                            <Bar dataKey="chatbot" fill="#8884d8" />
                            <Bar dataKey="doctor" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
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
                <Grid item xs={12} md={4} lg={3}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart height={240}>
                            <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                            <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={75} outerRadius={100} fill="#82ca9d" label />
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid item xs={12}>
                    <NavigationButton />
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(useStyles)(AdminDashboard);