import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { ACCESS_TOKEN_FEEDBACK, ACCESS_TOKEN_OPERATOR } from '../../configureApi';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: 40
    }
});

const mdTheme = createTheme();

class Feedbacks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            googleSheetData: [],
            amount: 0,
            rating1: 0,
            rating2: 0,
            rating3: 0,
            rating4: 0,
            rating5: 0,
            feedbackType1: 0,//comments
            feedbackType2: 0,//questions
            feedbackType3: 0,//bug reports
            feedbackType4: 0,//feature request
            //zoho api
            chatFeedbackList: [],
            //operatorIDList : [],
            operatorID: '',
            fromTime: '',
            toTime: '',
            limit: '', //default
            rating: ''
        }
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handlefromTimeChange = this.handlefromTimeChange.bind(this);
        this.handletoTimeChange = this.handletoTimeChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleOperatorIDChange = this.handleOperatorIDChange.bind(this);
        this.filterFeedbacks = this.filterFeedbacks.bind(this);
    }

    handleAmountChange = (e) => {
        this.setState({ limit: e.target.value })
    };
    handlefromTimeChange = (e) => {
        this.setState({ fromTime: e.target.value })
    };
    handletoTimeChange = (e) => {
        this.setState({ toTime: e.target.value })
    };
    handleRatingChange = (e) => {
        this.setState({ rating: e.target.value });
    };
    handleOperatorIDChange = (e) => {
        this.setState({ operatorID: e.target.value });
    };

    componentDidMount() {
        axios.get('https://cors-anywhere.herokuapp.com/https://sheetdb.io/api/v1/j4wedxfdmaw27')
            .then(response => {
                let tableData = response.data;
                var amount = 0; var rating1 = 0; var rating2 = 0; var rating3 = 0; var rating4 = 0; var rating5 = 0;
                var feedbackType1 = 0; var feedbackType2 = 0; var feedbackType3 = 0; var feedbackType4 = 0;
                tableData.forEach((item, i) => {
                    item.id = i + 1;
                    amount++;
                    if (item['Feedback Type'] === 'Comments') feedbackType1++;
                    else if (item['Feedback Type'] === 'Questions') feedbackType2++;
                    else if (item['Feedback Type'] === 'Bug Reports') feedbackType3++;
                    else feedbackType4++;
                    if (item['Do you have a good experience using the website?'] === '1') rating1++;
                    else if (item['Do you have a good experience using the website?'] === '2') rating2++;
                    else if (item['Do you have a good experience using the website?'] === '3') rating3++;
                    else if (item['Do you have a good experience using the website?'] === '4') rating4++;
                    else rating5++;
                });
                //console.log(tableData)
                this.setState({
                    googleSheetData: tableData,
                    amount: amount,
                    rating1: rating1,
                    rating2: rating2,
                    rating3: rating3,
                    rating4: rating4,
                    rating5: rating5,
                    feedbackType1: feedbackType1,
                    feedbackType2: feedbackType2,
                    feedbackType3: feedbackType3,
                    feedbackType4: feedbackType4
                });
            }).catch(error => {
                console.log('Data not returned', error)
            })

        axios.get('https://cors-anywhere.herokuapp.com/https://salesiq.zoho.com/api/v2/sjsu/feedbacks', {
            headers: {
                Authorization: ACCESS_TOKEN_FEEDBACK
            }
        }).then(response => {
            let feedbackArray = response.data.data;
            console.log(feedbackArray)
            feedbackArray.map((listing) => {
                // convert milisenconds to date and time
                var end_time = Number(listing.end_time);
                var d = new Date(end_time);
                listing.end_time = d.toLocaleString();
                var start_time = Number(listing.start_time);
                var d = new Date(start_time);
                listing.start_time = d.toLocaleString();
                //extract object
                listing.attender_name = listing.attender.display_name;
                listing.rating_value = listing.rating.value;
                listing.visitor_name = listing.visitor.name;
            })
            this.setState({ chatFeedbackList: feedbackArray });
        }).catch(error => {
            console.log('Data not returned', error)
        })
    }

    filterFeedbacks = (event) => {
        event.preventDefault();//stop refresh
        //convert time into miliseconds
        var from_time = new Date(this.state.fromTime);
        var fromTime = from_time.getTime();
        var to_time = new Date(this.state.toTime);
        var toTime = to_time.getTime();
        axios.get('https://cors-anywhere.herokuapp.com/https://salesiq.zoho.com/api/v2/sjsu/feedbacks', {
            headers: {
                Authorization: ACCESS_TOKEN_FEEDBACK
            },
            params: {
                limit: this.state.limit,
                ratings: this.state.rating,
                start_time: fromTime || "",
                end_time: toTime || "",
                operator_ids: this.state.operatorID
            },
        }).then(response => {
            let feedbackArray = response.data.data;
            console.log(feedbackArray)
            feedbackArray.map((listing) => {
                // convert milisenconds to date and time
                var end_time = Number(listing.end_time);
                var d = new Date(end_time);
                listing.end_time = d.toLocaleString();
                var start_time = Number(listing.start_time);
                var d = new Date(start_time);
                listing.start_time = d.toLocaleString();
                //extract object
                listing.attender_name = listing.attender.display_name;
                listing.rating_value = listing.rating.value;
                listing.visitor_name = listing.visitor.name;
            })
            this.setState({ chatFeedbackList: feedbackArray });
        }).catch(error => {
            console.log('Data not returned', error)
        })
    }

    render() {
        const { classes } = this.props;
        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'Timestamp', headerName: 'Time', width: 150 },
            { field: 'Name', headerName: 'Name', width: 100 },
            { field: 'Email', headerName: 'Email', width: 180 },
            { field: 'Do you have a good experience using the website?', headerName: 'Rating', width: 100 },
            { field: 'Feedback Type', headerName: 'Feedback Type', width: 150 },
            { field: 'Feedback', headerName: 'Feedback', width: 200 },
            { field: 'Suggestions for improvement', headerName: 'Suggestions', width: 250 }
        ];
        //console.log(this.state)

        const columns_feedbackfromchatbot = [
            { field: 'reference_id', headerName: 'ID', width: 70 },
            { field: 'attender_name', headerName: 'Operator', width: 190 },
            { field: 'rating_value', headerName: 'Rating', width: 100 },
            { field: 'feedback', headerName: 'Feedback', width: 190 },
            { field: 'visitor_name', headerName: 'Visitor', width: 110 },
            { field: 'start_time', headerName: 'Start Time', width: 160 },
            { field: 'end_time', headerName: 'End Time', width: 160 }
        ];

        const data = [
            {
                name: 'Rating for Website',
                rating1: this.state.rating1,
                rating2: this.state.rating2,
                rating3: this.state.rating3,
                rating4: this.state.rating4,
                rating5: this.state.rating5
            }
        ];

        const data01 = [
            {
                "name": "Comments",
                "value": this.state.feedbackType1
            },
            {
                "name": "Questions",
                "value": this.state.feedbackType2
            },
            {
                "name": "Bug Reports",
                "value": this.state.feedbackType3
            },
            {
                "name": "Feature Request",
                "value": this.state.feedbackType4
            }
        ];
        const data02 = [
            {
                "name": "Comments",
                "value": this.state.feedbackType1
            },
            {
                "name": "Questions",
                "value": this.state.feedbackType2
            },
            {
                "name": "Bug Reports",
                "value": this.state.feedbackType3
            },
            {
                "name": "Feature Request",
                "value": this.state.feedbackType4
            }
        ];

        let redirectVar = null;
        if (!localStorage.getItem("user")) {
            redirectVar = <Navigate to="/" />
        }
        return (
            <>
                {redirectVar}
                <ThemeProvider theme={mdTheme}>
                    <Box>
                        <Container maxWidth="full" sx={{ mt: 3, mb: 4 }}>
                            <Grid container spacing={3}>

                                {/* Feedbacks Main */}
                                <Container maxWidth="lg" className={classes.root}>
                                    <Container maxWidth="lg" className={classes.root}>
                                        <Typography component="h1" variant="h4" color="primary" gutterBottom>
                                            Feedbacks from Form
                                        </Typography>
                                        <DataGrid style={{ height: '100%', width: '100%' }} autoHeight
                                            getRowId={(row) => row.id}
                                            rows={this.state.googleSheetData}
                                            columns={columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[5, 10, 20, 50]}
                                        />
                                        <br />
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={4} lg={7}>
                                                <Typography component="h1" variant="h6" color="primary" gutterBottom>
                                                    Do you have a good experience using the website?
                                                </Typography> 
                                            </Grid>
                                            <Grid item xs={12} md={4} lg={5}>
                                                <Typography component="h1" variant="h6" color="primary" gutterBottom>
                                                    Feedback Type
                                                </Typography> 
                                            </Grid>
                                            <Grid item xs={12} md={4} lg={7} sx={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: 1
                                            }}>
                                                <ResponsiveContainer width="100%" height={240}>
                                                    <BarChart
                                                        width='100%'
                                                        height={260}
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
                                                        <Bar dataKey="rating1" fill="#8884d8" />
                                                        <Bar dataKey="rating2" fill="#82ca9d" />
                                                        <Bar dataKey="rating3" fill="#44DAD6" />
                                                        <Bar dataKey="rating4" fill="#937FD4" />
                                                        <Bar dataKey="rating5" fill="#2EDF52" />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </Grid>
                                            {/* pie chart */}
                                            <Grid item xs={12} md={4} lg={5}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart height={260}>
                                                        <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                                                        <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </Grid>
                                        </Grid>
                                        <br /><br />
                                        {/* Feedbacks from Chatbot */}
                                        <Typography component="h1" variant="h4" color="primary" gutterBottom>
                                            Feedbacks from Chatbot
                                        </Typography>
                                        <Box sx={{ minWidth: 120 }}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={4} lg={4}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Latest #</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={this.state.limit}
                                                            sx={{ width: 250 }}
                                                            label="Amount"
                                                            onChange={this.handleAmountChange}
                                                        >
                                                            <MenuItem value={5}>5 feedbacks</MenuItem>
                                                            <MenuItem value={10}>10 feedbacks</MenuItem>
                                                            <MenuItem value={20}>20 feedbacks</MenuItem>
                                                            <MenuItem value={50}>50 feedbacks</MenuItem>
                                                            <MenuItem value={50}>100 feedbacks</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={4} lg={4}>
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
                                                <Grid item xs={12} md={4} lg={4}>
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
                                                <Grid item xs={12} md={4} lg={4}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Operator ID</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={this.state.operatorID}
                                                            sx={{ width: 250 }}
                                                            label="Operator ID"
                                                            onChange={this.handleOperatorIDChange}
                                                        >
                                                            <MenuItem value={"702428000000002002"}>702428000000002002</MenuItem>
                                                            <MenuItem value={"702428000000002138"}>702428000000002138</MenuItem>
                                                            <MenuItem value={""}>All Operators</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={4} lg={4}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={this.state.rating}
                                                            sx={{ width: 250 }}
                                                            label="Rating"
                                                            onChange={this.handleRatingChange}
                                                        >
                                                            <MenuItem value={"happy"}>happy</MenuItem>
                                                            <MenuItem value={"neutral"}>neutral</MenuItem>
                                                            <MenuItem value={"sad"}>sad</MenuItem>
                                                            <MenuItem value={""}>All Ratings</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={4} lg={4}>
                                                    <Button size="large" variant="outlined" onClick={this.filterFeedbacks}>Filter</Button>
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <DataGrid style={{ height: '100%', width: '100%' }} autoHeight
                                                getRowId={(row) => row.reference_id}
                                                rows={this.state.chatFeedbackList}
                                                columns={columns_feedbackfromchatbot}
                                                pageSize={10}
                                                rowsPerPageOptions={[5, 10, 20, 50]}
                                            />
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

export default withStyles(useStyles)(Feedbacks);