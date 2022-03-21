import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import TopNavigationBarLoggedIn from '../../components/Navigation/TopNavigationBarLoggedIn';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: 40
    }
});

const mdTheme = createTheme();

class AdminStatistics extends Component {
    constructor(props){
        super(props);
        this.state = {  
            report : "Chat Overview",
            title : "Analyze"
        }
        this.handleReportChange = this.handleReportChange.bind(this);
    }  

    handleReportChange = (e) => {
        this.setState({ report : e.target.value })
        this.setState({ title : e.target.value })
    };

    render(){
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
                        {/* AdminStatistics Main */}
                        <Container maxWidth="lg" className={classes.root}>
                            <Container maxWidth="lg" className={classes.root}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4} lg={9}>
                                        <Typography component="h1" variant="h4" color="primary" gutterBottom>
                                            {this.state.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4} lg={3}>
                                        <InputLabel id="demo-simple-select-label">Report Name</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={this.state.report}
                                            sx={{ width: 250 }}
                                            label="Report Name"
                                            onChange={this.handleReportChange}
                                        >
                                            <MenuItem value={"Chat Overview"}>Chat Overview</MenuItem>
                                            <MenuItem value={"Visit Tracking"}>Visit Tracking</MenuItem>
                                            <MenuItem value={"Visitor Tracking"}>Visitor Tracking</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>
                                {this.state.report==="Chat Overview" && <iframe frameborder="0" width="1104" height="2350" src="https://analytics.zoho.com/open-view/2541981000000003073"></iframe>}
                                {this.state.report==="Visit Tracking" && <iframe frameborder="0" width="1104" height="1900" src="https://analytics.zoho.com/open-view/2541981000000003032"></iframe>}
                                {this.state.report==="Visitor Tracking" && <iframe frameborder="0" width="1104" height="1580" src="https://analytics.zoho.com/open-view/2541981000000003058"></iframe>}
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

export default withStyles(useStyles)(AdminStatistics);