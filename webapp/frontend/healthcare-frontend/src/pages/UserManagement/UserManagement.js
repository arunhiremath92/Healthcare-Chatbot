import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

import {ACCESS_TOKEN_VISITOR, ACCESS_TOKEN_OPERATOR} from '../../configureApi';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: 40
    }
});

const mdTheme = createTheme();

class UserManagement extends Component {
    constructor(props){
        super(props);
        this.state = {  
            visitorList : [],
            operatorList : []
        }
    }  

    componentDidMount(){
        //get visitors info
        axios.get('https://cors-anywhere.herokuapp.com/https://salesiq.zoho.com/api/v1/sjsu/visitorsview/-1/visitors', {
            headers: {
                Authorization: ACCESS_TOKEN_VISITOR
            }
        }).then(response => {
            let visitorArray = response.data.data.visitorlist;
            //console.log(visitorArray)
            visitorArray.map((listing) => {
                // convert milisenconds to date and time
                var visitor_since = Number(listing.visitor_since);
                var d = new Date(visitor_since);
                listing.visitor_since = d.toLocaleString(); 
                var lastvisit_time = Number(listing.lastvisit_time);
                d = new Date(lastvisit_time);
                listing.lastvisit_time = d.toLocaleString(); 
                // convert miliseconds duration to mins+seconds.
                var total_timespent = Number(listing.total_timespent);
                function pad(n, z) {
                    z = z || 2;
                    return ('00' + n).slice(-z);
                }
                var ms = total_timespent % 1000;
                total_timespent = (total_timespent - ms) / 1000;
                var secs = total_timespent % 60;
                total_timespent = (total_timespent - secs) / 60;
                var mins = total_timespent % 60;
                var hrs = (total_timespent - mins) / 60;
                var duration_in_min = pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
                listing.total_timespent = duration_in_min; 
                return null
            })
            this.setState({visitorList : visitorArray});
        }).catch(error => {
            console.log('Data not returned', error)
        })
        //get operators info
        axios.get('https://cors-anywhere.herokuapp.com/https://salesiq.zoho.com/api/v2/sjsu/operators', {
            headers: {
                Authorization: ACCESS_TOKEN_OPERATOR
            }
        }).then(response => {
            let operatorArray = response.data.data;
            console.log(operatorArray)
            operatorArray.map((listing) => {
                // convert milisenconds to date and time
                var modified_time = Number(listing.modified_time);
                var d = new Date(modified_time);
                listing.modified_time = d.toLocaleString(); 
                var created_time = Number(listing.created_time);
                d = new Date(created_time);
                listing.created_time = d.toLocaleString();
                return null
            })
            this.setState({operatorList : operatorArray});
        }).catch(error => {
            console.log('Data not returned', error)
        })
    }

    render(){
        const { classes } = this.props;
        const columns_visitor = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'name', headerName: 'Name', width: 110 },
            { field: 'email', headerName: 'Email', width: 190 },
            { field: 'country', headerName: 'Country', width: 100 },
            { field: 'visitor_since', headerName: 'Since', width: 170 },
            { field: 'total_timespent', headerName: 'Total Time', width: 110 },
            { field: 'lastvisit_time', headerName: 'Last Visit Time', width: 170 },
            { field: 'ip', headerName: 'IP Address', width: 140 },
            { field: 'leadscore', headerName: 'Score', width: 80 }
        ];
        const columns_operator = [
            { field: 'zuid', headerName: 'ID', width: 85 },
            { field: 'first_name', headerName: 'First Name', width: 100 },
            { field: 'last_name', headerName: 'Last Name', width: 100 },
            { field: 'nick_name', headerName: 'Nick Name', width: 190 },
            { field: 'email_id', headerName: 'Email', width: 190 },
            { field: 'role', headerName: 'Role', width: 110 },
            { field: 'created_time', headerName: 'Created At', width: 170 },
            { field: 'modified_time', headerName: 'Modified At', width: 170 },
            { field: 'status_message', headerName: 'Status', width: 80 }
        ];
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
                       
                        {/* UserManagement Main */}
                        <Container maxWidth="lg" className={classes.root}>
                            <Container maxWidth="lg" className={classes.root}>
                                <Typography component="h1" variant="h4" color="primary" gutterBottom>
                                    User Management
                                </Typography>
                                <Typography component="h1" variant="h6" color="primary" gutterBottom>
                                    Chatbot Visitor Details
                                </Typography> 
                                <DataGrid style={{height: '100%', width: '100%'}} autoHeight
                                    getRowId={(row) => row.id}
                                    rows={this.state.visitorList}
                                    columns={columns_visitor}
                                    pageSize={5}
                                    rowsPerPageOptions={[5,10,20,50]}
                                />
                                <br/>
                                <Typography component="h1" variant="h6" color="primary" gutterBottom>
                                    Chatbot Operator Details
                                </Typography> 
                                <DataGrid style={{height: '100%', width: '100%'}} autoHeight
                                    getRowId={(row) => row.id}
                                    rows={this.state.operatorList}
                                    columns={columns_operator}
                                    pageSize={5}
                                    rowsPerPageOptions={[5,10,20,50]}
                                />
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

export default withStyles(useStyles)(UserManagement);